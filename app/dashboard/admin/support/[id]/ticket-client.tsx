"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronLeft, Mail, Phone, Calendar, User, Info, X } from "lucide-react";
import { AdminTicketChat } from "./admin-chat";
import { TicketControls } from "./ticket-controls";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
  sender_id: string;
  status?: "sending" | "sent" | "error";
}

interface ClientProfile {
  full_name: string | null;
  email: string | null;
  phone: string | null;
  created_at: string;
}

interface Ticket {
  id: string;
  subject: string;
  status: string;
  priority: string;
}

interface TicketClientProps {
  ticket: Ticket;
  messages: Message[];
  adminId: string;
  client: ClientProfile | null;
}

export function TicketClientLayout({ ticket, messages, adminId, client }: TicketClientProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <div className="flex flex-col h-dvh bg-muted/10 overflow-hidden">
      
      {/* Header */}
      <div className="h-16 border-b bg-background flex items-center px-4 md:px-6 justify-between shrink-0 z-20 shadow-sm md:shadow-none">
        <div className="flex items-center gap-3 overflow-hidden">
           <Button variant="ghost" size="icon" className="shrink-0" asChild>
             <Link href="/dashboard/admin/support">
               <ChevronLeft className="w-5 h-5" />
             </Link>
           </Button>
           <Separator orientation="vertical" className="h-6 hidden md:block" />
           <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-3 overflow-hidden">
             <h1 className="font-semibold text-sm md:text-lg truncate">{ticket.subject}</h1>
             <Badge variant="outline" className="font-mono text-[10px] w-fit">#{ticket.id.slice(0, 8)}</Badge>
           </div>
        </div>
        
        {/* Mobile Info Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden shrink-0"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? <X className="w-5 h-5" /> : <Info className="w-5 h-5" />}
        </Button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden relative">
        
        {/* Left: Chat Area (Full width on mobile, flexible on desktop) */}
        <div className="flex-1 flex flex-col min-w-0">
          <AdminTicketChat 
            ticketId={ticket.id} 
            initialMessages={messages} 
            adminId={adminId} 
          />
        </div>

        {/* Right: Sidebar Info (Hidden on mobile unless toggled, Fixed width on Desktop) */}
        <div className={cn(
          "absolute inset-0 bg-background/95 backdrop-blur-sm z-10 p-6 transition-all duration-300 lg:static lg:block lg:w-80 lg:border-l lg:bg-background lg:p-0",
          showDetails ? "translate-x-0" : "translate-x-full lg:translate-x-0"
        )}>
           <div className="h-full overflow-y-auto lg:p-6 space-y-6">
              
              {/* Mobile Header for Sidebar */}
              <div className="lg:hidden flex justify-between items-center mb-6">
                <h2 className="text-lg font-bold">Ticket Details</h2>
                <Button variant="ghost" size="sm" onClick={() => setShowDetails(false)}>Close</Button>
              </div>

              {/* Controls */}
              <div className="space-y-4">
                 <h3 className="font-semibold text-sm">Management</h3>
                 <TicketControls ticket={ticket} />
              </div>

              <Separator />

              {/* Client Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm">Client Profile</h3>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-3 pb-3 space-y-0">
                     <div className="bg-primary/10 p-2 rounded-full">
                        <User className="h-4 w-4 text-primary" />
                     </div>
                     <div className="overflow-hidden">
                        <CardTitle className="text-sm font-medium truncate">{client?.full_name || "Unknown"}</CardTitle>
                        <p className="text-xs text-muted-foreground">Verified Client</p>
                     </div>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                     <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="truncate text-xs">{client?.email}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-xs">{client?.phone || "No phone"}</span>
                     </div>
                     <div className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        <span className="text-xs">Joined {new Date(client?.created_at || "").toLocaleDateString()}</span>
                     </div>
                  </CardContent>
                </Card>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}