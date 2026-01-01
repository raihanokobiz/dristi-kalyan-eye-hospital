"use client";

import Link from "next/link";
import Image from "next/image";
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
    doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {


    return (
        <div className="bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
            {/* Image */}
            <div className="relative h-40 sm:h-44 w-full bg-gray-200">
                <Image
                    src={doctor?.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 25vw"
                />

                {doctor.status && (
                    <span className="absolute top-2 right-2 bg-green-500 text-white text-[10px] px-2 py-0.5 rounded-full">
                        Available
                    </span>
                )}
            </div>

            {/* Content */}
            <div className="p-3">
                {/* Name */}
                <h3 className="text-sm sm:text-base font-semibold text-gray-800 line-clamp-1">
                    {doctor.name}
                </h3>

                {/* Degree */}
                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {doctor.degree}
                </p>

                {/* Visiting Time */}
                <div className="flex items-center gap-1.5 mt-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <span className="text-xs text-gray-600 line-clamp-1">
                        {doctor.visitingTime}
                    </span>
                </div>

                {/* Fee + Button */}
                <div className="flex items-center justify-between mt-3">
                    <span className="text-sm font-bold text-primary">
                        ৳{doctor.consultationFee}
                    </span>

                    <Link href={`/doctor/${doctor._id}`}>
                        <button className="text-xs bg-primary hover:bg-primary/90 text-white px-3 py-1.5 rounded-md">
                            Details
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;
