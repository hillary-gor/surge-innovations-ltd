import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import { TicketClientLayout } from "./ticket-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminTicketDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Fetch Ticket, Messages AND User Profile
  const [ticketRes, messagesRes] = await Promise.all([
    supabase.from("tickets")
      .select(`*, profiles(*)`)
      .eq("id", id)
      .single(),
    supabase.from("ticket_messages")
      .select("*")
      .eq("ticket_id", id)
      .order("created_at", { ascending: true })
  ]);

  const ticket = ticketRes.data;
  const messages = messagesRes.data || [];
  const client = ticket?.profiles;

  if (!ticket) notFound();

  return (
    <TicketClientLayout 
      ticket={ticket} 
      messages={messages} 
      adminId={user?.id || ""} 
      client={client}
    />
  );
}