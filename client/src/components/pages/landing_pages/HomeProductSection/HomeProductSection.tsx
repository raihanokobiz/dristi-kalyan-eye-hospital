import { TProduct } from "@/types";

// import MainProduct from "../../products/ProductCard/ProductCard";
import HomeProductSection from "../../products/ProductCard/ProductCard";
import { getUser } from "@/services/auth";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
interface ProductsProps {
  title?: string;
  icon?: React.ElementType;
  products: TProduct[];
}

const HomeProducts = async ({ title, icon: Icon, products }: ProductsProps) => {
  const user = await getUser();

  return (
    <div className="max-w-6xl mx-auto md:px-6 py-6 md:py-10  lg:py-12">
      <div className="flex items-center justify-between mb-6 px-4 pb-4 border-b-2 border-gray-300">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
          {Icon && <Icon className="w-7 h-7 text-primary" />}
          {title}
        </h2>
        <Link
          href="/shop"
          className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-md hover:bg-[#155028] transition-all duration-300 shadow-md hover:shadow-lg"
        >
          <span className="text-sm md:text-base font-semibold">View All</span>
          <ChevronRight className="w-5 h-5" />
        </Link>
      </div>
      <HomeProductSection products={products} userRef={user?.id} />
    </div>
  );
};

export default HomeProducts;
