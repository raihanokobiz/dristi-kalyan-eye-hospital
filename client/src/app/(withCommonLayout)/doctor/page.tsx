"use client";

import { useEffect, useState } from "react";
import DoctorCard from "@/components/doctorCard/DoctorCard";

const DoctorPage = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filter, setFilter] = useState({
        day: "all",
    });

    const days = [
        "all",
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
    ];

    useEffect(() => {
        fetchDoctors();
    }, []);

    const fetchDoctors = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctor`
            );
            const data = await response.json();

            if (data?.statusCode === 200 && Array.isArray(data.data)) {
                setDoctors(data.data);
            } else {
                setError("No doctors available");
            }
        } catch (err) {
            console.error(err);
            setError("Failed to load doctors");
        } finally {
            setLoading(false);
        }
    };

    const filteredDoctors = doctors.filter((doctor:any) => {
        const dayMatch =
            filter.day === "all" ||
            doctor.availableDays?.some(
                (d:any) => d.toLowerCase() === filter.day.toLowerCase()
            );

        return doctor.status && dayMatch;
    });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="h-14 w-14 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-red-500 text-lg">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* HEADER */}
                <div className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900">
                        Book a Doctor Appointment
                    </h1>
                    <p className="mt-3 text-gray-600 max-w-2xl">
                        Select a doctor based on availability and book your
                        appointment in just a few steps.
                    </p>
                </div>

                {/* FILTER */}
                <div className="bg-white rounded-xl shadow-sm p-4 mb-10 sticky top-4 z-10">
                    <div className="flex flex-col md:flex-row md:items-end gap-6">
                        <div className="w-full md:w-1/3">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Available Day
                            </label>
                            <select
                                value={filter.day}
                                onChange={(e) =>
                                    setFilter({
                                        ...filter,
                                        day: e.target.value,
                                    })
                                }
                                className="w-full rounded-lg border-gray-300 px-4 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                            >
                                {days.map((day) => (
                                    <option key={day} value={day}>
                                        {day === "all"
                                            ? "All Days"
                                            : day.charAt(0).toUpperCase() +
                                              day.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                    </div>
                </div>

                {/* DOCTOR LIST */}
                {filteredDoctors.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredDoctors.map((doctor:any) => (
                            <DoctorCard
                                key={doctor._id}
                                doctor={doctor}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-24 w-24 mx-auto text-gray-400 mb-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">
                            No doctors available
                        </h3>
                        <p className="text-gray-500">
                            Try selecting a different day
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DoctorPage;
