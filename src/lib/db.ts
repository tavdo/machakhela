import { Pool } from 'pg';

declare global {
  // eslint-disable-next-line no-var
  var pgPool: Pool | undefined;
}

function getConnectionString(): string | undefined {
  return process.env.DATABASE_URL || process.env.POSTGRES_URL;
}

function shouldUseSsl(connectionString: string): boolean {
  if (process.env.NODE_ENV === 'production') {
    return true;
  }

  return (
    connectionString.includes('sslmode=require') ||
    connectionString.includes('neon.tech') ||
    connectionString.includes('supabase.co')
  );
}

function createPool(): Pool {
  const connectionString = getConnectionString();
  if (!connectionString) {
    throw new Error('DATABASE_URL is not configured');
  }

  return new Pool({
    connectionString,
    ssl: shouldUseSsl(connectionString) ? { rejectUnauthorized: false } : false,
    max: 1,
    idleTimeoutMillis: 20_000,
    connectionTimeoutMillis: 10_000,
  });
}

const pool = globalThis.pgPool ?? createPool();
globalThis.pgPool = pool;

export function hasDatabaseConfig(): boolean {
  return !!getConnectionString();
}

export default pool;
