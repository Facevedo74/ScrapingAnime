import { AnimeProvider } from './AnimeProvider';
import { CheerioAPI } from 'cheerio';
import { normalizeMp4upload } from '../../utils.service';

const normalizeAnimeJlBase = (url: string): string => {
  if (!url) return '';
  let base = url.replace(/\/episodio-\d+\/?$/i, '');
  if (!base.endsWith('/')) base += '/';
  return base;
};

export const animeJlProvider: AnimeProvider = {
  buildEpisodeUrl(slugOrUrl: string, index: number): string {
    return `${normalizeAnimeJlBase(slugOrUrl)}episodio-${index}`;
  },

  extractLinks($: CheerioAPI): Record<string, string | null> {
    const scripts = $('script').map((_, el) => $(el).html() || '').get().join('\n');
    const match = scripts.match(/video\[8\]\s*=\s*'[^']*src="([^"]*mp4upload[^"]+)"/i);
    const mp4upload = normalizeMp4upload(match && typeof match[1] === 'string' ? match[1] : null);
    return { mediafire: null, mega: null, mp4upload };
  }
};
