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
    .string()
    .min(1, { message: "Degree is required" })
    .max(50, { message: "Degree is too long" }),

  visitingTime: z
    .string()
    .min(1, { message: "Visiting time is required" })
    .max(50, { message: "Visiting time is too long" }),

  phone: z
    .string()
    .min(10, { message: "Phone number is required" })
    .max(15, { message: "Phone number is too long" }),

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
    .number({ invalid_type_error: "Consultation fee must be a number" })
    .min(0, { message: "Consultation fee must be positive" }),

  status: z.enum(["Active", "Inactive"], {
    errorMap: () => ({ message: "Status is required" })
  }),
});

