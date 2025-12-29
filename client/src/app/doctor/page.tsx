"use client";

import { useState, useEffect } from "react";
import DoctorCard from "@/components/doctorCard/DoctorCard";
import { Doctor, DoctorResponse, DoctorFilter } from "@/types/doctor";

const DoctorPage: React.FC = () => {
    const [doctors, setDoctors] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState<DoctorFilter>({
        day: "all",
    });

    // Fetch all doctors
    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async (): Promise<void> => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctor`
            );
            const data: DoctorResponse = await response.json();

            if (data.statusCode === 200 && Array.isArray(data.data)) {
                setDoctors(data.data);
            }
        } catch (err) {
            setError("Failed to fetch doctors");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    // Get unique days from available doctors
    const days: string[] = [
        "all",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];

    // Filter doctors
    const filteredDoctors: Doctor[] = doctors.filter((doctor) => {
        const dayMatch =
            filter.day === "all" ||
            doctor.availableDays?.some(day => day.toLowerCase() === filter.day.toLowerCase());

        return dayMatch && doctor.status;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Our Doctors
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Meet our experienced and dedicated medical professionals ready to
                        serve you
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Day Filter */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Filter by Available Day
                            </label>
                            <select
                                value={filter.day}
                                onChange={(e) => setFilter({ ...filter, day: e.target.value })}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {days.map((day) => (
                                    <option key={day} value={day}>
                                        {day === "all" ? "All Days" : day.charAt(0).toUpperCase() + day.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-sm text-gray-600">
                        Showing {filteredDoctors.length} doctor(s)
                    </div>
                </div>

                {/* Doctor Cards Grid */}
                {filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredDoctors.map((doctor) => (
                            <DoctorCard key={doctor._id} doctor={doctor} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 mx-auto text-gray-400 mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No doctors found
                        </h3>
                        <p className="text-gray-500">
                            Try adjusting your filters to see more results
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorPage;