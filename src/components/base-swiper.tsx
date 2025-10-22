'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { CardSkeleton } from './loading-state';

type CardsSwiperProps<T> = {
  cards: T[];
  loading: boolean;
  children: (card: T) => React.ReactNode;
};

function BaseSwiper<T>({ cards, loading, children }: CardsSwiperProps<T>) {
  return (
    <div className="w-[100vw] sm:w-[95vw] pb-4 sm:px-6 md:w-full relative mt-4">
      {/* Custom navigation buttons */}
      <div className="swiper-button-prev absolute -ml-4 translate-y-[200%] sm:-translate-y-1/2 z-10 scale-0 md:scale-75 text-gray-400" />
      <div className="swiper-button-next absolute -mr-4 translate-y-[200%] sm:-translate-y-1/2 z-10 scale-0 md:scale-75 text-gray-400" />
      <div>
        <Swiper
          style={{ paddingBottom: 10 }}
          modules={[Navigation, Pagination]}
          slidesPerView={3.5}
          slidesPerGroup={3}
          breakpointsBase={'window'}
          breakpoints={{
            0: {
              slidesPerView: 2.5,
              slidesPerGroup: 2,
              spaceBetween: 8, // menor em telas pequenas
            },
            640: {
              slidesPerView: 3.5,
              slidesPerGroup: 3,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 4,
              slidesPerGroup: 4,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 5,
              slidesPerGroup: 5,
              spaceBetween: 16,
            },
            1280: {
              slidesPerView: 6,
              slidesPerGroup: 6,
              spaceBetween: 20,
            },
          }}
          onSwiper={(swiper) => console.log(swiper)}
          navigation={{
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }}
          onPaginationShow={(swiper) => console.log(swiper)}
          pagination={{
            clickable: true,
            type: 'custom',
            renderCustom: function (swiper, current, total) {
              // Custom pagination indicator
              let html =
                "<div class='flex w-full z-99'><div class='mx-auto left-1/2 -translate-x-1/2 absolute -bottom-2 flex bg-gray-200'>";
              for (let i = 0; i < total; i++) {
                if (i === current - 1) {
                  html += `<div class="w-8 h-1 bg-gray-400 rounded-full"></div>`;
                } else {
                  html += `<div class="w-8 h-1"></div>`;
                }
              }
              html += '</div></div>';
              return html;
            },
          }}
        >
          {cards.map((card, index) => (
            <SwiperSlide key={index}>{children(card)}</SwiperSlide>
          ))}
          {loading &&
            Array.from({ length: 4 }).map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <CardSkeleton />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default BaseSwiper;
