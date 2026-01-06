"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { ChevronRight, Sparkles, X, ShoppingCart, } from "lucide-react";
import Image from "next/image";
import { FaCrown } from "react-icons/fa";
import { TbCoinTaka } from "react-icons/tb";
import { apiBaseUrl } from "@/config/config";
import Link from "next/link";
import { useState } from "react";
import { addToCart } from "@/services/cart";
import { toast } from "react-toastify";
import { AddToCartModal } from "../../products/ProductCard/ProductCard";

// Updated interface to match TProduct structure
interface InventoryItem {
  _id?: string;
  level?: string;
  size?: string;
  name?: string;
  quantity?: number;
}

interface PopularProduct {
  _id: string; // Changed from optional to required
  id?: string;
  name: string;
  slug: string; // Added required slug property
  thumbnailImage: string;
  images: string[]; // Added required images array
  weight?: string;
  badge?: string;
  rating?: number;
  price: number; // Changed from optional to required
  mrpPrice: number; // Added required property
  discount: number; // Added required property
  discountType: string; // Added required property
  discountAmount: number; // Added required property
  description: string; // Added required property
  inventoryType: string; // Added required property
  inventoryRef: InventoryItem[]; // Added required property
  mainInventory: number; // Added required property
  productId: string; // Added required property
  sizeChartImage?: string;
  videoUrl?: string;
  subCategoryRef?: any;
  freeShipping: boolean; // Added required property
}

interface PopularItemsProps {
  products: PopularProduct[];
  userRef?: string;
}

export const PopularItems = ({ products, userRef }: PopularItemsProps) => {

  const [selectedProduct, setSelectedProduct] = useState<PopularProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickAdd = (product: PopularProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleConfirmCart = async (quantity: number, inventoryRef?: string) => {
    if (!selectedProduct) return;
    setIsLoading(true);

    try {
      const cartData = {
        productRef: selectedProduct._id,
        quantity: quantity,
        userRef: userRef,
        inventoryRef: inventoryRef || null,
      };

      await addToCart(cartData);
      setIsModalOpen(false);
      toast.success("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add to cart. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="px-4 md:px-6 py-6 md:py-10  lg:py-12 max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-4 pb-4 border-b-2 border-gray-300">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Sparkles className="w-7 h-7 text-primary" />
            Popular Items
          </h2>
          <Link
            href="/shop"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-[#155028] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <span className="text-sm md:text-base font-semibold">View All</span>
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="relative">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={1}
            navigation={{
              prevEl: ".popular-prev",
              nextEl: ".popular-next",
            }}
            pagination={{
              clickable: true,
              el: ".popular-pagination",
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={3000}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 2 },
              1280: { slidesPerView: 2 },
            }}
            className="popular-swiper"
          >
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <Link
                  key={product._id}
                  href={`/product/${product.slug}`}
                >
                  <div className="bg-white rounded-md border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow h-[220px]">
                    <div className="flex gap-3 h-full">
                      {/* Left Side - Product Info */}
                      <div className="flex-1 flex flex-col justify-between p-3 ">
                        {/* Badge */}
                        <div className="flex-1 flex flex-col p-2">
                          {product.badge && (
                            <div className="flex items-center gap-1 mb-2">
                              <span className="text-yellow-500 lg:text-xl text-lg">
                                <FaCrown />
                              </span>
                              <span className="lg:text-md text-sm text-gray-600 font-semibold">
                                {product.badge}
                              </span>
                            </div>
                          )}

                          <h3 className="text-base md:text-2xl font-bold text-gray-800">
                            {product.name}
                          </h3>

                          {/* Weight and Price */}
                          <div className="flex items-center gap-3 md:gap-4 mb-3 text-xs md:text-sm text-gray-600">
                            <div className="flex items-center gap-1 font-semibold bg-gray-100 px-2 py-1 rounded-2xl mt-6">
                              <span>📦</span>
                              <span> {product?.inventoryRef?.[0]?.level}</span>
                            </div>
                            <div className="flex items-center gap-1 font-semibold bg-gray-100 px-2 py-1 rounded-2xl mt-6">
                              <TbCoinTaka size={18} />
                              <span>{product.price}</span>
                            </div>
                          </div>
                        </div>

                        <div className="block mt-3 w-full">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              if (product.mainInventory > 0) {
                                handleQuickAdd(product);
                              }
                            }}
                            disabled={product.mainInventory <= 0}
                            className={`w-full cursor-pointer px-3 py-1.5 rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5 font-semibold text-xs shadow-md transform ${product.mainInventory <= 0
                              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                              : "bg-primary text-white hover:bg-[#155028] hover:shadow-lg hover:-translate-y-0.5"
                              }`}
                          >
                            {product.mainInventory <= 0 ? (
                              <>
                                <X size={16} strokeWidth={2.5} />
                                স্টক আউট
                              </>
                            ) : (
                              <>
                                <ShoppingCart size={16} strokeWidth={2.5} />
                                কার্টে যোগ করুন
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Right Side - Product Image */}
                      <div className="flex-1 w-full shrink-0 rounded-b-md p-2 relative">
                        <Image
                          src={apiBaseUrl + product?.thumbnailImage}
                          alt={product.name}
                          fill
                          className="object-fill rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom Navigation */}
          {/* <button className="popular-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 border-2 border-gray-300 shadow-md transition-all">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="popular-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white hover:bg-gray-50 rounded-full p-2 border-2 border-gray-300 shadow-md transition-all">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button> */}

          {/* Custom Pagination */}
          <div className="popular-pagination flex justify-center gap-2 mt-6"></div>
        </div>
      </div>

      <style jsx global>{`
        .popular-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: #d1d5db;
          opacity: 1;
          transition: all 0.3s;
        }
        .popular-swiper .swiper-pagination-bullet-active {
          width: 24px;
          background: #fbbf24;
          border-radius: 4px;
        }
      `}</style>


      {/* Modal */}
      {selectedProduct && (
        <AddToCartModal
          product={selectedProduct}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={handleConfirmCart}
          isLoading={isLoading}
        />
      )}

    </div>
  );
};
