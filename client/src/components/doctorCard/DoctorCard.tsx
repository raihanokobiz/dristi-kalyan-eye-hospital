"use client";

import Link from "next/link";
import Image from "next/image";
import { DotIcon, Clock } from "lucide-react";
import { Doctor } from "@/types/doctor";

interface DoctorCardProps {
    doctor: Doctor;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {

    return (
        <div className="bg-white rounded-md border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <Link href={`/doctor/${doctor._id}`} className="block">
                {/* IMAGE */}
                <div className="relative h-40 lg:h-60 w-full">
                    <Image
                        src={doctor?.image}
                        alt={doctor.name}
                        fill
                        className="object-fill group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "/images/default-doctor.jpg";
                        }}
                    />

                    {/* STATUS BADGE */}
                    {doctor.status && (
                        <div className="absolute top-1 left-1 lg:top-3 lg:left-3 bg-white/95 backdrop-blur rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                            <DotIcon className=" hidden lg:block text-green-500" />
                            <span className="text-xs font-semibold text-green-600">
                                Available
                            </span>
                        </div>
                    )}
                </div>

                {/* CONTENT */}
                <div className="p-5">
                    {/* NAME */}
                    <h3 className="text-base font-semibold text-gray-900 leading-tight line-clamp-1">
                        {doctor.name}
                    </h3>

                    {/* DEGREE / SPECIALTY */}
                    <p className=" hidden lg:block text-sm text-gray-500 mt-1 line-clamp-2">
                        {doctor.degree}
                    </p>

                    {/* VISITING TIME */}
                    <div className="flex items-center gap-2 mt-4 text-gray-600">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm line-clamp-1">
                            {doctor.visitingTime}
                        </span>
                    </div>

                    {/* DIVIDER */}
                    <div className="border-t border-gray-100 my-4" />

                    {/* CTA */}
                    <div className="flex items-center justify-between">
                        {/* Fee (optional, uncomment if needed) */}
                        {/* {doctor.consultationFee && (
                            <span className="text-sm font-semibold text-gray-800">
                                ৳{doctor.consultationFee}
                            </span>
                        )} */}

                        <span className=" w-full ml-auto inline-flex items-center justify-center px-4 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition">
                            View Details
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default DoctorCard;
