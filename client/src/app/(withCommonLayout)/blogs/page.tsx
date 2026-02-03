import NavBar from "@/components/pages/header/NavBar/NavBar";
import BlogCard from "@/components/pages/landing_pages/BlogCard/BlogCard";
import { getUser } from "@/services/auth";
import { getAllBlogs } from "@/services/blogs";
import { getCartProducts } from "@/services/cart";
import React from "react";
import Image from "next/image";
import BlogBanner from "../../../assets/blog/blog.webp"

// Define the Blog type
type Blog = {
  id: string;
  title: string;
  details: string;
  image: string;
  tags: string[];
  createdAt: string;
  author: string;
  slug: string;
};

const page = async () => {
  const user = await getUser();
  const userRef = user?.id;
  const coupon = "";
  const userCartProducts = await getCartProducts(userRef, coupon);
  const allBlogs = await getAllBlogs();

  return (
    <div>
      <NavBar userCartProducts={userCartProducts?.data} />
      {/* Banner Section */}
      <section className="max-w-7xl mx-auto Container relative h-[30vh] flex flex-col justify-center items-center text-center overflow-hidden mt-24">
        <Image
          src={BlogBanner}
          alt="About Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="relative z-20 px-4">
          <h1 className="text-xl md:text-3xl lg:text-5xl font-bold text-white drop-shadow-2xl mb-3">
            Welcome to{" "}
            <span className="">Dhamrai Drisiti Kalyan Eye Hospital</span>
          </h1>
        </div>
      </section>
      <div className="max-w-7xl mx-auto Container ">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-4">
          {/*  alBlogs map  */}
          {
            Array.isArray(allBlogs?.data) &&
            allBlogs?.data?.map((blog: Blog) => (
              <BlogCard
                key={blog.id}
                title={blog.title}
                details={blog.details}
                image={blog.image}
                tags={blog.tags}
                date={blog.createdAt}
                author={blog.author}
                slug={blog.slug}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default page;
