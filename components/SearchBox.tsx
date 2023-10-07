'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';

import Link from 'next/link';
import CustomImage from './CustomImage';

interface SearchResult {
  title: string;
  poster_path: string;
  id: number;
}

export default function SearchBox() {
  const [searchWord, setSearchWord] = useState('');
  const [canSearch, setCanSearch] = useState(false);

  const { data: searchData } = useQuery({
    queryKey: ['search'],
    queryFn: async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&language=en-US&query=${searchWord}&page=1&include_adult=false`
      );
      return response.data.results;
    },
    enabled: canSearch
  });

  // Changes the search state when the user types
  useEffect(() => {
    if (searchWord.length >= 2) {
      setCanSearch(true);
    } else {
      setCanSearch(false);
    }
    return;
  }, [searchWord]);

  return (
    <div className="block">
      <div className="border-2 mt-5 mb-2 px-2 rounded-lg ">
        <form className="text-white flex items-center  ">
          <input
            type="text"
            placeholder="Search for movies"
            className="bg-transparent placeholder:text-white w-96 pt-2 pb-1 outline-none"
            id="searchInput"
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
          />
          <label htmlFor="searchInput">
            {canSearch ? (
              <AiOutlineCloseCircle onClick={() => setSearchWord('')} />
            ) : (
              <BiSearchAlt />
            )}
          </label>
        </form>
      </div>
      <ul
        className={`bg-slate-100 divide-y rounded-lg 
        ${canSearch ? 'block' : 'hidden'}`}
      >
        {searchData
          ?.slice(0, 4)
          .map(({ id, title, poster_path }: SearchResult) => (
            <li
              key={id}
              className="hover:bg-slate-200 p-4 rounded-lg"
              title={title}
              onClick={() => setSearchWord('')}
            >
              <Link href={`/movie/${id}`} className="flex items-center gap-x-5">
                <CustomImage
                  imgPath={poster_path}
                  imgTitle={title}
                  imgWidth={60}
                  imgHeight={35}
                  imgSize={185}
                />
                <h6 className="text-lg font-semibold capitalize truncate max-w-xs">
                  {title}
                </h6>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
