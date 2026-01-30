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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Download, 
  FileText, 
  Loader2,
  CreditCard,
  Smartphone
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { initiateMpesaPaymentAction } from "./actions";

export interface ClientInvoice {
  id: string;
  invoice_number: string;
  amount: number;
  status: string;
  created_at: string;
  subscriptions: {
    plans: { name: string }
  };
}

export function ClientInvoiceList({ 
  invoices, 
  userPhone 
}: { 
  invoices: ClientInvoice[], 
  userPhone?: string | null 
}) {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  
  // Payment State
  const [isPayOpen, setIsPayOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<ClientInvoice | null>(null);
  const [paymentPhone, setPaymentPhone] = useState(userPhone || "");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDownload = async (invoiceId: string, invoiceNum: string) => {
    setDownloadingId(invoiceId);
    try {
      const response = await fetch(`/api/invoices/${invoiceId}/download`);
      if (!response.ok) throw new Error("Download failed");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `Invoice-${invoiceNum}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Invoice downloaded");
    } catch {
      toast.error("Download failed");
    } finally {
      setDownloadingId(null);
    }
  };

  const openPaymentModal = (invoice: ClientInvoice) => {
    setSelectedInvoice(invoice);
    setIsPayOpen(true);
  };

  const submitPayment = async () => {
    if (!selectedInvoice || !paymentPhone) {
      toast.error("Please enter a phone number");
      return;
    }

    setIsProcessing(true);
    try {
      const res = await initiateMpesaPaymentAction(selectedInvoice.id, paymentPhone);
      
      if (res.success) {
        toast.success(res.message);
        setIsPayOpen(false);
      } else {
        toast.error(res.message);
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsProcessing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'paid': return <Badge className="bg-green-100 text-green-800 border-green-200"><CheckCircle className="w-3 h-3 mr-1"/> Paid</Badge>;
      case 'pending': return <Badge variant="outline" className="text-yellow-600 border-yellow-200 bg-yellow-50"><Clock className="w-3 h-3 mr-1"/> Pending</Badge>;
      case 'overdue': return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1"/> Overdue</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (invoices.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-10 text-center text-muted-foreground">
          <FileText className="h-10 w-10 mb-3 opacity-20" />
          <p>No invoices found.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Invoice #</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="text-muted-foreground">
                  {new Date(invoice.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="font-mono font-medium">{invoice.invoice_number}</TableCell>
                <TableCell>{invoice.subscriptions?.plans?.name}</TableCell>
                <TableCell>KES {invoice.amount.toLocaleString()}</TableCell>
                <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    {invoice.status !== 'paid' && (
                      <Button 
                        size="sm" 
                        className="h-8"
                        onClick={() => openPaymentModal(invoice)}
                      >
                        <CreditCard className="w-3 h-3 mr-1.5" /> Pay
                      </Button>
                    )}
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8"
                      onClick={() => handleDownload(invoice.id, invoice.invoice_number)}
                      disabled={downloadingId === invoice.id}
                    >
                      {downloadingId === invoice.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <><Download className="w-4 h-4 mr-2" /> PDF</>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Payment Confirmation Dialog */}
      <Dialog open={isPayOpen} onOpenChange={setIsPayOpen}>
        <DialogContent className="sm:max-w-106.25">
          <DialogHeader>
            <DialogTitle>M-PESA Payment</DialogTitle>
            <DialogDescription>
              We will send an STK Push to your phone. Enter your PIN to complete the transaction.
            </DialogDescription>
          </DialogHeader>
          
          {selectedInvoice && (
            <div className="grid gap-4 py-4">
              <div className="p-4 bg-muted rounded-lg flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Amount Due</span>
                <span className="text-lg font-bold">KES {selectedInvoice.amount.toLocaleString()}</span>
              </div>
              
              <div className="grid gap-2">
                <Label htmlFor="phone">M-PESA Number</Label>
                <div className="relative">
                  <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    value={paymentPhone}
                    onChange={(e) => setPaymentPhone(e.target.value)}
                    className="pl-9"
                    placeholder="07XX XXX XXX"
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPayOpen(false)} disabled={isProcessing}>Cancel</Button>
            <Button onClick={submitPayment} disabled={isProcessing} className="bg-green-600 hover:bg-green-700">
              {isProcessing ? "Sending..." : "Send Request"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}