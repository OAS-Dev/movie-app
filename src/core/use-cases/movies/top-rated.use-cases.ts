import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {GeneralResponse} from '../../../infrastructure/interfaces/general.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import type {Movie} from '../../entities/movie.entity';

export const moviesTopRatedUseCases = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const topRated = await fetcher.get<GeneralResponse>('/top_rated');

    return topRated.results.map(result =>
      MovieMapper.fromMovieDBResulttoEntity(result),
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching upcoming movies');
  }
};
