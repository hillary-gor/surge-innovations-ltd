"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { updateBillingInfoAction } from "./actions";
import { toast } from "sonner";
import { Building, MapPin, Smartphone, FileText } from "lucide-react";

interface BillingInfo {
  company_name?: string;
  kra_pin?: string;
  address?: string;
  mpesa_number?: string;
}

export function BillingSettings({ initialData }: { initialData: BillingInfo }) {
  const [data, setData] = useState(initialData || {});
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await updateBillingInfoAction(data);
      if (res.success) toast.success("Billing details updated");
      else toast.error("Failed to update");
    } catch {
      toast.error("Error saving settings");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invoice Details</CardTitle>
        <CardDescription>
          These details will appear on your future invoice PDFs.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="grid gap-2">
          <Label>Company / Business Name</Label>
          <div className="relative">
            <Building className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="e.g. Surge Innovations Ltd"
              value={data.company_name || ""}
              onChange={(e) => setData({...data, company_name: e.target.value})}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>KRA PIN / Tax ID</Label>
          <div className="relative">
            <FileText className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="e.g. P051..."
              value={data.kra_pin || ""}
              onChange={(e) => setData({...data, kra_pin: e.target.value})}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Postal Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="P.O. Box 123 - 00100, Nairobi"
              value={data.address || ""}
              onChange={(e) => setData({...data, address: e.target.value})}
            />
          </div>
        </div>

        <div className="grid gap-2">
          <Label>Default M-PESA Number</Label>
          <div className="relative">
            <Smartphone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              className="pl-9" 
              placeholder="07XX..."
              value={data.mpesa_number || ""}
              onChange={(e) => setData({...data, mpesa_number: e.target.value})}
            />
          </div>
          <p className="text-[10px] text-muted-foreground">Used for faster checkout.</p>
        </div>

      </CardContent>
      <CardFooter className="border-t bg-muted/10 px-6 py-4">
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}