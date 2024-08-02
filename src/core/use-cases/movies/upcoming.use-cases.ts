import {HttpAdapter} from '../../../config/adapters/http/http.adapter';
import {GeneralResponse} from '../../../infrastructure/interfaces/general.responses';
import {MovieMapper} from '../../../infrastructure/mappers/movie.mapper';
import type {Movie} from '../../entities/movie.entity';

export const moviesUpcomingUseCases = async (
  fetcher: HttpAdapter,
): Promise<Movie[]> => {
  try {
    const upcoming = await fetcher.get<GeneralResponse>('/upcoming');

    return upcoming.results.map(result =>
      MovieMapper.fromMovieDBResulttoEntity(result),
    );
  } catch (error) {
    console.log(error);
    throw new Error('Error fetching upcoming movies');
  }
};
