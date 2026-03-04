import { AnimeProvider } from './AnimeProvider';
import { CheerioAPI } from 'cheerio';
import { decodeDataPlayer, normalizeMp4upload, normalizeYourUpload } from '../../utils.service';

const normalizeTioanimeSlug = (value: string): string => {
  if (!value) return '';

  let path = value;
  try {
    if (/^https?:\/\//i.test(value)) {
      path = new URL(value).pathname;
    }
  } catch (_) {
    path = value;
  }

  path = path.replace(/^\//, '').replace(/\/+$/, '');
  path = path.replace(/^ver\//i, '').replace(/^anime\//i, '');
  path = path.replace(/-\d+$/i, '');

  return path;
};

export const tioanimeProvider: AnimeProvider = {
  buildEpisodeUrl(slugOrUrl: string, index: number): string {
    const baseSlug = normalizeTioanimeSlug(slugOrUrl);
    return `https://tioanime.com/ver/${baseSlug}-${index}`;
  },

  extractLinks($: CheerioAPI): Record<string, string | null> {
    const mediafire = $('a[href^="https://www.mediafire.com/"]').attr('href') || null;
    const mega = $('a[href^="https://mega.nz/"]').attr('href') || null;
    const mp4uploadEncoded = $('a.play-video')
      .filter((_, el) => $(el).text().trim().toLowerCase() === 'mp4upload')
      .attr('data-player') || null;
    const mp4upload = normalizeMp4upload(decodeDataPlayer(mp4uploadEncoded));
    const scripts = $('script').map((_, el) => $(el).html() || '').get().join('\n');
    const yourUploadMatch = scripts.match(/\[\s*"YourUpload"\s*,\s*"([^\"]+)"\s*,/i);
    const yourUpload = normalizeYourUpload(yourUploadMatch ? (yourUploadMatch[1] ?? null) : null);

    return { mediafire, mega, mp4upload, yourUpload };
  }
};
