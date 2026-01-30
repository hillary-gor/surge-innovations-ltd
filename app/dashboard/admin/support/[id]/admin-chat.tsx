"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, ShieldCheck, Loader2, Check } from "lucide-react";
import { sendAdminMessageAction } from "../actions";
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
  status?: "sending" | "sent" | "error";
}

export function AdminTicketChat({ 
  ticketId, 
  initialMessages, 
  adminId 
}: { 
  ticketId: string; 
  initialMessages: Message[]; 
  adminId: string; 
}) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    const channel = supabase
      .channel(`ticket-${ticketId}`)
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "ticket_messages", filter: `ticket_id=eq.${ticketId}` },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => {
             const existingIndex = prev.findIndex(m => m.id === newMsg.id);
             if (existingIndex !== -1) {
               const updated = [...prev];
               updated[existingIndex] = { ...newMsg, status: "sent" };
               return updated;
             }
             return [...prev, newMsg];
          });
          router.refresh();
        }
      )
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [supabase, ticketId, router]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    const messageId = crypto.randomUUID(); 
    const messageContent = newMessage;
    setNewMessage(""); 
    setSending(true);

    const optimisticMsg: Message = {
      id: messageId,
      message: messageContent,
      is_admin: true,
      created_at: new Date().toISOString(),
      sender_id: adminId,
      status: "sending"
    };
    setMessages((prev) => [...prev, optimisticMsg]);

    try {
      const res = await sendAdminMessageAction(ticketId, messageContent, messageId);
      if (res.success) {
        setMessages((prev) => prev.map(m => m.id === messageId ? { ...m, status: "sent" } : m));
      } else {
        setMessages((prev) => prev.filter(m => m.id !== messageId));
        setNewMessage(messageContent);
        toast.error("Failed to send");
      }
    } catch {
      setMessages((prev) => prev.filter(m => m.id !== messageId));
      toast.error("Network error");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/5">
        {messages.map((msg) => {
          const isMe = msg.is_admin;
          const isSending = msg.status === "sending";
          
          return (
            <div key={msg.id} className={cn("flex gap-3 max-w-[85%] md:max-w-[75%]", isMe ? "ml-auto flex-row-reverse" : "")}>
              <Avatar className="h-8 w-8 mt-1 border shadow-sm shrink-0">
                <AvatarFallback className={cn("text-xs font-bold", isMe ? "bg-primary text-primary-foreground" : "bg-white")}>
                  {isMe ? <ShieldCheck className="w-4 h-4" /> : <User className="w-4 h-4 text-muted-foreground"/>}
                </AvatarFallback>
              </Avatar>
              <div className={cn(
                  "p-3 rounded-2xl text-sm shadow-sm transition-all", 
                  isMe ? "bg-primary text-primary-foreground rounded-tr-sm" : "bg-card border rounded-tl-sm",
                  isSending ? "opacity-70" : "opacity-100"
                )}>
                <p className="whitespace-pre-wrap leading-relaxed wrap-break-word">{msg.message}</p>
                <div className={cn("flex items-center justify-end gap-1 mt-1", isMe ? "text-primary-foreground/70" : "text-muted-foreground")}>
                  {isSending ? <Loader2 className="w-3 h-3 animate-spin" /> : isMe && <Check className="w-3 h-3" />}
                  <span className="text-[10px] opacity-80">
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-3 bg-background border-t flex gap-2 items-end shrink-0 safe-area-bottom">
        <Textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Reply..."
          className="min-h-12 max-h-32 resize-none py-3"
          onKeyDown={(e) => {
             if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
             }
          }}
        />
        <Button onClick={handleSend} disabled={sending || !newMessage.trim()} size="icon" className="h-12 w-12 shrink-0">
          {sending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
        </Button>
      </div>
    </div>
  );
}