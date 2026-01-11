"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import Image from "next/image";


import B1 from "../../assets/benefits/b1.jpeg"
import B2 from "../../assets/benefits/b2.jpeg"
import B3 from "../../assets/benefits/b3.jpeg"
import B4 from "../../assets/benefits/b4.jpeg"
import B5 from "../../assets/benefits/b5.jpeg"
import B6 from "../../assets/benefits/b6.jpeg"
import B7 from "../../assets/benefits/b7.jpeg"
import B8 from "../../assets/benefits/b8.jpeg"
import B9 from "../../assets/benefits/b9.jpeg"

const benefitsData = [
    { id: 1, image: B1 },
    { id: 2, image: B2 },
    { id: 3, image: B3 },
    { id: 4, image: B4 },
    { id: 5, image: B5 },
    { id: 6, image: B6 },
    { id: 7, image: B7 },
    { id: 8, image: B8 },
    { id: 9, image: B9 },
];



const BenefitsSection = () => {
    return (
        <section className="bg-white pt-8 md:pt-12 xl:pt-16 2xl:pt-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-0">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                        Benefits with Dhamrai Dristi Kalyan Eye Hospital
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                        We are committed to providing advanced eye care services with
                        experienced doctors, modern technology, and a patient-first
                        approach.
                    </p>
                </div>

                {/* Cards */}
                <Swiper
                    modules={[Autoplay, Pagination]}
                    spaceBetween={24}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        1024: {
                            slidesPerView: 3,
                        },
                    }}
                >
                    {benefitsData.map((item) => (
                        <SwiperSlide key={item.id}>
                            <div className="bg-white border-gray-500 rounded-md p-4 shadow-sm hover:shadow-md transition">
                                <div className="relative w-full h-60 lg:h-72">
                                    <Image
                                        src={item.image}
                                        alt={`Benefit ${item.id}`}
                                        fill
                                        className="object-fill rounded-lg"
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </section>
    );
};

export default BenefitsSection;
