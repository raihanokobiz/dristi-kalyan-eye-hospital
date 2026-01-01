"use client";

import React, { useState } from "react";
import { ShoppingCart, X, Plus, Minus, Check } from "lucide-react";
import Image from "next/image";
import { apiBaseUrl } from "@/config/config";
import Link from "next/link";
import { toast } from "react-toastify";
import { addToCart } from "@/services/cart";
// import { TbWeight } from 'react-icons/tb';
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { TbWeight } from "react-icons/tb";

interface InventoryItem {
  _id?: string;
  level?: string;
  size?: string;
  name?: string;
  quantity?: number;
}

interface TProduct {
  _id: string;
  name: string;
  slug: string;
  thumbnailImage: string;
  backViewImage?: string;
  images: string[];
  price: number;
  mrpPrice: number;
  discount: number;
  discountType: string;
  discountAmount: number;
  description: string;
  inventoryType: string;
  inventoryRef: InventoryItem[];
  mainInventory: number;
  productId: string;
  sizeChartImage?: string;
  videoUrl?: string;
  subCategoryRef?: any;
  freeShipping: boolean;
}

interface HomeProductSectionProps {
  products: TProduct[];
  userRef?: string;
}

// Product Card Component onViewDetails
const ProductCard: React.FC<{
  product: TProduct;
  onQuickAdd: (product: TProduct) => void;
  onViewDetails?: (product: TProduct) => void;
}> = ({ product, onQuickAdd }) => {
  const [imageError, setImageError] = useState(false);
  const hasDiscount = product.discount > 0;
  const isStockOut = product.mainInventory <= 0;

  // Get the first image from the images array, fallback to thumbnailImage
  const displayImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.thumbnailImage;

  const handleImageError = () => {
    setImageError(true);
  };

  const handleQuickAddClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isStockOut) {
      onQuickAdd(product);
    }
  };

  // const handleViewDetailsClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   onViewDetails(product);
  // };

  return (
    <div className="w-full p-2 md:p-4 bg-white rounded-md overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group border border-gray-100 flex flex-col max-h-80">
      <div className="relative overflow-hidden h-40 sm:h-52 md:h-48  lg:h-52 ">
        <Link
          href={`/product/${product.slug}`}
          className="absolute inset-0 z-0"
        >
          {imageError ? (
            <div className="w-full h-full bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <div className="text-center">
                <ShoppingCart
                  size={48}
                  className="mx-auto text-gray-400 mb-2"
                />
                <p className="text-sm text-gray-500">{product.name}</p>
              </div>
            </div>
          ) : (
            <div>
              <Image
                src={apiBaseUrl + displayImage}
                alt={product.name}
                fill
                onError={handleImageError}
                className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110"
              />
            </div>
          )}
        </Link>

        {/* Stock Out Ribbon */}
        {/* {isStockOut && (
          <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden pointer-events-none z-20">
            <div className="bg-[#FF6C0C] text-white font-bold text-[10px] px-8 py-1  shadow-lg rotate-45 transform  text-center ">
              STOCK OUT
            </div>
          </div>
        )} */}

        {isStockOut && (
          <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden z-20">
            <div className="absolute top-4 -left-7 w-32 bg-gradient-to-r from-yellow-600 to-red-700 text-white text-center font-bold text-[10px] py-1 shadow-md transform -rotate-45">
              STOCK OUT
            </div>
          </div>
        )}

        {hasDiscount && !isStockOut && (
          <div className="absolute top-2 left-2 bg-linear-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-lg z-10">
            {product.discountType === "percentage"
              ? `${product.discount}% OFF`
              : `৳${product.discountAmount} OFF`}
          </div>
        )}

        {product.freeShipping && !isStockOut && (
          <div className="absolute top-2 right-2 bg-linear-to-r from-green-500 to-green-600 text-white px-2 py-1 rounded-full text-[10px] font-bold shadow-lg z-10">
            Free Ship
          </div>
        )}
      </div>

      <div className="flex flex-col">
        <h3 className=" font-semibold text-gray-800 mb-3 line-clamp-1 md:line-clamp-2 text-sm md:text-lg leading-tight">
          {product.name}
        </h3>
        <div >
          <div className="flex justify-between">
            <p className='text-sm font-medium md:font-semibold lg:font-bold text-gray-900  flex items-center'>
              <TbWeight className='text-sm md:text-xl' />
              {product?.inventoryRef?.[0]?.level}
            </p>
            <div className="flex items-center gap-1 md:gap-2 flex-wrap">
              <span className=" text-xs md:text-base font-medium md:font-semibold lg:font-bold text-gray-900">
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
          <div className=" block mt-3 w-full">
            <button
              onClick={handleQuickAddClick}
              disabled={isStockOut}
              className={`w-full px-3 py-1.5 rounded-sm transition-all duration-300 flex items-center justify-center gap-1.5 font-semibold text-xs shadow-md transform cursor-pointer ${isStockOut
                ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                : "bg-primary text-white hover:from-[#E55A00] hover:to-[#CC4F00] hover:shadow-lg hover:-translate-y-0.5"
                }`}
            >
              {isStockOut ? (
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
      </div>
    </div>
  );
};


// Modal Component 
export const AddToCartModal: React.FC<{
  product: TProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number, inventoryRef?: string) => void;
  isLoading: boolean;
}> = ({ product, isOpen, onClose, onConfirm, isLoading }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedInventory, setSelectedInventory] = useState<
    string | undefined
  >(undefined);

  if (!isOpen || !product) return null;

  const hasDiscount = product.discount > 0;
  const totalPrice = product.price * quantity;
  const totalMrp = product.mrpPrice * quantity;
  const totalSavings = (product.mrpPrice - product.price) * quantity;
  const hasInventoryOptions =
    (product.inventoryType === "colorLevelInventory" ||
      product.inventoryType === "levelInventory" ||
      product.inventoryType === "colorInventory") &&
    product.inventoryRef?.length > 0;

  const modalImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.thumbnailImage;

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer "
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl animate-scale-in overflow-hidden max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary p-4 flex items-center justify-between sticky top-0 z-10 cursor-pointer">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingCart size={24} />
            Add to Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors cursor-pointer"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-3 mb-4 bg-gray-50 p-3 rounded-lg">
            <div className="w-24 h-24 shrink-0 bg-white rounded-lg overflow-hidden shadow-md relative">
              <Image
                src={apiBaseUrl + modalImage}
                alt={product.name}
                fill
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800 mb-1 leading-tight text-sm">
                {product.name}
              </h3>
              <p className="text-xs text-gray-500 mb-2 font-mono bg-white px-2 py-0.5 rounded inline-block">
                ID: {product.productId}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xl font-bold text-primary">
                  ৳{product.price}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-sm line-through text-gray-400">
                      ৳{product.mrpPrice}
                    </span>
                    <span className="bg-red-100 text-primary px-2 py-0.5 rounded-full text-xs font-bold">
                      {product.discountType === "percent"
                        ? `${product.discount}% OFF`
                        : `৳${product.discountAmount} OFF`}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {hasInventoryOptions && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                {product.inventoryType === "levelInventory"
                  ? "ওজন নির্বাচন করুন"
                  : product.inventoryType === "colorInventory"
                    ? "কালার নির্বাচন করুন"
                    : "সাইজ ও কালার নির্বাচন করুন"}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {product.inventoryRef.map((item: InventoryItem) => {
                  const isOutOfStock = (item.quantity ?? 0) <= 0;

                  let displayValue = "Option";

                  if (product.inventoryType === "levelInventory") {
                    displayValue = item.level || item.size || "Size";
                  } else if (product.inventoryType === "colorInventory") {
                    displayValue = item.name || "Color";
                  } else if (product.inventoryType === "colorLevelInventory") {
                    const colorName = item.name || "Color";
                    const sizeName = item.level || item.size || "Size";
                    displayValue = `${colorName} - ${sizeName}`;
                  }

                  return (
                    <button
                      key={item._id}
                      onClick={() =>
                        !isOutOfStock && setSelectedInventory(item._id)
                      }
                      disabled={isOutOfStock}
                      className={`p-2 rounded-lg border-2 transition-all text-xs font-semibold cursor-pointer ${selectedInventory === item._id
                        ? "border-primary bg-orange-50 text-primary"
                        : isOutOfStock
                          ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                          : "border-gray-200 hover:borderp-rimary hover:bg-orange-50 text-gray-700"
                        }`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-bold uppercase  ">
                          {displayValue}
                        </span>
                        {/* {item.quantity !== undefined && (
                          <span
                            className={`text-xs mt-0.5 ${isOutOfStock ? "text-primary" : "text-gray-500"
                              }`}
                          >
                            {isOutOfStock ? "Stock Out" : `${item.quantity} টি`}
                          </span>
                        )} */}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 cursor-pointer bg-white hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border border-gray-200"
                disabled={quantity <= 1}
              >
                <Minus size={18} strokeWidth={2.5} />
              </button>
              <span className="text-2xl font-bold text-gray-800 w-12 text-center">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.mainInventory, quantity + 1))
                }
                className="p-2 cursor-pointer bg-white hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border border-gray-200"
                disabled={quantity >= product.mainInventory}
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-500">Available</p>
                <p className="text-sm font-bold text-green-600">
                  {product.mainInventory} units
                </p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-4 border border-gray-200">
            <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">
              Order Summary
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">
                  Subtotal ({quantity} items)
                </span>
                <span className="font-bold text-gray-900">৳{totalPrice}</span>
              </div>
              {hasDiscount && (
                <>
                  <div className="flex justify-between text-sm text-gray-400 line-through">
                    <span>Original Price</span>
                    <span>৳{totalMrp}</span>
                  </div>
                  <div className="flex justify-between text-sm font-bold text-green-600 bg-green-50 -mx-2 px-2 py-1 rounded">
                    <span>You Save</span>
                    <span>৳{totalSavings}</span>
                  </div>
                </>
              )}
              {product.freeShipping && (
                <div className="flex justify-between text-sm font-bold text-green-600 pt-2 border-t border-gray-200">
                  <span>Shipping</span>
                  <span className="flex items-center gap-1">
                    <Check size={16} />
                    FREE
                  </span>
                </div>
              )}
              <div className="flex justify-between text-lg font-bold text-primary pt-3 border-t-2 border-gray-300">
                <span>Total</span>
                <span>৳{totalPrice}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onConfirm(quantity, selectedInventory || undefined)}
            disabled={isLoading || (hasInventoryOptions && !selectedInventory)}
            className="w-full cursor-pointer bg-linear-to-r from-green-500 to-green-600 text-white py-3 rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
          >
            {isLoading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Adding...
              </>
            ) : (
              <>
                <Check size={20} strokeWidth={2.5} />
                Confirm & Add to Cart
              </>
            )}
          </button>

          {hasInventoryOptions && !selectedInventory && (
            <p className="text-center text-sm text-primary mt-3 font-semibold">
              অনুগ্রহ করে{" "}
              {product.inventoryType === "levelInventory"
                ? "সাইজ"
                : product.inventoryType === "colorInventory"
                  ? "কালার"
                  : "সাইজ/কালার"}{" "}
              নির্বাচন করুন
            </p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.95) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        .animate-scale-in {
          animation: scale-in 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>
    </div>
  );
};

// Main Component
const HomeProductSection: React.FC<HomeProductSectionProps> = ({
  products,
  userRef,
}) => {
  const [selectedProduct, setSelectedProduct] = useState<TProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickAdd = (product: TProduct) => {
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

  const displayProducts = products?.slice(0, 8) || [];

  return (
    <div className="relative w-full px-4 md:px-0">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-screen h-28 bg-green-600 z-0"></div>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        slidesPerView={2}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
      >
        {displayProducts.map((product) => (
          <SwiperSlide key={product._id} className="w-full" >
            <ProductCard product={product} onQuickAdd={handleQuickAdd} />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* AddToCartModal */}
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

export default HomeProductSection;
