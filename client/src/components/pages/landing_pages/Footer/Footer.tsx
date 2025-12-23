"use Client";
import React from "react";
// import {
//   FaFacebookF,
//   FaInstagram,
//   FaYoutube,
// } from "react-icons/fa";
import Link from "next/link";
import DownFooter from "../../DownFooter/DownFooter";
import { FaFacebookF, FaYoutube } from "react-icons/fa";

interface FooterProps {
  userCartProducts: {
    cartDetails: any[];
  };
}


const Footer: React.FC<FooterProps> = ({ userCartProducts }) => {

  const quickLink = [
    {
      name: "Shop",
      link: "/shop",
    },
    {
      name: "Our Outlets",
      link: "/outlets",
    },
    {
      name: "Our story",
      link: "/about",
    },
    {
      name: "Contact Us",
      link: "/contact",
    },
  ];

  const information = [
    {
      name: "Privacy Policy",
      link: "/privacyPolicy",
    },
    {
      name: "Return Policy",
      link: "/returnPolicy",
    },
    {
      name: "Terms & Condition",
      link: "/terms-condition",
    },
  ];

  return (
    <div className="relative">
      <div className="Container bg-[#D9D9D9] py-10 lg:py-16 px-4 md:px-6 lg:px-0">
        <div className=" max-w-6xl mx-auto flex flex-col lg:flex-row justify-between space-y-5">
          <div>
            <div className="text-black font-semibold mb-5 text-xl">
              Contact Info
            </div>
            <div className="text-black text-md lg:text-lg flex flex-col space-y-1">
              <div>WhatsApp: 01571-155612</div>
              <div>Phone: 01571-155612</div>
              <div>email: anisggn@gmail.com</div>
              {/* <div>Address: Miprur 2, Oposite of Stadium Gate no. 1. Dhaka</div> */}
            </div>
          </div>
          <div>
            <div className="text-black font-semibold mb-5 text-xl">
              Quick Links
            </div>
            <ul className="text-black text-xl">
              {quickLink.map((item, index) => (
                <div key={index}>
                  <Link href={item.link}>
                    <li className="my-1 relative group cursor-pointer">
                      <span className="inline-block transition-all duration-300 group-hover:translate-x-2 group-hover:text-black text-md lg:text-lg">
                        {item.name}
                      </span>
                    </li>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-black font-semibold mb-5 text-xl">
              Infromation
            </div>
            <ul className="text-black text-xl">
              {information.map((item, index) => (
                <div key={index}>
                  <Link href={item.link}>
                    <li className="my-1 relative group cursor-pointer">
                      <span className="inline-block transition-all duration-300 group-hover:translate-x-2 group-hover:text-black text-md lg:text-lg">
                        {item.name}
                      </span>
                    </li>
                  </Link>
                </div>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-black font-semibold mb-5 text-xl">
              Social Media
            </div>
            <div className="">
              <div className="flex lg:justify-center lg:items-center gap-2 mt-4">
                <a
                  href="https://www.facebook.com/share/16seK1S2dm/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 bg-[#2563EB] rounded text-white border border-[#fff]/0 hover:scale-95 hover:border-[#fff] hover:border duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>

                <a
                  href="https://www.youtube.com/@ANFMeatFish"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 bg-[#F60000] rounded text-[#fff] border border-[#fff]/0 hover:scale-95 hover:border-[#fff] hover:border duration-300"
                  aria-label="youtube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#37383F] text-white text-center py-4">
        <div className=" max-w-6xl lg:mx-auto md:mx-6 flex flex-col gap-1 md:flex-row items-center justify-between">
          <h2>Copyright © 2025 ANF Meat. All Right Reserved.</h2>
          <h3>   Developed by{" "}
            <a target="_blank" href="https://okobiz.com/">
              Okobiz
            </a></h3>
        </div>
      </div>
      <DownFooter userCartProducts={userCartProducts} />
    </div>
  );
}

export default Footer;
