"use client";

import Image from "next/image";
import React, { useState, useEffect } from "react";
import logo from "@/assets/logo/logo.png";
// import SearchForm from "../SearchForm/SearchForm";
import Link from "next/link";
import { BsCart2 } from "react-icons/bs";
import { FiUser, FiPhone, FiMapPin } from "react-icons/fi";
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
import { openLocationModal } from "@/components/kocation/LocationModalWrapper";

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
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  // location
  const [selectedLocation, setSelectedLocation] = useState({ city: "", area: "" })
  // const [showLocationModal, setShowLocationModal] = useState(false)

  // const pathname = usePathname();
  // const isShopPage = pathname === "/shop";

  // Animated placeholder texts
  const placeholders = [
    "Search for products...",
    "Find your perfect item...",
    "What are you looking for?",
    "Discover amazing deals...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

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
  useEffect(() => {
    const city = localStorage.getItem('selectedCity') || ""
    const area = localStorage.getItem('selectedArea') || ""
    setSelectedLocation({ city, area })
  }, [])

  // Listen for location changes
  useEffect(() => {
    const handleStorageChange = () => {
      const city = localStorage.getItem('selectedCity') || ""
      const area = localStorage.getItem('selectedArea') || ""
      setSelectedLocation({ city, area })
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('locationChanged', handleStorageChange)

    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('locationChanged', handleStorageChange)
    }
  }, [])

  return (
    <>
      {/* Main Navbar - Sticky */}
      <div className="py-2 fixed w-full z-40 top-0 bg-white px-4 md:px-6 shadow-sm backdrop-blur-lg">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
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
            <div className="md:w-[80px] w-[50px]">
              <Link href="/">
                <Image
                  src={logo || null}
                  alt="Unicrescent | Best E-commerce platform in BD"
                  width={150}
                  height={60}
                  className="w-full h-full"
                />
              </Link>
            </div>
          </div>

          {/* Desktop Search Bar with Animated Placeholder */}
          <div className=" hidden lg:block flex-1 max-w-md relative">
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none transition-colors duration-300"
                placeholder=""
              />
              <motion.div
                key={placeholderIndex}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              >
                {placeholders[placeholderIndex]}
              </motion.div>
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1.5 rounded-md hover:bg-primary transition-colors duration-300">
                <IoSearchOutline className="text-lg" />
              </button>
            </div>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center lg:gap-2.5 gap-1 ">
            {/* Location Display - Desktop */}
            <div
              onClick={() => openLocationModal()}
              className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer transition-colors"
            >
              <FiMapPin className="text-primary text-lg" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Deliver to</span>
                <span className="text-xs font-semibold text-gray-700">
                  {selectedLocation.city && selectedLocation.area
                    ? `${selectedLocation.area}, ${selectedLocation.city}`
                    : "Select Location"
                  }
                </span>
              </div>
            </div>
            {/* Contact Number */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded-lg">
              <FiPhone className="text-primary text-lg" />
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">Call Us</span>
                <span className="text-xs font-semibold text-gray-700">+8801571-155612</span>
              </div>
            </div>

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

      {/* Secondary Navbar - Categories (Smaller) */}
      {/* <div className="hidden lg:block w-full  bg-primary text-white sticky top-[80px] z-30 shadow-sm backdrop-blur-lg">
        <div className="lg:px-[220px] px-4 py-2">
          <div className="flex items-center justify-center gap-6">
            {categories?.map((category, index) => (
              <div
                onMouseEnter={() => setActiveCategory(category.id || category.name)}
                onMouseLeave={() => setActiveCategory(null)}
                key={index}
                className="relative group"
              >
                <Link href={`/shop?category=${category.id || category.slug}`}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-sm font-medium text-gray-0 hover:text-primary tracking-wide
                     duration-300 cursor-pointer whitespace-nowrap py-1.5 px-3 rounded-md group-hover:bg-white transition-all"
                  >
                    {category.name || category.title}
                  </motion.div>
                </Link>

                {category.subCategories &&
                  category.subCategories.length > 0 &&
                  activeCategory === (category.id || category.name) && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-full left-0 mt-2 bg-white shadow-xl rounded-lg p-3 min-w-[200px] z-50 border border-gray-200"
                    >
                      <div className="flex flex-col gap-0.5">
                        {category.subCategories.map((subCat: any, subIndex: number) => (
                          <Link
                            key={subIndex}
                            href={`/shop?category=${category.id || category.slug}&subcategory=${subCat.id || subCat.slug}`}
                          >
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="text-sm text-gray-600 hover:text-primary hover:bg-orange-50 p-2 rounded-md transition-all duration-200"
                            >
                              {subCat.name || subCat.title}
                            </motion.div>
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
              </div>
            ))}
          </div>
        </div>
      </div> */}

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