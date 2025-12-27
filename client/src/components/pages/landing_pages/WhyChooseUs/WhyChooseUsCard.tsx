import type React from "react";
import Image, { StaticImageData } from "next/image";
import { cn } from "@/lib/utils";

interface WhyChooseUsCardProps {
  title: string;
  image: StaticImageData;
}

export function WhyChooseUsCard({
  title,
  image,
}: WhyChooseUsCardProps) {
  return (
    <div
      className={cn(
        "group bg-white rounded-xl overflow-hidden",
        "border border-gray-100 shadow-sm hover:shadow-lg transition"
      )}
    >
      {/* Image */}
      <div className="relative w-full h-44 sm:h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>

      {/* Text */}
      <div className="p-4 text-center">
        <h4 className="text-sm sm:text-base font-semibold text-gray-800">
          {title}
        </h4>
      </div>
    </div>
  );
}
