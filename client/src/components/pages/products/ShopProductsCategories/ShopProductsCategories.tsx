"use client";

import { TShopSideBar } from "@/types";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
// import { apiBaseUrl } from "@/config/config";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

interface ShopProductsCategoriesProps {
  shopSideBar: TShopSideBar[];
}

const ShopProductsCategories: React.FC<ShopProductsCategoriesProps> = ({ shopSideBar }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  // const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>([]);
  // const [selectedChildCategories, setSelectedChildCategories] = useState<string[]>([]);

  useEffect(() => {
    const cats = searchParams.get("category")?.split(",") || [];
    // const subCats = searchParams.get("subCategory")?.split(",") || [];
    // const childCats = searchParams.get("childCategory")?.split(",") || [];
    setSelectedCategories(cats);
    // setSelectedSubCategories(subCats);
    // setSelectedChildCategories(childCats);
  }, [searchParams]);

  const updateParams = (type: "category" | "subCategory" | "childCategory", value: string) => {

    const newParams = new URLSearchParams(searchParams.toString());
    const currentValue = searchParams.get(type);

    if (currentValue === value) {
      newParams.delete(type);
    } else {
      newParams.set(type, value);
    }

    router.push(`?${newParams.toString()}`);
  };

  return (
    <div className="max-w-4xl relative mx-auto px-12 lg:px-16">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        navigation={{
          prevEl: '.swiper-button-prev-shop',
          nextEl: '.swiper-button-next-shop',
        }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 32, },
          768: { slidesPerView: 3, spaceBetween: 32, },
          1024: { slidesPerView: 5, spaceBetween: 32, },
        }}
        className="shop-category-swiper"
      >
        {shopSideBar?.map((cat) => (
          <SwiperSlide key={cat.slug}>
            <div
              onClick={() => updateParams("category", cat.slug)}
              className={`group relative h-36 rounded-md overflow-hidden 
              transition-all duration-300 cursor-pointer flex flex-col shadow-sm
              ${selectedCategories.includes(cat.slug) ? "bg-[#1e6a39] scale-105" : "bg-[#f5f7f9]"} 
              ${!selectedCategories.includes(cat.slug) && "hover:bg-[#1e6a39] hover:scale-105"}
              `}
            >
              {cat.image && (
                <div className="relative w-full flex-1 flex items-center justify-center">
                  <div className="relative w-20 h-20">
                    <Image src={cat.image} alt={cat.name} fill className="object-fill" />
                  </div>
                </div>
              )}
              <div className="pb-2 px-2 text-center -mt-4">
                <p className={`text-sm font-semibold transition-colors duration-300 capitalize
              ${selectedCategories.includes(cat.slug) ? "text-white" : "text-gray-700 group-hover:text-white"}`}>
                  {cat.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Navigation Buttons */}
      <button className="swiper-button-prev-shop absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border-2 border-gray-200 hover:border-[#1e6a39] hover:bg-[#1e6a39] hover:text-white transition-all shadow-md cursor-pointer ">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button className="swiper-button-next-shop absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white border-2 border-gray-200 hover:border-[#1e6a39] hover:bg-[#1e6a39] hover:text-white transition-all shadow-md cursor-pointer">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default ShopProductsCategories;
