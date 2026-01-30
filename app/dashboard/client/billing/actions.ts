"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";


// 1. Interface for M-PESA Invoice Data
interface InvoiceResponse {
  amount: number;
  invoice_number: string;
  subscriptions: { user_id: string } | { user_id: string }[] | null;
}

// 2. Interface for Billing Settings
export interface BillingInfo {
  company_name?: string;
  kra_pin?: string;
  address?: string;
  mpesa_number?: string;
}

async function getMpesaToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY!;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });

  const data = await res.json();
  return data.access_token;
}

// --- Action 1: Initiate Payment ---

export async function initiateMpesaPaymentAction(invoiceId: string, phoneNumber: string) {
  const supabase = await createClient();
  
  // 1. Auth Check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  // 2. Fetch Invoice (Ensure ownership)
  const { data: rawData } = await supabase
    .from("invoices")
    .select("amount, invoice_number, subscriptions(user_id)")
    .eq("id", invoiceId)
    .single();

  const invoice = rawData as unknown as InvoiceResponse;
  
  const subData = invoice?.subscriptions;
  const subscription = Array.isArray(subData) ? subData[0] : subData;

  if (!invoice || !subscription || subscription.user_id !== user.id) {
    return { success: false, message: "Invoice not found or access denied" };
  }

  // 4. Sanitize Phone (254...)
  let formattedPhone = phoneNumber.replace(/\+/g, "").replace(/\s/g, "");
  if (formattedPhone.startsWith("0")) formattedPhone = "254" + formattedPhone.slice(1);

  try {
    const token = await getMpesaToken();
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.ceil(invoice.amount),
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
      AccountReference: invoice.invoice_number,
      TransactionDesc: `Pay ${invoice.invoice_number}`,
    };

    const res = await fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.ResponseCode !== "0") throw new Error(data.errorMessage || "STK Push failed");

    // 5. Update Invoice Status
    await supabase.from("invoices").update({
      checkout_request_id: data.CheckoutRequestID,
      phone_number: formattedPhone,
      status: "pending"
    }).eq("id", invoiceId);

    revalidatePath("/dashboard/client/billing");
    return { success: true, message: "Request sent! Check your phone." };

  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Payment failed";
    console.error("M-PESA Error:", error);
    return { success: false, message: msg };
  }
}

// --- Action 2: Update Billing Settings (NEW) ---

export async function updateBillingInfoAction(info: BillingInfo) {
  const supabase = await createClient();
  
  // 1. Auth Check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  // 2. Update Profile
  const { error } = await supabase
    .from("profiles")
    .update({ billing_info: info })
    .eq("id", user.id);

  if (error) {
    console.error("Billing Update Error:", error);
    return { success: false, message: "Failed to update settings" };
  }

  // 3. Revalidate to show new settings immediately
  revalidatePath("/dashboard/client/billing");
  
  return { success: true };
}