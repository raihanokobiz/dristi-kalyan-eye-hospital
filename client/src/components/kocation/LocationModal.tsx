// components/LocationModal.tsx
"use client"

import { useState, useMemo, useEffect } from "react"
import { X } from "lucide-react"

interface Outlet {
    _id: string
    title: string
    address: string
    city: string
    area: string
    mobile?: number
    mapLink?: string
}

interface LocationModalProps {
    outlets: Outlet[]
    isOpen?: boolean
    onClose?: () => void
}

export function LocationModal({ outlets, isOpen: externalIsOpen, onClose }: LocationModalProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCity, setSelectedCity] = useState("")
    const [selectedArea, setSelectedArea] = useState("")
    const [currentMap, setCurrentMap] = useState("")
    const [mapLoading, setMapLoading] = useState(false)

    useEffect(() => {
        if (externalIsOpen !== undefined) {
            setIsOpen(externalIsOpen)

            if (externalIsOpen) {
                const savedCity = localStorage.getItem('selectedCity')
                const savedArea = localStorage.getItem('selectedArea')
                const savedMap = localStorage.getItem('currentMap')

                if (savedCity && savedArea) {
                    setSelectedCity(savedCity)
                    setSelectedArea(savedArea)
                    if (savedMap) {
                        setCurrentMap(savedMap)
                    }
                }
            }
        }

    }, [externalIsOpen])

    const handleClose = () => {
        setIsOpen(false)
        onClose?.()
    }

    // Default Bangladesh map
    const defaultBangladeshMap = useMemo(() => {
        return `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0!2d90.4!3d23.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sBangladesh!5e0!3m2!1sen!2sbd" width="100%" height="100%" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`
    }, [])

    // Extract unique cities
    const cities = useMemo(() => {
        const uniqueCities = [...new Set(outlets.map(outlet => outlet.city))].filter(Boolean)
        return uniqueCities
    }, [outlets])

    // Create areas mapping
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

    // Check localStorage on mount
    useEffect(() => {
        const savedCity = localStorage.getItem('selectedCity')
        const savedArea = localStorage.getItem('selectedArea')
        const savedMap = localStorage.getItem('currentMap')

        if (savedCity && savedArea) {
            setSelectedCity(savedCity)
            setSelectedArea(savedArea)
            if (savedMap) {
                setCurrentMap(savedMap)
            }
        } else {
            setCurrentMap(defaultBangladeshMap)
        }

        if (!savedCity || !savedArea) {
            setIsOpen(true)
        }

    }, [defaultBangladeshMap])

    // Update map when selection changes
    useEffect(() => {
        if (!isOpen) return

        setMapLoading(true)

        const timer = setTimeout(() => {
            if (selectedCity && selectedArea) {
                const outlet = outlets.find(o => o.city === selectedCity && o.area === selectedArea)
                if (outlet?.mapLink) {
                    setCurrentMap(outlet.mapLink)
                }
            } else if (selectedCity) {
                const cityOutlet = outlets.find(o => o.city === selectedCity)
                if (cityOutlet?.mapLink) {
                    setCurrentMap(cityOutlet.mapLink)
                }
            } else {
                setCurrentMap(defaultBangladeshMap)
            }

            setMapLoading(false)
        }, 500)

        return () => clearTimeout(timer)
    }, [selectedCity, selectedArea, outlets, isOpen])

    // Handle confirm button
    const handleConfirm = () => {
        if (selectedCity && selectedArea) {
            localStorage.setItem('selectedCity', selectedCity)
            localStorage.setItem('selectedArea', selectedArea)
            localStorage.setItem('currentMap', currentMap)
            setIsOpen(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 bg-opacity-50 p-4">
            <div className="bg-white rounded-md shadow-md w-full max-w-4xl max-h-[70vh] overflow-y-auto">
                {/* Header */}
                <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-4 text-white relative">
                    <button
                        onClick={handleClose}
                        className={`absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20 rounded-full p-2 transition-colors cursor-pointer ${!selectedCity || !selectedArea ? 'hidden' : ''
                            }`}
                    >
                        <X size={24} />
                    </button>
                    <h2 className="text-2xl font-bold text-center">Select Your Delivery Location</h2>
                    <p className="text-center text-green-100 text-sm mt-1">Choose your city and area to continue</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 p-6">
                    {/* Left Side - Form */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* City Select */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Your City <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedCity}
                                    onChange={(e) => {
                                        setSelectedCity(e.target.value)
                                        setSelectedArea("")
                                    }}
                                    className="w-full appearance-none border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                                >
                                    <option value="">Select City</option>
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
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Select Area <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    value={selectedArea}
                                    onChange={(e) => setSelectedArea(e.target.value)}
                                    className="w-full appearance-none border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-700 bg-white focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                                    disabled={!selectedCity}
                                >
                                    <option value="">Select Area</option>
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

                        {/* Confirm Button */}
                        <button
                            onClick={handleConfirm}
                            disabled={!selectedCity || !selectedArea}
                            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all shadow-lg hover:shadow-xl disabled:shadow-none cursor-pointer"
                        >
                            Confirm Location
                        </button>

                        {/* Info Text */}
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <p className="text-sm text-blue-800">
                                <span className="font-semibold">📍 Note:</span> Your selected location will be saved for future visits. You can change it anytime from the outlet page.
                            </p>
                        </div>
                    </div>

                    {/* Right Side - Map */}
                    <div className="lg:col-span-3">
                        <div className="w-full h-[300px] lg:h-[400px] rounded-lg overflow-hidden border-2 border-gray-300 shadow-lg relative">
                            {mapLoading && (
                                <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
                                    <div className="text-center">
                                        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                        <p className="text-gray-600 font-medium">Loading map...</p>
                                    </div>
                                </div>
                            )}
                            <div
                                dangerouslySetInnerHTML={{ __html: currentMap }}
                                className="w-full h-full"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}