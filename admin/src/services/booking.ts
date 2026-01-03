

import { AllBookings } from './../types/shared';
import { BASE_URL } from "@/config/config";

export async function getAllBookings(): Promise<AllBookings> {
  try {
    const response = await fetch(`${BASE_URL}/booking`);
    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }
    // console.log("Fetch successful:", response.json)
    return await response.json();
  } catch (error: any) {
    console.error("Fetch error:", error.message);
    throw new Error("Failed to fetch bookings");
  }
}

export async function getBookingWithPagination(
  page?: string,
  limit?: string
): Promise<AllBookings> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);

  const response = await fetch(
    `${BASE_URL}/booking/pagination?${queryParams.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}