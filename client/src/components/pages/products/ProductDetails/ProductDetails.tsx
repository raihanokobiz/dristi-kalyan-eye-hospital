"use client";
import React, { useState } from "react";

import Image from "next/image";
import { rajdhani } from "@/app/font";
import { FiPlus } from "react-icons/fi";
import { FiMinus } from "react-icons/fi";
import { TProduct } from "@/types";
import { apiBaseUrl } from "@/config/config";
import ProductDetailsSlide from "@/slider/ProductDetailsSlide/ProductDetailsSlide";
import { addToCart } from "@/services/cart";
import { toast } from "react-toastify";
import { getUser } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useAnimation } from "framer-motion";
interface Props {
  product: TProduct;
}

const ProductDetails: React.FC<Props> = ({ product }) => {
  const [count, setCount] = useState(1);
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [level, setLevel] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);


  // const [levelError, setLevelError] = useState(false);
  // const [colorError, setColorError] = useState(false);
  const router = useRouter();
  const controls = useAnimation();
  const handleIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setCount((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const {
    name,
    thumbnailImage,
    backViewImage,
    sizeChartImage,
    description,
    mrpPrice,
    price,
    inventoryRef,
    inventoryType,
    images,
    _id,
  } = product;

  // const userId = "67f4c99c11813048a36a2496";

  const handleAddToCart = async () => {
    const user = await getUser();
    // if not logged in then redirect to login page
    if (!user) {
      toast.error("Please login to add product to cart.");
      router.push("/login");
      return;
    }
    if (
      (inventoryType === "levelInventory" ||
        inventoryType === "colorLevelInventory") &&
      !selectedLevel
    ) {
      // setLevelError(true);
      return;
    }

    if (
      (inventoryType === "colorLevelInventory" ||
        inventoryType === "colorInventory") &&
      !selectedColor
    ) {
      // setColorError(true);
      return;
    }
    try {
      controls.set({ x: 0, y: 0, scale: 1 });
      const product: {
        quantity: number;
        productRef: string;
        userRef: string | undefined;
        inventoryRef?: string | null;
      } = {
        quantity: count,
        productRef: _id,
        userRef: user?.id,
      };

      if (inventoryType == "inventory") {
        product.inventoryRef = inventoryRef[0]._id;
      } else if (inventoryType == "levelInventory") {
        product.inventoryRef = selectedLevel;
      } else if (inventoryType == "colorInventory") {
        product.inventoryRef = selectedColor;
      } else if (inventoryType == "colorLevelInventory") {
        product.inventoryRef = selectedColor;
      }

      await addToCart(product);
      // router.push("/cart");
      toast.success("Product added to cart!");
      // setLevelError(false);
      // setColorError(false);
      controls.start({
        scale: 0.01,
        x: 1200,
        y: -200,
        transition: { duration: 0.6, ease: "easeInOut" },
      });

      setAddedToCart(true);

      setTimeout(() => {
        controls.set({ x: 10, scale: 0 });
      }, 1000);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      toast.error("Failed to add product to cart.");
    }
  };

  const handleBuyNow = async () => {
    const user = await getUser();

    if (!user) {
      toast.error("Please login to continue.");
      router.push("/login");
      return;
    }

    if (
      (inventoryType === "levelInventory" ||
        inventoryType === "colorLevelInventory") &&
      !selectedLevel
    ) {
      // setLevelError(true);
      return;
    }

    if (
      (inventoryType === "colorLevelInventory" ||
        inventoryType === "colorInventory") &&
      !selectedColor
    ) {
      // setColorError(true);
      return;
    }

    try {
      const productData: {
        quantity: number;
        productRef: string;
        userRef: string | undefined;
        inventoryRef?: string | null;
      } = {
        quantity: count,
        productRef: _id,
        userRef: user?.id,
      };

      if (inventoryType == "inventory") {
        productData.inventoryRef = inventoryRef[0]._id;
      } else if (inventoryType == "levelInventory") {
        productData.inventoryRef = selectedLevel;
      } else if (inventoryType == "colorInventory") {
        productData.inventoryRef = selectedColor;
      } else if (inventoryType == "colorLevelInventory") {
        productData.inventoryRef = selectedColor;
      }

      await addToCart(productData);
      router.push("/checkout"); // 👈 checkout page
    } catch {
      toast.error("Failed to process Buy Now");
    }
  };


  return (
    <div className="Container  py-8  lg:mt-10 mt-16">
      <div className="grid lg:grid-cols-2 gap-8 ">
        <ProductDetailsSlide
          thumbnailImage={thumbnailImage}
          backViewImage={backViewImage}
          images={images}
          name={name}
        />

        <div className="">
          <h2
            className={`text-2xl lg:text-3xl font-bold text-gray-700 ${rajdhani.className}`}
          >
            {name}
          </h2>

          <div className="flex gap-2 mt-2 text-gray-700">
            {Number(price) !== Number(mrpPrice) ? (
              <>
                <p className="line-through text-[#262626]/60 font-semibold flex items-center gap-1">
                  <span>৳</span> <span>{Number(mrpPrice).toFixed(2)}</span>
                </p>
                <p className="flex items-center gap-1 font-semibold text-xl lg:text-2xl text-gray-700">
                  <span>৳</span> <span>{Number(price).toFixed(2)}</span>
                </p>
              </>
            ) : (
              <p className="flex items-center gap-1 font-semibold text-xl lg:text-2xl text-gray-700">
                <span>৳</span> <span>{Number(price).toFixed(2)}</span>
              </p>
            )}
          </div>

          <div className="mt-3">
            {(inventoryType === "levelInventory" ||
              inventoryType === "colorLevelInventory") && (
                <div className="flex flex-col">
                  <h3
                    className={`text-base md:text-lg font-semibold ${rajdhani.className}`}
                  >
                    Select Size:
                  </h3>
                  <div className="flex items-center gap-2 text-sm font-semibold text-[#262626]/60 mt-1 cursor-pointer">
                    {inventoryRef
                      ?.filter(
                        (value, index, item) =>
                          index === item.findIndex((t) => t.level === value.level)
                      )
                      .map((size) => (
                        <p
                          key={size._id}
                          onClick={() => {
                            setLevel(size.level);
                            setSelectedLevel(size._id);
                            setSelectedColor(null);
                            // setLevelError(false);
                          }}
                          className={` p-2 h-[30px] border border-primary hover:text-primary duration-300 cursor-pointer rounded text-center flex items-center justify-center uppercase ${level === size.level
                            ? "bg-primary text-white"
                            : "border-primary"
                            }`}
                        >
                          {size.level}
                        </p>
                      ))}
                  </div>
                  {/* {levelError && (
                    <p className="text-red-500 text-sm mt-1">
                      Please select a size.
                    </p>
                  )} */}
                </div>
              )}
          </div>

          <div className="border-b-2 pb-4 border-primary">
            <div className="mt-4 flex items-center gap-2 ">
              <div className=" flex items-center gap-5 justify-between border border-primary rounded px-3 py-[7px]">
                <p onClick={handleDecrement} className="cursor-pointer">
                  <FiMinus />
                </p>
                <span>{count}</span>
                <p onClick={handleIncrement} className="cursor-pointer">
                  <FiPlus />
                </p>
              </div>
              <div className="w-full flex gap-2 ">
                {!addedToCart ? (
                  <>
                    <button
                      onClick={handleAddToCart}
                      className="bg-primary flex items-center gap-1 px-6 py-2.5 font-semibold text-sm  rounded text-[#fff] cursor-pointer"
                    >
                      <span>
                        <FiPlus />
                      </span>
                      <span>Add to cart </span>
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="border border-primary text-primary px-6 py-2.5 font-semibold text-sm rounded cursor-pointer"
                    >
                      Buy Now
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => router.push("/cart")}
                    className="bg-primary flex items-center gap-1 px-6 py-2.5 font-semibold text-sm  rounded text-[#fff] cursor-pointer"
                  >
                    Go to Cart
                  </button>
                )}
              </div>
            </div>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
          <div className="mt-3">
            <div className="mt-2">
              {sizeChartImage && (
                <Image
                  src={apiBaseUrl + sizeChartImage}
                  alt={`${name} sizeChartImage`}
                  width={500}
                  height={500}
                  className="w-full h-full rounded"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
