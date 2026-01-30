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
import { CheckCircle, Clock, XCircle, Download, MoreHorizontal, Smartphone } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { markInvoicePaidAction } from "./actions";
import { triggerMpesaPayment } from "./mpesa-actions";
import { toast } from "sonner";

export interface Invoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  due_date: string;
  created_at: string;
  subscriptions: { 
    plans: { name: string };
    profiles: { 
      full_name: string; 
      email: string;
      phone?: string | null;
      role?: string;
    } 
  };
}

export function InvoiceList({ initialInvoices }: { initialInvoices: Invoice[] }) {
  const [invoices, setInvoices] = useState(initialInvoices);

  const handleMarkPaid = async (id: string) => {
    toast.promise(markInvoicePaidAction(id), {
      loading: "Updating...",
      success: () => {
        setInvoices(prev => prev.map(inv => 
          inv.id === id ? { ...inv, status: "paid" } : inv
        ));
        return "Invoice marked as PAID";
      },
      error: "Failed to update invoice"
    });
  };

  const handleMpesaPrompt = async (id: string, phone?: string | null) => {
    if (!phone) {
      toast.error("Client has no phone number on file");
      return;
    }

    toast.promise(triggerMpesaPayment(id, phone), {
      loading: "Sending STK Push...",
      success: (data) => {
        if (!data.success) throw new Error(data.message);
        return "M-PESA prompt sent to client";
      },
      error: (err) => err instanceof Error ? err.message : "Failed to send request"
    });
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid': return <Badge className="bg-green-100 text-green-800 hover:bg-green-100 border-green-200"><CheckCircle className="w-3 h-3 mr-1"/> Paid</Badge>;
      case 'pending': return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50"><Clock className="w-3 h-3 mr-1"/> Pending</Badge>;
      case 'overdue': return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1"/> Overdue</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="rounded-md border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice #</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Plan</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => {
            const client = invoice.subscriptions?.profiles;
            const plan = invoice.subscriptions?.plans;

            return (
              <TableRow key={invoice.id}>
                <TableCell className="font-mono font-medium">{invoice.invoice_number}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{client?.full_name || "Unknown"}</span>
                    <span className="text-xs text-muted-foreground">{client?.email}</span>
                  </div>
                </TableCell>
                <TableCell>{plan?.name}</TableCell>
                <TableCell>KES {invoice.amount.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell>{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {invoice.status !== 'paid' && (
                        <>
                          <DropdownMenuItem onClick={() => handleMpesaPrompt(invoice.id, client?.phone)}>
                            <Smartphone className="w-4 h-4 mr-2 text-blue-600" /> Request Payment
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleMarkPaid(invoice.id)}>
                            <CheckCircle className="w-4 h-4 mr-2 text-green-600" /> Mark as Paid
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                        </>
                      )}
                      <DropdownMenuItem>
                        <Download className="w-4 h-4 mr-2" /> Download PDF
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