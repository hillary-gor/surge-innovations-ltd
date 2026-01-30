import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, AlertCircle, CheckCircle } from "lucide-react";

// Types
interface TicketProfile {
  full_name: string | null;
  email: string | null;
}

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
  updated_at: string;
  profiles: TicketProfile | null;
}

const getStatusBadge = (status: string) => {
  switch(status) {
    case 'open': return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Open</Badge>;
    case 'in_progress': return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">In Progress</Badge>;
    case 'resolved': return <Badge className="bg-green-100 text-green-800 border-green-200">Resolved</Badge>;
    default: return <Badge variant="secondary">{status}</Badge>;
  }
};

const TicketTable = ({ data }: { data: Ticket[] }) => (
  <div className="rounded-md border bg-card overflow-hidden">
    <div className="overflow-x-auto">
      <Table className="min-w-200">
        <TableHeader>
          <TableRow>
            <TableHead>Subject</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((ticket) => (
            <TableRow key={ticket.id}>
              <TableCell className="font-medium">{ticket.subject}</TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{ticket.profiles?.full_name || "Unknown"}</span>
                  <span className="text-xs text-muted-foreground">{ticket.profiles?.email}</span>
                </div>
              </TableCell>
              <TableCell>
                {ticket.priority === 'urgent' ? (
                  <Badge variant="destructive" className="flex w-fit items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> Urgent
                  </Badge>
                ) : (
                  <span className="capitalize text-muted-foreground text-sm">{ticket.priority}</span>
                )}
              </TableCell>
              <TableCell>{getStatusBadge(ticket.status)}</TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {new Date(ticket.updated_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Button size="sm" variant="ghost" asChild>
                  <Link href={`/dashboard/admin/support/${ticket.id}`}>
                    Manage
                  </Link>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div>
);

export default async function AdminSupportPage() {
  const supabase = await createClient();

  const { data: rawData } = await supabase
    .from("tickets")
    .select(`*, profiles (full_name, email)`)
    .order("updated_at", { ascending: false });

  const allTickets = (rawData as unknown as Ticket[]) || [];
  const openTickets = allTickets.filter(t => ['open', 'in_progress'].includes(t.status));
  const resolvedTickets = allTickets.filter(t => ['resolved', 'closed'].includes(t.status));

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-muted/10">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Support Desk</h1>
        <p className="text-muted-foreground">Manage client inquiries and issues.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{openTickets.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Urgent</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {allTickets.filter(t => t.priority === 'urgent' && t.status !== 'resolved').length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{resolvedTickets.length}</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="open">
        <TabsList>
          <TabsTrigger value="open">Open Queue ({openTickets.length})</TabsTrigger>
          <TabsTrigger value="resolved">History</TabsTrigger>
        </TabsList>
        <TabsContent value="open" className="mt-4">
          <TicketTable data={openTickets} />
        </TabsContent>
        <TabsContent value="resolved" className="mt-4">
          <TicketTable data={resolvedTickets} />
        </TabsContent>
      </Tabs>
    </div>
  );
}