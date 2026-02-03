"use server";

import { BASE_URL } from "@/config/config";

export async function createBlog(data: FormData) {
    const response = await fetch(`${BASE_URL}/blogs`, {
        method: "POST",
        body: data,
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function getAllBlogs() {
    const response = await fetch(`${BASE_URL}/blogs`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function getBlogWithPagination(page?: string, limit?: string) {
    const queryParams = new URLSearchParams();
    if (page) queryParams.set("page", page);
    if (limit) queryParams.set("limit", limit);

    const response = await fetch(
        `${BASE_URL}/blogs/pagination?${queryParams.toString()}`,
        { cache: "no-store" }
    );

    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    return response.json();
}

export async function getBlogById(id: string) {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        cache: "no-store",
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function updateBlog(id: string, data: any) {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: "PATCH",
        body: data,
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}

export async function deleteBlog(id: string) {
    const response = await fetch(`${BASE_URL}/blogs/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) {
        throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    return response.json();
}
