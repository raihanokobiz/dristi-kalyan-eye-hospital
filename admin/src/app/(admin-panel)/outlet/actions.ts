"use server";


import { createOutlet, deleteOutlet, updateOutlet } from "@/services/outlet";
import { revalidatePath } from "next/cache";

export async function createFormAction(data: FormData) {
  try {
    await createOutlet(data);
    revalidatePath("/");
    return true;
  } catch (error: any) {
    if (error.response && error.response.data && error.response.data.message) {
      console.error("Error:", error.response.data.message);
      throw new Error(error.response.data.message);
    } else {
      console.error("Something went wrong:", error.message);
      throw new Error(error.message);
    }
  }
}

export async function updateFormAction(id: string, data: any) {
  try {
    await updateOutlet(id, data);
    revalidatePath("/");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function deleteAction(id: string) {
  try {
    await deleteOutlet(id);
    revalidatePath("/");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
