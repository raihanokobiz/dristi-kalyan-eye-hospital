"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { Doctor, DoctorResponse } from "@/types/doctor";
import { FaArrowRight, FaTimes } from "react-icons/fa";
import { FiClock } from "react-icons/fi";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { apiBaseUrl } from "@/config/config";
import Placeholder_Female from "../../../../assets/doctor/placeholder_female.webp";
import Placeholder_Male from "../../../../assets/doctor/placeholder_male.webp";

const DoctorDetailsPage: React.FC = () => {
    const params = useParams();
    const router = useRouter();

    const [doctor, setDoctor] = useState<Doctor | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
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

        if (!selectedDate) {
            toast.error("Please select appointment date");
            return;
        }

        const payload = {
            doctorId: doctor?._id,
            appointmentDate: selectedDate,
            appointmentDay: selectedDay,
            patientName: patient.name,
            phone: patient.phone,
            age: patient?.age,
            problem: patient?.problem,
        };


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
                title: "Appointment Confirmed!",
                html: `
                    <div class="bg-white border-2 border-teal-100 rounded-lg p-4 my-4">
                        <div class="space-y-3">
                            <div class="flex justify-between items-center border-b pb-2">
                                <span class="text-gray-500 text-sm">Patient</span>
                                <span class="text-gray-700 font-medium">${patient.name}</span>
                            </div>
                            <div class="flex justify-between items-center border-b pb-2">
                                <span class="text-gray-500 text-sm">Doctor</span>
                                <span class="text-gray-700 font-medium">${doctor?.name ?? ""}</span>
                            </div>
                            <div class="flex justify-between items-center border-b pb-2">
                                <span class="text-gray-500 text-sm">Date</span>
                                <span class="text-gray-700 font-medium">${new Date(selectedDate).toLocaleDateString('en-GB')}</span>
                            </div>
                            <div class="flex justify-between items-center">
                                <span class="text-gray-500 text-sm">Time</span>
                                <span class="text-gray-700 font-medium">${doctor?.visitingTime ?? ""}</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-teal-50 rounded-lg p-3 mt-3">
                        <p class="text-sm text-teal-800">
                            📞 Our team will call you soon with your serial number
                        </p>
                    </div>
                    <p class="text-xs text-gray-500 mt-3">
                        💡 Please take a screenshot for future reference
                    </p>
                `,
                confirmButtonText: "OK",
                confirmButtonColor: "#0d9488",
                width: "450px"
            });

            setModalOpen(false);
            setSelectedDate("");
            setPatient({ name: "", phone: "", age: "", problem: "" });
        } catch {
            toast.error("Appointment booking failed ❌");
        }
    };



    const getDayName = (dateString: string) => {

        const days = [
            "sunday",
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
        ];
        const [year, month, day] = dateString.split('-').map(Number);
        const date = new Date(year, month - 1, day);
        return days[date.getDay()];
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
                    className="px-6 py-2 bg-blue-500 text-white rounded-md"
                >
                    Back to Doctors
                </button>
            </div>
        );
    }

    return (
        <div className=" bg-gray-50 py-12 px-4 mt-20">
            <div className="max-w-5xl mx-auto">
                <div className="bg-white rounded-md shadow-md overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-8 p-4 lg:p-8">
                        {/* LEFT: Image */}
                        <div className="flex justify-center">
                            <div className="relative w-full h-80 md:h-[350px] lg:h-[500px] rounded-md overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 flex-shrink-0">
                                <Image
                                    src={doctor.image ? (doctor.image.startsWith('http') ? doctor.image : apiBaseUrl + doctor.image) : (doctor.gender === "female" ? Placeholder_Female : Placeholder_Male)}
                                    alt={doctor.name}
                                    fill
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                    priority
                                />
                                {doctor.status && (
                                    <div className="absolute top-1 left-1 inline-flex items-center gap-2 bg-white text-teal-600 px-4 py-2 rounded-full text-xs font-bold shadow-md">
                                        <div className="w-2 h-2 bg-teal-600 rounded-full animate-pulse" />
                                        <span>Available</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* RIGHT: Information */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h1 className=" text-2xl lg:text-3xl font-bold text-gray-700 mb-1">{doctor?.name}</h1>
                                <p className="text-teal-600 font-semibold text-sm mb-4">{doctor?.degree}</p>

                                <div className="flex items-center gap-3 text-gray-700 mb-6">
                                    <div className="p-2 bg-gray-100 rounded-md">
                                        <FiClock size={18} className="text-teal-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-600 font-semibold">VISITING HOURS</p>
                                        <p className="font-bold">{doctor?.visitingTime}</p>
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <p className="text-xs text-gray-600 font-semibold mb-2">AVAILABLE DAYS</p>
                                    <div className="flex flex-wrap gap-2">
                                        {doctor?.availableDays?.map((day) => (
                                            <span
                                                key={day}
                                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-teal-50 transition-colors"
                                            >
                                                {day}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                disabled={!doctor.status}
                                onClick={() => setModalOpen(true)}
                                className={`w-full py-3 rounded-md font-bold flex items-center justify-center gap-2 transition-all text-base ${doctor.status
                                    ? "bg-teal-600 hover:bg-teal-700 text-white shadow-md hover:shadow-md active:scale-95 cursor-pointer"
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
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 overflow-y-auto py-7">
                    <div className=" flex items-center justify-center p-4">
                        <div className="bg-white rounded-md shadow-xl w-full max-w-md p-4 lg:p-8 relative animate-in fade-in zoom-in-95 my-8">
                            <button
                                onClick={() => setModalOpen(false)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors p-2 cursor-pointer"
                            >
                                <FaTimes size={20} />
                            </button>
                            <h2 className="text-2xl font-bold mb-2 text-gray-900">Book Appointment</h2>
                            <p className="text-gray-600 text-sm mb-6 font-medium">With {doctor.name}</p>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <input
                                    type="date"
                                    required
                                    value={selectedDate}
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => {
                                        const dateValue = e.target.value;
                                        const dayName = getDayName(dateValue);

                                        if (!doctor.availableDays.includes(dayName)) {
                                            toast.error(`Doctor is not available on ${dayName}`);
                                            setSelectedDate("");
                                            setSelectedDay(""); // clear day too
                                            return;
                                        }

                                        setSelectedDate(dateValue);
                                        setSelectedDay(dayName); // ✅ add this line
                                    }}
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent cursor-pointer "
                                />

                                <p className=" text-primary">
                                    Available days: {doctor.availableDays.join(", ")}
                                </p>


                                <input
                                    name="name"
                                    required
                                    placeholder="Patient Name"
                                    value={patient.name}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                />

                                <div>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        placeholder="Phone Number (11 digits)"
                                        value={patient.phone}
                                        onChange={(e) => {
                                            const value = e.target.value.replace(/\D/g, '');
                                            if (value.length <= 11) {
                                                setPatient({ ...patient, phone: value });
                                            }
                                        }}
                                        className={`w-full p-3 bg-gray-50 border rounded-md text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent ${patient.phone && patient.phone.length !== 11
                                            ? 'border-red-500'
                                            : 'border-gray-300'
                                            }`}
                                    />
                                    {patient.phone && patient.phone.length !== 11 && (
                                        <p className="text-xs text-red-500 mt-1">
                                            Phone number must be exactly 11 digits ({patient.phone.length}/11)
                                        </p>
                                    )}
                                </div>

                                <input
                                    name="age"
                                    type="number"
                                    placeholder="Age (optional)"
                                    value={patient.age}
                                    onChange={(e) => {
                                        const value = e.target.value.replace(/\D/g, '');
                                        setPatient({ ...patient, age: value });
                                    }}
                                    min="1"
                                    max="150"
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent"
                                />

                                <textarea
                                    name="problem"
                                    placeholder="Describe your problem"
                                    value={patient.problem}
                                    onChange={handleChange}
                                    className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md text-gray-900 placeholder-gray-400 font-medium focus:outline-none focus:ring-2 focus:ring-teal-600 focus:border-transparent h-24 resize-none"
                                />

                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-3 rounded-md font-bold transition-all hover:shadow-md active:scale-95 cursor-pointer"
                                >
                                    Book Now
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DoctorDetailsPage;
