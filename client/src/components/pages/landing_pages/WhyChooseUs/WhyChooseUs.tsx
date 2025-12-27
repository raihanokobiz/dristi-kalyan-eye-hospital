"use client";

import React from "react";

import photo1 from "@/assets/whychouseus/1.jpg";
import photo2 from "@/assets/whychouseus/2.jpg";
import photo3 from "@/assets/whychouseus/3.jpg";
import photo4 from "@/assets/whychouseus/4.jpg";

import { WhyChooseUsCard } from "./WhyChooseUsCard";

export function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Why Dhamrai Dristi Kalyan Eye Hospital?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm sm:text-base">
            We provide trusted and affordable eye care services with experienced
            doctors, modern technology, and a patient-centered approach.
          </p>
        </div>

        {/* Cards only */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <WhyChooseUsCard
            title="Experienced Eye Specialists"
            image={photo1}
          />
          <WhyChooseUsCard
            title="Advanced Eye Care Technology"
            image={photo2}
          />
          <WhyChooseUsCard
            title="Emergency Eye Care Support"
            image={photo3}
          />
          <WhyChooseUsCard
            title="Patient-Centered Treatment"
            image={photo4}
          />
        </div>
      </div>
    </section>
  );
}
