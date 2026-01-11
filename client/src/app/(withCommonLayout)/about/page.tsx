import React from "react";
import aboutImage from "@/assets/logo/logo.png";
import Image from "next/image";
// import NavBar from "@/components/pages/header/NavBar/NavBar";
// import { getCartProducts } from "@/services/cart";
// import { getUser } from "@/services/auth";
import { Metadata } from "next";
import About from "../../../assets/about/about.jpeg"
import EyeHospital from "../../../assets/about/eye-hospital.png"
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dhamrai Drisiti Kalyan Eye Hospital | About",
  description: "Best E-commerce platform in BD",
};

const page = async () => {
  // const user = await getUser();
  // const userRef = user?.id;
  // const coupon = "";
  // const userCartProducts = await getCartProducts(userRef, coupon);



  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 mt-14 md:mt-20">
      <div>
        <Image
          src={About}
          alt="Dhamrai Drisiti Kalyan Eye Hospital apparel — shirts and polos"
          className="w-full h-auto rounded-lg shadow-sm object-cover"
        />
      </div>
      <div className="max-w-7xl mx-auto">
        <div className="min-h-screen bg-background">
          {/* Hero Section */}
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-16">
            <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6 leading-tight text-balance">
                  Building a Healthy Society Through Clear Vision
                </h1>
                <p className="text-xl text-primary font-semibold mb-6">Better Eye Care for a Better Bangladesh</p>
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Eyes are not just windows to sight—they are the foundation of education, productivity, safety, and
                  national development. Only when every individual in a society has healthy vision can that society truly
                  become progressive, self-reliant, and forward-looking.
                </p>
                <div className="flex gap-4">
                  <Link
                    href="/contact"
                    className="px-8 py-3 bg-primary  text-white font-medium rounded-lg hover:opacity-90 transition"
                  >
                    Contact Us
                  </Link>

                  <Link
                    href="/doctor"
                    className="px-8 py-3 border-2 border-foreground bg-primary  text-white font-medium rounded-lg hover:bg-foreground hover:text-background transition"
                  >
                    Our Services
                  </Link>
                </div>
              </div>
              <div className="bg-muted rounded-xl overflow-hidden shadow-lg">
                <Image
                  src={EyeHospital}
                  alt="Dhamrai Drisiti Kalyan Eye Hospital apparel — shirts and polos"
                  className="w-full h-auto rounded-lg shadow-sm object-cover"
                />
              </div>
            </div>

            {/* Healthy Eyes Section */}
            <div className="bg-muted rounded-2xl p-8 md:p-12 mb-20">
              <h2 className="text-3xl font-bold text-foreground mb-8">Healthy Eyes Mean a Healthy Society</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <ul className="space-y-4 text-lg text-muted-foreground">
                  <li className="flex items-start gap-4">
                    <span className="text-primary font-bold text-2xl mt-1">+</span>
                    <span>Children learn faster and more effectively</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-primary font-bold text-2xl mt-1">+</span>
                    <span>Working professionals become more productive</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-primary font-bold text-2xl mt-1">+</span>
                    <span>Elderly people remain independent</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-primary font-bold text-2xl mt-1">+</span>
                    <span>The risk of accidents is reduced</span>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="text-primary font-bold text-2xl mt-1">+</span>
                    <span>Families and communities stay safe and secure</span>
                  </li>
                </ul>
              </div>
              <p className="text-lg text-muted-foreground mt-8 italic border-l-4 border-primary pl-6">
                Loss of vision does not only mean blindness—it means the loss of dreams, potential, and life's momentum.
              </p>
            </div>

            {/* Vision Statement */}
            <div id="vision" className="text-center mb-20">
              <h2 className="text-4xl font-bold text-foreground mb-8">
                Eye Care Is the Foundation of a Smart and Prosperous Nation
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8 leading-relaxed">
                From villages to cities, schools to factories, workplaces to families—where proper eye care exists, progress
                moves faster.
              </p>
              <div className="bg-primary text-white p-8 rounded-xl max-w-2xl mx-auto">
                <p className="text-lg font-medium leading-relaxed">
                  Compassionate eye specialists + modern medical technology + public awareness = a nation with clear vision
                  and a brighter future
                </p>
              </div>
            </div>

            {/* Services Section */}
            <div id="services" className="mb-20">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Our Advanced Eye Care Services</h2>
                <p className="text-xl text-primary font-semibold">Dhamrai Dristi Kalyan Eye Hospital</p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {[
                  "Comprehensive eye check-up",
                  "Diabetic retina screening",
                  "Cataract surgery using modern technology",
                  "Glaucoma diagnosis and treatment",
                  "Accurate spectacle power testing",
                  "Digital eye examination",
                  "Specialized pediatric eye care",
                  "Cornea, retina, and optic nerve evaluation",
                  "Low vision care",
                  "Dry eye treatment",
                  "Emergency eye services (24/7)",
                  "Affordable treatment packages",
                ].map((service, index) => (
                  <div
                    key={index}
                    className="bg-background p-6 rounded-lg border border-gray-200 hover:border-primary transition hover:shadow-md"
                  >
                    <p className="text-foreground font-medium text-lg">{service}</p>
                  </div>
                ))}
              </div>

              <div className="bg-muted p-6 rounded-xl text-center">
                <p className="text-lg text-muted-foreground italic">
                  For us, every patient is not just a case—they are a valuable member of our society, and protecting their
                  vision is our responsibility.
                </p>
              </div>
            </div>

            {/* Vision Development */}
            <div className="bg-foreground text-background rounded-2xl p-8 md:p-12 mb-20">
              <h2 className="text-3xl font-bold mb-6">Vision Is the Light of Development</h2>
              <p className="text-lg mb-6 leading-relaxed">
                A society that protects the eyesight of its people builds a future that is visionary, productive, and
                secure.
              </p>
              <p className="text-xl font-semibold">
                Let us work together to build a healthy, prosperous, and enlightened Bangladesh through the power of clear
                vision.
              </p>
            </div>

            {/* Contact Section */}
            <div id="contact" className="bg-primary text-white rounded-2xl p-8 md:p-12 text-center">
              <h3 className="text-3xl font-bold mb-6">Dhamrai Dristi Kalyan Eye Hospital</h3>
              <p className="text-lg mb-8 opacity-90">Emergency Contact Available 24/7</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a href="tel:01922228733" className="text-3xl font-bold hover:underline">
                  01922-228733
                </a>
                <span className="hidden sm:inline opacity-50">|</span>
                <a href="tel:01568364872" className="text-3xl font-bold hover:underline">
                  01568-364872
                </a>
              </div>
            </div>
          </section>

        </div>
      </div >
    </section >
  );
};

export default page;
