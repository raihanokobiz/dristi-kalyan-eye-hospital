import {
    Eye,
    Stethoscope,
    AlertCircle,
    ScanEye,
} from "lucide-react";

const services = [
    {
        icon: Eye,
        title: "Complete Eye Check-up & Vision Assessment",
        desc: "Comprehensive eye examination with vision testing, glasses power measurement, digital assessment, and evaluation of eye health.",
    },
    {
        icon: ScanEye,
        title: "Diabetic Retina Screening",
        desc: "Advanced screening for diabetic eye diseases, along with glaucoma (eye pressure) examination and treatment to prevent vision loss.",
    },
    {
        icon: Stethoscope,
        title: "Advanced Eye Treatments & Surgery",
        desc: "Modern cataract surgery and specialized eye treatments using advanced medical technology for safe and effective care.",
    },
    {
        icon: AlertCircle,
        title: "24/7 Emergency & Patient Care",
        desc: "Round-the-clock emergency eye care services with patient counseling and eye health awareness for timely treatment.",
    },
];




export default function OurAdvancedServices() {
    return (
        <section className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                    Our Advanced Services
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Comprehensive eye care solutions with state-of-the-art technology
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                {services.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="group relative bg-white rounded-2xl p-6 shadow-md hover:bg-teal-50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
                        >
                            {/* Decorative gradient line */}
                            <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-teal-500"></div>

                            {/* Icon */}
                            <div className="flex justify-center mb-6 mt-2">
                                <div className="relative w-20 h-20 rounded-full bg-teal-50 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6">
                                    <div className="absolute inset-0 rounded-full bg-teal-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                                    <Icon className="w-10 h-10 text-teal-600 relative z-10" strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="text-base font-bold text-gray-900 mb-3 min-h-[3rem] flex items-center justify-center text-center leading-snug">
                                {item.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm text-gray-600 leading-relaxed text-center">
                                {item.desc}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>

    )
}
