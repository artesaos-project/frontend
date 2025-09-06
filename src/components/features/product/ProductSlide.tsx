import React, { ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductSlideProps {
    title: string;
    icon?: ReactNode;
    children: ReactNode[];
    onViewMore?: () => void;
    showViewMoreButton?: boolean;
}

const ProductSlide: React.FC<ProductSlideProps> = ({ 
    title, 
    icon,
    children, 
    onViewMore, 
    showViewMoreButton = true 
}) => {
    return (
        <div>
            <div className='flex flex-row'>
                <div className='flex flex-row font-bold text-2xl items-center px-8 py-4'>
                    {icon}
                    <h1>{title}</h1>
                </div>

                {showViewMoreButton && (
                    <div className='hidden md:flex justify-end flex-1 text-xs items-center px-4'>
                        <button 
                            onClick={onViewMore || (() => alert('Ver mais produtos!'))}
                            className="p-1.5 bg-white text-[#1B7132] border-1 border-[#ABCFB5] rounded-md hover:bg-[#ABCFB5] hover:text-white transition-colors"
                        >
                            Ver mais
                        </button>
                    </div>
                )}
            </div>

            <div className="mb-10 p-2">
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={16}
                    slidesPerView={2}
                    slidesPerGroup={2}
                    breakpointsBase={"window"}
                    navigation={{
                        nextEl: ".swiper-button-next",
                        prevEl: ".swiper-button-prev",
                    }}
                    pagination={{
                        clickable: true,
                        type: "custom",
                        renderCustom: function (swiper, current, total) {
                        let html =
                            "<div class='flex w-full absolute top-0'><div class='mx-auto flex bg-gray-200'>";
                        for (let i = 0; i < total; i++) {
                            if (i === current - 1) {
                            html += `<div class="w-8 h-1 bg-gray-400 rounded-full"></div>`;
                            } else {
                            html += `<div class="w-8 h-1"></div>`;
                            }
                        }
                        html += "</div></div>";
                        return html;
                        },
                    }}
                    breakpoints={{
                        400: {
                            slidesPerView: 2,
                            slidesPerGroup: 2,
                            spaceBetween: 10,
                        },
                        640: {
                            slidesPerView: 4,
                            slidesPerGroup:4,
                            spaceBetween: 10,
                        },
                        768: {
                            slidesPerView: 5,
                            slidesPerGroup:5,
                            spaceBetween: 10,
                        },
                        1024: {
                            slidesPerView: 6,
                            slidesPerGroup:6,
                            spaceBetween: 10,
                        },
                    }}
                    className="products-swiper"
                >
                    {React.Children.map(children, (child, index) => (
                        <SwiperSlide key={index} className="mb-10">
                            {child}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default ProductSlide;