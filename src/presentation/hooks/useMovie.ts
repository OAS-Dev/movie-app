/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-shadow */
import {useEffect, useState} from 'react';
import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';
import {Cast} from '../../core/entities/cast.entity';

export const useMovie = (movieId: number) => {
  const [isLoading, setIsLoading] = useState(true);
  const [fullMovie, setFullMovie] = useState({});
  const [cast, setCast] = useState<Cast[]>();

  useEffect(() => {
    loadMovie();
  }, [movieId]);

  const loadMovie = async () => {
    setIsLoading(true);

    const fullMoviePromise = UseCases.getMovieByIdUseCase(
      movieDBFetcher,
      movieId,
    );
    const castPromise = UseCases.getMovieCastUseCase(movieDBFetcher, movieId);

    const [fullMovie, cast] = await Promise.all([
      fullMoviePromise,
      castPromise,
    ]);

    setFullMovie(fullMovie);
    setCast(cast);

    setIsLoading(false);
  };

  return {
    isLoading,
    fullMovie,
    cast,
  };
};
