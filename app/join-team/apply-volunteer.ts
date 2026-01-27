"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { volunteerSchema } from "@/lib/schemas/volunteer-schema"; // Import the shared schema

export async function submitVolunteerApplication(formData: FormData) {
  const supabase = await createClient();

  // 1. Check Authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "You must be signed in to apply." };
  }

  // 2. Parse & Validate Data using SHARED SCHEMA
  const rawData = Object.fromEntries(formData.entries());
  
  // Handle Checkbox "on" logic for FormData
  if (!rawData.terms) rawData.terms = ""; 

  const validation = volunteerSchema.safeParse(rawData);

  if (!validation.success) {
    // Return the first error message found for simplicity, or generic
    return { success: false, error: "Validation failed. Please check your inputs." };
  }

  const data = validation.data;

  // 3. Save to Database
  const { error: dbError } = await supabase.from("volunteer_applications").insert({
    user_id: user.id,
    first_name: data.firstName,
    last_name: data.lastName,
    email: data.email,
    phone: data.phone,
    location: data.location,
    experience_level: data.experienceLevel,
    education_background: data.educationBackground,
    technical_skills: data.technicalSkills,
    portfolio_url: data.portfolioUrl || null,
    weekly_availability: data.weeklyAvailability,
    motivation: data.motivation,
    // previousProjects is not in our Zod schema yet, if you added it, map it here
  });

  if (dbError) {
    console.error("DB Error:", dbError);
    return { success: false, error: "Failed to submit application. Please try again." };
  }

  revalidatePath("/join-team");
  return { success: true, message: "Application submitted successfully!" };
}