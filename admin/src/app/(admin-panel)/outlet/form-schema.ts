import { z } from "zod";

export const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  city: z.string().min(1, "City is required"),
  area: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  mobile: z.coerce.number().or(z.string()).transform((val) => {
    if (typeof val === "string") {
      return parseInt(val, 10);
    }
    return val;
  }),
  mapLink: z.string().optional(), 
});

export default formSchema;
