import { z } from "zod";

export const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: "Title is required" })
    .max(100, { message: "Title is too long" }),

  description: z
    .string()
    .min(1, { message: "Description is required" }),

  price: z
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, { message: "Price must be positive" })
    .optional()
    .or(z.literal(undefined)),

  image: z
    .array(
      z.instanceof(File).refine((file) => file.size < 8 * 1024 * 1024, {
        message: "File size must be less than 8 MB",
      })
    )
    .optional()
    .default([]),

  slug: z
    .string()
    .optional()
    .nullable(),

  status: z
    .boolean()
    .default(true),
});
