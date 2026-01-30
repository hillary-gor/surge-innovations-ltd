"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function createTicketAction(data: { subject: string; priority: string; description: string }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, message: "Unauthorized" };

  // 1. Create the Ticket
  const { data: ticket, error: ticketError } = await supabase
    .from("tickets")
    .insert({
      user_id: user.id,
      subject: data.subject,
      priority: data.priority,
      status: "open"
    })
    .select()
    .single();

  if (ticketError || !ticket) {
    console.error("Ticket Error:", ticketError);
    return { success: false, message: "Failed to create ticket" };
  }

  // 2. Add the initial message (Description)
  const { error: msgError } = await supabase
    .from("ticket_messages")
    .insert({
      ticket_id: ticket.id,
      sender_id: user.id,
      message: data.description,
      is_admin: false
    });

  if (msgError) {
    console.error("Message Error:", msgError);
  }

  revalidatePath("/dashboard/client/support");
  return { success: true, message: "Ticket created successfully" };
}

export async function sendMessageAction(ticketId: string, message: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) return { success: false, message: "Unauthorized" };

  // 1. Insert Message
  const { error } = await supabase
    .from("ticket_messages")
    .insert({
      ticket_id: ticketId,
      sender_id: user.id,
      message: message,
      is_admin: false
    });

  if (error) return { success: false, message: "Failed to send" };

  // 2. Update Ticket 'updated_at' so it bumps to top
  await supabase
    .from("tickets")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", ticketId);

  revalidatePath(`/dashboard/client/support/${ticketId}`);
  return { success: true };
}

export async function closeTicketAction(ticketId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  // Update Status to 'resolved'
  const { error } = await supabase
    .from("tickets")
    .update({ status: "resolved" })
    .eq("id", ticketId)
    .eq("user_id", user.id);

  if (error) return { success: false, message: "Failed to close ticket" };

  // System message saying it was closed
  await supabase.from("ticket_messages").insert({
    ticket_id: ticketId,
    sender_id: user.id,
    message: "Ticket marked as resolved by client.",
    is_admin: false
  });

  revalidatePath(`/dashboard/client/support/${ticketId}`);
  return { success: true };
}