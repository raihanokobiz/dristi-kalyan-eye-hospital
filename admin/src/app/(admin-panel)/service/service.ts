"use server";

import { BASE_URL } from "@/config/config";
import { AllServiceResponse, AllServiceWithPaginationResponse, SingleServiceResponse } from "./types";

export async function createService(data: any) {
    const response = await fetch(`${BASE_URL}/service`, {
        method: "POST",
        body: data,
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function getAllService(): Promise<AllServiceResponse> {
    const response = await fetch(`${BASE_URL}/service`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function getServiceWithPagination(
    page?: string,
    limit?: string
): Promise<AllServiceWithPaginationResponse> {
    const queryParams = new URLSearchParams();
    if (page) queryParams.set("page", page);
    if (limit) queryParams.set("limit", limit);

    const response = await fetch(
        `${BASE_URL}/service/pagination?${queryParams.toString()}`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

export async function getServiceById(id: string): Promise<SingleServiceResponse> {
    const response = await fetch(`${BASE_URL}/service/${id}`);
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function updateService(id: string, data: any) {


    const response = await fetch(`${BASE_URL}/service/${id}`, {
        method: "PUT",
        body: data,
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function deleteService(id: string) {
    const response = await fetch(`${BASE_URL}/service/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}
