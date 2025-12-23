"use client"

import { useEffect, useState } from "react"
import { LocationModal } from "./LocationModal"
import { getAllOutlet } from "@/app/(withCommonLayout)/outlets"

export function LocationModalWrapper() {

    const [outlets, setOutlets] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)

    useEffect(() => {
        const handleOpenModal = () => {
            setModalOpen(true)
        }

        window.addEventListener('openLocationModal', handleOpenModal)

        return () => {
            window.removeEventListener('openLocationModal', handleOpenModal)
        }
    }, [])

    useEffect(() => {
        async function fetchOutlets() {
            try {
                const response = await getAllOutlet()
                setOutlets(response.data || response || [])
            } catch (error) {
                console.error('Failed to fetch outlets:', error)
            } finally {
                setLoading(false)
            }
        }

        fetchOutlets()
    }, [])

    if (loading) return null

    return (
        <div>
            <LocationModal outlets={outlets} isOpen={modalOpen}
                onClose={() => setModalOpen(false)} />
        </div>
    )

}

export function openLocationModal() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('openLocationModal'))
    }
}


export function useLocationModal() {
    return {
        openModal: () => {
            if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('openLocationModal'))
            }
        }
    }
}