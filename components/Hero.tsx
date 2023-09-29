'use client';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

// Custom imports
import { useFetchTmdbData } from '@/hooks/useTmdbApi';
import * as Constants from '@/utils/constants';
import LoadingScreen from './LoadingScreen';

// Other imports
import { FaCirclePlay } from 'react-icons/fa6';
import Youtube from 'react-youtube';
import { useState } from 'react';

export default function Hero() {
  const [playingTrailerState, setPlayingTrailerState] = useState(false);
  const [trailerIdState, setTrailerIdState] = useState(0);

  const {
    data: movieData,
    isLoading,
    isError
  } = useFetchTmdbData('trending/movie/week', 'trends');

  const { data: trailerData } = useFetchTmdbData(
    `movie/${trailerIdState}/videos`,
    'trailers',
    !!playingTrailerState
  );

  function handleTrailer(id: number) {
    setPlayingTrailerState(!playingTrailerState);
    setTrailerIdState(id);
  }

  // add loading & error screens
  if (isLoading) {
    return <LoadingScreen title="Loading..." />;
  }

  if (isError) {
    return <LoadingScreen title="Error..." />;
  }

  return (
    <div className="relative h-screen">
      {playingTrailerState ? (
        <div
          className="absolute text-white text-4xl w-screen h-screen bg-slate-900 flex place-content-center flex-col"
          onClick={() => setPlayingTrailerState(false)}
        >
          <Youtube
            videoId={trailerData?.results[1].key}
            iframeClassName={'rounded-2xl h-96 max-w-3xl mx-auto'}
            opts={{
              width: '100%',
              height: '100%',
              playerVars: {
                autoplay: 1,
                controls: 0,
                cc_load_policy: 0,
                fs: 0,
                iv_load_policy: 0,
                modestbranding: 0,
                rel: 0,
                showinfo: 0
              }
            }}
          />
        </div>
      ) : (
        <Swiper modules={[Autoplay]} autoplay={{ delay: 10000 }} loop={true}>
          {movieData.results.slice(0, 6).map((result: any, idx: number) => (
            <SwiperSlide
              key={result.id}
              className="h-screen sm:h-screen  bg-no-repeat bg-cover bg-center bg-pink-600"
              style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.95)), url(${Constants.TMDB_IMAGE_BASE}/w1280${result?.backdrop_path}), linear-gradient(#000, #000)`
              }}
            >
              <div className="grid gap-5 content-center h-screen text-gray-100 max-w-lg mx-10 md:mx-32">
                <h1 className="text-4xl md:text-6xl font-semibold">
                  {result.title}
                </h1>
                <p>{result.overview}</p>
                <button
                  className={`flex gap-3 justify-center items-center capitalize py-2 px-5 text-slate-100 rounded-md bg-rose-700 hover:bg-zinc-600 w-1/2`}
                  onClick={() => handleTrailer(result.id)}
                >
                  <span>{<FaCirclePlay />}</span>
                  Watch Trailer
                </button>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
