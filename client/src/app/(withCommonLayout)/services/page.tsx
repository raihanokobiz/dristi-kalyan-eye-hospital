import Image from "next/image"
import { Eye } from "lucide-react"
import { Service } from "@/types/service"
import Texture from "@/assets/texture/texture.webp"
import { getAllService } from "@/services/service";
import ServiceCard from "@/components/pages/service/ServiceCard";


export default async function page() {
    // Fetch services
    const services = await getAllService()

    return (
        <section className="relative w-full mt-20">
            {/* Background with overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={Texture}
                    alt="Background"
                    fill
                    className="object-cover grayscale brightness-50"
                    priority
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative  py-12 px-4 sm:px-6 lg:px-8">
                <div className=" max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">OUR EYE SERVICES</h2>
                        <p className="text-sm font-medium text-white/90 md:text-base">Our Services To Give Best Care For Your Eyes</p>
                        {/* Decorative Divider */}
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <div className="h-px w-16 bg-white/40" />
                            <div className="relative">
                                <Eye className="h-4 w-4 text-white" />
                                <div className="absolute -inset-1 rounded-full border border-white/40" />
                            </div>
                            <div className="h-px w-16 bg-white/40" />
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {services && services.length > 0 ? (
                            services.map((service) => (
                                <ServiceCard key={service._id} service={service} />
                            ))
                        ) : (
                            <div className="text-center text-white col-span-full">
                                <p>No services available at the moment.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}
