"use client";

import Image from "next/image";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import W1 from "../../../../assets/why-chose-us/w1.webp";
import W2 from "../../../../assets/why-chose-us/w2.webp";
import W3 from "../../../../assets/why-chose-us/w3.webp";
import W4 from "../../../../assets/why-chose-us/w4.webp";

const data = [W1, W2, W3, W4];

export function WhyChooseUs() {
  return (
    <section className="bg-white px-4 md:px-6 py-6 md:py-10  lg:py-12 max-w-6xl mx-auto">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a1a1a] mb-6">
          Why ANF Meat?
        </h2>

        {/* Description */}
        <p className="text-center text-[#1a1a1a] leading-relaxed mb-10">
          At ANF Meat, quality and safety are our top priorities. From
          responsibly sourced livestock to hygienic processing, every step is
          carefully monitored by our skilled team. Our state-of-the-art
          facilities ensure that each cut of meat is fresh, premium, and
          delivered with utmost care, bringing farm-to-table excellence to your
          plate.
        </p>

        {/* Carousel */}
        <div className=" px-4 md:px-0">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            pagination={{ clickable: true }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            loop={true}
            speed={2000}
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            className="rounded-md overflow-hidden"
          >
            {data.map((img, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-48 md:h-64 lg:h-52">
                  <Image
                    src={img}
                    alt={`Offer ${index + 1}`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="rounded-md shadow-md"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
