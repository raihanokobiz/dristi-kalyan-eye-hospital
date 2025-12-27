import {
    UserRound,
    Microscope,
    Ambulance,
    HandHeart,
} from "lucide-react";

const BenefitsSection = () => {
    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        Benefits with Dhamrai Dristi Kalyan Eye Hospital
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
                        We are committed to providing advanced eye care services with
                        experienced doctors, modern technology, and a patient-first
                        approach.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {/* Card 1 */}
                    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition">
                        <div className="flex justify-center mb-5">
                            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <UserRound className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                            Qualified Doctors
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Our hospital has experienced and certified eye specialists who
                            ensure accurate diagnosis and treatment.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition">
                        <div className="flex justify-center mb-5">
                            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <Microscope className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                            Modern Equipment
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            We use advanced medical equipment and modern technology for safe
                            and effective eye care services.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition">
                        <div className="flex justify-center mb-5">
                            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <Ambulance className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                            Emergency Help
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            We provide emergency eye care support to handle urgent conditions
                            and protect your vision.
                        </p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 text-center hover:shadow-lg transition">
                        <div className="flex justify-center mb-5">
                            <div className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                <HandHeart className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
                            </div>
                        </div>
                        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                            Individual Approach
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base">
                            Every patient receives personalized care plans based on their eye
                            condition and needs.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default BenefitsSection;
