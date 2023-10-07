import { TvShow } from '@/types';
import SliderSection from './SliderSection';
import { SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import Image from 'next/image';
import { BiLike } from 'react-icons/bi';

import CustomImage from './CustomImage';

interface TvShowSliderProps {
  tvShowData: TvShow[];
}

export default function TvShowSlider({ tvShowData }: TvShowSliderProps) {
  return (
    <div>
      <SliderSection
        duration={2000}
        title="Latest Shows"
        slide={tvShowData?.map(
          (
            {
              id,
              name,
              vote_average,
              vote_count,
              poster_path,
              first_air_date
            }: TvShow,
            idx: number
          ) => (
            <SwiperSlide key={idx} className="group">
              <>
                {/* Image */}
                <Link href={`/tv/${id}`} title={name}>
                  <CustomImage
                    imgPath={poster_path}
                    imgTitle={name}
                    imgHeight={450}
                    imgWidth={300}
                    imgSize={342}
                  />
                </Link>

                {/* Information */}
                <div className="grid gap-1 px-1 3xl:px-14 my-2 ">
                  <p className="text-gray-500 text-sm ">
                    Started:{' '}
                    <span className="text-gray-600">{first_air_date}</span>
                  </p>

                  <Link
                    href={`/tv/${id}`}
                    className="text-xl font-medium xl:font-bold text-gray-800 leading-tight capitalize 
                    truncate group-hover:text-rose-700 ease-out duration-500"
                    title={name}
                  >
                    {name}
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
