"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

type ActionResult = {
  success?: boolean;
  error?: string;
  message?: string;
};

const profileSchema = z.object({
  full_name: z.string().min(1, "Full Name is required"),
  phone_number: z.string().optional(),
  bio: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
});

export async function completeProfile(
  formData: FormData
): Promise<ActionResult> {
  const textEntries = Object.fromEntries(Array.from(formData.entries()));
  const parsed = profileSchema.safeParse(textEntries);

  if (!parsed.success) {
    return {
      error:
        parsed.error.issues[0]?.message || "Please check your input fields.",
    };
  }

  const { full_name, phone_number, bio, location } = parsed.data;
  const supabase = await createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "User not authenticated." };
  }

  // Upsert profile
  let upsertedProfile;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(
        {
          id: user.id,
          email: user.email,
          full_name,
          phone: phone_number ?? null,
          role: "client",
          bio: bio ?? null,
          location: location ?? null,
        },
        { onConflict: "id" }
      )
      .select("role")
      .single();

    if (error) return { error: error.message };
    upsertedProfile = data;
  } catch (err) {
    console.error("[Complete Profile Upsert Error]", err);
    return { error: "Failed to update profile." };
  }

  if (!upsertedProfile) {
    return { error: "Failed to fetch updated profile." };
  }

  // Redirect based on role (outside try/catch)
  switch (upsertedProfile.role) {
    case "admin":
      return redirect("/dashboard/admin");
    case "support":
      return redirect("/dashboard/support");
    case "finance":
      return redirect("/dashboard/finance");
    case "client":
    default:
      return redirect("/");
  }
}

export async function skipProfileCompletion(
  userId: string
): Promise<ActionResult> {
  const supabase = await createClient();

  let profile;
  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", userId)
      .single();

    if (error || !data?.role) {
      console.error(
        "Error fetching profile for skip:",
        error?.message || "Profile not found."
      );
      return redirect("/auth/signin?message=profile-missing");
    }
    profile = data;
  } catch (err) {
    console.error("[Skip Profile Fetch Error]", err);
    return redirect("/auth/signin?message=profile-missing");
  }

  switch (profile.role) {
    case "admin":
      return redirect("/dashboard/admin");
    case "vendor":
    case "client":
    default:
      return redirect("/");
  }
}
