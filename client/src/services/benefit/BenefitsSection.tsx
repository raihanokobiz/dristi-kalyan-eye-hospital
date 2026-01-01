import {
    UserRound,
    Microscope,
    Ambulance,
    HandHeart,
} from "lucide-react";

const benefitsData = [
    {
        id: 1,
        title: "Qualified Doctors",
        description:
            "Our hospital has experienced and certified eye specialists who ensure accurate diagnosis and treatment.",
        icon: UserRound,
    },
    {
        id: 2,
        title: "Modern Equipment",
        description:
            "We use advanced medical equipment and modern technology for safe and effective eye care services.",
        icon: Microscope,
    },
    {
        id: 3,
        title: "Emergency Help",
        description:
            "We provide emergency eye care support to handle urgent conditions and protect your vision.",
        icon: Ambulance,
    },
    {
        id: 4,
        title: "Individual Approach",
        description:
            "Every patient receives personalized care plans based on their eye condition and needs.",
        icon: HandHeart,
    },
];


const BenefitsSection = () => {
    return (
        <section className="bg-white py-8 md:py-12 xl:py-16 2xl:py-20">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-0">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                        Benefits with Dhamrai Dristi Kalyan Eye Hospital
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-sm sm:text-base">
                        We are committed to providing advanced eye care services with
                        experienced doctors, modern technology, and a patient-first
                        approach.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
                    {benefitsData.map(({ id, title, description, icon: Icon }) => (
                        <div
                            key={id}
                            className="bg-gray-50 rounded-md p-6 sm:p-8 text-center hover:shadow-md transition"
                        >
                            <div className="flex justify-center mb-5">
                                <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    <Icon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                                </div>
                            </div>

                            <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-3">
                                {title}
                            </h3>

                            <p className="text-gray-500 text-sm sm:text-base">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
