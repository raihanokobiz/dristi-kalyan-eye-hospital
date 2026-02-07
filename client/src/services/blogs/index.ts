"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllBlogs = async () => {
  const res = await fetch(`${apiBaseUrl}/blogs`, {
    next: { revalidate: 600 }, // Revalidate every 10 minutes
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

export const getSingleBlogBySlug = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/blogs/slug/${slug}`, {
    next: { revalidate: 600 }, // Revalidate every 10 minutes
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
};
