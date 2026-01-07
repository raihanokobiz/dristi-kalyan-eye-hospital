"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Doctor, DoctorResponse } from "@/types/doctor";
import { FaArrowRight, FaTimes, FaShareAlt } from "react-icons/fa";
import { DotIcon } from "lucide-react";
import { FiClock, FiMapPin, FiPhoneCall } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const DoctorDetailsPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDay, setSelectedDay] = useState("");

    const [patient, setPatient] = useState({
        name: "",
        phone: "",
        age: "",
        problem: "",
    });

    useEffect(() => {
        if (params?.id) fetchDoctorDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params?.id]);

    const fetchDoctorDetails = async () => {
        try {
            setLoading(true);
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctor/${params.id}`
            );
            const data: DoctorResponse = await res.json();

            if (data.statusCode === 200 && !Array.isArray(data.data)) {
                setDoctor(data.data);
            } else {
                setError("Doctor not found");
            }
        } catch {
            setError("Failed to fetch doctor details");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setPatient({ ...patient, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!selectedDay) {
            toast.error("Please select appointment day");
            return;
        }
        const payload = {
            doctorId: doctor?._id,
            appointmentDay: selectedDay,
            patientName: patient.name,
            phone: patient.phone,
            age: patient?.age,
            problem: patient?.problem,
        };
        console.log("Payload from client", payload);
        try {
            const res = await fetch(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/booking`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) throw new Error("Failed");

            Swal.fire({
                icon: "success",
                title: "Booking Successful!",
                text: "Appointment booked successfull. Our team Will call you soon",
                confirmButtonText: "OK"
            });
            setModalOpen(false);
            setSelectedDay("");
            setPatient({ name: "", phone: "", age: "", problem: "" });
        } catch {
            toast.error("Appointment booking failed ❌");
        }
    };

    const shareDoctor = () => {
        if (typeof window === "undefined" || !doctor) return;

        const url = window.location.href;
        const text = `Check out Dr. ${doctor.name} (${doctor.degree})`;

        if (navigator.share) {
            navigator.share({
                title: doctor.name,
                text,
                url,
            });
        } else {
            window.open(
                `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
                "_blank"
            );
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin h-14 w-14 border-t-4 border-blue-500 rounded-full" />
            </div>
        );
    }

    if (error || !doctor) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => router.push("/doctor")}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Back to Doctors
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 mt-20">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
                        {/* LEFT: Image */}
                        <div className="flex  justify-center">
                            <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                                <Image
                                    src={doctor.image || "/placeholder.svg"}
                                    alt={doctor.name}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                                {doctor.status && (
                                    <div className="absolute top-4 right-4 inline-flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-full text-xs font-bold shadow-md">
                                        <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" />
                                        <span>Available</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Information */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-1">{doctor.name}</h1>
                                <p className="text-teal-600 font-semibold text-lg mb-4">{doctor.degree}</p>

                                <div className="flex items-center gap-2 text-gray-600 mb-6">
                                    <FiMapPin size={18} className="text-teal-600" />
                                    <span>Dhaka Medical Center</span>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <a
                                        href={`tel:${doctor.phone}`}
                                        className="flex items-center gap-3 text-gray-700 hover:text-teal-600 transition-colors"
                                    >
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <FiPhoneCall size={18} className="text-teal-600" />
                                        </div>
                                        <span className="font-medium">{doctor.phone}</span>
                                    </a>

                                    <a
                                        href={`mailto:${doctor.email}`}
                                        className="flex items-center gap-3 text-gray-700 hover:text-teal-600 transition-colors"
                                    >
                                        <div className="p-2 bg-gray-100 rounded-lg">
                                            <span className="text-lg">✉</span>
                                        </div>
                                        <span className="font-medium break-all">{doctor.email}</span>
                                    </a>
                                </div>

                                <div className="flex items-center gap-3 text-gray-700 mb-6">
                                    <div className="p-2 bg-gray-100 rounded-lg">
                                        <FiClock size={18} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-semibold">VISITING HOURS</p>
                                        <p className="font-bold">{doctor.visitingTime}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-xs text-gray-600 font-semibold mb-2">AVAILABLE DAYS</p>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor.availableDays?.map((day) => (
                                            <span
                                                key={day}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-teal-50 transition-colors"
                                            >
                                                {day}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-xs text-gray-600 font-semibold mb-2">CONSULTATION FEE</p>
                                    <p className="text-3xl font-bold text-teal-600">৳{doctor.consultationFee}</p>
                                </div>
                            </div>

                            <button
                                disabled={!doctor.status}
                                onClick={() => setModalOpen(true)}
                                className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 transition-all text-base ${doctor.status
                                    ? "bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Book Appointment
                                {doctor.status && <FaArrowRight size={16} />}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8 relative animate-in fade-in zoom-in-95">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 cursor-pointer"
                        >
                            <FaTimes size={20} />
                        </button>

                        <h2 className="text-2xl font-bold mb-2 text-gray-900">Book Appointment</h2>
                        <p className="text-gray-600 text-sm mb-6 font-medium">With {doctor.name}</p>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <select
                                required
                                value={selectedDay}
                                onChange={(e) => setSelectedDay(e.target.value)}
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                            >
                                <option value="">Select Appointment Day</option>
                                {doctor.availableDays.map((day) => (
                                    <option key={day} value={day}>
                                        {day}
                                    </option>
                                ))}
                            </select>

                            <input
                                name="name"
                                required
                                placeholder="Patient Name"
                                value={patient.name}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                            />

                            <input
                                name="phone"
                                required
                                placeholder="Phone Number"
                                value={patient.phone}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                            />

                            <input
                                name="age"
                                placeholder="Age (optional)"
                                value={patient.age}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                            />

                            <textarea
                                name="problem"
                                placeholder="Describe your problem"
                                value={patient.problem}
                                onChange={handleChange}
                                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent h-24 resize-none"
                            />

                            <button
                                type="submit"
                                style={{ backgroundColor: "#03c0b4" }}
                                className="w-full text-white py-3 rounded-lg font-bold transition-all hover:shadow-lg active:scale-95 cursor-pointer"
                            >
                                Book Now
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DoctorDetailsPage;
