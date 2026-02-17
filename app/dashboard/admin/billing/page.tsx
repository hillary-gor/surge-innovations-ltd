import { createClient, createAdminClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { InvoiceList, Invoice } from "./invoice-list";
import { SubscriptionList, Subscription } from "./subscription-list";
import { CreateSubscriptionSheet } from "./create-subscription-sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, Users, Clock } from "lucide-react";

export default async function BillingPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  const adminSb = await createAdminClient();
  
  const [invoicesRes, subscriptionsRes, plansRes] = await Promise.all([
    adminSb.from("invoices")
      .select(`*, subscriptions (plans (name), profiles (full_name, email, role))`)
      .order("created_at", { ascending: false }),
      
    adminSb.from("subscriptions")
      .select(`*, plans (name, price), profiles (full_name, email)`)
      .eq("status", "active"),

    adminSb.from("plans")
      .select("id, name, price")
      .order("price", { ascending: true })
  ]);

  if (invoicesRes.error) console.error("Invoice Fetch Error:", invoicesRes.error);
  if (subscriptionsRes.error) console.error("Subscription Fetch Error:", subscriptionsRes.error);
  if (plansRes.error) console.error("Plans Fetch Error:", plansRes.error);

  const invoices = invoicesRes.data || [];
  const subscriptions = subscriptionsRes.data || [];
  const plans = plansRes.data || [];

  const totalRevenue = invoices
    .filter(i => i.status === 'paid')
    .reduce((sum, i) => sum + Number(i.amount), 0);
    
  const pendingRevenue = invoices
    .filter(i => i.status === 'pending')
    .reduce((sum, i) => sum + Number(i.amount), 0);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-background pb-20">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Invoices</h1>
          <p className="text-muted-foreground">Revenue management and subscription tracking.</p>
        </div>
        <CreateSubscriptionSheet plans={plans} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Subscriptions</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{subscriptions.length}</div>
            <p className="text-xs text-muted-foreground">Recurring Clients</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Revenue</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">KES {pendingRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Unpaid Invoices</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collected</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">KES {totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Lifetime Revenue</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="invoices" className="space-y-4">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="subscriptions">Active Subscriptions</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices" className="space-y-4">
          <InvoiceList initialInvoices={invoices as unknown as Invoice[]} />
        </TabsContent>
        
        <TabsContent value="subscriptions">
          <SubscriptionList initialSubscriptions={subscriptions as unknown as Subscription[]} />
        </TabsContent>
      </Tabs>
    </div>
  );
}