"use client";
import Image from "next/image";
import React, { useState } from "react";
import ProductDialog from "../ProductDialog/ProductDialog";
import { apiBaseUrl } from "@/config/config";
import Link from "next/link";
import { TProduct } from "@/types";
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import cardImageLoading from "@/assets/animation/card-loading.json";
import { TbWeight } from "react-icons/tb";

interface Product {
  product: TProduct;
}

const ShopProductCard: React.FC<Product> = ({ product }) => {
  const {
    name,
    price,
    // mrpPrice,
    thumbnailImage,
    backViewImage,
    inventoryRef,
    inventoryType,
    slug,
    _id,
  } = product;

  const controls = useAnimation();
  const [imageLoaded, setImageLoaded] = useState({
    back: false,
    front: false,
  });
  const hasDiscount = product.discount > 0;

  const handleHoverStart = () => {
    controls.start({ x: "100%", opacity: 0.5 });
  };

  const handleHoverEnd = () => {
    controls.start({ x: 0, opacity: 1 });
  };

  return (
    <div
      className="rounded overflow-hidden shadow transition group p-2 md:p-4"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      <div className="relative w-full h-32 sm:h-52 md:h-48  lg:h-52 overflow-hidden">
        <Link href={`product/${slug}`}>
          <div className="relative w-full h-full">
            {/* Lottie loader until both images loaded */}
            {thumbnailImage && backViewImage
              ? (!imageLoaded.back || !imageLoaded.front) && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-10">
                  <div className="w-24 h-24">
                    <Lottie animationData={cardImageLoading} loop autoplay />
                  </div>
                </div>
              )
              : !imageLoaded.front && (
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-white z-10">
                  <div className="w-24 h-24">
                    <Lottie animationData={cardImageLoading} loop autoplay />
                  </div>
                </div>
              )}

            {thumbnailImage && backViewImage ? (
              <motion.div
                className="absolute top-0 left-0 w-full h-full"
                initial={{ x: 0, opacity: 1 }}
                animate={controls}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={apiBaseUrl + thumbnailImage}
                    alt={`${name} thumbnailImage`}
                    fill
                    onLoad={() =>
                      setImageLoaded((prev) => ({ ...prev, front: true }))
                    }
                    className="object-fill "
                  />
                </div>
              </motion.div>
            ) : (
              <div className="relative w-full h-full">
                {" "}
                <Image
                  src={apiBaseUrl + thumbnailImage}
                  alt={`${name} thumbnailImage`}
                  fill
                  onLoad={() =>
                    setImageLoaded((prev) => ({ ...prev, front: true }))
                  }
                  className=" object-fill"
                />
              </div>
            )}
          </div>
        </Link>

      </div>

      <div className="flex flex-col justify-between">
        <Link href={`product/${slug}`}>
          <div className="pb-4 flex flex-col grow">
            <h3 className="font-semibold text-gray-800 mb-3 line-clamp-1 md:line-clamp-2 text-sm md:text-lg leading-tight">
              {product.name}
            </h3>
            <div className="flex justify-between gap-4">
              <p className="text-sm font-medium md:font-semibold lg:font-bold text-gray-900  flex items-center">
                <TbWeight className="text-sm md:text-xl" />
                {product?.inventoryRef?.[0]?.level}
              </p>
              <div className="flex items-center gap-1 md:gap-2 flex-wrap">
                <span className=" text-xs md:text-base font-medium md:font-semibold lg:font-bold text-gray-900 ">
                  ৳{product.price}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-[12px] text-gray-600 line-through ">
                      ৳{product.mrpPrice}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
          <div>
            <ProductDialog
              name={name}
              price={price}
              productRef={_id}
              thumbnailImage={thumbnailImage}
              inventoryRef={inventoryRef}
              inventoryType={inventoryType}
            />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ShopProductCard;
