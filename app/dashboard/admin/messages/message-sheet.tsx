"use client";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { ContactMessage } from "./message-list";
import { 
  Mail, Phone, Building2, Wallet, Calendar, Tag, Send, X, CheckCircle, 
  Sparkles, FileText, ChevronDown, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, useEffect, useActionState, useTransition } from "react";
import { sendReplyAction, sendInvoiceAction, ReplyState } from "./reply-action";
import { deleteMessageAction } from "./delete-action";
import { toast } from "sonner";
import { useFormStatus } from "react-dom";

interface ExtendedContactMessage extends ContactMessage {
  status?: string | null;
}

const QUICK_REPLIES = [
  { 
    label: "Schedule a Call", 
    text: "Hi [Name],\n\nThanks for reaching out! I'd love to discuss this further. Are you available for a quick 15-minute call sometime this week?\n\nBest,\nSurge Team" 
  },
  { 
    label: "Pricing Info", 
    text: "Hi [Name],\n\nThanks for your interest in our services. Based on your requirements, I've attached some preliminary pricing info. Let me know if you have questions.\n\nBest,\nSurge Team" 
  },
  { 
    label: "Received confirmation", 
    text: "Hi [Name],\n\nJust confirming we received your message. We are reviewing your requirements and will get back to you within 24 hours.\n\nBest,\nSurge Team" 
  },
  { 
    label: "Request More Details", 
    text: "Hi [Name],\n\nThanks for the message. Could you provide a bit more detail regarding your timeline and specific feature requirements so we can give you a better estimate?\n\nBest,\nSurge Team" 
  },
  { 
    label: "Not a Fit", 
    text: "Hi [Name],\n\nThank you for reaching out. Unfortunately, we are not taking on new projects of this nature at the moment. We wish you the best with your search.\n\nBest,\nSurge Team" 
  }
];

export function MessageSheet({ message, open, onOpenChange }: { message: ContactMessage | null; open: boolean; onOpenChange: (open: boolean) => void }) {
  const [isReplying, setIsReplying] = useState(false);
  const [trackedMessageId, setTrackedMessageId] = useState<string | undefined>(message?.id);

  if (message?.id !== trackedMessageId) {
    setTrackedMessageId(message?.id);
    setIsReplying(false);
  }

  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setIsReplying(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  if (!message) return null;

  const msg = message as ExtendedContactMessage;
  const isPlanRequest = !!msg.selected_plan;
  const isAlreadyReplied = msg.status === "replied" || msg.status === "invoiced";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl p-0 flex flex-col h-full bg-background border-l-border">
        <div className="p-6 bg-muted/30 border-b border-border">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-2">
              <SheetTitle className="text-xl font-bold">{msg.name}</SheetTitle>
              {isAlreadyReplied && (
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  <CheckCircle className="w-3 h-3 mr-1" /> {msg.status === "invoiced" ? "Invoiced" : "Replied"}
                </Badge>
              )}
            </div>
            
            {/* DELETE ACTION */}
            <DeleteButton messageId={msg.id} onSuccess={() => onOpenChange(false)} />
          </div>
          
          <div className="flex flex-col gap-1">
             <div className="text-sm text-primary flex items-center gap-2"><Mail className="w-3.5 h-3.5" /> {msg.email}</div>
             {msg.phone && <div className="text-sm text-muted-foreground flex items-center gap-2"><Phone className="w-3.5 h-3.5" /> {msg.phone}</div>}
          </div>
        </div>

        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1"><Tag className="w-3 h-3" /> Project Type</span>
                <p className="text-sm font-medium capitalize">{msg.project_type.replace(/_/g, " ")}</p>
              </div>
              <div className="space-y-1">
                 <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1"><Calendar className="w-3 h-3" /> Date</span>
                <p className="text-sm font-medium">{new Date(msg.created_at).toLocaleString()}</p>
              </div>
              {msg.company && (
                <div className="space-y-1 col-span-2">
                   <span className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1"><Building2 className="w-3 h-3" /> Company</span>
                   <p className="text-sm font-medium">{msg.company}</p>
                </div>
              )}
            </div>
            
            <Separator />

            {isPlanRequest ? (
              <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-lg border border-purple-100 dark:border-purple-800 space-y-3">
                <div className="flex justify-between items-center">
                   <h4 className="text-sm font-bold text-purple-900 dark:text-purple-300">Plan Request</h4>
                   {!isReplying && (
                     <InvoiceButton message={msg} />
                   )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <p className="text-xs text-muted-foreground">Plan Name</p>
                      <Badge className="bg-purple-600 hover:bg-purple-700 mt-1">{msg.selected_plan}</Badge>
                   </div>
                   <div>
                      <p className="text-xs text-muted-foreground">Price</p>
                      <p className="font-mono font-medium text-sm mt-1">{msg.plan_price} <span className="text-xs text-muted-foreground">/ {msg.billing_cycle}</span></p>
                   </div>
                </div>
              </div>
            ) : msg.budget && (
               <div className="bg-muted/40 p-3 rounded-md border border-border flex items-center gap-3">
                  <Wallet className="w-4 h-4 text-muted-foreground" />
                  <div>
                     <p className="text-xs text-muted-foreground font-bold uppercase">Estimated Budget</p>
                     <p className="text-sm font-medium">{msg.budget}</p>
                  </div>
               </div>
            )}

            <div className="space-y-2">
               <h4 className="text-sm font-bold text-muted-foreground uppercase">Original Message</h4>
               <div className="bg-card p-4 rounded-lg border border-border text-sm leading-relaxed whitespace-pre-wrap shadow-sm">{msg.message}</div>
            </div>

            {isReplying && (
              <div className="mt-6 border rounded-xl p-4 bg-background shadow-sm animate-in slide-in-from-bottom-5 fade-in duration-300">
                <ReplyForm 
                  message={msg} 
                  onCancel={() => setIsReplying(false)} 
                  onSuccess={() => setIsReplying(false)}
                />
              </div>
            )}
          </div>
        </ScrollArea>

        {!isReplying && (
          <div className="p-6 border-t border-border bg-background mt-auto flex gap-3">
             <Button variant="outline" className="flex-1" asChild><a href={`mailto:${msg.email}`}>External App</a></Button>
             <Button className="flex-2" onClick={() => setIsReplying(true)}><Mail className="w-4 h-4 mr-2" /> Reply Directly</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function DeleteButton({ messageId, onSuccess }: { messageId: string; onSuccess: () => void }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteMessageAction(messageId);
      if (result.success) {
        toast.success("Message deleted");
        onSuccess();
      } else {
        toast.error(result.message);
      }
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Message?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the message from the database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isPending}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function InvoiceButton({ message }: { message: ExtendedContactMessage }) {
  const initialState: ReplyState = { success: false };
  const [state, dispatch] = useActionState<ReplyState, FormData>(sendInvoiceAction, initialState);
  
  useEffect(() => {
    if (state.success) toast.success(state.message);
    else if (state.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={dispatch}>
      <input type="hidden" name="messageId" value={message.id} />
      <input type="hidden" name="recipientEmail" value={message.email} />
      <input type="hidden" name="recipientName" value={message.name} />
      <input type="hidden" name="planName" value={message.selected_plan || ""} />
      <input type="hidden" name="planPrice" value={message.plan_price || ""} />
      <input type="hidden" name="billingCycle" value={message.billing_cycle || ""} />
      
      <InvoiceSubmitBtn />
    </form>
  )
}

function InvoiceSubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Button size="sm" variant="outline" className="h-7 text-purple-700 border-purple-200 hover:bg-purple-100" disabled={pending}>
       {pending ? "Sending..." : <><FileText className="w-3 h-3 mr-1" /> Send Invoice</>}
    </Button>
  )
}

function ReplyForm({ message, onCancel, onSuccess }: { message: ContactMessage; onCancel: () => void; onSuccess: () => void; }) {
  const initialState: ReplyState = { success: false };
  const [state, dispatch] = useActionState<ReplyState, FormData>(sendReplyAction, initialState);
  const [bodyText, setBodyText] = useState("");

  useEffect(() => {
    if (state.success) { toast.success(state.message); onSuccess(); }
    else if (state.message) toast.error(state.message);
  }, [state, onSuccess]);

  const handleQuickReply = (template: string) => {
    const filledTemplate = template.replace("[Name]", message.name.split(" ")[0]);
    setBodyText(filledTemplate);
  };

  return (
    <form action={dispatch} className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold text-sm">Compose Reply</h4>
        <Button variant="ghost" size="sm" type="button" onClick={onCancel} className="h-6 w-6 p-0 rounded-full"><X className="w-4 h-4" /></Button>
      </div>

      <input type="hidden" name="messageId" value={message.id} />
      <input type="hidden" name="recipientEmail" value={message.email} />
      <input type="hidden" name="recipientName" value={message.name} />

      <div className="space-y-2">
        <Label htmlFor="subject" className="text-xs">Subject</Label>
        <Input id="subject" name="subject" defaultValue={message.project_type ? `Re: Inquiry about ${message.project_type}` : "Re: Your Inquiry"} />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="replyBody" className="text-xs">Message</Label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-6 text-xs text-primary gap-1">
                <Sparkles className="w-3 h-3" /> Quick Replies <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {QUICK_REPLIES.map((qr) => (
                <DropdownMenuItem key={qr.label} onClick={() => handleQuickReply(qr.text)}>
                  {qr.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        
        <Textarea 
          id="replyBody" 
          name="replyBody" 
          value={bodyText}
          onChange={(e) => setBodyText(e.target.value)}
          placeholder="Type your response here..." 
          className="min-h-40 resize-none"
        />
        {state.errors?.replyBody && <p className="text-xs text-red-500">{state.errors.replyBody[0]}</p>}
      </div>

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="ghost" onClick={onCancel}>Cancel</Button>
        <SubmitReplyButton />
      </div>
    </form>
  );
}

function SubmitReplyButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="bg-primary text-primary-foreground hover:bg-primary/90">
      {pending ? "Sending..." : <><Send className="w-3 h-3 mr-2" /> Send Reply</>}
    </Button>
  );
}