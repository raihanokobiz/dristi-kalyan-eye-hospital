import Banner from "@/components/pages/landing_pages/Banner/Banner";
import Category from "@/components/pages/landing_pages/Category/Category";
// import SubCategory from "@/components/pages/landing_pages/SubCategory/SubCategory";
import React from "react";
import HomeProductSection from "@/components/pages/landing_pages/HomeProductSection/HomeProductSection";
// import { getAllChildCategorys } from "@/services/childCategorys";
import Campaign from "@/components/pages/landing_pages/Campaign/Campaign";
import { getCampaign } from "@/services/campaign";
import Offer from "@/components/pages/landing_pages/offer/Offer";
// import Text1 from "../../assets/texture/Text2.png";
import { getAllDoctors } from "@/services/doctor/doctors";
import { getAllService } from "@/services/service";

// import { Testimonial } from "@/components/pages/landing_pages/Testimonial/Testimonial";
// import { Subscribe } from "@/components/pages/landing_pages/Subscribe/Subscribe";
import { getAllOffers } from "@/services/offer";
import { PopularItems } from "@/components/pages/landing_pages/PopularItems/PopularItems";
import { getAllProduct } from "@/services/products";
import {
  Flame,
  Trophy,
} from "lucide-react";
import BenefitsSection from "@/services/benefit/BenefitsSection";
import HomeDoctorSection from "./HomeDoctorSection/HomeDoctorSection";
import { EyeServices } from "@/components/pages/service/EyeServices";
import { WhyChooseUs } from "@/components/pages/landing_pages/WhyChooseUs/WhyChooseUs";



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

  // Temporarily comment out getCampaign if it's causing issues
  // const { data: campaign } = await getCampaign();
  const campaign = null; // Temporary fix

  const offrs = await getAllOffers();

  // const user = await getUser();
  // const userId = user?.id;
  // const coupon = "";
  // const products = await getCartProducts(userId, coupon);
  // ksdfj

  const data = await getAllProduct();

  const allProducts = data?.data || [];
  // Fetch doctors - ADD THIS LINE
  const doctors = await getAllDoctors();

  // Fetch services
  const services = await getAllService()


  return (
    <>
      {/* <NavBar userCartProducts={products?.data} /> */}
      <div className="">
        <Banner banners={[]} />
        <div
        // style={{
        //   backgroundImage: `url(${Text1.src})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
        >
          <BenefitsSection />
          <HomeDoctorSection doctors={doctors} />
          <EyeServices services={services} />
          <WhyChooseUs />
          {/* <WhyChooseUs /> */}
          {/* <Category /> */}
          {/* <Offer offrs={offrs} /> */}
          {/* <SubCategory /> */}
          {/* <ChildCategory />   */}
        </div>

        <div
        // style={{
        //   backgroundImage: `url(${Text1.src})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover",
        //   backgroundPosition: "center",
        // }}
        >
          {/* <PopularItems products={popularProducts} /> */}

          {/* <Campaign campaign={campaign[0]} /> */}

          {/* <Subscribe /> */}

        </div>

        {/* <HomeProductSection /> */}

      </div>
    </>
  );
};

export default page;