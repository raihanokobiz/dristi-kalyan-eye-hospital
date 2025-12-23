"use client";

import Image from "next/image";
import type React from "react";
import { useState } from "react";
import F1 from "../../../../assets/subscribe/S1.png";
import FAnimation from "../../../../assets/subscribe/FishAnimation.json";
import { Player } from "@lottiefiles/react-lottie-player";
import { addSubscribe } from "@/services/subscribe";

export function Subscribe() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.preventDefault();

    await addSubscribe({ email });
    setEmail("");
  };

  return (
    <section className="relative max-w-6xl mx-auto px-4 md:px-6 py-6 md:py-10  lg:py-12">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-50/40 to-blue-50/40 pointer-events-none" />
      <Player
        autoplay
        loop
        src={FAnimation}
        className="absolute inset-0 left-1/2 -translate-x-1/2 w-full h-full opacity-60 pointer-events-none"
      />
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left Content */}
          <div className="flex-1 z-10">
            <h2 className="text-4xl md:text-5xl font-bold italic mb-3">
              SUBSCRIBE!
            </h2>
            <p className="text-lg mb-6">Subscribe and Get Regular Offer</p>
            {/* Email Form */}
            <form onSubmit={handleSubmit} className="flex max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Email"
                className="flex-1 px-4 py-3 text-gray-600 placeholder-gray-400 bg-white rounded-l-sm focus:outline-none border border-green-300"
                required
              />
              <button
                type="submit"
                className="px-6 py-3 bg-primary text-white font-semibold uppercase tracking-wide transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
          {/* Right - Woman Image */}
          <div className="flex-1 flex justify-center md:justify-end">
            <Image
              src={F1}
              alt="Woman holding a gift box"
              className="h-[300px] md:h-[350px] object-contain relative z-10 animate-float"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
