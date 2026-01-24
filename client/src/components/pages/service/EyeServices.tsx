"use client";

import Image from "next/image"
import { Eye } from "lucide-react"
import ServiceCard from "./ServiceCard"
import { Service } from "@/types/service"
import Texture from "@/assets/texture/texture.webp"
import Link from "next/link"


// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";


interface EyeServicesProps {
    services: Service[];
}

export function EyeServices({ services }: EyeServicesProps) {
    return (
        <section className="relative w-full">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={Texture}
                    alt="Background"
                    fill
                    className="object-cover grayscale brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative  py-12 px-4 sm:px-6 lg:px-8">
                <div className=" max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">OUR EYE SERVICES</h2>
                        <p className="text-sm font-medium text-white/90 md:text-base">Our Services To Give Best Care For Your Eyes</p>

                        {/* Decorative Divider */}
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <div className="h-px w-16 bg-white/40" />
                            <div className="relative">
                                <Eye className="h-4 w-4 text-white" />
                                <div className="absolute -inset-1 rounded-full border border-white/40" />
                            </div>
                            <div className="h-px w-16 bg-white/40" />
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="">

                        {/* Swiper */}
                        {services.length > 0 ? (
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                spaceBetween={24}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false,
                                }}
                                pagination={{
                                    clickable: true,
                                }}
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
                                {services.map((service) => (
                                    <SwiperSlide key={service._id}>
                                        <ServiceCard service={service} />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        ) : (
                            <div className="text-center text-white">
                                <p>No services available at the moment.</p>
                            </div>
                        )}
                    </div>

                    {/* View All Button */}
                    <div className="text-center cursor-pointer mt-5 lg:mt-8">
                        <Link href="/services">
                            <button className="bg-white text-gray-700 font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 cursor-pointer">
                                View All Services
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 inline-block ml-2"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >

                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
