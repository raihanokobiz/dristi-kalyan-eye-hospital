

import { Doctor, DoctorResponse } from "@/types/doctor";

export const getAllDoctors = async (): Promise<Doctor[]> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctor`,
        );

        if (!response.ok) {
            throw new Error("Failed to fetch doctors");
        }

        const data: DoctorResponse = await response.json();

        if (data.statusCode === 200 && Array.isArray(data.data)) {
            // Return only active doctors
            return data.data.filter((doctor) => doctor.status === true);
        }

        return [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
};

export const getAllDoctorsForHomePage = async (): Promise<Doctor[]> => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/doctor/homepage`,
        );

        if (!response.ok) {
            throw new Error("Failed to fetch doctors");
        }

        const data: DoctorResponse = await response.json();

        if (data.statusCode === 200 && Array.isArray(data.data)) {
            // Return only active doctors
            return data.data.filter((doctor) => doctor.status === true);
        }

        return [];
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return [];
    }
};