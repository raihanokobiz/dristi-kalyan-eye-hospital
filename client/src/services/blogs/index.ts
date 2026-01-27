"use server";
import { apiBaseUrl } from "@/config/config";

export const getAllBlogs = async () => {
  const res = await fetch(`${apiBaseUrl}/blogs`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blogs");
  }

  return res.json();
};

export const getSingleBlogBySlug = async (slug: string) => {
  const res = await fetch(`${apiBaseUrl}/blogs/slug/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch blog");
  }

  return res.json();
};
