'use client';

import { useFetchTmdbData } from '@/hooks/useTmdbApi';

import MovieSlider from './MovieSlider';
import TvShowSlider from './TvShowSlider';

export default function SliderContainer() {
  const { data: allMoviesData } = useFetchTmdbData(
    'trending/movie/day',
    'movie'
  );

  const { data: allTvShowsData } = useFetchTmdbData('trending/tv/day', 'tv');

  return (
    <div className="p-4 sm:p-14 md:py-20 md:px-32">
      <MovieSlider moviesData={allMoviesData?.results} />
      <TvShowSlider tvShowData={allTvShowsData?.results} />
    </div>
  );
}
