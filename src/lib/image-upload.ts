import sharp from 'sharp';

const EXTENSION_MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.jpe': 'image/jpeg',
  '.jfif': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.heic': 'image/heic',
  '.heif': 'image/heif',
};

const MIME_ALIASES: Record<string, string> = {
  'image/jpg': 'image/jpeg',
  'image/pjpeg': 'image/jpeg',
  'image/x-png': 'image/png',
};

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
  'image/heic',
  'image/heif',
]);

const BROWSER_SAFE_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);

function getExtension(fileName: string): string {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex === -1) return '';
  return fileName.slice(dotIndex).toLowerCase();
}

function detectMimeFromBuffer(buffer: Buffer): string | null {
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return 'image/jpeg';
  }
  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47
  ) {
    return 'image/png';
  }
  if (buffer.length >= 6 && buffer.toString('ascii', 0, 6) === 'GIF87a') {
    return 'image/gif';
  }
  if (buffer.length >= 6 && buffer.toString('ascii', 0, 6) === 'GIF89a') {
    return 'image/gif';
  }
  if (
    buffer.length >= 12 &&
    buffer.toString('ascii', 0, 4) === 'RIFF' &&
    buffer.toString('ascii', 8, 12) === 'WEBP'
  ) {
    return 'image/webp';
  }
  if (buffer.length >= 12 && buffer.toString('ascii', 4, 8) === 'ftyp') {
    const brand = buffer.toString('ascii', 8, 12).toLowerCase();
    if (brand.startsWith('heic') || brand.startsWith('heix') || brand.startsWith('hevc')) {
      return 'image/heic';
    }
    if (brand.startsWith('heif') || brand.startsWith('mif1')) {
      return 'image/heif';
    }
    if (brand.startsWith('avif')) {
      return 'image/avif';
    }
  }
  return null;
}

export function resolveMimeType(
  reportedType: string,
  fileName: string,
  buffer: Buffer
): string | null {
  const normalizedType = MIME_ALIASES[reportedType.toLowerCase()] || reportedType.toLowerCase();
  if (normalizedType && ALLOWED_MIME_TYPES.has(normalizedType)) {
    return normalizedType;
  }

  const extensionMime = EXTENSION_MIME[getExtension(fileName)];
  if (extensionMime) {
    return extensionMime;
  }

  return detectMimeFromBuffer(buffer);
}

export async function prepareImageForStorage(
  buffer: Buffer,
  mimeType: string
): Promise<{ buffer: Buffer; mimeType: string }> {
  if (BROWSER_SAFE_MIME_TYPES.has(mimeType)) {
    return { buffer, mimeType };
  }

  const converted = await sharp(buffer).rotate().jpeg({ quality: 85 }).toBuffer();
  return { buffer: converted, mimeType: 'image/jpeg' };
}

export function isAllowedImageMime(mimeType: string | null): mimeType is string {
  return !!mimeType && ALLOWED_MIME_TYPES.has(mimeType);
}
