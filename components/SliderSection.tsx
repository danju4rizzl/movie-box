import { Swiper } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import sliderBreakpoints from '@/utils/sliderBreakpoints';

interface SliderProps {
  title: string;
  slide: JSX.Element[] | JSX.Element;
  duration?: number;
}

export default function SliderSection({ title, slide, duration }: SliderProps) {
  return (
    <div>
      <h2 className="text-gray-900 text-xl sm:text-3xl md:text-4xl text-left font-bold capitalize">
        <span className="border-l-8 border-rose-700 mx-5"></span>
        {title}
      </h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        navigation={false}
        autoplay={{
          delay: duration || 10000,
          pauseOnMouseEnter: true
        }}
        loop={true}
        slidesPerView={4}
        spaceBetween={10}
        className="my-10"
        breakpoints={sliderBreakpoints}
      >
        {slide}
      </Swiper>
    </div>
  );
}
