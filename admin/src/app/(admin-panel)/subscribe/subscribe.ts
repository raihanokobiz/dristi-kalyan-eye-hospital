"use server";

import { BASE_URL } from "@/config/config";
import { AllsubscribeResponse, AllSubscribeWithPaginationResponse } from "./type";


export async function getAllSubscribe(): Promise<AllsubscribeResponse> {
  const response = await fetch(`${BASE_URL}/subscribe`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getSubscribeWithPagination(
  page?: string,
  limit?: string
): Promise<AllSubscribeWithPaginationResponse> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);

  const response = await fetch(
    `${BASE_URL}/subscribe/pagination?${queryParams.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}


export async function deleteSubscribe(id: string) {
  const response = await fetch(`${BASE_URL}/subscribe/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}
