"use client";

import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { updateTicketStatusAction, updateTicketPriorityAction } from "../actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TicketControlProps {
  ticket: {
    id: string;
    status: string;
    priority: string;
  };
}

export function TicketControls({ ticket }: TicketControlProps) {
  const router = useRouter();

  const handleStatusChange = async (val: string) => {
    const res = await updateTicketStatusAction(ticket.id, val);
    if (res.success) {
      toast.success("Status updated");
      router.refresh();
    } else {
      toast.error("Failed to update status");
    }
  };

  const handlePriorityChange = async (val: string) => {
    const res = await updateTicketPriorityAction(ticket.id, val);
    if (res.success) {
      toast.success("Priority updated");
      router.refresh();
    } else {
      toast.error("Failed to update priority");
    }
  };

  return (
    <div className="grid gap-4">
      <div className="grid gap-2">
        <Label className="text-xs text-muted-foreground uppercase">Status</Label>
        <Select defaultValue={ticket.status} onValueChange={handleStatusChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label className="text-xs text-muted-foreground uppercase">Priority</Label>
        <Select defaultValue={ticket.priority} onValueChange={handlePriorityChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}