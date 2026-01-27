"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CompleteProfileModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("completeProfile") === "true") {
      const timer = setTimeout(() => setOpen(true), 0);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-106.25">
        <DialogHeader>
          <DialogTitle>Complete Your Profile</DialogTitle>
        </DialogHeader>
        <p className="my-4 text-sm text-muted-foreground">
          You have successfully signed in. Please complete your profile to
          continue.
        </p>
        <DialogFooter className="flex justify-end gap-2">
          <Button onClick={() => setOpen(false)}>Close</Button>
          <Link href="/auth/complete-profile">
            <Button>Complete Profile</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
