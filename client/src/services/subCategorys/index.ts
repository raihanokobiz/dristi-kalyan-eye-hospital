"use server";

import { apiBaseUrl } from "@/config/config";

export const getAllSubCategorys = async () => {
  const res = await fetch(`${apiBaseUrl}/sub-category`);

  return res.json();
};

