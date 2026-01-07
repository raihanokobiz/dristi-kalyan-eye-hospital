"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Doctor, DoctorResponse } from "@/types/doctor";
import { FaArrowRight, FaTimes, FaShareAlt } from "react-icons/fa";
import { DotIcon } from "lucide-react";
import { FiPhoneCall } from "react-icons/fi";
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
        <div className="min-h-screen py-10 px-4 mt-10 lg:mt-14">
            <div className="max-w-3xl mx-auto">
                {/* GLASS CARD */}
                <div className="bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                    {/* IMAGE */}
                    <div className="relative h-64 sm:h-72 lg:h-96 rounded-xl overflow-hidden bg-white/20 backdrop-blur-md">
                        <Image
                            src={doctor.image || "/images/default-doctor.jpg"}
                            alt={doctor.name}
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>

                    {/* CONTENT */}
                    <div className="p-6">
                        {/* STATUS */}
                        {doctor.status && (
                            <div className="inline-flex items-center gap-1 text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                <DotIcon size={16} />
                                Available
                            </div>
                        )}

                        {/* HEADER */}
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                            <div>
                                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                    {doctor.name}
                                </h1>
                                <p className="text-gray-600 text-sm sm:text-base mt-1">
                                    {doctor.degree}
                                </p>
                            </div>

                            <button
                                onClick={shareDoctor}
                                className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-green-500 text-white hover:bg-green-600 shadow-md hover:shadow-lg transition-all active:scale-95 text-sm sm:text-base"
                            >
                                <FaShareAlt />
                                Share
                            </button>
                        </div>

                        {/* CONTACT */}
                        <div className="py-2">
                            <a
                                href={`tel:${doctor.phone}`}
                                className="flex items-center gap-3  rounded-xl bg-white/40 backdrop-blur-md border border-white/30 hover:shadow transition"
                            >
                                <FiPhoneCall className="text-blue-600" />
                                <span>{doctor.phone}</span>
                            </a>

                            <a
                                href={`mailto:${doctor.email}`}
                                className="rounded-xl bg-white/40 backdrop-blur-md border border-white/30 hover:shadow transition break-all"
                            >
                                ✉ {doctor.email}
                            </a>
                        </div>

                        {/* VISITING TIME */}
                        <p className="mt-1 text-sm sm:text-base">
                            <strong>Visiting Time:</strong>{" "}
                            {doctor.visitingTime}
                        </p>

                        {/* DAYS */}
                        <div className="flex flex-wrap gap-2 mt-2">
                            {doctor.availableDays?.map((day) => (
                                <span
                                    key={day}
                                    className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full capitalize"
                                >
                                    {day}
                                </span>
                            ))}
                        </div>

                        {/* FEE */}
                        <div className="flex justify-between items-center border-t mt-6 pt-4">
                            <span className="font-semibold">
                                Consultation Fee
                            </span>
                            <span className="text-2xl font-bold text-blue-600">
                                ৳{doctor.consultationFee}
                            </span>
                        </div>

                        {/* BOOK BUTTON */}
                        <div className="mt-6">
                            <button
                                disabled={!doctor.status}
                                onClick={() => setModalOpen(true)}
                                className={`w-full py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all
                                ${doctor.status
                                        ? "bg-blue-500 hover:bg-blue-600 text-white"
                                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                Book Appointment <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white/30 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl w-full max-w-md p-6 relative">
                        <button
                            onClick={() => setModalOpen(false)}
                            className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
                        >
                            <FaTimes />
                        </button>

                        <h2 className="text-2xl font-bold mb-6 text-center">
                            Book Appointment
                        </h2>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <select
                                required
                                value={selectedDay}
                                onChange={(e) =>
                                    setSelectedDay(e.target.value)
                                }
                                className="w-full p-3 bg-white/40 backdrop-blur-md border border-white/30 rounded-lg"
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
                                className="w-full p-3 bg-white/40 border border-white/30 rounded-lg"
                            />

                            <input
                                name="phone"
                                required
                                placeholder="Phone Number"
                                value={patient.phone}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/40 border border-white/30 rounded-lg"
                            />

                            <input
                                name="age"
                                placeholder="Age (optional)"
                                value={patient.age}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/40 border border-white/30 rounded-lg"
                            />

                            <textarea
                                name="problem"
                                placeholder="Describe your problem"
                                value={patient.problem}
                                onChange={handleChange}
                                className="w-full p-3 bg-white/40 border border-white/30 rounded-lg h-24 resize-none"
                            />

                            <button
                                type="submit"
                                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-semibold"
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
