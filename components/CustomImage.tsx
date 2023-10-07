import { TMDB_IMAGE_BASE } from '@/utils/constants';
import Image from 'next/image';
import { MdOutlineBrokenImage } from 'react-icons/md';

type CustomImageProps = {
  imgPath: string;
  imgTitle: string;
  imgSize: number;
  imgWidth: number;
  imgHeight: number;
};

const CustomImage = ({
  imgPath,
  imgTitle,
  imgWidth,
  imgHeight,
  imgSize
}: CustomImageProps) => {
  return (
    <>
      {imgPath ? (
        <Image
          src={`${TMDB_IMAGE_BASE}/w${imgSize}/${imgPath}`}
          alt={imgTitle}
          width={imgWidth}
          height={imgHeight}
          className={`rounded-lg`}
        />
      ) : (
        <MdOutlineBrokenImage
          style={{ width: imgWidth, height: imgHeight }}
          className="my-6"
        />
      )}
    </>
  );
};

export default CustomImage;
