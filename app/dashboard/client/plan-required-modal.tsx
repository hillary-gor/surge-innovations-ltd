"use client";

import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function PlanRequiredModal({ hasActivePlan }: { hasActivePlan: boolean }) {
  const router = useRouter();


  const isOpen = !hasActivePlan;

  return (
    <Dialog open={isOpen} onOpenChange={() => {

    }}>
      <DialogContent 
        className="sm:max-w-106.25 text-center" 
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-xl text-center">Subscription Required</DialogTitle>
          <DialogDescription className="text-center py-4">
            You currently do not have an active plan. To access your dashboard and project tools, please select a subscription.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-center">
          <Button 
            onClick={() => router.push("/pricing")} 
            className="w-full"
          >
            View Pricing Plans
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}