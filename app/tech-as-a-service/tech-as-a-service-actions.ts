"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitInquiry(formData: FormData) {
  const supabase = await createClient();

  const inquiry = {
    company_name: formData.get("companyName") as string,
    industry: formData.get("industry") as string,
    contact_name: formData.get("contactName") as string,
    role: formData.get("role") as string,
    contact_email: formData.get("contactEmail") as string,
    contact_phone: formData.get("contactPhone") as string,
    project_type: formData.get("projectType") as string,
    timeline: formData.get("timeline") as string,
    budget: formData.get("budget") as string,
    project_details: formData.get("projectDetails") as string,
    existing_tech: formData.get("existingTech") as string,
  };

  const { error } = await supabase
    .from("tech_as_a_service_inquiries")
    .insert([inquiry]);

  if (error) {
    console.error("Error inserting inquiry:", error);
    return {
      success: false,
      message: "Failed to submit inquiry. Please try again later.",
    };
  }

  return { success: true, message: "Inquiry submitted successfully!" };
}
