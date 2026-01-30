"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function sendAdminMessageAction(ticketId: string, message: string, messageId: string) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  const { error } = await supabase.from("ticket_messages").insert({
    id: messageId,
    ticket_id: ticketId,
    sender_id: user.id,
    message: message,
    is_admin: true
  });

  if (error) {
    console.error("Send Error:", error);
    return { success: false, message: "Failed to send" };
  }

  // Update ticket timestamp
  await supabase
    .from("tickets")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", ticketId);

  revalidatePath(`/dashboard/admin/support/${ticketId}`);
  return { success: true };
}

export async function updateTicketStatusAction(ticketId: string, status: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("tickets")
    .update({ status })
    .eq("id", ticketId);

  if (error) return { success: false, message: "Update failed" };

  revalidatePath(`/dashboard/admin/support/${ticketId}`);
  revalidatePath(`/dashboard/admin/support`);
  return { success: true, message: "Status updated" };
}

export async function updateTicketPriorityAction(ticketId: string, priority: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("tickets")
    .update({ priority })
    .eq("id", ticketId);

  if (error) return { success: false, message: "Update failed" };

  revalidatePath(`/dashboard/admin/support/${ticketId}`);
  return { success: true, message: "Priority updated" };
}