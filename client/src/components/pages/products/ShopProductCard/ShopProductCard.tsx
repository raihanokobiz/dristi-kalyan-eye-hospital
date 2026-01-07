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

interface Product {
  product: TProduct;
}

const ShopProductCard: React.FC<Product> = ({ product }) => {
  const {
    name,
    price,
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
      className="rounded overflow-hidden shadow transition group p-2 md:p-4 flex flex-col h-full"
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
    >
      {/* Image Section */}
      <div className="relative w-full h-32 sm:h-52 md:h-48 lg:h-52 overflow-hidden">
        <Link href={`product/${slug}`}>
          <div className="relative w-full h-full">
            {/* Loader */}
            {thumbnailImage && backViewImage
              ? (!imageLoaded.back || !imageLoaded.front) && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="w-24 h-24">
                    <Lottie animationData={cardImageLoading} loop autoplay />
                  </div>
                </div>
              )
              : !imageLoaded.front && (
                <div className="absolute inset-0 flex items-center justify-center bg-white z-10">
                  <div className="w-24 h-24">
                    <Lottie animationData={cardImageLoading} loop autoplay />
                  </div>
                </div>
              )}

            {thumbnailImage && backViewImage ? (
              <motion.div
                className="absolute inset-0"
                initial={{ x: 0, opacity: 1 }}
                animate={controls}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <Image
                  src={apiBaseUrl + thumbnailImage}
                  alt={`${name} thumbnail`}
                  fill
                  onLoad={() =>
                    setImageLoaded((prev) => ({ ...prev, front: true }))
                  }
                  className="object-fill"
                />
              </motion.div>
            ) : (
              <Image
                src={apiBaseUrl + thumbnailImage}
                alt={`${name} thumbnail`}
                fill
                onLoad={() =>
                  setImageLoaded((prev) => ({ ...prev, front: true }))
                }
                className="object-fill"
              />
            )}
          </div>
        </Link>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 mt-4">
        <Link href={`product/${slug}`}>
          {/* Fixed height info section */}
          <div className="flex flex-col min-h-[90px]">
            <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 text-sm md:text-lg leading-tight">
              {name}
            </h3>

            <div className="flex justify-between items-center gap-4">
              <p className="text-sm md:text-base font-semibold text-gray-900">
                ৳{price}
              </p>

              {hasDiscount && (
                <span className="text-xs text-gray-500 line-through">
                  ৳{product.mrpPrice}
                </span>
              )}
            </div>
          </div>
        </Link>

        {/* Button always at bottom */}
        <div className="mt-auto pt-3">
          <ProductDialog
            name={name}
            price={price}
            productRef={_id}
            thumbnailImage={thumbnailImage}
            inventoryRef={inventoryRef}
            inventoryType={inventoryType}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopProductCard;
