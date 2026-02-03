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
    <div className="max-w-4xl relative mx-auto md:px-12 lg:px-16">
      <Swiper
        modules={[Navigation, Autoplay]}
        spaceBetween={10}
        slidesPerView={2}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={800}
        loop={true}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 5 },
        }}
        className="shop-category-swiper"
      >
        {shopSideBar?.map((cat) => (
          <SwiperSlide key={cat.slug}>
            <div
              onClick={() => updateParams("category", cat.slug)}
              className={`group relative w-36 h-36 mx-auto rounded-md overflow-hidden 
                transition-all duration-300 cursor-pointer flex flex-col shadow-sm
                ${selectedCategories.includes(cat.slug) ? "bg-primary scale-105" : "bg-[#f5f7f9]"} 
                ${!selectedCategories.includes(cat.slug) && "hover:bg-primary hover:scale-105"}
                `}
            >
              {cat.image && (
                <div className="relative w-full flex-1 flex items-center justify-center">
                  <div className="relative w-24 h-24">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-fill rounded-md"
                    />
                  </div>
                </div>
              )}
              <div className="pb-2 px-2 text-center -mt-2">
                <p
                  className={`text-sm font-semibold transition-colors duration-300 capitalize
                  ${selectedCategories.includes(cat.slug)
                      ? "text-white"
                      : "text-gray-700 group-hover:text-white"
                    }`}
                >
                  {cat.name}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ShopProductsCategories;
