import { NextRequest, NextResponse } from 'next/server';
import pool, { hasDatabaseConfig } from '@/lib/db';
import { initDatabase } from '@/lib/db-init';
import { getUploadErrorMessage } from '@/lib/api-errors';
import {
  getMaxUploadBytes,
  isAllowedImageMime,
  prepareImageForStorage,
  resolveMimeType,
} from '@/lib/image-upload';

export const runtime = 'nodejs';
export const maxDuration = 30;

let dbInitialized = false;

async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

// GET: List all uploaded images (returns keys and metadata, not data)
export async function GET() {
  try {
    await ensureDb();
    const result = await pool.query(
      'SELECT image_key, original_name, mime_type, uploaded_at FROM site_images ORDER BY uploaded_at DESC'
    );

    return NextResponse.json({
      success: true,
      images: result.rows.map(r => ({
        image_key: r.image_key,
        file_path: `/api/admin/images/${r.image_key}`,
        original_name: r.original_name
      }))
    });
  } catch (error) {
    console.error('[API] GET /api/admin/images error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch images' },
      { status: 500 }
    );
  }
}

// POST: Upload an image (stores as base64 in PostgreSQL)
export async function POST(request: NextRequest) {
  try {
    if (!hasDatabaseConfig()) {
      return NextResponse.json(
        {
          success: false,
          error: 'Database is not configured. Add DATABASE_URL to your environment variables.',
        },
        { status: 503 }
      );
    }

    await ensureDb();

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const imageKey = formData.get('imageKey') as string | null;

    if (!file || !imageKey) {
      return NextResponse.json(
        { success: false, error: 'Missing file or imageKey' },
        { status: 400 }
      );
    }

    const maxUploadBytes = getMaxUploadBytes();
    if (file.size > maxUploadBytes) {
      return NextResponse.json(
        { success: false, error: `File too large. Maximum ${Math.floor(maxUploadBytes / (1024 * 1024))}MB` },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const inputBuffer = Buffer.from(bytes);
    const resolvedMimeType = resolveMimeType(file.type, file.name, inputBuffer);

    if (!isAllowedImageMime(resolvedMimeType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Allowed: JPEG, PNG, WebP, GIF, AVIF, HEIC' },
        { status: 400 }
      );
    }

    let storedBuffer: Buffer;
    let storedMimeType: string;
    try {
      ({ buffer: storedBuffer, mimeType: storedMimeType } = await prepareImageForStorage(
        inputBuffer,
        resolvedMimeType
      ));
    } catch (error) {
      console.error('[API] Image processing error:', error);
      return NextResponse.json(
        { success: false, error: 'Could not process image. Try JPEG or PNG instead.' },
        { status: 400 }
      );
    }

    const base64 = storedBuffer.toString('base64');
    const dataUrl = `data:${storedMimeType};base64,${base64}`;

    await pool.query(
      `INSERT INTO site_images (image_key, original_name, mime_type, size_bytes, data, uploaded_at)
       VALUES ($1, $2, $3, $4, $5, NOW())
       ON CONFLICT (image_key) DO UPDATE SET
         original_name = EXCLUDED.original_name,
         mime_type = EXCLUDED.mime_type,
         size_bytes = EXCLUDED.size_bytes,
         data = EXCLUDED.data,
         uploaded_at = NOW()`,
      [imageKey, file.name, storedMimeType, storedBuffer.length, dataUrl]
    );

    return NextResponse.json({
      success: true,
      image: {
        image_key: imageKey,
        file_path: `/api/admin/images/${imageKey}`,
        original_name: file.name
      }
    });
  } catch (error) {
    console.error('[API] POST /api/admin/images error:', error);
    return NextResponse.json(
      { success: false, error: getUploadErrorMessage(error) },
      { status: 500 }
    );
  }
}

// DELETE: Remove an image by key
export async function DELETE(request: NextRequest) {
  try {
    await ensureDb();

    const { searchParams } = new URL(request.url);
    const imageKey = searchParams.get('key');

    if (!imageKey) {
      return NextResponse.json(
        { success: false, error: 'Missing image key' },
        { status: 400 }
      );
    }

    await pool.query('DELETE FROM site_images WHERE image_key = $1', [imageKey]);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] DELETE /api/admin/images error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
