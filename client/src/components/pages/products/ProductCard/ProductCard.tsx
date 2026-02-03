"use client";

import React, { useState } from "react";
import { ShoppingCart, X, Plus, Minus, Check, Eye } from "lucide-react";
import Image from "next/image";
import { apiBaseUrl } from "@/config/config";
import { toast } from "react-toastify";
import { addToCart } from "@/services/cart";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { InventoryItem, TProductWithInventory } from "./types";
import Link from "next/link";
import ProductDialog from "../ProductDialog/ProductDialog";

interface HomeProductSectionProps {
  products: TProductWithInventory[];
  userRef?: string;
}

// Product Card Component with new design
const ProductCard: React.FC<{
  product: TProductWithInventory;
  onQuickAdd: (product: TProductWithInventory) => void;
}> = ({ product }) => {
  // const [imageError, setImageError] = useState(false);
  const hasDiscount = product.discount > 0;
  // const isStockOut = product.mainInventory <= 0;

  const displayImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : product.thumbnailImage;

  // const handleQuickAddClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   if (!isStockOut) {
  //     onQuickAdd(product);
  //   }
  // };

  return (
    <div className="rounded overflow-hidden shadow transition group p-2 md:p-4 flex flex-col h-full bg-white hover:shadow-lg">
      {/* Image Section */}
      <Link href={`/product/${product.slug}`}>
        <div className="relative w-full h-32 sm:h-52 md:h-48 lg:h-52 overflow-hidden">
          <Image
            src={displayImage ? (displayImage.startsWith('http') ? displayImage : apiBaseUrl + displayImage) : "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      </Link>

      {/* Content Section */}
      <div className="flex flex-col flex-1 mt-4">
        <Link href={`/product/${product.slug}`}>
          {/* Fixed height info section */}
          <div className="flex flex-col">
            <h3 className=" text-gray-800 mb-2 text-sm md:text-lg leading-tight hover:text-primary transition-colors line-clamp-1">
              {product.name}
            </h3>
            <div className="flex justify-start mt-1">
              <div className="flex justify-between items-center gap-4">
                <p className="text-sm md:text-base font-semibold text-gray-900">
                  ৳{product.price}
                </p>

                {hasDiscount && product.mrpPrice > product.price && (
                  <span className="text-xs text-gray-500 line-through">
                    ৳{product.mrpPrice}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>


        {/* Button always at bottom */}
        <div className="mt-3">
          <ProductDialog
            name={product.name}
            price={product.price}
            productRef={product._id}
            thumbnailImage={product.thumbnailImage}
            inventoryRef={product.inventoryRef}
            inventoryType={product.inventoryType}
          />
        </div>
      </div>
    </div>
  );
};

// Modal Component (unchanged)
export const AddToCartModal: React.FC<{
  product: TProductWithInventory | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (quantity: number, inventoryRef?: string) => void;
  isLoading: boolean;
}> = ({ product, isOpen, onClose, onConfirm, isLoading }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedInventory, setSelectedInventory] = useState<string | undefined>(undefined);

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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl animate-scale-in overflow-hidden max-w-md w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary p-4 flex items-center justify-between sticky top-0 z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <ShoppingCart size={24} />
            Add to Cart
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X size={24} className="text-white" />
          </button>
        </div>

        <div className="p-4">
          <div className="flex gap-3 mb-4 bg-gray-50 p-3 rounded-lg">
            <div className="w-24 h-24 shrink-0 bg-white rounded-lg overflow-hidden shadow-md relative">
              <Image
                src={modalImage ? (modalImage.startsWith('http') ? modalImage : apiBaseUrl + modalImage) : "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
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
                <span className="text-xl font-bold text-primary">৳{product.price}</span>
                {hasDiscount && (
                  <>
                    <span className="text-sm line-through text-gray-400">৳{product.mrpPrice}</span>
                    <span className="bg-red-100 text-primary px-2 py-0.5 rounded-full text-xs font-bold">
                      {product.discountType === "percent" ? `${product.discount}% OFF` : `৳${product.discountAmount} OFF`}
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
                  ? "Select weight"
                  : product.inventoryType === "colorInventory"
                    ? "Select color"
                    : "Select size and color"}
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
                      onClick={() => !isOutOfStock && setSelectedInventory(item._id)}
                      disabled={isOutOfStock}
                      className={`p-2 rounded-lg border-2 transition-all text-xs font-semibold ${selectedInventory === item._id
                        ? "border-primary bg-orange-50 text-primary"
                        : isOutOfStock
                          ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                          : "border-gray-200 hover:border-primary hover:bg-orange-50 text-gray-700"
                        }`}
                    >
                      <div className="flex flex-col items-center">
                        <span className="font-bold uppercase">{displayValue}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center gap-3 bg-gray-50 p-3 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border border-gray-200"
                disabled={quantity <= 1}
              >
                <Minus size={18} strokeWidth={2.5} />
              </button>
              <span className="text-2xl font-bold text-gray-800 w-12 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.mainInventory, quantity + 1))}
                className="p-2 bg-white hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm border border-gray-200"
                disabled={quantity >= product.mainInventory}
              >
                <Plus size={18} strokeWidth={2.5} />
              </button>
              <div className="ml-auto text-right">
                <p className="text-xs text-gray-500">Available</p>
                <p className="text-sm font-bold text-green-600">{product.mainInventory} units</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
            <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wide">Order Summary</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal ({quantity} items)</span>
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
            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-all duration-300 font-bold text-base flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transform hover:-translate-y-0.5"
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
              Please select {product.inventoryType === "levelInventory" ? "size" : product.inventoryType === "colorInventory" ? "color" : "size/color"}
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
const HomeProductSection: React.FC<HomeProductSectionProps> = ({ products, userRef }) => {
  const [selectedProduct, setSelectedProduct] = useState<TProductWithInventory | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuickAdd = (product: TProductWithInventory) => {
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
    <div className="relative py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-[#444] uppercase">
          Our <span className="text-primary">Product</span>
        </h2>
        <p className="text-muted-foreground">We Have Wide Range Of Glasses And Lenses</p>
        <div className="flex items-center justify-center gap-4">
          <div className="h-px bg-[#ddd] w-12" />
          <Eye className="w-4 h-4 text-primary" />
          <div className="h-px bg-[#ddd] w-12" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
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
            <SwiperSlide key={product._id} className="w-full">
              <ProductCard product={product} onQuickAdd={handleQuickAdd} />
            </SwiperSlide>
          ))}
        </Swiper>

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

      {/* View All Button */}
      <div className="text-center mt-4 lg:mt-8 ">
        <Link href="/shop">
          <button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1 cursor-pointer">
            View All Product
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
  );
};

export default HomeProductSection;