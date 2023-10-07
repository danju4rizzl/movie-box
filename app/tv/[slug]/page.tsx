'use client';

import LoadingScreen from '@/components/LoadingScreen';
import SliderSection from '@/components/SliderSection';

import { useFetchTmdbData } from '@/hooks/useTmdbApi';
import { Movie, TvShow } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

import { TMDB_IMAGE_BASE } from '@/utils/constants';
import CustomImage from '@/components/CustomImage';

export default function Page({ params }: { params: { slug: string } }) {
  const { data: tvShowData, isLoading } = useFetchTmdbData(
    `tv/${params.slug}`,
    'currentTvShow'
  );

  const { data: recommendedTvShows } = useFetchTmdbData(
    'trending/tv/week',
    'recommendedTvShows',
    !!tvShowData
  );

  if (isLoading || !recommendedTvShows) {
    return <LoadingScreen title="Loading" />;
  }

  return (
    <>
      <div
        className="py-32 md:py-44 px-5 sm:px-10 md:px-24 mb-10 md:mb-20 bg-cover rounded-b-2xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.98)), url(${TMDB_IMAGE_BASE}/w780/${tvShowData.backdrop_path})`
        }}
      >
        <div className="flex flex-col md:flex-row px-5 md:space-x-10 max-w-6xl">
          <CustomImage
            imgPath={tvShowData.poster_path}
            imgTitle={tvShowData.title}
            imgHeight={400}
            imgWidth={450}
            imgSize={342}
          />
          <div className="grid items-center text-white text-sm">
            <div className="grid gap-y-1">
              <h3 className="text-2xl md:text-5xl font-bold">
                {tvShowData.name}
              </h3>
              <p className="font-semibold">{tvShowData.tagline}</p>
            </div>
            {/*Genre tags */}
            <div className="flex flex-wrap gap-y-3 gap-x-3 my-5">
              {tvShowData.genres.map(
                (genre: { id: number; name: string }, idx: number) => (
                  <p
                    key={idx}
                    className={'border rounded text-center py-2 px-3'}
                  >
                    {genre.name}
                  </p>
                )
              )}
            </div>
            {/*Genre tags end*/}

            {/*Information overview 1*/}
            <div className="grid gap-y-3">
              <h6 className="font-bold">Information:</h6>
              <p className="font-light">{tvShowData.overview}</p>
            </div>
            {/*Information overview 1 end*/}

            {/*Information overview 2*/}
            <div className="flex flex-col md:flex-row gap-4 my-5">
              <div className="pr-10 space-y-2">
                <h6 className="font-bold">
                  Created by:{' '}
                  {tvShowData.created_by.map(
                    ({ name, id }: { name: string; id: number }) => (
                      <span key={id} className="font-light">
                        {name}{' '}
                      </span>
                    )
                  )}
                </h6>
                <h6 className="font-bold">
                  Last Episode:{' '}
                  <span className="font-light">{tvShowData.last_air_date}</span>
                </h6>
                <h6 className="font-bold">
                  Started:{' '}
                  <span className="font-light">
                    {tvShowData.first_air_date}
                  </span>
                </h6>

                <div className="flex items-start md:items-center gap-y-5 gap-x-3 my-3">
                  <h6 className="font-bold grid gap-y-1">
                    Season:{' '}
                    <span className="border rounded text-center py-1 px-2 ">
                      S{tvShowData.number_of_seasons}
                    </span>
                  </h6>

                  <h6 className="font-bold grid gap-y-1">
                    Episode:{' '}
                    <span className="border rounded text-center py-1 px-2">
                      E{tvShowData.last_episode_to_air.episode_number}
                    </span>
                  </h6>

                  <h6 className="font-bold grid gap-y-1">
                    Language:{' '}
                    <span className="border rounded text-center py-1 px-2">
                      {tvShowData.original_language}
                    </span>
                  </h6>
                </div>
              </div>

              <div>
                {tvShowData.production_companies.length > 0 && (
                  <div className="flex flex-col md:flex-row gap-2">
                    <h6 className="font-bold">Production:</h6>
                    {tvShowData.production_companies
                      .slice(0, 3)
                      .map((company: { id: number; name: string }) => (
                        <p key={company.id}>{company.name}</p>
                      ))}
                  </div>
                )}
              </div>
            </div>
            {/*Information overview 2 end*/}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="px-5 md:px-24">
        <SliderSection
          title="You might like"
          slide={recommendedTvShows.results.map(
            ({ id, name, backdrop_path }: TvShow) => (
              <SwiperSlide className="px-5" key={id}>
                <Link
                  href={`/tv/${id}`}
                  title={name}
                  className="grid justify-center group"
                >
                  <CustomImage
                    imgPath={backdrop_path}
                    imgTitle={name}
                    imgHeight={150}
                    imgWidth={350}
                    imgSize={342}
                  />
                  <h5 className="font-bold group-hover:text-rose-700">
                    {name}
                  </h5>
                </Link>
              </SwiperSlide>
            )
          )}
        />
      </div>
    </>
  );
}
