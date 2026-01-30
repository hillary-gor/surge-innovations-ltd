import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateTicketDialog } from "./create-ticket-dialog";
import { MessageSquare, Clock, AlertCircle, CheckCircle, Archive } from "lucide-react";

export default async function SupportPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const { data: tickets } = await supabase
    .from("tickets")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const allTickets = tickets || [];
  
  // Filter Logic
  const activeTickets = allTickets.filter(t => t.status === 'open' || t.status === 'in_progress');
  const closedTickets = allTickets.filter(t => t.status === 'resolved' || t.status === 'closed');

  type Ticket = {
    id: string;
    subject: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority: string;
    updated_at: string;
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'open': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'in_progress': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'resolved': return "bg-green-100 text-green-800 border-green-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const TicketCard = ({ ticket }: { ticket: Ticket }) => (
    <Link href={`/dashboard/client/support/${ticket.id}`}>
      <Card className="hover:bg-muted/50 transition-colors cursor-pointer mb-3">
        <CardContent className="p-5 flex items-center justify-between">
          <div className="space-y-1.5">
            <div className="flex items-center gap-3">
              <span className="font-semibold text-base">{ticket.subject}</span>
              <Badge variant="outline" className={getStatusColor(ticket.status)}>
                {ticket.status.replace('_', ' ')}
              </Badge>
              {ticket.priority === 'urgent' && ticket.status !== 'resolved' && (
                <Badge variant="destructive" className="flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> Urgent
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" /> Updated {new Date(ticket.updated_at).toLocaleDateString()}
              </span>
              <span className="font-mono text-xs opacity-50">#{ticket.id.slice(0, 8)}</span>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <MessageSquare className="w-4 h-4" />
          </Button>
        </CardContent>
      </Card>
    </Link>
  );

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-background max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
          <p className="text-muted-foreground">Track issues and communicate with engineering.</p>
        </div>
        <CreateTicketDialog />
      </div>

      <Tabs defaultValue="active" className="space-y-6">
        <TabsList>
          <TabsTrigger value="active">Active Tickets ({activeTickets.length})</TabsTrigger>
          <TabsTrigger value="closed">Resolved ({closedTickets.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeTickets.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <CheckCircle className="h-12 w-12 text-green-500/50 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">All Clear!</h3>
              <p className="text-muted-foreground">You have no open support tickets.</p>
            </div>
          ) : (
            activeTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
          )}
        </TabsContent>

        <TabsContent value="closed" className="space-y-4">
          {closedTickets.length === 0 ? (
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
              <Archive className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
              <h3 className="text-lg font-semibold">No History</h3>
              <p className="text-muted-foreground">Past resolved tickets will appear here.</p>
            </div>
          ) : (
            closedTickets.map(ticket => <TicketCard key={ticket.id} ticket={ticket} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}