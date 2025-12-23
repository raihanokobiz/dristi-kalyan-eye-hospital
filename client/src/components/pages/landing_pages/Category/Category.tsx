import { getAllCategorys } from "@/services/categorys";
import CategoryCardSlider from "@/slider/CategoryCardSlider/CategoryCardSlider";
import React from "react";

const Category = async () => {
  const { data: categoriesList } = await getAllCategorys();
  return (
    <div className="max-w-4xl mx-auto flex justify-center relative z-20">
      <CategoryCardSlider categoriesList={categoriesList} />
    </div>
  );
};

export default Category;
