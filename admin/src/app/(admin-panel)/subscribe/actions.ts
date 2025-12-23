"use server";

import { revalidatePath } from "next/cache";
import { deleteSubscribe } from "./subscribe";


export async function deleteAction(id: string) {
  try {
    await deleteSubscribe(id);
    revalidatePath("/");
    return true;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
