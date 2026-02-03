"use server";

import { revalidatePath } from "next/cache";
import { deleteBooking, updateBookingStatus } from "./booking";


export async function updateBookingStatusAction(id: string, status: string) {
  try {
    const res = await updateBookingStatus(id, { status });
    revalidatePath("/dashboard/bookings");
    return { success: true, data: res };
  } catch (error: any) {
    console.error("updateBookingStatusAction error:", error);
    throw new Error(error?.message || "Failed to update booking status");
  }
}

export async function deleteBookingAction(id: string) {
  try {
    await deleteBooking(id);
    revalidatePath("/dashboard/bookings");
    return true;
  } catch (error: any) {
    console.error("deleteBookingAction error:", error);
    throw new Error(error?.message || "Failed to delete booking");
  }
}
