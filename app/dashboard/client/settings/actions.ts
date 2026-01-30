"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export interface ProfileUpdateData {
  full_name: string;
  phone: string;
  location: string;
  bio: string;
}

export async function updateProfileAction(data: ProfileUpdateData) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: data.full_name,
      phone: data.phone,
      location: data.location,
      bio: data.bio,
      onboarded: true
    })
    .eq("id", user.id);

  if (error) {
    console.error("Profile Update Error:", error);
    return { success: false, message: "Failed to update profile" };
  }

  revalidatePath("/dashboard/client/settings");
  revalidatePath("/dashboard/client");
  return { success: true, message: "Profile updated successfully" };
}

export async function sendPasswordResetEmailAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user || !user.email) return { success: false, message: "User not found" };

  const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/update-password`,
  });

  if (error) return { success: false, message: error.message };

  return { success: true, message: `Reset link sent to ${user.email}` };
}