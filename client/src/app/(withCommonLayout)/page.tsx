import Banner from "@/components/pages/landing_pages/Banner/Banner";
import Category from "@/components/pages/landing_pages/Category/Category";
// import SubCategory from "@/components/pages/landing_pages/SubCategory/SubCategory";
import React from "react";
import HomeProductSection from "@/components/pages/landing_pages/HomeProductSection/HomeProductSection";
// import TopChildCategory from "@/components/pages/landing_pages/TopChildCategory/TopChildCategory";
// import MiddleChildCategory from "@/components/pages/landing_pages/MiddleChildCategory/MiddleChildCategory";
// import LowerMiddleChildCategory from "@/components/pages/landing_pages/LowerMiddleChildCategory/LowerMiddleChildCategory";
// import { getAllChildCategorys } from "@/services/childCategorys";
// import ButtomChildCategory from "@/components/pages/landing_pages/ButtomChildCategory/ButtomChildCategory";
import Campaign from "@/components/pages/landing_pages/Campaign/Campaign";
import { getCampaign } from "@/services/campaign";
import Offer from "@/components/pages/landing_pages/offer/Offer";
import { WhyChooseUs } from "@/components/pages/landing_pages/WhyChooseUs/WhyChooseUs";
// import { Testimonial } from "@/components/pages/landing_pages/Testimonial/Testimonial";
import { Subscribe } from "@/components/pages/landing_pages/Subscribe/Subscribe";
import { getAllOffers } from "@/services/offer";
import { LocationModalWrapper } from "@/components/kocation/LocationModalWrapper";
import { PopularItems } from "@/components/pages/landing_pages/PopularItems/PopularItems";
import { getAllProduct } from "@/services/products";
import {
  Flame,
  Trophy,
} from "lucide-react";

// import { getCartProducts } from "@/services/cart";
// import NavBar from "@/components/pages/header/NavBar/NavBar";

// import { getUser } from "@/services/auth";

const page = async () => {
  // const topRes = await getHomePageSubCategoryProducts("top");
  // const middleRes = await getHomePageSubCategoryProducts("middle");
  // const lowerMiddleRes = await getHomePageSubCategoryProducts("lowerMiddle");
  // const buttomRes = await getHomePageSubCategoryProducts("buttom");

  // const topChildCategoriesList = await getAllChildCategorys("top");

  // const middleChildCategoriesList = await getAllChildCategorys("middle");
  // const lowerMiddleChildCategoriesList = await getAllChildCategorys(
  //   "lowerMiddle"
  // );
  // const buttomChildCategoriesList = await getAllChildCategorys("buttom");

  // ------for campaign----

  const { data: campaign } = await getCampaign();
  const offrs = await getAllOffers();

  // const user = await getUser();
  // const userId = user?.id;
  // const coupon = "";
  // const products = await getCartProducts(userId, coupon);
  // ksdfj

  const data = await getAllProduct();

  const allProducts = data?.data || [];

  const bestDealProducts = allProducts.filter(
    (item: any) => item.status === "bestDeal"
  );

  const bestSellerProducts = allProducts.filter(
    (item: any) => item.status === "bestSeller"
  );

  const popularProducts = allProducts.filter(
    (item: any) => item.status === "popular"
  );

  return (
    <>
      {/* <NavBar userCartProducts={products?.data} /> */}
      <div className="">
        <LocationModalWrapper />
        <Banner banners={[]} />
        <div
          style={{
            backgroundImage: `url(${Text1.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Category />
          <Offer offrs={offrs} />
          {/* <SubCategory /> */}
          {/* <ChildCategory />   */}
          {bestDealProducts.length > 0 && (
            <HomeProductSection
              title="Best Deals"
              products={bestDealProducts}
              icon={Trophy}
            />
          )}
          {bestSellerProducts.length > 0 && (
            <HomeProductSection
              title="Best Sellers"
              products={bestSellerProducts}
              icon={Flame}
            />
          )}
        </div>

        <div
          style={{
            backgroundImage: `url(${Text1.src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <PopularItems products={popularProducts} />

          <Campaign campaign={campaign[0]} />
          <WhyChooseUs />
          <Subscribe />

        </div>
        {/* <Testimonial/> */}
        {/* <MiddleChildCategory
          childCategoriesList={middleChildCategoriesList?.data}
        />
        {middleRes?.status === "success" && (
          <HomeProductSection products={middleRes?.data} />
        )} */}

        {/* <LowerMiddleChildCategory
          childCategoriesList={lowerMiddleChildCategoriesList?.data}
        />

        {lowerMiddleRes?.status === "success" && (
          <HomeProductSection products={lowerMiddleRes?.data} />
        )}

        <ButtomChildCategory
          childCategoriesList={buttomChildCategoriesList?.data}
        />

        {buttomRes?.status === "success" && (
          <HomeProductSection products={buttomRes?.data} />
        )} */}
      </div>
    </>
  );
};

export default page;
