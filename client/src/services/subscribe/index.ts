"use server";

import { apiRequest } from "@/lib/apiRequest";

export const addSubscribe = async (data: { email: string }) => {
  return await apiRequest({
    endpoint: "/subscribe",
    method: "POST",
    body: data,
  });
};
