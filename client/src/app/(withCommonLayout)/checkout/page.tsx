// import { getCartProducts } from "@/services/cart";
// import { getUser } from "@/services/auth";
// import NavBar from "@/components/pages/header/NavBar/NavBar";
import MainCheckOut from "@/components/pages/checkoutPage/MainCheckOut/MainCheckOut";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dhamrai Drisiti Kalyan Eye Hospital | Checkout",
  description: "Best E-commerce platform in BD",
};

export const revalidate = 0;
const Checkout = async () => {
  // const params = await searchParams;
  // const coupon = Array.isArray(params.coupon)
  //   ? params.coupon[0]
  //   : params.coupon;

  // const user = await getUser();
  // const userId = user?.id;
  // const products = await getCartProducts(userId, coupon || "");


  return (
    <div className="max-w-6xl mx-auto px-4" >
      {/* <NavBar userCartProducts={products?.data} /> */}
      <MainCheckOut />
    </div>
  );
};
export default Checkout;
