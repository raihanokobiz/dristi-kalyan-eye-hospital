"use server";


import { revalidatePath } from "next/cache";
import { createService, deleteService, updateService } from "./service";

export async function createFormAction(data: FormData) {
  try {
    await createService(data);
    revalidatePath("/");
    return true;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      console.error("Duplicate error:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      console.error("Something went wrong:", error.message);
      throw new Error(error.message);
    }
  }
}

export async function updateFormAction(id: string, data: any) {
  try {
    await updateService(id, data);
    revalidatePath("/");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteAction(id: string) {

  try {
    await deleteService(id);
    revalidatePath("/");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
