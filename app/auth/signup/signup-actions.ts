// app/auth/signup/actions.ts

"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function signup(formData: FormData) {
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: full_name,
      },
    },
  });

  if (error) {
    return redirect(`/auth/signup?message=${encodeURIComponent("Could not sign up user. Please try again.")}`);
  }
  
  // Corrected redirection path to match your file structure
  return redirect("/auth/signin?message=check-email");
}