"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "@/assets/logo/logo.png";
// import SearchForm from "../SearchForm/SearchForm";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { FiUser, FiPhone, FiCalendar } from "react-icons/fi";
import { RiCloseFill, RiMenuAddFill } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import ResponsiveSearchForm from "../ResponsiveSearchForm/ResponsiveSearchForm";
import ResponsiveNavSidBar from "../ResponsiveNavSidBar/ResponsiveNavSidBar";
import "../NavBar/NavBar.css";
// import { useLanguage } from "@/context/LanguageContext";
// import { getShopSidebar } from "@/services/shopSidebar";
import { getUser, setCorrelation } from "@/services/auth";
import UserPopover from "@/shared/UserPopover/UserPopover";
import { TUser } from "@/types";

// import { usePathname } from "next/navigation";

interface NavBarProps {
  userCartProducts: {
    cartDetails: any[];
  };
}

const NavBar: React.FC<NavBarProps> = ({ userCartProducts }) => {
  // const { t, language, switchLanguage } = useLanguage();

  // const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [showSideMenu, setShowSideMenu] = useState(false);
  // const [ setCategories] = useState<any[]>([]);
  const [usersId, setUsersId] = useState<TUser | null>(null);
 
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // const { data } = await getShopSidebar();
        // setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const userData = async () => {
      try {
        const user = await getUser();
        setUsersId(user);
      } catch (error) {
        console.error("get user:", error);
      }
    };

    userData();
  }, []);

  const userName = usersId?.name;

  useEffect(() => {
    const setCorrelationAsync = async () => {
      await setCorrelation();
    };
    setCorrelationAsync();
  }, []);



  // Load location from localStorage
  // useEffect(() => {
  //   const city = localStorage.getItem('selectedCity') || ""
  //   const area = localStorage.getItem('selectedArea') || ""
  //   setSelectedLocation({ city, area })
  // }, [])

  // // Listen for location changes
  // useEffect(() => {
  //   const handleStorageChange = () => {
  //     const city = localStorage.getItem('selectedCity') || ""
  //     const area = localStorage.getItem('selectedArea') || ""
  //     setSelectedLocation({ city, area })
  //   }

  //   window.addEventListener('storage', handleStorageChange)
  //   window.addEventListener('locationChanged', handleStorageChange)

  //   return () => {
  //     window.removeEventListener('storage', handleStorageChange)
  //     window.removeEventListener('locationChanged', handleStorageChange)
  //   }
  // }, [])

  return (
    <>
      {/* Main Navbar - Sticky */}
      <div className="py-4 md:py-5 fixed w-full z-40 top-0 bg-white px-4 md:px-6 shadow-sm backdrop-blur-lg">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center justify-between  gap-4">
            <div
              onClick={() => setShowSideMenu(!showSideMenu)}
              className="cursor-pointer lg:hidden"
            >
              {showSideMenu ? (
                <RiCloseFill className="text-2xl" />
              ) : (
                <RiMenuAddFill className="text-2xl" />
              )}
            </div>
            <div className=" relative w-22.5 md:w-22.5  h-15">
              <Link href="/">
                <Image
                  src={logo || null}
                  alt="Eye Hospital"
                  fill
                  className="w-full h-full"
                />
              </Link>
            </div>
          </div>

          {/* Nav Links Desktop */}
          <div className="hidden lg:flex items-center gap-6">
            <Link href="/about" className="text-gray-700 hover:text-primary text-sm font-semibold">
              About Us
            </Link>

            <Link href="/doctor" className="text-gray-700 hover:text-primary text-sm font-semibold">
              Doctor Appointment
            </Link>

            <Link href="/shop" className="text-gray-700 hover:text-primary text-sm font-semibold">
              Product
            </Link>

            <Link href="/blogs" className="text-gray-700 hover:text-primary text-sm font-semibold">
              Blogs
            </Link>

            <Link href="/contact" className="text-gray-700 hover:text-primary text-sm font-semibold">
              Contact Us
            </Link>
          </div>


          {/* Right Side Icons */}
          <div className="flex items-center lg:gap-2.5 gap-1 ">
            {/* Contact Number */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
              <FiPhone className="text-primary text-lg" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Call Us</span>
                <span className="text-xs font-semibold text-gray-700">+8801922-228733</span>
              </div>
            </div>

            {/* appointment button */}
            <Link
              href="/doctor"
              className="hidden lg:flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white hover:bg-primary hover:text-white transition-colors duration-300 border border-primary/30"
            >
              <FiCalendar className="text-lg" />
              <span className="text-sm font-semibold">
                Book Appointment
              </span>
            </Link>


            {/* Mobile Search Icon */}
            <div
              onClick={() => setShowSearch(true)}
              className="px-2 py-2 rounded-full bg-primary text-white lg:font-bold font-semibold cursor-pointer lg:hidden hover:bg-primary transition-colors duration-300"
            >
              <IoSearchOutline className="lg:text-lg text-md" />
            </div>

            {/* Cart */}
            <Link href="/cart" className=" hidden md:block" >
              <div className="px-2 py-2 rounded-full relative bg-primary text-white lg:font-bold font-semibold hover:bg-primary transition-colors duration-300">
                <BsCart2 className="lg:text-lg text-md" />
                <motion.p
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="-top-2 -right-2 absolute w-5 h-5 text-xs text-white flex items-center justify-center rounded-full bg-primary"
                >
                  {userCartProducts?.cartDetails?.length || 0}
                </motion.p>
              </div>
            </Link>

            {/* User */}
            <div className=" hidden md:block">
              {userName ? (
                <div className="p-1.5 border-2 border-gray-300 rounded-lg hover:border-primary transition-colors duration-300">
                  <UserPopover />
                </div>
              ) : (
                <Link href="/login">
                  <div className="px-2 py-2 rounded-full bg-primary text-white lg:font-bold font-semibold hover:bg-primary transition-colors duration-300">
                    <FiUser className="lg:text-lg text-md" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {showSearch && (
          <ResponsiveSearchForm onClose={() => setShowSearch(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showSideMenu && (
          <ResponsiveNavSidBar onClose={() => setShowSideMenu(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;