"use server";

import { createClient } from "@/utils/supabase/server";

export async function submitContactForm(formData: {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("contact_messages").insert([
    {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      project_type: formData.projectType,
      budget: formData.budget,
      message: formData.message,
    },
  ]);

  if (error) {
    console.error("Error inserting contact message:", error);
    return { success: false, message: "Failed to send message" };
  }

  return { success: true, message: "Message sent successfully!" };
}
