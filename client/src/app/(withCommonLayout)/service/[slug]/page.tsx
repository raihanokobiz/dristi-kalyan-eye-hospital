import Image from 'next/image'
import React from 'react'
import { getServiceBySlug } from '@/services/service'
import { notFound } from 'next/navigation'

interface ServiceDetailPageProps {
    params: {
        slug: string;
    }
}

export default async function page({ params }: ServiceDetailPageProps) {
    const service = await getServiceBySlug(params.slug);

    if (!service) {
        notFound();
    }

    return (
        <section className="bg-gradient-to-b from-gray-50 to-white py-16 mt-20">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-white rounded-md shadow-md overflow-hidden">
                    {/* Image Container with Overlay */}
                    <div className="relative aspect-video w-full h-[300px] lg:h-[400px] overflow-hidden">
                        <Image
                            src={service.image || "/placeholder.svg"}
                            alt={service.title}
                            fill
                            className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

                        {/* Title Overlay on Image */}
                        <div className="absolute bottom-0 left-0 right-0 p-8">
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
                                {service.title}
                            </h2>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 md:p-6 lg:p-8">
                        <div className="prose prose-lg max-w-none">
                            <p className="text-gray-700 leading-relaxed text-base md:text-lg">
                                {service.description}
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
