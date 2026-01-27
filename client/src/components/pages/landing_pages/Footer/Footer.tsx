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
      name: "About us",
      link: "/about",
    },
    {
      name: "Doctor Appointment",
      link: "/doctor",
    },
    {
      name: "Product",
      link: "/shop",
    },
    {
      name: "Blogs",
      link: "/blogs",
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
      <div className="Container bg-[#D9D9D9] py-10 lg:py-16 px-4 md:px-6 2xl:px-0">
        <div className=" max-w-7xl mx-auto flex flex-col lg:flex-row justify-between space-y-5">
          <div>
            <div className="text-black font-semibold mb-5 text-xl">
              Contact Info
            </div>
            <div className="text-black text-md lg:text-lg flex flex-col space-y-1">
              <div>WhatsApp: 01922-228733</div>
              <div>Phone: 01922-228733</div>
              <div>email: careerhunter81@gmail.com</div>
              <div>Address: Alam Plaza (2nd Floor), Rothkhola, <br className=" hidden lg:block" /> Dhamrai Bazar, Dhamrai, Dhaka-1350</div>
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
              <div className="flex lg:items-center gap-2 mt-4">
                <a
                  href="https://www.facebook.com/share/1G2GRAdbfA/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 bg-[#2563EB] rounded text-white border border-[#fff]/0 hover:scale-95 hover:border-[#fff] hover:border duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="https://www.youtube.com/@rapideasylife"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-2 py-2 bg-red-500 rounded text-white border border-[#fff]/0 hover:scale-95 hover:border-[#fff] hover:border duration-300"
                  aria-label="YouTube"
                >
                  <FaYoutube />
                </a>
              </div>
            </div>
            <div className="mt-4" >
              <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d937548.7191268265!2d89.5944864637911!3d23.377373444051237!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fe2955f76cf27b%3A0xe77754f2d6c02859!2z4Kaw4Kal4KaW4KeL4Kay4Ka-IOCmrOCmvuCmnOCmvuCmsA!5e0!3m2!1sen!2sbd!4v1768053267114!5m2!1sen!2sbd"></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#37383F] text-white text-center py-4">
        <div className=" max-w-7xl lg:mx-auto md:mx-6 flex flex-col gap-1 md:flex-row items-center justify-between">
          <h2>Copyright © 2025 Dhamrai Drisiti Kalyan Eye Hospital. All Right Reserved.</h2>
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
