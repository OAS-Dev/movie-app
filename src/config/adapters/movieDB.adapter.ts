import {AxiosAdapter} from './http/axios.adapter';

export const movieDBFetcher = new AxiosAdapter({
  baseURL: 'https://api.themoviedb.org/3/movie',
  params: {
    api_key: 'ac4485972019b9c2f60bbf6cd17d4766',
    language: 'es',
  },
});
