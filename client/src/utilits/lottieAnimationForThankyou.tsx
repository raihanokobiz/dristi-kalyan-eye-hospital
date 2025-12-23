"use client"
import Lottie from "lottie-react";
import Link from "next/link";
import animationData from "@/assets/animation/thank-you-check.json";



const LottieAnimationForThankyou = () => {

  return (
    <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center space-y-6 mt-12 lg:mt-12">
      <Lottie
        animationData={animationData}
        className="h-[120px] lg:h-[200px]"
        loop={true}
      />
      <h1 className="text-3xl font-bold text-gray-800">ধন্যবাদ!</h1>
      <p className="text-gray-600 text-lg">
        আপনার অর্ডারটি সফলভাবে সম্পূর্ণ হয়েছে 😊
      </p>
      <Link
        href="/shop"
        className="inline-block bg-primary text-white font-semibold px-6 py-2 rounded hover:bg-primary transition duration-300"
      >
        শপে ফিরে যান
      </Link>
    </div>
  );
};

export default LottieAnimationForThankyou;
