export function decodeDataPlayer(value: string | null): string | null {
  if (!value) return null;
  try {
    return Buffer.from(value, 'base64').toString('utf8');
  } catch (_err) {
    return null;
  }
}

export function normalizeMp4upload(url: string | null): string | null {
  if (!url) return null;
  const match = url.match(/mp4upload\.com\/embed-([^\.]+)\.html/i);
  if (match) return `https://www.mp4upload.com/${match[1]}`;
  return url;
}

export function normalizeYourUpload(url: string | null): string | null {
  if (!url) return null;
  const cleanUrl = url.replace(/\\\//g, '/');
  return cleanUrl.replace(/\/embed\//i, '/watch/');
}
