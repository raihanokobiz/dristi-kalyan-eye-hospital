import Image from "next/image"
import TextureWhy from "../../../../assets/texture/textureforwhy.webp"

export function WhyChooseUs() {
    const reasons = [
        {
            title: "Quality Staff",
            description: "Lorem ipsum dolor amet conadicinc sed do usmod tempor.",
        },
        {
            title: "Quality Assistance",
            description: "Lorem ipsum dolor amet conadicinc sed do usmod tempor.",
        },
        {
            title: "Affordable Price",
            description: "Lorem ipsum dolor amet conadicinc sed do usmod tempor.",
        },
        {
            title: "Optimized Solutions",
            description: "Lorem ipsum dolor amet conadicinc sed do usmod tempor.",
        },
    ]

    return (
        <section className="bg-white">
            <div className="px-4 md:px-6 lg:px-0 md:px-6 py-6 md:py-10  lg:py-12 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left: Image */}
                    <div className="relative w-full h-[400px] lg:h-[500px] overflow-hidden rounded-md shadow-md">
                        <Image
                            src={TextureWhy}
                            alt="Child undergoing eye examination"
                            fill
                            className="object-cover"
                            priority
                        />
                    </div>
                    {/* Right: Content */}
                    <div className="flex flex-col space-y-8">
                        <div className="relative">
                            {/* Background Text */}
                            <span className="absolute -top-10 left-0 text-6xl md:text-8xl font-bold text-gray-50 select-none -z-10">
                                Why Choose Us
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
                                Great Reasons For People <br />
                                Choose Optcare
                            </h2>
                        </div>

                        <p className="text-gray-500 text-lg leading-relaxed max-w-2xl">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit sed do eiusmod tempor incididunt labore aliqua.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10 pt-4">
                            {reasons.map((reason, index) => (
                                <div key={index} className="space-y-3">
                                    <h3 className="text-xl font-bold text-gray-900">{reason.title}</h3>
                                    <p className="text-gray-500 leading-relaxed text-sm md:text-base">{reason.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
