import {Movie} from '../../core/entities/movie.entity';
import type {Result} from '../interfaces/movie-db.responses';

export class MovieMapper {
  static fromMovieDBResulttoEntity(result: Result): Movie {
    return {
      id: result.id,
      title: result.title,
      description: result.overview,
      poster: `http://image.tmdb.org/t/p/w500${result.poster_path}`,
      releaseDate: new Date(result.release_date),
      rating: result.vote_average,
      backdrop: `http://image.tmdb.org/t/p/w500${result.backdrop_path}`,
    };
  }
}
