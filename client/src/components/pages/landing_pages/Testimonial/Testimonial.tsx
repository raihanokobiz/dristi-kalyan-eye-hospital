"use client"

import Link from "next/link";
import { ChevronRight, Quote } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { TestimonialCard } from "./TestimonialCard";

const testimonialData = [
    {
        name: "Kate Rogers",
        role: "Graphic Designer",
        rating: 5,
        title: "AMAZING CUSTOMER SERVICE",
        testimonialText:
            "I needed a refund for tickets to an event that was changed last minute. I experienced great customer service and the issue was resolved in a timely manner.",
        imageUrl:
            "https://plus.unsplash.com/premium_photo-1664476788423-7899ac87bd7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bWFsZXxlbnwwfHwwfHx8MA%3D%3D",
    },
    {
        name: "John Smith",
        role: "Software Engineer",
        rating: 4,
        title: "HIGHLY RECOMMENDED",
        testimonialText:
            "The team was very professional and responsive. My order arrived on time and in perfect condition. I will definitely use their services again!",
        imageUrl:
            "https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=500&auto=format&fit=crop&q=60",
    },
    {
        name: "Maria Lopez",
        role: "Content Creator",
        rating: 5,
        title: "EXCELLENT EXPERIENCE",
        testimonialText:
            "Absolutely loved the service! The staff was friendly and helpful, and they made the entire process seamless. Highly satisfied with my purchase.",
        imageUrl:
            "https://media.istockphoto.com/id/1250504146/photo/indian-businessman-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=2n26sPvWJUr-1ywXpdRdM_-4AuTJJ2Iz4ECYMP6ipZ0=",
    },
    {
        name: "David Brown",
        role: "Marketing Manager",
        rating: 4,
        title: "WONDERFUL SUPPORT",
        testimonialText:
            "Great customer support from start to finish. My questions were answered promptly and professionally. Definitely a trustworthy service.",
        imageUrl:
            "https://media.istockphoto.com/id/953587362/photo/businessman-standing-with-his-arms-folded-stock-image.webp?a=1&b=1&s=612x612&w=0&k=20&c=mPW5qvGvDq-8SAiavlGhqT5p3eiur2DqdhSmYCUfPgY=",
    },
];


export function Testimonial() {
    return (
        <div className="max-w-6xl mx-auto px-4 md:px-0 py-6 md:py-10  lg:py-12">
            <div className="flex items-center justify-between mb-6 px-4 pb-4 border-b-2 border-gray-200">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                         <Quote className="w-7 h-7 text-[#1e6a39]" />  Customer Testimonial
                </h2>
                <Link
                    href="/shop"
                    className="flex items-center gap-2 px-4 py-2 bg-[#1e6a39] text-white rounded-md hover:bg-[#155028] transition-all duration-300 shadow-md hover:shadow-lg"
                >
                    <span className="text-sm md:text-base font-semibold">View All</span>
                    <ChevronRight className="w-5 h-5" />
                </Link>
            </div>

            <div className="px-4 md:px-0">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 3000, disableOnInteraction: false }}
                    loop={true}
                    spaceBetween={24}
                    slidesPerView={1} 
                    breakpoints={{
                        768: {
                            slidesPerView: 2, 
                            spaceBetween: 20,
                        },
                        1024: {
                            slidesPerView: 3, 
                            spaceBetween: 30,
                        },
                    }}
                    className="rounded-lg overflow-hidden pb-12"
                >
                    {testimonialData.map((testimonial, index) => (
                        <SwiperSlide key={index}>
                            <TestimonialCard testimonial={testimonial} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    )
}