"use client";

import React, { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Image from "next/image";
import Why from "../../../../assets/whychouseus/why.jpg"
import { getBannersByType } from "@/services/banners";
import { TBanner } from "@/types";

const accordionData = [
    {
        id: "why",
        title: "WHY CHOOSE US?",
        items: [
            "Experienced and compassionate eye specialists",
            "Modern diagnostic and surgical technology",
            "Patient-centered, ethical, and affordable care",
            "Commitment to community eye health and awareness",
        ],
    },
    {
        id: "what",
        title: "WHAT WE DO?",
        items: [
            "Provide complete eye care for children, adults, and the elderly",
            "Offer advanced diagnostic, medical, and surgical eye treatments",
            "Focus on prevention, early detection, and long-term eye health",
            "Ensure accessible and quality eye care for every patient",
        ],
    },
    {
        id: "other",
        title: "OTHER SERVICES",
        items: [
            "Glaucoma (Eye Pressure) Examination & Treatment",
            "Pediatric Eye Examination",
            "Cornea, Retina & Optic Nerve Evaluation",
            "Low Vision Care & Dry Eye Treatment",
            "Affordable Treatment & Surgery Packages",
            "Patient Counseling & Eye Health Awareness Programs",
        ],
    },
];

export default function WhyChooseUsTwo() {
    const [expanded, setExpanded] = useState<string | null>("why");
    const [bannerImage, setBannerImage] = useState<string>(Why.src);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAboutBanner = async () => {
            try {
                const response = await getBannersByType("ABOUT US BANNER");
                if (response?.data && response.data.length > 0) {
                    const activeBanner = response.data.find((banner: TBanner) => banner.image);
                    if (activeBanner?.image) {
                        setBannerImage(activeBanner.image);
                    }
                }
            } catch (error) {
                console.error("Error fetching about banner:", error);
                // Keep default image on error
            } finally {
                setLoading(false);
            }
        };

        fetchAboutBanner();
    }, []);

    const toggle = (id: string) => {
        setExpanded(expanded === id ? null : id);
    };

    return (
        <div className="bg-gradient-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto py-12 px-4">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">

                    {/* Image */}
                    <div className="relative rounded-md overflow-hidden shadow-2xl h-[300px] md:h-[550px]">
                        {loading ? (
                            <div className="w-full h-full bg-gray-200 animate-pulse" />
                        ) : (
                            <Image
                                fill
                                src={bannerImage}
                                alt="Dhamrai Dristi Kalyan Eye Hospital"
                                className="object-cover"
                                priority
                            />
                        )}
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-4">
                                About Dhamrai Dristi Kalyan Eye Hospital
                            </h1>
                            <p className="text-lg text-gray-600">
                                The eyes are not just windows to vision — they are the foundation
                                of education, productivity, safety, and progress.
                            </p>
                        </div>

                        {/* Accordion */}
                        <div className="space-y-3">
                            {accordionData.map((section) => {
                                const isOpen = expanded === section.id;

                                return (
                                    <div
                                        key={section.id}
                                        className={`rounded-md overflow-hidden shadow-sm border ${isOpen
                                            ? "border-teal-600"
                                            : "border-gray-200 bg-white"
                                            }`}
                                    >
                                        <button
                                            onClick={() => toggle(section.id)}
                                            className={`w-full px-6 py-4 flex justify-between items-center transition-colors cursor-pointer ${isOpen
                                                ? "bg-teal-600 text-white"
                                                : "bg-white text-gray-800 hover:bg-gray-50"
                                                }`}

                                        >
                                            <span className="font-semibold text-lg">
                                                {section.title}
                                            </span>
                                            {isOpen ? (
                                                <ChevronUp className="w-5 h-5" />
                                            ) : (
                                                <ChevronDown className="w-5 h-5" />
                                            )}
                                        </button>

                                        {isOpen && (
                                            <div className="px-6 py-4 bg-gray-50">
                                                <ul className="space-y-2 text-gray-700">
                                                    {section.items.map((item, i) => (
                                                        <li key={i}>• {item}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
