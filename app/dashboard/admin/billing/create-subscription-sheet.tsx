"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Wallet } from "lucide-react";
import { createSubscriptionAction } from "./actions";
import { toast } from "sonner";
import { UserPicker } from "./user-picker";

 interface Plan {
  id: string;
  name: string;
  price: number;
}

export function CreateSubscriptionSheet({ plans }: { plans: Plan[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [userId, setUserId] = useState("");
  const [planId, setPlanId] = useState("");
  const [customPrice, setCustomPrice] = useState("");

  const handleSave = async () => {
    if (!userId || !planId) {
      toast.error("Please select a client and a plan");
      return;
    }

    setLoading(true);
    try {
      const result = await createSubscriptionAction({
        userId,
        planId,
        customPrice: customPrice ? parseFloat(customPrice) : undefined
      });

      if (result.success) {
        toast.success("Subscription active!");
        setOpen(false);
        setUserId("");
        setPlanId("");
        setCustomPrice("");
      } else {
        toast.error(result.message);
      }
    } catch {
      toast.error("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const selectedPlan = plans.find(p => p.id === planId);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button className="gap-2 shadow-sm">
          <Plus className="w-4 h-4" /> New Subscription
        </Button>
      </SheetTrigger>
      
      {/* Side Panel: Right on Desktop, Bottom on Mobile */}
      <SheetContent side="right" className="w-full sm:w-110 flex flex-col gap-6">
        <SheetHeader>
          <SheetTitle>New Subscription</SheetTitle>
          <SheetDescription>
            Onboard a client to a recurring billing plan. This will generate their first invoice immediately.
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col gap-6">
          {/* 1. User Picker (Async Search) */}
          <div className="grid gap-2">
            <Label>Client</Label>
            <UserPicker onSelect={setUserId} />
          </div>

          {/* 2. Plan Selection */}
          <div className="grid gap-2">
            <Label>Billing Plan</Label>
            <Select onValueChange={setPlanId} value={planId}>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a package..." />
              </SelectTrigger>
              <SelectContent>
                {plans.map((plan) => (
                  <SelectItem key={plan.id} value={plan.id}>
                    <div className="flex flex-col text-left">
                      <span className="font-semibold">{plan.name}</span>
                      <span className="text-xs text-muted-foreground">Standard: KES {plan.price.toLocaleString()}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. Custom Price Override */}
          <div className="p-4 bg-muted/30 rounded-lg border border-border space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <Wallet className="w-4 h-4" />
              <Label className="font-semibold">Price Negotiation</Label>
            </div>
            
            <div className="grid gap-2">
              <Label className="text-xs text-muted-foreground">Custom Rate (Optional)</Label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground text-sm font-medium">KES</span>
                <Input
                  type="number"
                  placeholder={selectedPlan ? selectedPlan.price.toString() : "0.00"}
                  value={customPrice}
                  onChange={(e) => setCustomPrice(e.target.value)}
                  className="pl-12 bg-background"
                />
              </div>
              <p className="text-[10px] text-muted-foreground">
                Overrides the standard plan price for this specific client.
              </p>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-auto">
          <Button onClick={handleSave} disabled={loading} className="w-full sm:w-auto">
            {loading ? "Activating..." : "Activate Subscription"}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}