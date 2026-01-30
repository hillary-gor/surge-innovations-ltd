"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, ShieldCheck, Loader2 } from "lucide-react";
import { sendMessageAction } from "../actions";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  message: string;
  is_admin: boolean;
  created_at: string;
  sender_id: string;
}

export function TicketChat({ 
  ticketId, 
  initialMessages, 
  userId 
}: { 
  ticketId: string; 
  initialMessages: Message[]; 
  userId: string; 
}) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  // 1. Auto-scroll on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // 2. Real-time Listener (Handles incoming Admin messages)
  useEffect(() => {
    const channel = supabase
      .channel(`ticket-${ticketId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "ticket_messages",
          filter: `ticket_id=eq.${ticketId}`,
        },
        (payload) => {
          const newMsg = payload.new as Message;
          // Prevent duplicate if we already added it optimistically
          setMessages((prev) => {
            if (prev.find(m => m.id === newMsg.id)) return prev;
            return [...prev, newMsg];
          });
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, ticketId, router]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    
    const tempId = crypto.randomUUID();
    const messageContent = newMessage; // Capture current state
    setNewMessage(""); // Clear input immediately

    // 3. Optimistic Update (Show immediately)
    const optimisticMsg: Message = {
      id: tempId,
      message: messageContent,
      is_admin: false,
      created_at: new Date().toISOString(),
      sender_id: userId
    };

    setMessages((prev) => [...prev, optimisticMsg]);
    setSending(true);

    try {
      const res = await sendMessageAction(ticketId, messageContent);
      if (!res.success) {
        // Rollback if failed
        setMessages((prev) => prev.filter(m => m.id !== tempId));
        setNewMessage(messageContent); // Restore text
        toast.error("Failed to send message");
      }
    } catch {
      setMessages((prev) => prev.filter(m => m.id !== tempId));
      toast.error("Network error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-150 border rounded-lg bg-background shadow-sm overflow-hidden">
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/10">
        {messages.map((msg) => {
          const isMe = msg.sender_id === userId;
          
          return (
            <div 
              key={msg.id} 
              className={cn(
                "flex gap-3 max-w-[80%]",
                isMe ? "ml-auto flex-row-reverse" : ""
              )}
            >
              <Avatar className="h-8 w-8 mt-1 border">
                <AvatarFallback className={cn(
                  "text-xs font-bold", 
                  isMe ? "bg-primary text-primary-foreground" : "bg-orange-100 text-orange-700"
                )}>
                  {isMe ? "ME" : <ShieldCheck className="w-4 h-4" />}
                </AvatarFallback>
              </Avatar>
              
              <div className={cn(
                "p-3 rounded-lg text-sm shadow-sm",
                isMe 
                  ? "bg-primary text-primary-foreground rounded-tr-none" 
                  : "bg-white border rounded-tl-none"
              )}>
                <p className="whitespace-pre-wrap leading-relaxed">{msg.message}</p>
                <p className={cn(
                  "text-[10px] mt-1 text-right opacity-70",
                  isMe ? "text-primary-foreground" : "text-muted-foreground"
                )}>
                  {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-4 bg-background border-t flex gap-2 items-end">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
          className="min-h-15 resize-none"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
        />
        <Button 
          onClick={handleSend} 
          disabled={sending || !newMessage.trim()} 
          className="h-15 w-15"
        >
          {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
}