import { Movie } from '@/types';
import SliderSection from './SliderSection';
import { SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import { BiLike } from 'react-icons/bi';
import { TMDB_IMAGE_BASE } from '@/utils/constants';

interface MovieSliderProps {
  moviesData: Movie[];
}

export default function MovieSlider({ moviesData }: MovieSliderProps) {
  return (
    <div>
      <SliderSection
        duration={1850}
        title="Trending Movies"
        slide={moviesData?.map(
          (
            {
              id,
              title,
              release_date,
              vote_average,
              vote_count,
              poster_path
            }: Movie,
            idx: number
          ) => (
            <SwiperSlide key={idx} className="group">
              <>
                {/* Image */}
                <Link href={`/movie/${id}`} title={title}>
                  <Image
                    src={`${TMDB_IMAGE_BASE}/w342/${poster_path}`}
                    alt={title}
                    width={300}
                    height={450}
                    className={`rounded-lg mx-auto`}
                  />
                </Link>

                {/* Information */}
                <div className="grid gap-1 px-1 3xl:px-14 my-2 ">
                  <p className="text-gray-500 text-sm ">
                    Released:{' '}
                    <span className="text-gray-600">{release_date}</span>
                  </p>

                  <Link
                    href={`/movie/${id}`}
                    className="text-xl font-medium xl:font-bold text-gray-800 leading-tight capitalize 
                    truncate group-hover:text-rose-700 ease-out duration-500"
                    title={title}
                  >
                    {title}
                  </Link>
                </div>
                {/* Rating */}
                <div className="flex items-center justify-between px-1.5">
                  <div className="flex items-center">
                    <Image
                      src={'/assets/imdb.svg'}
                      width={40}
                      height={40}
                      alt="Logo of IMDB"
                    />
                    <p className="mx-2 text-sm text-gray-800 font-semibold">
                      {vote_average.toFixed(1)}
                    </p>
                  </div>
                  <div className="flex items-center">
                    <div className="bg-rose-700 p-1.5 rounded-full">
                      <BiLike className="text-white" />
                    </div>
                    <p className="mx-1 text-sm text-gray-800 font-semibold">
                      {vote_count}
                    </p>
                  </div>
                </div>
              </>
            </SwiperSlide>
          )
        )}
      />
    </div>
  );
}
