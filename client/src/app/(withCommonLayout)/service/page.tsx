import ServiceCard from '@/components/pages/service/ServiceCard'
import { getAllService } from '@/services/service'
import { Eye } from 'lucide-react'
import React from 'react'

export default async function page() {

    // Fetch services
    const services = await getAllService()

    return (
        <section className="relative w-full">
            <div className="relative  py-12 px-4 sm:px-6 lg:px-8">
                <div className=" max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h2 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">OUR EYE SERVICES</h2>
                        <p className="text-sm font-medium text-white/90 md:text-base">Our Services To Give Best Care For Your Eyes</p>

                        {/* Decorative Divider */}
                        <div className="mt-4 flex items-center justify-center gap-4">
                            <div className="h-px w-16" />
                            <div className="relative">
                                <Eye className="h-4 w-4 text-white" />
                                <div className="absolute -inset-1 rounded-full border border-white/40" />
                            </div>
                            <div className="h-px w-16" />
                        </div>
                    </div>

                    {/* Services Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {services.length > 0 ? (
                            services.map((service) => (
                                <ServiceCard key={service._id} service={service} />
                            ))
                        ) : (
                            <div className="col-span-full text-center text-white">
                                <p>No services available at the moment.</p>
                            </div>
                        )}
                    </div>

                    {/* Pagination Indicators */}
                    <div className="mt-12 flex justify-center gap-2">
                        <div className="h-2 w-6 bg-[#ff7f50]" />
                        <div className="h-2 w-6 bg-white" />
                        <div className="h-2 w-6 bg-white" />
                    </div>
                </div>
            </div>
        </section>
    )
}
