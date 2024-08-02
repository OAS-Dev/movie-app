import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {GeneralResponse} from '../../../infrastructure/interfaces/general.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import type {Movie} from '../../entities/movie.entity';

interface Options {
  page?: number;
  limit?: number;
}

export const moviesPopularUseCases = async (
  fetcher: HttpAdapter,
  options?: Options,
): Promise<Movie[]> => {
  try {
    const popular = await fetcher.get<GeneralResponse>('/popular', {
      params: {
        page: options?.page || 1,
      },
    });

    return popular.results.map(result =>
      MovieMapper.fromMovieDBResulttoEntity(result),
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching upcoming movies');
  }
};
