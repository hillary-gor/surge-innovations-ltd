"use server";

import { createClient, createAdminClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// --- HELPER: SECURE ADMIN CHECK ---
async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) throw new Error("Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    throw new Error("Unauthorized: Admin Access Required");
  }
  
  return user;
}

// --- ACTION: MARK INVOICE PAID ---
export async function markInvoicePaidAction(invoiceId: string) {
  await requireAdmin();
  const adminSb = await createAdminClient();

  const { error } = await adminSb
    .from("invoices")
    .update({ 
      status: "paid",
      paid_at: new Date().toISOString()
    })
    .eq("id", invoiceId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/admin/billing");
  return { success: true };
}

// --- ACTION: CREATE SUBSCRIPTION + FIRST INVOICE ---
export async function createSubscriptionAction({ 
  userId, planId, customPrice 
}: { 
  userId: string; planId: string; customPrice?: number; 
}) {
  await requireAdmin();
  const adminSb = await createAdminClient();

  // 1. Get the Plan Details (We need the price for the invoice)
  // If customPrice is set, we use that. If not, we fetch the plan's default price.
  let finalPrice = customPrice;
  
  if (!finalPrice) {
    const { data: plan } = await adminSb
      .from("plans")
      .select("price")
      .eq("id", planId)
      .single();
    
    if (!plan) return { success: false, message: "Invalid Plan" };
    finalPrice = plan.price;
  }

  // 2. Calculate Dates
  const startDate = new Date();
  const nextBilling = new Date(startDate);
  nextBilling.setMonth(nextBilling.getMonth() + 1);

  // 3. Insert Subscription
  const { data: sub, error: subError } = await adminSb
    .from("subscriptions")
    .insert({
      user_id: userId,
      plan_id: planId,
      custom_price: customPrice, 
      status: 'active',
      start_date: startDate.toISOString(),
      next_billing_date: nextBilling.toISOString()
    })
    .select("id") // Return ID to link the invoice
    .single();

  if (subError || !sub) {
    console.error("Create Sub Error:", subError);
    return { success: false, message: "Failed to create subscription" };
  }

  // 4. Generate Immediate First Invoice [THE MISSING PIECE]
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`; // Simple ID Gen
  
  const { error: invError } = await adminSb.from("invoices").insert({
    subscription_id: sub.id,
    amount: finalPrice,
    status: 'pending',
    invoice_number: invoiceNumber,
    due_date: startDate.toISOString(), // Due Now
  });

  if (invError) {
    console.error("Invoice Gen Error:", invError);
    // Note: Subscription exists, but invoice failed. 
    // You might want to delete the sub here or alert the admin.
    return { success: true, message: "Subscription created, but invoice generation failed." }; 
  }

  revalidatePath("/dashboard/admin/billing");
  return { success: true };
}

// --- ACTION: SEARCH USERS ---
export async function searchUsersAction(query: string) {
  await requireAdmin();
  const adminSb = await createAdminClient(); 
  
  if (!query || query.length < 2) return [];

  const { data } = await adminSb
    .from("profiles")
    .select("id, full_name, email")
    .ilike("full_name", `%${query}%`)
    .limit(5);

  return data || [];
}

// --- ACTION: CANCEL SUBSCRIPTION ---
export async function cancelSubscriptionAction(subscriptionId: string) {
  await requireAdmin();
  const adminSb = await createAdminClient();
  
  const { error } = await adminSb
    .from("subscriptions")
    .update({ status: "cancelled" })
    .eq("id", subscriptionId);

  if (error) throw new Error(error.message);

  revalidatePath("/dashboard/admin/billing");
  return { success: true };
}

// --- ACTION: REACTIVATE SUBSCRIPTION + INVOICE ---
export async function reactivateSubscriptionAction(subscriptionId: string) {
  await requireAdmin();
  const adminSb = await createAdminClient();

  // 1. Fetch Subscription to get the Price
  const { data: sub } = await adminSb
    .from("subscriptions")
    .select("custom_price, plans(price)")
    .eq("id", subscriptionId)
    .single();

  if (!sub) return { success: false, message: "Subscription not found" };

  // Determine Price (Custom or Plan Default)
  // @ts-ignore - Supabase types can be tricky with joined arrays, but this is safe
  const price = sub.custom_price || sub.plans?.price || 0;

  // 2. Reset Dates
  const now = new Date();
  const nextBilling = new Date(now);
  nextBilling.setMonth(nextBilling.getMonth() + 1);

  // 3. Update Subscription
  const { error: updateError } = await adminSb
    .from("subscriptions")
    .update({ 
      status: "active",
      start_date: now.toISOString(),
      next_billing_date: nextBilling.toISOString()
    })
    .eq("id", subscriptionId);

  if (updateError) throw new Error(updateError.message);

  // 4. Generate "Reactivation Invoice" (Optional - Remove if you don't charge on reactivation)
  const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
  
  await adminSb.from("invoices").insert({
    subscription_id: subscriptionId,
    amount: price,
    status: 'pending',
    invoice_number: invoiceNumber,
    due_date: now.toISOString(),
  });

  revalidatePath("/dashboard/admin/billing");
  return { success: true };
}