import { z } from "zod";

const requiredString = (fieldName: string) => z.string().min(1, `${fieldName} is required`);
const venueSchema = z.object({
  venue: requiredString("Venue"),
  latitude: z.number().min(-90, "Latitude must be >= -90").max(90, "Latitude must be <= 90"),
  longitude: z.number().min(-180, "Longitude must be >= -180").max(180, "Longitude must be <= 180"),
});
export const eventFormSchema = z.object({
  title: requiredString("Title"),
  category: requiredString("Category"),
  description: requiredString("Description").min(5, "Description must be at least 5 characters long"),
  date: requiredString("Date").refine(
    (value) => {
      const selectedDate = new Date(value);
      return selectedDate > new Date();
    },
    { message: "Date must be in the future" }
  ),
  city: z.string().optional(),
  venue: venueSchema,
});

export type eventFormSchema = z.infer<typeof eventFormSchema>;
