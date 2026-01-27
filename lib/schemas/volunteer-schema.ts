import { z } from "zod";

export const volunteerSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  location: z.string().min(3, "Please enter a valid city and country"),
  
  experienceLevel: z.string().refine(
    (val) => ["beginner", "intermediate", "advanced"].includes(val),
    { message: "Please select an experience level" }
  ),

  educationBackground: z.string().min(1, "Please select your background"),
  
  technicalSkills: z.string().min(10, "Please list at least a few skills (min 10 chars)"),
  
  portfolioUrl: z.union([z.literal(""), z.string().url("Please enter a valid URL (start with http/https)")]),
  
  weeklyAvailability: z.string().min(1, "Please select your availability"),
  
  motivation: z.string().min(20, "Please write at least 20 characters about your motivation"),
  
  terms: z.string().refine((val) => val === "on", {
    message: "You must agree to the terms",
  }),
});

export type VolunteerFormData = z.infer<typeof volunteerSchema>;