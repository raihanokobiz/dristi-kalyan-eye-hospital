"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllOutlet = async () => {
  const res = await fetch(`${apiBaseUrl}/outlet`);

  return res.json();
};


