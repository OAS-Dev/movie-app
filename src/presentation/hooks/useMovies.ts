import {useEffect, useState} from 'react';
import type {Movie} from '../../core/entities/movie.entity';

import * as UseCases from '../../core/use-cases';
import {movieDBFetcher} from '../../config/adapters/movieDB.adapter';

let popularPageNumber = 1;

export const useMovies = () => {
  const [isLoading, setIsLoading] = useState(true);

  const [nowPlaying, setNowPlaying] = useState<Movie[]>([]);
  const [upcoming, setUpcoming] = useState<Movie[]>([]);
  const [topRated, setTopRated] = useState<Movie[]>([]);
  const [popular, setPopular] = useState<Movie[]>([]);

  useEffect(() => {
    initialLoad();
  }, []);

  const initialLoad = async () => {
    const nowPlayingPromise = UseCases.moviesNowPlayingUseCases(movieDBFetcher);
    const upcomingPromise = UseCases.moviesUpcomingUseCases(movieDBFetcher);
    const topRatedPromise = UseCases.moviesTopRatedUseCases(movieDBFetcher);
    const popularPromise = UseCases.moviesPopularUseCases(movieDBFetcher);

    const [nowPlayingMovies, upcomingMovies, topRatedMovies, popularMovies] =
      await Promise.all([
        nowPlayingPromise,
        upcomingPromise,
        topRatedPromise,
        popularPromise,
      ]);

    setNowPlaying(nowPlayingMovies);
    setUpcoming(upcomingMovies);
    setTopRated(topRatedMovies);
    setPopular(popularMovies);

    setIsLoading(false);
  };

  return {
    isLoading,
    nowPlaying,
    upcoming,
    topRated,
    popular,

    //Methods
    popularNextPage: async () => {
      popularPageNumber++;
      const newPopularMovies = await UseCases.moviesPopularUseCases(
        movieDBFetcher,
        {page: popularPageNumber},
      );

      setPopular([...popular, ...newPopularMovies]);
    },
  };
};
