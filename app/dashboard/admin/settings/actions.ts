"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

const ProfileSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters."),
  phone: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().max(160, "Bio must be less than 160 characters.").optional(),
});

export type ProfileState = {
  message: string | null;
  errors?: {
    fullName?: string[];
    phone?: string[];
    location?: string[];
    bio?: string[];
  };
  success?: boolean;
};

export async function updateProfile(
  prevState: ProfileState,
  formData: FormData
): Promise<ProfileState> {
  const supabase = await createClient();
  
  // 1. Auth Check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return { message: "Unauthorized", success: false };
  }

  // 2. Validate Input
  const validatedFields = ProfileSchema.safeParse({
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    location: formData.get("location"),
    bio: formData.get("bio"),
  });

  if (!validatedFields.success) {
    return {
      message: "Missing or invalid fields.",
      errors: validatedFields.error.flatten().fieldErrors,
      success: false,
    };
  }

  const { fullName, phone, location, bio } = validatedFields.data;

  // 3. Update Database
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      phone: phone || null,
      location: location || null,
      bio: bio || null,
      onboarded: true 
    })
    .eq("id", user.id);

  if (error) {
    console.error("Profile Update Error:", error);
    return { message: "Database update failed.", success: false };
  }

  revalidatePath("/dashboard/admin/settings");
  return { message: "Profile updated successfully!", success: true };
}

export async function deleteAccountAction() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { error: "Unauthorized" };


  await supabase.auth.signOut();
  return { success: true };
}