import { AnimeProvider } from './types/AnimeProvider';
import { animeJlProvider } from './types/animeJlProvider';
import { latanimeProvider } from './types/latanimeProvider';
import { tioanimeProvider } from './types/tioanimeProvider';

const providers: Record<string, AnimeProvider> = {
  'anime-jl': animeJlProvider,
  'latanime.org': latanimeProvider,
  'tioanime.com': tioanimeProvider,
};

export function getProvider(type: string): AnimeProvider {
  const provider = providers[type];
  if (!provider) {
    throw new Error(`Type no soportado: ${type}`);
  }
  return provider;
}
