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



interface HomeProductSectionProps {
  products: TProductWithInventory[];
  userRef?: string;
}

// Product Card Component onViewDetails
const ProductCard: React.FC<{
  product: TProductWithInventory;
  onQuickAdd: (product: TProductWithInventory) => void;
  onViewDetails?: (product: TProductWithInventory) => void;
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
      console.log("ok");
      onQuickAdd(product);
    }
  };

  // const handleViewDetailsClick = (e: React.MouseEvent) => {
  //   e.preventDefault();
  //   e.stopPropagation();
  //   onViewDetails(product);
  // };

  const handleCardClick = (e: React.MouseEvent) => {
    // Only navigate if not clicking on button
    const target = e.target as HTMLElement;
    if (!target.closest('button')) {
      window.location.href = `/product/${product.slug}`;
    }
  };

  return (
    <>
      <div
        key={product._id}
        className="group flex flex-col items-center text-center cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative w-full mb-6 border border-[#eee] bg-white flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-primary group-hover:shadow-[0_0_10px_rgba(26,75,140,0.2)]">
          <div className=" h-48 relative rounded-md">
            <Image
              src={product.thumbnailImage ? (product.thumbnailImage.startsWith('http') ? product.thumbnailImage : apiBaseUrl + product.thumbnailImage) : "/placeholder.svg"}
              alt={product.name}
              fill
              className=" w-full object-contain p-4 group-hover:scale-105 transition-transform duration-300 rounded-md"
            />
          </div>
          {/* Hover Overlay */}
          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 cursor-pointer">
            {/* Add to Cart Bar */}
            {isStockOut ? (
              <>

                <button
                  type="button"
                  disabled={isStockOut}
                  className="w-full text-[12px] font-bold py-2.5 uppercase tracking-wider  transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-semibold bg-gray-400 text-gray-200 cursor-not-allowed"
                >
                  <X size={16} strokeWidth={2.5} />
                  Out of stock
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={handleQuickAddClick}
                  type="button"
                  className="w-full bg-primary text-white text-[12px] font-bold py-2.5 uppercase tracking-wider hover:bg-primary transition-colors cursor-pointer flex items-center justify-center gap-1.5 font-semibold"
                >
                  <ShoppingCart size={16} strokeWidth={2.5} />
                  Add to Cart
                </button>
              </>
            )}
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-[#666] font-medium leading-tight">{product.name}</h3>
          <div className="flex items-center justify-center gap-2 font-semibold">
            <span className="text-[#666]">{product.price}$</span>
            {
              hasDiscount && product.mrpPrice > product.price && (
                <span className="text-[#999] line-through text-sm font-normal">৳{product.mrpPrice}</span>
              )
            }
          </div>
        </div>
      </div>
    </>
  );
};


// Modal Component 
export const AddToCartModal: React.FC<{
  product: TProductWithInventory | null;
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
                src={modalImage ? (modalImage.startsWith('http') ? modalImage : apiBaseUrl + modalImage) : "/placeholder.svg"}
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
              Please
              {product.inventoryType === "levelInventory"
                ? "size"
                : product.inventoryType === "colorInventory"
                  ? "color"
                  : "size/color"}
              select
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
    <div className="relative  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto text-center space-y-4 mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-[#444] uppercase">
          Our <span className="text-primary">Shop</span>
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
            1280: { slidesPerView: 5 },
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

    </div>
  );
};

export default HomeProductSection;
