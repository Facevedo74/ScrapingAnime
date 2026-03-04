import { CheerioAPI } from 'cheerio';

export interface AnimeProvider {
  buildEpisodeUrl(slugOrUrl: string, index: number, type?: string): string;
  extractLinks($: CheerioAPI): Record<string, string | null>;
}
