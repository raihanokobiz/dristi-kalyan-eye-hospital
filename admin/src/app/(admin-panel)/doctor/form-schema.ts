import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Name is required" })
    .max(100, { message: "Name is too long" }),

  image: z
    .array(
      z.instanceof(File).refine((file) => file.size < 8 * 1024 * 1024, {
        message: "File size must be less than 8 MB",
      })
    )
    .optional()
    .default([]),

  degree: z
    .string(),

  visitingTimeStart: z.string().min(1, "Start time required"),
  visitingTimeEnd: z.string().min(1, "End time required"),

  phone: z
    .string()
    .transform((val) => val.replace(/\D/g, ""))
    .refine((val) => val.length >= 10 && val.length <= 15, {
      message: "Phone number must be 10–15 digits",
    }),

  email: z
    .string()
    .email({ message: "Invalid email address" })
    .optional(),

  availableDays: z
    .array(
      z.enum([
        "monday",
        "tuesday",
        "wednesday",
        "thursday",
        "friday",
        "saturday",
        "sunday",
      ])
    )
    .min(1, { message: "Select at least one available day" }),

  consultationFee: z
    .coerce
    .number({ invalid_type_error: "Consultation fee must be a number" })
    .min(0, { message: "Consultation fee must be positive" }),

  status: z.boolean().default(true),
});

