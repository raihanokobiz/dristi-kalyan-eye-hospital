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
    .coerce
    .number({ invalid_type_error: "Price must be a number" })
    .min(0, { message: "Price must be positive" })
    .optional()
    .default(0),

  image: z
    .string()
    .optional()
    .nullable(),

  slug: z
    .string()
    .optional()
    .nullable(),

  status: z
    .boolean()
    .default(true),
});
