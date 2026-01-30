"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function markInvoicePaidAction(invoiceId: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") throw new Error("Unauthorized: Admin Access Required");

  const { error } = await supabase
    .from("invoices")
    .update({ 
      status: "paid",
      paid_at: new Date().toISOString()
    })
    .eq("id", invoiceId);

  if (error) throw new Error("Failed to update invoice");

  revalidatePath("/dashboard/admin/billing");
  return { success: true };
}

export async function createSubscriptionAction({ 
  userId, 
  planId, 
  customPrice 
}: { 
  userId: string; 
  planId: string; 
  customPrice?: number; 
}) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { success: false, message: "Admin Access Required" };
  
  const { error } = await supabase.from("subscriptions").insert({
    user_id: userId,
    plan_id: planId,
    custom_price: customPrice, 
    status: 'active',
    start_date: new Date().toISOString(),
    next_billing_date: new Date().toISOString()
  });

  if (error) {
    console.error("Create Sub Error:", error);
    return { success: false, message: "Failed to create subscription" };
  }

  revalidatePath("/dashboard/admin/billing");
  return { success: true };
}

export async function searchUsersAction(query: string) {
  const supabase = await createClient();
  
  if (!query || query.length < 2) return [];

  const { data } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .ilike("full_name", `%${query}%`)
    .limit(5);

  return data || [];
}

export async function cancelSubscriptionAction(subscriptionId: string) {
  const supabase = await createClient();
  
  // Auth & Admin Check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error("Unauthorized");
  
  const { error } = await supabase
    .from("subscriptions")
    .update({ status: 'cancelled' })
    .eq("id", subscriptionId);

  if (error) throw new Error("Failed to cancel subscription");

  revalidatePath("/dashboard/admin/billing");
  return { success: true };
}