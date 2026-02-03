import Banner from "@/components/pages/landing_pages/Banner/Banner";

import React from "react";

import { getAllDoctorsForHomePage } from "@/services/doctor/doctors";
import { getAllServiceForHome } from "@/services/service";
// import { getProductForHomePage } from "@/services/products";
import BenefitsSection from "@/services/benefit/BenefitsSection";
import HomeDoctorSection from "./HomeDoctorSection/HomeDoctorSection";
import { EyeServices } from "@/components/pages/service/EyeServices";
import OurAdvancedServices from "@/components/pages/landing_pages/OurAdvancedServices/OurAdvancedServices";
import WhyChooseUsTwo from "@/components/pages/landing_pages/WhyChooseUsTwo/WhyChooseUsTwo";

const page = async () => {
  

  // const data = await getProductForHomePage();

  // const allProducts = data?.data || [];
  // Fetch doctors - ADD THIS LINE
  const doctors = await getAllDoctorsForHomePage();

  // Fetch services
  const services = await getAllServiceForHome()



  return (
    <>
      {/* <NavBar userCartProducts={products?.data} /> */}
      <div className="">
        <Banner banners={[]} />
        <div
        >
          <OurAdvancedServices />
          {/* <WhyChooseUs /> */}
          <WhyChooseUsTwo />
          <BenefitsSection />
          <HomeDoctorSection doctors={doctors} />
          <EyeServices services={services} />
        </div>
        <div>
        </div>

      </div>
    </>
  );
};

export default page;