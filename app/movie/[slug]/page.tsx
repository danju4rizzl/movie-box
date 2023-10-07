'use client';

import LoadingScreen from '@/components/LoadingScreen';
import SliderSection from '@/components/SliderSection';

import { useFetchTmdbData } from '@/hooks/useTmdbApi';
import { Movie } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { SwiperSlide } from 'swiper/react';

import { TMDB_IMAGE_BASE } from '@/utils/constants';
import CustomImage from '@/components/CustomImage';

export default function Page({ params }: { params: { slug: string } }) {
  const { data: movieData, isLoading } = useFetchTmdbData(
    `movie/${params.slug}`,
    'currentMovie'
  );

  const { data: recommendedMovies } = useFetchTmdbData(
    'trending/movie/week',
    'recommended-movie',
    !!movieData
  );

  if (isLoading || !recommendedMovies) {
    return <LoadingScreen title="Loading" />;
  }

  return (
    <>
      <div
        className="py-32 md:py-44 px-5 sm:px-10 md:px-24 mb-10 md:mb-20 bg-cover rounded-b-2xl"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.98)), url(${TMDB_IMAGE_BASE}/w780/${movieData.backdrop_path})`
        }}
      >
        <div className="flex flex-col md:flex-row px-5 md:space-x-10 max-w-6xl">
          <CustomImage
            imgPath={movieData.poster_path}
            imgTitle={movieData.title}
            imgHeight={400}
            imgWidth={450}
            imgSize={342}
          />
          <div className="grid items-center text-white text-sm">
            <div className="grid gap-y-1">
              <h3 className="text-2xl md:text-5xl font-bold">
                {movieData.title}
              </h3>
              <p className="font-semibold">{movieData.tagline}</p>
            </div>
            {/*Genre tags */}
            <div className="flex flex-wrap gap-y-3 gap-x-3 my-5">
              {movieData.genres.map(
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
            <div className="grid gap-y-3 ">
              <h6 className="font-bold">Information:</h6>
              <p className="font-light">{movieData.overview}</p>
            </div>
            {/*Information overview 1 end*/}

            {/*Information overview 2*/}
            <div className="flex flex-col md:flex-row gap-4 my-5">
              <div className="pr-10">
                <h6 className="font-bold">
                  Watch Time:{' '}
                  <span className="font-light">{movieData.runtime} mins</span>
                </h6>
                <h6 className="font-bold">
                  Premiered:{' '}
                  <span className="font-light">{movieData.release_date}</span>
                </h6>
                <div className="flex items-end gap-y-5 gap-x-3 my-3">
                  <h6 className="font-bold grid gap-y-1">
                    Language:{' '}
                    <span className="border rounded text-center py-1 px-2">
                      {movieData.original_language}
                    </span>
                  </h6>

                  <Link
                    href={`https://www.imdb.com/title/${movieData.imdb_id}`}
                    target="_blank"
                  >
                    <Image
                      src={'/assets/imdb.svg'}
                      width={40}
                      height={40}
                      alt="Logo of IMDB"
                    />
                  </Link>
                </div>
              </div>

              <div>
                {movieData.homepage && (
                  <h6 className="font-bold">
                    Official Site:{' '}
                    <Link
                      href={movieData.homepage}
                      target="_blank"
                      className="font-light text-rose-400 hover:text-rose-500 capitalize"
                    >
                      {`Visit ${movieData.title} website`}
                    </Link>
                  </h6>
                )}

                {movieData.production_companies.length > 0 && (
                  <div className="flex flex-col md:flex-row gap-2">
                    <h6 className="font-bold">Production:</h6>
                    {movieData.production_companies
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
          slide={recommendedMovies.results.map(
            ({ id, title, backdrop_path }: Movie) => (
              <SwiperSlide className="px-5" key={id}>
                <Link
                  href={`/movie/${id}`}
                  title={title}
                  className="grid justify-center group"
                >
                  <CustomImage
                    imgPath={backdrop_path}
                    imgTitle={title}
                    imgHeight={150}
                    imgWidth={350}
                    imgSize={342}
                  />
                  <h5 className="font-bold group-hover:text-rose-700">
                    {title}
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
