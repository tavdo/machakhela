import { NextRequest, NextResponse } from 'next/server';
import pool from '@/lib/db';
import { initDatabase } from '@/lib/db-init';

let dbInitialized = false;

async function ensureDb() {
  if (!dbInitialized) {
    await initDatabase();
    dbInitialized = true;
  }
}

// GET: Serve an image by its key
export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    await ensureDb();

    const result = await pool.query(
      'SELECT data, mime_type FROM site_images WHERE image_key = $1',
      [params.key]
    );

    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    const { data, mime_type } = result.rows[0];

    // data is a base64 data URL like "data:image/jpeg;base64,..."
    const base64Data = data.split(',')[1];
    const buffer = Buffer.from(base64Data, 'base64');

    return new NextResponse(buffer, {
      headers: {
        'Content-Type': mime_type || 'image/jpeg',
        'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      },
    });
  } catch (error) {
    console.error(`[API] GET /api/admin/images/${params.key} error:`, error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
