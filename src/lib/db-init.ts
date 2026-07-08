import pool from './db';

export async function initDatabase() {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS site_content (
        id SERIAL PRIMARY KEY,
        translations JSONB NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW(),
        updated_by VARCHAR(100) DEFAULT 'admin'
      );
    `);

    await client.query(`
      CREATE TABLE IF NOT EXISTS site_images (
        id SERIAL PRIMARY KEY,
        image_key VARCHAR(100) NOT NULL UNIQUE,
        original_name VARCHAR(255),
        mime_type VARCHAR(50),
        size_bytes INTEGER,
        data TEXT NOT NULL,
        uploaded_at TIMESTAMP DEFAULT NOW()
      );
    `);

    console.log('[DB] Tables initialized successfully');
  } catch (error) {
    console.error('[DB] Error initializing tables:', error);
    throw error;
  } finally {
    client.release();
  }
}
