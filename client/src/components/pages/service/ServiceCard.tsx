import Image from 'next/image'
import React from 'react'
import { Service } from '@/types/service'
import Link from 'next/link'

interface ServiceCardProps {
    service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
    return (
        <Link
            href={`/service/${service?.slug}`}>
            <div className="flex flex-col overflow-hidden bg-white shadow-lg rounded-md">
                <div className="relative h-48 w-full">
                    <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
                </div>
                <div className="flex flex-1 flex-col p-6">
                    <h3 className="mb-3 text-lg font-semibold text-primary">{service.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-gray-600 line-clamp-3">{service.description}</p>
                    <div className="mt-auto">
                        <Link
                            href={`/service/${service?.slug}`}
                            className="text-sm font-medium text-primary transition-colors hover:text-primary-dark"
                        >
                            Read More »
                        </Link>
                    </div>
                </div>
            </div>
        </Link>
    )
}
