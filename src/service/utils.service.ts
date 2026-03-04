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

export const buildHeaders = (): Record<string, string> => {
  const headers: Record<string, string> = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'es-419,es;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Referer': 'https://latanime.org/ver/',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'cross-site',
    'Sec-Fetch-User': '?1',
    'Sec-GPC': '1',
    'Upgrade-Insecure-Requests': '1',
    'sec-ch-ua': '"Not:A-Brand";v="99", "Brave";v="145", "Chromium";v="145"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
  };

  if (process.env.SCRAPER_LATANIME_COOKIE) {
    headers['Cookie'] = process.env.SCRAPER_LATANIME_COOKIE;
  }

  return headers;
};
