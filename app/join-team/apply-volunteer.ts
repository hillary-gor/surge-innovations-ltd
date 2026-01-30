"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { volunteerSchema } from "@/lib/schemas/volunteer-schema";
import { transporter } from "@/lib/nodemailer";
import { generateVolunteerAckEmail } from "@/lib/emails/volunteer-emails";

export async function submitVolunteerApplication(formData: FormData) {
  const supabase = await createClient();

  // 1. Check Authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return { success: false, error: "You must be signed in to apply." };
  }

  // 2. Parse & Validate Data
  const rawData = Object.fromEntries(formData.entries());
  if (!rawData.terms) rawData.terms = ""; 
  
  const validation = volunteerSchema.safeParse(rawData);
  if (!validation.success) {
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
  });

  if (dbError) {
    console.error("DB Error:", dbError);
    return { success: false, error: "Failed to submit application. Please try again." };
  }

  try {
    await transporter.sendMail({
      from: '"Surge Careers" <admin@surgeinnovations.org>',
      to: data.email,
      subject: `Application Received: ${data.firstName} ${data.lastName}`,
      html: generateVolunteerAckEmail(data.firstName, data.experienceLevel),
    });

    await transporter.sendMail({
      from: '"Surge System" <admin@surgeinnovations.org>',
      to: "info@surgeinnovations.org",
      subject: `[NEW VOLUNTEER] ${data.firstName} - ${data.experienceLevel}`,
      text: `New application from ${data.firstName} ${data.lastName}.\nSkills: ${data.technicalSkills}\nMotivation: ${data.motivation}`,
    });

  } catch (emailError) {
    console.error("Failed to send email:", emailError);
  }

  revalidatePath("/join-team");
  return { success: true, message: "Application submitted! Check your email for next steps." };
}