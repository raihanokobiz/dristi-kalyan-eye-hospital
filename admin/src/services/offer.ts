"use server";

import { BASE_URL } from "@/config/config";
import {
  AllCategoryResponse,
  AllCategoryWithPaginationResponse,
  SingleCategoryResponse,
  TCategory,
} from "@/types/shared";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "./cloudinary/cloudinary";

export async function createOffer(data: any) {
  const response = await fetch(`${BASE_URL}/offer`, {
    method: "POST",
    body: data,
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getAllOffer(): Promise<AllCategoryResponse> {
  const response = await fetch(`${BASE_URL}/offer`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function getOfferWithPagination(
  page?: string,
  limit?: string
): Promise<AllCategoryWithPaginationResponse> {
  const queryParams = new URLSearchParams();
  if (page) queryParams.set("page", page);
  if (limit) queryParams.set("limit", limit);

  const response = await fetch(
    `${BASE_URL}/offer/pagination?${queryParams.toString()}`,
    { cache: "no-store" }
  );

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }

  return response.json();
}

export async function getOfferById(
  id: string
): Promise<SingleCategoryResponse> {
  const response = await fetch(`${BASE_URL}/offer/${id}`);
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function updateOffer(id: string, formData: FormData) {
  const imageFiles = formData.getAll("image") as File[];
  let imageUrl = "";
  let imagePublicId = "";

  // old image delete
  if (imageFiles && imageFiles.length > 0 && imageFiles[0].size > 0) {
    const oldPublicId = formData.get("currentImagePublicId") as string;
    // old image delete
    if (oldPublicId) {
      try {
        await deleteImageFromCloudinary(oldPublicId);
      } catch (error) {
        console.error("Old image delete failed:", error);
      }
    }

    // new image upload
    try {
      const uploadResult = await uploadImageToCloudinary(
        imageFiles[0],
        "offers"
      );
      imageUrl = uploadResult.secure_url;
      imagePublicId = uploadResult.public_id;
    } catch (error) {
      throw new Error("Image upload failed");
    }
  }

  const payload: any = {
    name: formData.get("name"),
  };

  if (imageUrl && imagePublicId) {
    payload.image = imageUrl;
    payload.imagePublicId = imagePublicId;
  }

  const response = await fetch(`${BASE_URL}/offer/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}

export async function deleteOffer(id: string) {
  const response = await fetch(`${BASE_URL}/offer/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} - ${response.statusText}`);
  }
  return response.json();
}
