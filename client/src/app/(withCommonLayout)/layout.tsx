import ClientWrapper from "@/components/ClientWrapper";
import NavBar from "@/components/pages/header/NavBar/NavBar";
import Footer from "@/components/pages/landing_pages/Footer/Footer";
import { getLayoutData } from "@/lib/getLayoutData";
// import { getUser } from "@/services/auth/index";
// import { getCartProducts } from "@/services/cart/index";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const user = await getUser();
  // const userId = user?.id;
  // const coupon = "";
  // const products = await getCartProducts(userId, coupon);
  const { products } = await getLayoutData();
  return (
    <div>
      <ClientWrapper />
      <NavBar userCartProducts={products?.data} />
      {children}
      <Footer userCartProducts={products?.data} />
    </div>
  );
}