"use server";

import { createClient } from "@/utils/supabase/server";

export async function scheduleVisit(formData: FormData) {
  const supabase = await createClient();

  const full_name = formData.get("full_name") as string;
  const company = formData.get("company") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const visit_type = formData.get("visitType") as string;
  const preferred_date = formData.get("preferred_date") as string;
  const preferred_time = formData.get("preferred_time") as string;
  const address = formData.get("address") as string | null;
  const meeting_method = formData.get("meetingMethod") as string | null;
  const project_details = formData.get("message") as string;

  const { error } = await supabase.from("scheduled_visits").insert([
    {
      full_name,
      company,
      email,
      phone,
      visit_type,
      preferred_date,
      preferred_time,
      address,
      meeting_method,
      project_details,
    },
  ]);

  if (error) {
    console.error("Error inserting visit:", error);
    return { success: false, message: "Failed to schedule visit." };
  }

  return { success: true };
}
