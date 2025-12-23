"use server";

import { BASE_URL } from "@/config/config";
import {
  AllCategoryResponse,
  AllCategoryWithPaginationResponse,
  SingleCategoryResponse,
  TCategory,
} from "@/types/shared";

export async function createOutlet(data: any) {
  const response = await fetch(`${BASE_URL}/outlet`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    // body: data,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getAllOutlet(): Promise<AllCategoryResponse> {
  const response = await fetch(`${BASE_URL}/outlet`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getOutletWithPagination(
  page?: string,
  limit?: string
): Promise<AllCategoryWithPaginationResponse> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);

  const response = await fetch(
    `${BASE_URL}/outlet/pagination?${queryParams.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function getOutletById(
  id: string
): Promise<SingleCategoryResponse> {
  const response = await fetch(`${BASE_URL}/outlet/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function updateOutlet(id: string, data: any) {
  const response = await fetch(`${BASE_URL}/outlet/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "PUT",
    // body: data,
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function deleteOutlet(id: string) {
  const response = await fetch(`${BASE_URL}/outlet/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}
