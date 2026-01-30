"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  MoreHorizontal, 
  Ban, 
  Calendar, 
  Edit2 
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { cancelSubscriptionAction } from "./actions";

export interface Subscription {
  id: string;
  status: string;
  next_billing_date: string;
  custom_price: number | null;
  plans: {
    name: string;
    price: number;
  };
  profiles: {
    full_name: string;
    email: string;
  };
}

export function SubscriptionList({ initialSubscriptions }: { initialSubscriptions: Subscription[] }) {
  const [subscriptions, setSubscriptions] = useState(initialSubscriptions);

  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure? This will stop all future billing for this client.")) return;

    toast.promise(cancelSubscriptionAction(id), {
      loading: "Cancelling...",
      success: () => {
        setSubscriptions(prev => prev.filter(sub => sub.id !== id));
        return "Subscription cancelled";
      },
      error: "Failed to cancel"
    });
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Billing Price</TableHead>
            <TableHead>Next Bill</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subscriptions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No active subscriptions found.
              </TableCell>
            </TableRow>
          ) : subscriptions.map((sub) => {
            const isCustom = sub.custom_price !== null && sub.custom_price !== undefined;
            const displayPrice = isCustom ? sub.custom_price : sub.plans.price;

            return (
              <TableRow key={sub.id}>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{sub.profiles?.full_name}</span>
                    <span className="text-xs text-muted-foreground">{sub.profiles?.email}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">{sub.plans?.name}</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono">KES {displayPrice?.toLocaleString()}</span>
                    {isCustom && (
                      <Badge variant="secondary" className="text-[10px] h-5 px-1.5">Custom</Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-3 h-3 opacity-70" />
                    {new Date(sub.next_billing_date).toLocaleDateString()}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200 uppercase text-[10px]">
                    {sub.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem disabled>
                        <Edit2 className="w-4 h-4 mr-2" /> Modify Price
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        onClick={() => handleCancel(sub.id)}
                        className="text-red-600 focus:text-red-600 focus:bg-red-50"
                      >
                        <Ban className="w-4 h-4 mr-2" /> Cancel Subscription
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}