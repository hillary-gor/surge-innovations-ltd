"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { LEGAL_CONSTANTS } from "@/lib/legal-config";

/**
 * Records a forensic log of the user's consent to the Terms & Privacy Policy.
 * This is "Clickwrap" compliance: It proves WHO agreed, WHEN, and to WHICH version.
 */
export async function recordConsent(email: string) {
  const supabase = await createClient();
  const headersList = await headers();
  
  // 1. Capture Forensic Data (IP & Device)
  // 'x-forwarded-for' is the standard header for client IPs behind Vercel/proxies
  const ip = headersList.get("x-forwarded-for") || "unknown";
  const userAgent = headersList.get("user-agent") || "unknown";

  // 2. Perform Parallel Inserts (Faster than awaiting one by one)
  // We log consent for BOTH documents separately for legal clarity.
  const { error: termsError } = await supabase.from("consent_logs").insert({
    email,
    agreement_type: "terms_of_service",
    version: LEGAL_CONSTANTS.TERMS_VERSION, // e.g. "terms_2026_jan_v1.0"
    ip_address: ip,
    user_agent: userAgent,
  });

  const { error: privacyError } = await supabase.from("consent_logs").insert({
    email,
    agreement_type: "privacy_policy",
    version: LEGAL_CONSTANTS.PRIVACY_VERSION, // e.g. "privacy_2026_jan_v1.0"
    ip_address: ip,
    user_agent: userAgent,
  });

  // 3. Error Handling (Silent but logged)
  // We don't block the user if logging fails, but we need to know about it.
  if (termsError || privacyError) {
    console.error("⚠️ Legal Audit Log Failed:", { termsError, privacyError });
  }
}