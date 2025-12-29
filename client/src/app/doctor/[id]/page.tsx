"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Doctor, DoctorResponse } from "@/types/doctor";

const DoctorDetailsPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (params?.id) {
            fetchDoctorDetails();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.id]);

    const fetchDoctorDetails = async (): Promise<void> => {
        try {
            setLoading(true);

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctor/${params.id}`
            );

            const data: DoctorResponse = await response.json();

            if (data.statusCode === 200 && !Array.isArray(data.data)) {
                setDoctor(data.data);
            } else {
                setError("Doctor not found");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to fetch doctor details");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary" />
            </div>
        );
    }

    if (error || !doctor) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4">
                <p className="text-red-500 text-lg">{error}</p>
                <button
                    onClick={() => router.push("/doctor")}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90"
                >
                    Back to Doctors
                </button>
            </div>
        );
    }

    // Image is already a full Cloudinary URL
    const imageUrl = doctor.image || "/images/default-doctor.jpg";

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Back Button */}
                <button
                    onClick={() => router.push("/doctor")}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary mb-8 font-semibold"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to Doctors
                </button>

                {/* Doctor Card */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Image */}
                        <div className="md:w-1/3 relative h-96 bg-gray-200">
                            <Image
                                src={imageUrl}
                                alt={doctor.name}
                                fill
                                className="object-cover"
                                priority
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.src = "/images/default-doctor.jpg";
                                }}
                            />
                        </div>

                        {/* Info */}
                        <div className="md:w-2/3 p-8">
                            {doctor.status && (
                                <span className="inline-block bg-green-100 text-green-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                                    Available
                                </span>
                            )}

                            <h1 className="text-3xl font-bold text-gray-900 mb-4">
                                {doctor.name}
                            </h1>

                            {/* Degree */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Qualifications:
                                </h3>
                                <p className="text-gray-600">{doctor.degree}</p>
                            </div>

                            {/* Contact */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                        Phone:
                                    </h3>

                                    href={`tel:${doctor.phone}`}
                                    className="text-primary hover:underline"

                                    {doctor.phone}

                                </div>

                                <div>
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                        Email:
                                    </h3>

                                    href={`mailto:${doctor.email}`}
                                    className="text-primary hover:underline break-all"

                                    {doctor.email}

                                </div>
                            </div>

                            {/* Visiting Time */}
                            <div className="mb-6">
                                <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                    Visiting Time:
                                </h3>
                                <p className="text-gray-700 font-medium">
                                    {doctor.visitingTime}
                                </p>
                            </div>

                            {/* Available Days */}
                            {doctor.availableDays && doctor.availableDays.length > 0 && (
                                <div className="mb-6">
                                    <h3 className="text-sm font-semibold text-gray-700 mb-2">
                                        Available Days:
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.availableDays.map((day) => (
                                            <span
                                                key={day}
                                                className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full capitalize"
                                            >
                                                {day}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Fee */}
                            <div className="border-t border-gray-200 pt-6 flex justify-between">
                                <span className="font-semibold text-gray-700">
                                    Consultation Fee:
                                </span>
                                <span className="text-3xl font-bold text-primary">
                                    ৳{doctor.consultationFee}
                                </span>
                            </div>

                            <button className="w-full mt-6 bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-lg">
                                Book Appointment
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        </div >
    );
};

export default DoctorDetailsPage;