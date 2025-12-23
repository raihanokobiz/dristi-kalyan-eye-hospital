"use client";

import { TCategory } from "@/types";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface CategoryProps {
  categoriesList: TCategory[];
}

const CategoryCardSlider: React.FC<CategoryProps> = ({ categoriesList }) => {
  const sortedCategories = [...(categoriesList || [])].sort(
    (a, b) => Number(b.status) - Number(a.status)
  );

  return (
    <div className="w-full relative px-12 lg:px-16 -mt-20 md:-mt-24 lg:-mt-24 z-50">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={32}
        slidesPerView={2}
        navigation={{
          nextEl: ".category-swiper-button-next",
          prevEl: ".category-swiper-button-prev",
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={sortedCategories?.length > 5}
        breakpoints={{
          768: {
            slidesPerView: 4,
            spaceBetween: 32,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 32,
          },
        }}
        className="category-swiper-slider"
      >
        {sortedCategories?.map((category) => {
          const isUpcoming = "isUpcoming" in category && category.isUpcoming;

          return (
            <SwiperSlide key={category?._id}>
              <Link
                href={
                  isUpcoming
                    ? "#"
                    : `/shop?category=${category.slug || category._id}`
                }
                onClick={(e) => isUpcoming && e.preventDefault()}
              >
                <div
                  className={`group relative h-40 w-full
                    bg-white rounded-md overflow-hidden transition-all duration-300
                    ${
                      isUpcoming
                        ? "cursor-default bg-gray-100"
                        : "cursor-pointer hover:bg-[#1e6a39] hover:scale-105"
                    } 
                    flex flex-col shadow-sm`}
                >
                  {!isUpcoming && (
                    <div className="relative w-full flex-1 flex items-center justify-center">
                      <div className="relative w-[100px] h-24">
                        <Image
                          src={category.image}
                          alt={category.name}
                          fill
                          className="object-contain"
                        />
                      </div>
                    </div>
                  )}
                  <div className="pb-2 px-2 text-center">
                    <p
                      className={`text-xs lg:text-sm font-semibold ${
                        isUpcoming
                          ? "text-gray-400"
                          : "text-gray-700 group-hover:text-white"
                      } transition-colors duration-300 capitalize line-clamp-2`}
                    >
                      {isUpcoming ? "Upcoming" : category.name}
                    </p>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button className="category-swiper-button-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-[#1e6a39] hover:text-white transition-colors duration-300 cursor-pointer text-[#1e6a39]">
        ◀
      </button>

      <button className="category-swiper-button-next absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:bg-[#1e6a39] hover:text-white transition-colors duration-300 cursor-pointer text-[#1e6a39]">
        ▶
      </button>
    </div>
  );
};

export default CategoryCardSlider;
