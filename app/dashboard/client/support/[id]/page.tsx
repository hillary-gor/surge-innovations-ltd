import { createClient } from "@/utils/supabase/server";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { TicketChat } from "./ticket-chat";
import { CloseTicketButton } from "./close-ticket-button";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Clock, AlertCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function TicketDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) redirect("/auth/signin");

  // 1. Fetch Ticket & Messages in Parallel
  const [ticketRes, messagesRes] = await Promise.all([
    supabase.from("tickets").select("*").eq("id", id).single(),
    supabase.from("ticket_messages").select("*").eq("ticket_id", id).order("created_at", { ascending: true })
  ]);

  const ticket = ticketRes.data;
  const messages = messagesRes.data || [];

  // Security: Check if ticket exists and belongs to user
  if (!ticket) notFound();
  if (ticket.user_id !== user.id) redirect("/dashboard/client/support");

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return "bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200";
      case 'in_progress': return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 border-yellow-200";
      case 'resolved': return "bg-green-100 text-green-800 hover:bg-green-100 border-green-200";
      case 'closed': return "bg-gray-100 text-gray-800 hover:bg-gray-100 border-gray-200";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-background max-w-5xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Button variant="ghost" className="w-fit pl-0 hover:bg-transparent hover:text-primary" asChild>
          <Link href="/dashboard/client/support">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Tickets
          </Link>
        </Button>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight">{ticket.subject}</h1>
              <Badge className={getStatusColor(ticket.status)}>
                {ticket.status.replace('_', ' ')}
              </Badge>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="font-mono">Ticket #{ticket.id.slice(0, 8)}</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> Opened {new Date(ticket.created_at).toLocaleDateString()}
              </span>
              {ticket.priority === 'urgent' && (
                <span className="flex items-center gap-1 text-red-600 font-medium">
                  <AlertCircle className="w-3 h-3" /> Urgent Priority
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons: Use Client Component for Interaction */}
          {ticket.status !== 'resolved' && ticket.status !== 'closed' && (
            <CloseTicketButton ticketId={ticket.id} />
          )}
        </div>
      </div>

      {/* Chat Interface */}
      <TicketChat 
        ticketId={ticket.id} 
        initialMessages={messages} 
        userId={user.id} 
      />

    </div>
  );
}