"use client"

import { useState, useMemo } from "react"

interface Outlet {
    _id: string
    title: string
    address: string
    city: string
    area: string
    mobile?: number
    mapLink?: string
}

interface OutletResponse {
    statusCode: number
    status: string
    message: string
    data: Outlet[]
}

export function Outlet({ data }: { data: OutletResponse | Outlet[] }) {
    const outlets = useMemo(() => {
        return Array.isArray(data) ? data : data?.data || []
    }, [data])

    const cities = useMemo(() => {
        const uniqueCities = [...new Set(outlets.map(outlet => outlet.city))].filter(Boolean)
        return uniqueCities.length > 0 ? uniqueCities : []
    }, [outlets])

    const areas = useMemo(() => {
        const areaMap: Record<string, string[]> = {}
        outlets.forEach(outlet => {
            if (outlet.city && outlet.area) {
                if (!areaMap[outlet.city]) {
                    areaMap[outlet.city] = []
                }
                if (!areaMap[outlet.city].includes(outlet.area)) {
                    areaMap[outlet.city].push(outlet.area)
                }
            }
        })
        return areaMap
    }, [outlets])

    const [selectedCity, setSelectedCity] = useState("")
    const [selectedArea, setSelectedArea] = useState("")

    const filteredOutlets = outlets.filter((outlet) => {
        if (!selectedCity) return true
        if (selectedCity && !selectedArea) return outlet.city === selectedCity
        return outlet.city === selectedCity && outlet.area === selectedArea
    })

    return (
        <div className="w-full">
            {/* Filter Section */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Find Your Nearest Outlet</h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    {/* City Select */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select City</label>
                        <div className="relative">
                            <select
                                value={selectedCity}
                                onChange={(e) => {
                                    setSelectedCity(e.target.value)
                                    setSelectedArea("")
                                }}
                                className="w-full appearance-none border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                            >
                                <option value="">All Cities</option>
                                {cities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            <svg
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>

                    {/* Area Select */}
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Select Area</label>
                        <div className="relative">
                            <select
                                value={selectedArea}
                                onChange={(e) => setSelectedArea(e.target.value)}
                                className="w-full appearance-none border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                disabled={!selectedCity}
                            >
                                <option value="">All Areas</option>
                                {areas[selectedCity]?.map((area) => (
                                    <option key={area} value={area}>
                                        {area}
                                    </option>
                                ))}
                            </select>
                            <svg
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Outlets List */}
            <div className="space-y-6">
                {filteredOutlets.length > 0 ? (
                    filteredOutlets.map((outlet) => (
                        <div
                            key={outlet._id}
                            className={`grid grid-cols-1 lg:grid-cols-2 gap-6 p-6 rounded-lg border-2 shadow-md hover:shadow-lg transition-all ${selectedCity && selectedArea
                                    ? 'bg-green-50 border-green-300'
                                    : 'bg-white border-gray-200'
                                }`}
                        >
                            {/* Outlet Info */}
                            <div className="flex flex-col justify-between">
                                <div>
                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-1 h-16 bg-amber-400 rounded-full flex-shrink-0"></div>
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-2">{outlet.title}</h3>
                                            <p className="text-gray-600 text-sm leading-relaxed">{outlet.address}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                            📍 {outlet.city}
                                        </span>
                                        {outlet.area && (
                                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                                                🏘️ {outlet.area}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                {outlet.mobile && (
                                    <div className="mt-4 flex items-center gap-2 text-gray-700">
                                        <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                        </svg>
                                        <span className="font-medium">{outlet.mobile}</span>
                                    </div>
                                )}
                            </div>

                            {/* Map */}
                            {outlet.mapLink && (
                                <div className="w-full h-64 lg:h-[200px] overflow-hidden rounded-lg border-2 border-gray-200 shadow-sm">
                                    <div
                                        dangerouslySetInnerHTML={{ __html: outlet.mapLink }}
                                        className="w-full h-full"
                                    />
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-16 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className="text-gray-500 text-lg">No outlets found in this area.</p>
                        <p className="text-gray-400 text-sm mt-2">Try selecting a different city or area</p>
                    </div>
                )}
            </div>
        </div>
    )
}