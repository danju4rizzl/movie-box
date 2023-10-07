import Link from 'next/link';
import { FaInstagram, FaYoutube, FaXTwitter } from 'react-icons/fa6';
import { GiAfrica } from 'react-icons/gi';
import { SiLinktree } from 'react-icons/si';

const footerIcons = [
  {
    title: 'Official Links',
    icon: <SiLinktree />,
    socialLink: 'https://linktr.ee/realdeejaydev'
  },
  {
    title: 'Join our IG',
    icon: <FaInstagram />,
    socialLink: 'https://instagram.com/real_deejay_dev'
  },
  {
    title: 'Follow us on Twitter',
    icon: <FaXTwitter />,
    socialLink: 'https://twitter.com/real_deejay_dev'
  },
  {
    title: 'Sub on Youtube',
    icon: <FaYoutube />,
    socialLink: 'https://www.youtube.com/@deejaydev'
  }
];

const footerTitles = [
  {
    title: 'Conditions of Use'
  },
  {
    title: 'Privacy & Policy'
  },
  {
    title: 'Press Room'
  }
];

interface Icons {
  icon: JSX.Element;
  socialLink: string;
  title: string;
}

interface Titles {
  title: string;
}

export default function Footer() {
  return (
    <footer className="grid gap-5 place-content-center pt-5 pb-10 ">
      <div className="flex gap-8 justify-center">
        {footerIcons.map(({ icon, socialLink, title }: Icons, idx) => (
          <Link
            href={socialLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-2xl text-gray-900 hover:text-rose-700"
            key={idx}
            title={title}
          >
            {icon}
          </Link>
        ))}
      </div>
      <div className="flex flex-col-reverse md:flex-row gap-1 md:gap-6 ">
        {footerTitles.map(({ title }: Titles, idx) => (
          <Link
            href="#"
            className="text-gray-900 text-sm md:text-xl text-center font-semibold"
            key={idx}
          >
            {title}
          </Link>
        ))}
      </div>
      <p className=" flex text-center capitalize justify-center place-items-center text-gray-500">
        Made in <span className="text-rose-700 mx-1">{<GiAfrica />} </span>
        by DeejayDev
      </p>
    </footer>
  );
}
