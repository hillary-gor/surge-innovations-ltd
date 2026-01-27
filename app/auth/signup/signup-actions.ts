"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { recordConsent } from "@/components/auth/actions/legal";
import { sendAdminLeadAlert } from "@/lib/emails/mailer-templates";

export async function signup(formData: FormData, nextUrl?: string) {
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const supabase = await createClient();

  const origin = (await headers()).get("origin");
  
  const redirectTo = nextUrl 
    ? `${origin}/auth/callback?next=${encodeURIComponent(nextUrl)}`
    : `${origin}/auth/callback`;

  // 1. Create User in Supabase
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: redirectTo,
      data: {
        full_name: full_name,
      },
    },
  });

  if (error) {
    return {
      success: false,
      message: error.message || "Failed to create account.",
    };
  }

  // 2. SUCCESS: Handle Legal & Admin Alerts (Background Task)
  // We do NOT await this, so the UI is snappy.
  Promise.allSettled([
    // A. Log the Forensic Legal Consent
    recordConsent(email),

    // B. Alert YOU (The Admin) that a new user signed up
    sendAdminLeadAlert({
        name: full_name,
        email: email,
        message: "New user account created via Sign Up page.",
        plan: "New Account", // Label for your email subject
    })
  ]);

  // Note: We do NOT send a "Welcome Email" to the user here.
  // Supabase automatically sends the "Confirm your email" link.
  // Sending a second email now would confuse them.

  return {
    success: true,
    message: "Check your email! Click the link we sent to verify your account and continue.",
  };
}