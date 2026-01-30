"use client";

import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Search, Mail } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MessageCard } from "./message-card";
import { MessageSheet } from "./message-sheet";

export interface ContactMessage {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string;
  budget: string | null;
  message: string;
  request_type: string | null;
  selected_plan: string | null;
  plan_price: string | null;
  billing_cycle: string | null;
  status?: string | null; 
}

export function MessageList({ messages }: { messages: ContactMessage[] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { all, general, plans } = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();
    
    const filtered = messages.filter(msg => 
      msg.name.toLowerCase().includes(lowerQuery) ||
      msg.email.toLowerCase().includes(lowerQuery) ||
      (msg.company && msg.company.toLowerCase().includes(lowerQuery))
    );

    const generalList: ContactMessage[] = [];
    const planList: ContactMessage[] = [];

    filtered.forEach(msg => {
      if (msg.selected_plan) {
        planList.push(msg);
      } else {
        generalList.push(msg);
      }
    });

    return { all: filtered, general: generalList, plans: planList };
  }, [messages, searchQuery]);

  const handleView = (msg: ContactMessage) => {
    setSelectedMessage(msg);
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="relative w-full sm:max-w-md mb-6">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by name, email or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-card"
        />
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-4 w-full sm:w-auto overflow-x-auto justify-start">
          <TabsTrigger value="all" className="px-4">All ({all.length})</TabsTrigger>
          <TabsTrigger value="general" className="px-4">General ({general.length})</TabsTrigger>
          <TabsTrigger value="plans" className="px-4">Plan Requests ({plans.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {all.length === 0 ? <EmptyState /> : all.map(msg => (
            <MessageCard key={msg.id} message={msg} onClick={() => handleView(msg)} />
          ))}
        </TabsContent>
        
        <TabsContent value="general" className="space-y-4">
          {general.length === 0 ? <EmptyState /> : general.map(msg => (
            <MessageCard key={msg.id} message={msg} onClick={() => handleView(msg)} />
          ))}
        </TabsContent>

        <TabsContent value="plans" className="space-y-4">
          {plans.length === 0 ? <EmptyState /> : plans.map(msg => (
            <MessageCard key={msg.id} message={msg} onClick={() => handleView(msg)} />
          ))}
        </TabsContent>
      </Tabs>

      <MessageSheet 
        message={selectedMessage} 
        open={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
      />
    </>
  );
}

function EmptyState() {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground bg-card border border-dashed border-border rounded-lg animate-in fade-in zoom-in-95 duration-200">
      <Mail className="h-10 w-10 mb-3 opacity-20" />
      <p>No messages found.</p>
    </div>
  );
}