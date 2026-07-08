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

// GET: Fetch current translations from DB
export async function GET() {
  try {
    await ensureDb();
    const result = await pool.query(
      'SELECT translations FROM site_content ORDER BY updated_at DESC LIMIT 1'
    );

    if (result.rows.length > 0) {
      return NextResponse.json({
        success: true,
        translations: result.rows[0].translations,
        source: 'database'
      });
    }

    // No custom content saved yet — return empty so client uses defaults
    return NextResponse.json({
      success: true,
      translations: null,
      source: 'defaults'
    });
  } catch (error) {
    console.error('[API] GET /api/admin/content error:', error);
    return NextResponse.json(
      { success: false, error: 'Database connection failed' },
      { status: 500 }
    );
  }
}

// POST: Save/update translations in DB
export async function POST(request: NextRequest) {
  try {
    await ensureDb();
    const { translations } = await request.json();

    if (!translations) {
      return NextResponse.json(
        { success: false, error: 'Missing translations data' },
        { status: 400 }
      );
    }

    // Upsert: delete old rows and insert fresh
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      await client.query('DELETE FROM site_content');
      await client.query(
        'INSERT INTO site_content (translations, updated_at) VALUES ($1, NOW())',
        [JSON.stringify(translations)]
      );
      await client.query('COMMIT');
    } catch (err) {
      await client.query('ROLLBACK');
      throw err;
    } finally {
      client.release();
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] POST /api/admin/content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save content' },
      { status: 500 }
    );
  }
}

// DELETE: Reset to defaults (remove custom content)
export async function DELETE() {
  try {
    await ensureDb();
    await pool.query('DELETE FROM site_content');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[API] DELETE /api/admin/content error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to reset content' },
      { status: 500 }
    );
  }
}
