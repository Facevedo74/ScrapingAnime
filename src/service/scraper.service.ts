import axios from 'axios';
import { load } from 'cheerio';
import { buildHeaders } from './utils.service';
import { getProvider } from './providers/animeProviderFactory';

export class ScraperService {
  async getAnime(url: string, type: string): Promise<{ providers: string[]; chapters: any[] }> {
    const provider = getProvider(type);
    let index = 1;
    let urls: any[] = [];
    const providerNames = new Set<string>();
    try {
      while (true) {
        const targetUrl = provider.buildEpisodeUrl(url, index, type);
        const scrapeInternal = await this.scrapeDownloadUrl(targetUrl, index, provider);
        if (!scrapeInternal) break;

        if (Array.isArray(scrapeInternal.providers)) {
          scrapeInternal.providers.forEach((name: string) => providerNames.add(name));
        }

        delete scrapeInternal.providers;
        urls.push(scrapeInternal);
        index++;
      }
    } catch (error) {
      console.error('Error al obtener los enlaces:', error);
    }
    return {
      providers: Array.from(providerNames),
      chapters: urls,
    };
  }

  async scrapeDownloadUrl(url: string, chapter: number, provider: any): Promise<any | null> {
    try {
      const { data, status } = await axios.get(url, {
        headers: buildHeaders(),
      });
      if (status === 404 || status === 403) return null;
      const $ = load(data);
      const links = provider.extractLinks($);
      const providers = Object.entries(links)
        .filter(([, link]) => Boolean(link))
        .map(([name]) => name);

      return { chapter, providers, ...links };
    } catch (error: any) {
      if (error.response && (error.response.status === 404 || error.response.status === 403)) {
        return null;
      }
      console.error('Error al hacer scraping:', error.message ?? error);
    }
  }
}

export const scraperService = new ScraperService();
