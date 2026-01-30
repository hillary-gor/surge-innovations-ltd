"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { sendPasswordResetEmailAction } from "./actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function PasswordResetButton() {
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    try {
      const res = await sendPasswordResetEmailAction();
      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Failed to initiate password reset");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleReset} disabled={loading}>
      {loading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
        </>
      ) : (
        "Reset Password"
      )}
    </Button>
  );
}