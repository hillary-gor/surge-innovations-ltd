"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { closeTicketAction } from "../actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function CloseTicketButton({ ticketId }: { ticketId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClose = async () => {
    setLoading(true);
    try {
      const res = await closeTicketAction(ticketId);
      if (res.success) {
        toast.success("Ticket marked as resolved");
        router.refresh();
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to close ticket");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      variant="outline" 
      className="border-green-600 text-green-600 hover:bg-green-50"
      onClick={handleClose}
      disabled={loading}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <CheckCircle className="w-4 h-4 mr-2" />
      )}
      Mark as Resolved
    </Button>
  );
}