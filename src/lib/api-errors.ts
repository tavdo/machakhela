export function getDatabaseErrorMessage(error: unknown): string {
  if (!process.env.DATABASE_URL && !process.env.POSTGRES_URL) {
    return 'Database is not configured. Add DATABASE_URL to your environment variables.';
  }

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes('database_url is not configured')) {
      return 'Database is not configured. Add DATABASE_URL to your environment variables.';
    }
    if (message.includes('econnrefused') || message.includes('connect etimedout')) {
      return 'Database connection failed. Ensure PostgreSQL is running and DATABASE_URL is correct.';
    }
    if (message.includes('password authentication failed')) {
      return 'Database authentication failed. Check DATABASE_URL credentials.';
    }
    if (message.includes('does not exist') && message.includes('database')) {
      return 'Database not found. Check the database name in DATABASE_URL.';
    }
  }

  return 'Database connection failed. Check server logs for details.';
}

export function getUploadErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    if (message.includes('request entity too large') || message.includes('payload too large')) {
      return 'File too large for the server. Try a smaller image (max 4MB).';
    }
  }

  return getDatabaseErrorMessage(error);
}
