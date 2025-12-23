"use client";
import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { apiBaseUrl } from "@/config/config";

export default function Offer({ offrs }) {
  const offers = offrs?.data || [];

  return (
    <div className="px-4 md:px-6 py-6 md:py-10  lg:py-12 max-w-6xl mx-auto  ">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        speed={2000}
        loop={true}
        slidesPerView={1}
        breakpoints={{
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        }}
        className="rounded-md overflow-hidden"
      >
        {offers?.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="relative aspect-[16/9]">
              <Image
                src={item?.image}
                alt={`Offer ${index + 1}`}
                fill
                className="rounded-md shadow-md bject-fill"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
