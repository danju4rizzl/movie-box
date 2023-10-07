'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import SearchBox from '../SearchBox';

export default function Header() {
  const [scrollState, setScrollState] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Setting the scroll event
      window.scrollY >= 120 ? setScrollState(true) : setScrollState(false);
    };

    // Registering the event listener
    window.addEventListener('scroll', handleScroll);

    return () => {
      // Cleanup the event listener on unmount
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <header
      className={`flex fixed w-screen z-50 h-20 px-20 md:px32 transition duration-300 ease-linear ${
        scrollState ? 'bg-gray-600/60 backdrop-blur-md' : ''
      }`}
    >
      <Link
        href="/"
        className={`flex items-center transition duration-500  ${
          scrollState ? 'scale-100' : 'scale-150'
        }`}
      >
        <Image src={'/assets/logo.svg'} alt="logo" width={150} height={50} />
      </Link>
      <SearchBox />
    </header>
  );
}
