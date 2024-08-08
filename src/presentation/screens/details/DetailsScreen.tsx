import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Text} from 'react-native';
import {RootStackParams} from '../../navigation/Navigation';
import {useMovie} from '../../hooks/useMovie';
import {MovieHeader} from '../../components/movie/MovierHeader';
import {FullMovie} from '../../../core/entities/movie.entity';
import {MovieDetails} from '../../components/movie/MovieDetails';
import {ScrollView} from 'react-native-gesture-handler';
import {Cast} from '../../../core/entities/cast.entity';

interface DetailsScreenProps
  extends StackScreenProps<RootStackParams, 'Details'> {
  movieId: number;
}

export const DetailsScreen = ({route}: DetailsScreenProps) => {
  const {movieId} = route.params;

  const {isLoading, fullMovie, cast} = useMovie(movieId);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView>
      {/* Header */}
      <MovieHeader
        poster={(fullMovie as FullMovie).poster}
        originalTitle={(fullMovie as FullMovie).originalTitle}
        title={(fullMovie as FullMovie).title}
      />

      {/* Details */}
      <MovieDetails movie={fullMovie as FullMovie} cast={cast as Cast} />
    </ScrollView>
  );
};
