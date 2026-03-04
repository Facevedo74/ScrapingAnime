import { AnimeProvider } from './AnimeProvider';
import { CheerioAPI } from 'cheerio';
import { decodeDataPlayer, normalizeMp4upload } from '../../utils/playerUtils';

interface LatanimeInput {
  baseSlug: string;
  startEpisode: number;
}

const parseLatanimeInput = (value: string): LatanimeInput => {
  if (!value) {
    return {
      baseSlug: '',
      startEpisode: 1,
    };
  }

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

  const episodeMatch = path.match(/-episodio-(\d+)$/i);
  const startEpisode = episodeMatch ? Number(episodeMatch[1]) : 1;

  path = path.replace(/\/episodio-\d+$/i, '');
  path = path.replace(/-episodio-\d+$/i, '');
  path = path.replace(/-episodio$/i, '');

  return {
    baseSlug: `${path}-episodio`,
    startEpisode,
  };
};

export const latanimeProvider: AnimeProvider = {
  buildEpisodeUrl(slugOrUrl: string, index: number): string {
    const { baseSlug, startEpisode } = parseLatanimeInput(slugOrUrl);
    const episodeNumber = startEpisode + index - 1;
    return `https://latanime.org/ver/${baseSlug}-${episodeNumber}`;
  },

  extractLinks($: CheerioAPI): Record<string, string | null> {
    const mediafire = $('a[href^="https://www.mediafire.com/"]').attr('href') || null;
    const mega = $('a[href^="https://mega.nz/"]').attr('href') || null;
    const mp4uploadEncoded = $('a.play-video')
      .filter((_, el) => $(el).text().trim().toLowerCase() === 'mp4upload')
      .attr('data-player') || null;
    const mp4upload = normalizeMp4upload(decodeDataPlayer(mp4uploadEncoded));
    return { mediafire, mega, mp4upload };
  }
};
