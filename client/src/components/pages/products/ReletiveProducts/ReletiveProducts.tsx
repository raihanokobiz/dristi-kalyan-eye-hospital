"use client"

import { rajdhani } from "@/app/font";
import { TProduct } from "@/types";
import React from "react";
import HomeProductSection from "../ProductCard/ProductCard";

interface Products {
  relativeProducts: TProduct[];
}

const ReletiveProducts: React.FC<Products> = ({ relativeProducts }) => {

  console.log(relativeProducts, "ok");


  return (
    <div className="w-full mb-4 md:mb-6 lg:mb-8">
      <h2
        className={`text-xl font-semibold border-b pb-3 ${rajdhani.className}`}
      >
        Related Products :
      </h2>

      <div className="mt-8 w-full">
        <HomeProductSection products={relativeProducts?.slice(0, 12) || []} />
      </div>
    </div>
  );
};

export default ReletiveProducts;
