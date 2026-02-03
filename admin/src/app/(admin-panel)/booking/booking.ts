"use server";

import { BASE_URL } from "@/config/config";
import { AllBookingResponse, AllBookingWithPaginationResponse, SingleBookingResponse } from "./type";

/**
 * Fetch all bookings
 */
export async function getAllBookings(): Promise<AllBookingResponse> {
  const response = await fetch(`${BASE_URL}/booking`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

/**
 * Fetch bookings with pagination
 */
export async function getBookingWithPagination(
  page?: string,
  limit?: string
): Promise<AllBookingWithPaginationResponse> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);

  const response = await fetch(
    `${BASE_URL}/booking/pagination?${queryParams.toString()}`,
    { cache: "no-store" } // dynamic fetch
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch single booking by ID
 */
export async function getBookingById(id: string): Promise<SingleBookingResponse> {
  const response = await fetch(`${BASE_URL}/booking/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

/**
 * Update booking status
 */
export async function updateBookingStatus(id: string, data: { status: string }) {
  const response = await fetch(`${BASE_URL}/booking/status/${id}`, {
    headers: { "Content-Type": "application/json" },
    method: "PUT",
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const resData = await response.json().catch(() => null);
    const message =
      resData?.message || resData?.error || `Error: ${response.status} - ${response.statusText}`;
    throw new Error(message);
  }

  return response.json();
}

/**
 * Delete booking
 */
export async function deleteBooking(id: string) {
  const response = await fetch(`${BASE_URL}/booking/${id}`, { method: "DELETE" });

  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    const message =
      data?.message || data?.error || `Error: ${response.status} - ${response.statusText}`;
    throw new Error(message);
  }

  return data;
}
