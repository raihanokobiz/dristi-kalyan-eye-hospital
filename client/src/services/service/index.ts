

import { Service, ServiceResponse } from "@/types/service";

export const getAllService = async (): Promise<Service[]> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/service`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch Service");
        }

        const data: ServiceResponse = await response.json();

        if (data.statusCode === 200 && Array.isArray(data.data)) {
            // Return only active Service
            return data.data.filter((service) => service.status === true);
        }

        return [];
    } catch (error) {
        console.error("Error fetching Service:", error);
        return [];
    }
};

export const getServiceBySlug = async (slug: string): Promise<Service | null> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/service/slug/${slug}`,
            {
                cache: "no-store",
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch Service");
        }

        const data: ServiceResponse = await response.json();

        if (data.statusCode === 200) {
            // Handle both single object and array response
            if (Array.isArray(data.data)) {
                return data.data[0] || null;
            }
            return data.data;
        }

        return null;
    } catch (error) {
        console.error("Error fetching Service by slug:", error);
        return null;
    }
};