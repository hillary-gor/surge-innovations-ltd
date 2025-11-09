"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return redirect("/auth/signin?message=Could not authenticate user");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/auth/signin?message=User not found after login");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profileError || !profile || !profile.role) {
    return redirect("/auth/complete-profile");
  }

  const userRole = profile.role;

  switch (userRole) {
    case "admin":
      return redirect("/dashboard/admin");
    case "support":
      return redirect("/dashboard/support");
    case "finance":
      return redirect("/dashboard/finance");
    case "client":
      return redirect("/");
    default:
      return redirect("/");
  }
}
