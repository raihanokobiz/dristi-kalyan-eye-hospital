"use server";

import { BASE_URL } from "@/config/config";
import { AllDoctorResponse, AllDoctorWithPaginationResponse, SingleDoctorResponse } from "./types";

export async function createDoctor(data: any) {
    const response = await fetch(`${BASE_URL}/doctor`, {
        method: "POST",
        body: data,
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function getAllDoctor(): Promise<AllDoctorResponse> {
    const response = await fetch(`${BASE_URL}/doctor`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function getDoctorWithPagination(
    page?: string,
    limit?: string
): Promise<AllDoctorWithPaginationResponse> {
    const queryParams = new URLSearchParams();
    if (page) queryParams.set("page", page);
    if (limit) queryParams.set("limit", limit);

    const response = await fetch(
        `${BASE_URL}/doctor/pagination?${queryParams.toString()}`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

export async function getDoctorById(id: string): Promise<SingleDoctorResponse> {
    const response = await fetch(`${BASE_URL}/doctor/${id}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function updateDoctor(id: string, data: any) {
    console.log(data, "OK________________________________________________________________________________");

    const response = await fetch(`${BASE_URL}/doctor/${id}`, {
        method: "PUT",
        body: data,
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function deleteDoctor(id: string) {
    const response = await fetch(`${BASE_URL}/doctor/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}
