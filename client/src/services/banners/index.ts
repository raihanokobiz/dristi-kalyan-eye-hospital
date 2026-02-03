"use server";

import { apiBaseUrl } from "@/config/config";

export const getAllBanners = async () => {
  const res = await fetch(`${apiBaseUrl}/banners`, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  });

  if (!res.ok) {
    throw new Error("Failed to fetch banners");
  }

  return res.json();
};

export const getBannersByType = async (type: string) => {
  const res = await fetch(`${apiBaseUrl}/banners?type=${type}`, {
    next: { revalidate: 300 }, // Revalidate every 5 minutes
  });

  if (!res.ok) {
    throw new Error("Failed to fetch banners");
  }

  return res.json();
};


