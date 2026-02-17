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
  Edit2,
  RotateCcw,
  Filter
} from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  Tabs, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { toast } from "sonner";
import { cancelSubscriptionAction, reactivateSubscriptionAction } from "./actions";

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
  const [filterStatus, setFilterStatus] = useState<"active" | "cancelled">("active");

  // Handle Cancel
  const handleCancel = async (id: string) => {
    if (!confirm("Are you sure? This will stop all future billing for this client.")) return;

    toast.promise(cancelSubscriptionAction(id), {
      loading: "Cancelling...",
      success: () => {
        setSubscriptions(prev => prev.map(sub => 
          sub.id === id ? { ...sub, status: "cancelled" } : sub
        ));
        return "Subscription cancelled";
      },
      error: "Failed to cancel"
    });
  };

  // Handle Reactivate
  const handleReactivate = async (id: string) => {
    toast.promise(reactivateSubscriptionAction(id), {
      loading: "Reactivating...",
      success: () => {
        setSubscriptions(prev => prev.map(sub => 
          sub.id === id ? { ...sub, status: "active" } : sub
        ));
        return "Subscription reactivated";
      },
      error: "Failed to reactivate"
    });
  };

  // Filter Logic
  const filteredSubscriptions = subscriptions.filter(sub => {
    if (filterStatus === "active") return sub.status === "active";
    return sub.status !== "active";
  });

  return (
    <div className="space-y-4">
      {/* Filter Tabs */}
      <div className="flex items-center justify-between">
        <Tabs value={filterStatus} onValueChange={(v) => setFilterStatus(v as "active" | "cancelled")}>
          <TabsList>
            <TabsTrigger value="active">Active ({subscriptions.filter(s => s.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({subscriptions.filter(s => s.status !== 'active').length})</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

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
            {filteredSubscriptions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No {filterStatus} subscriptions found.
                </TableCell>
              </TableRow>
            ) : filteredSubscriptions.map((sub) => {
              const isCustom = sub.custom_price !== null && sub.custom_price !== undefined;
              const displayPrice = isCustom ? sub.custom_price : sub.plans.price;
              const isActive = sub.status === 'active';

              return (
                <TableRow key={sub.id} className={!isActive ? "bg-muted/30" : ""}>
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
                    <Badge 
                      variant={isActive ? "default" : "secondary"}
                      className={isActive ? "bg-green-100 text-green-800 hover:bg-green-100 border-green-200" : ""}
                    >
                      {sub.status.toUpperCase()}
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
                        
                        {isActive ? (
                          <>
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
                          </>
                        ) : (
                          <DropdownMenuItem 
                            onClick={() => handleReactivate(sub.id)}
                            className="text-blue-600 focus:text-blue-600 focus:bg-blue-50"
                          >
                            <RotateCcw className="w-4 h-4 mr-2" /> Reactivate Plan
                          </DropdownMenuItem>
                        )}

                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}