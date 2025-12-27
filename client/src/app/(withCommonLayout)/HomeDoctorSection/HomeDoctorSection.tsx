import Link from "next/link";
import DoctorCard from "@/components/doctorCard/DoctorCard";
import { Doctor } from "@/types/doctor";
import { Stethoscope } from "lucide-react";

interface HomeDoctorSectionProps {
    doctors: Doctor[];
}

const HomeDoctorSection: React.FC<HomeDoctorSectionProps> = ({ doctors }) => {
    // Show only first 6 doctors
    const displayDoctors = doctors.slice(0, 6);

    if (displayDoctors.length === 0) {
        return null;
    }

    return (
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-10">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <Stethoscope className="h-8 w-8 text-primary" />
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Our Expert Doctors
                        </h2>
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Meet our experienced and dedicated medical professionals
                    </p>
                </div>

                {/* Doctor Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
                    {displayDoctors.map((doctor) => (
                        <DoctorCard key={doctor._id} doctor={doctor} />
                    ))}
                </div>

                {/* View All Button */}
                <div className="text-center">
                    <Link href="/doctor">
                        <button className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                            View All Doctors
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 inline-block ml-2"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                                />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default HomeDoctorSection;