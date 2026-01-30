import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ClientInvoiceList, ClientInvoice } from "./client-invoice-list";
import { BillingSettings } from "./billing-settings";
import { BillingInfo } from "./actions";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  CreditCard, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Settings} from "lucide-react";

interface ProfileData {
  phone: string | null;
  billing_info: BillingInfo | null;
}

export default async function ClientBillingPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const [profileRes, subRes, invoicesRes] = await Promise.all([
    supabase
      .from("profiles")
      .select("phone, billing_info")
      .eq("id", user.id)
      .single(),
    
    supabase
      .from("subscriptions")
      .select(`*, plans (name, price, billing_cycle, features)`)
      .eq("user_id", user.id)
      .eq("status", "active")
      .single(),

    supabase
      .from("invoices")
      .select(`*, subscriptions!inner (user_id, plans (name))`)
      .eq("subscriptions.user_id", user.id)
      .order("created_at", { ascending: false })
  ]);

  const profile = profileRes.data as ProfileData;
  const subscription = subRes.data;
  const invoices = invoicesRes.data || [];

  const calculateDaysRemaining = (nextBillDate: string) => {
    const total = 30; 
    const now = new Date();
    const next = new Date(nextBillDate);
    const diffTime = Math.abs(next.getTime() - now.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(diffDays, total); 
  };

  const daysRemaining = subscription ? calculateDaysRemaining(subscription.next_billing_date) : 0;
  const cycleProgress = subscription ? ((30 - daysRemaining) / 30) * 100 : 0;

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-background max-w-6xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Subscription</h1>
          <p className="text-muted-foreground">Manage your plan, payments, and invoice details.</p>
        </div>
        {!subscription && (
           <Button className="bg-primary text-primary-foreground shadow-lg">
             <Zap className="w-4 h-4 mr-2" /> Upgrade Plan
           </Button>
        )}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-100">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="history">Invoices</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            
            <div className="lg:col-span-2 space-y-6">
              {subscription ? (
                <Card className="border-l-4 border-l-primary shadow-sm">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl flex items-center gap-2">
                          {subscription.plans?.name}
                          <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200">Active</Badge>
                        </CardTitle>
                        <CardDescription className="mt-1">
                          Billing {subscription.plans?.billing_cycle}
                        </CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold tracking-tight">
                          KES {(subscription.custom_price || subscription.plans?.price)?.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current Cycle</span>
                        <span className="font-medium">{daysRemaining} days remaining</span>
                      </div>
                      <Progress value={cycleProgress} className="h-2" />
                      <p className="text-xs text-muted-foreground text-right">
                        Renews on {new Date(subscription.next_billing_date).toLocaleDateString()}
                      </p>
                    </div>

                    <Separator />

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                         <h4 className="font-semibold mb-2 text-sm flex items-center gap-2">
                           <ShieldCheck className="w-4 h-4 text-primary" /> Included Features
                         </h4>
                         <ul className="space-y-2">
                            {(subscription.plans?.features as string[] || []).slice(0, 4).map((feature, i) => (
                              <li key={i} className="text-xs flex items-center gap-2 text-muted-foreground">
                                <div className="w-1.5 h-1.5 rounded-full bg-green-500" /> {feature}
                              </li>
                            ))}
                         </ul>
                      </div>
                      <div className="bg-muted/30 p-4 rounded-lg border text-sm space-y-3">
                         <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Status</span>
                            <span className="font-medium text-green-600">Good Standing</span>
                         </div>
                         <div className="flex items-center justify-between">
                            <span className="text-muted-foreground">Started</span>
                            <span>{new Date(subscription.start_date).toLocaleDateString()}</span>
                         </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="bg-muted/5 border-t justify-between">
                    <Button variant="ghost" size="sm" className="text-muted-foreground">Cancel Subscription</Button>
                    <Button variant="outline" size="sm">Change Plan</Button>
                  </CardFooter>
                </Card>
              ) : (
                <Card className="border-dashed border-2 py-10">
                  <CardContent className="flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-muted p-4 rounded-full">
                      <CreditCard className="h-8 w-8 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">No Active Subscription</h3>
                      <p className="text-muted-foreground text-sm max-w-sm mx-auto">
                        You are currently not subscribed to any plan. Browse our packages to get started.
                      </p>
                    </div>
                    <Button>View Pricing</Button>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-md flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" /> Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                   <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                      <div className="text-sm font-medium">Total Paid</div>
                      <div className="font-bold text-green-600">
                        KES {invoices
                          .filter(i => i.status === 'paid')
                          .reduce((acc, curr) => acc + curr.amount, 0)
                          .toLocaleString()}
                      </div>
                   </div>
                   <div className="flex items-center justify-between p-3 bg-muted/40 rounded-lg">
                      <div className="text-sm font-medium">Invoices</div>
                      <div className="font-bold">{invoices.length}</div>
                   </div>
                </CardContent>
              </Card>

              <Card className="bg-linear-to-br from-primary/90 to-primary text-primary-foreground border-none shadow-lg">
                 <CardHeader>
                   <CardTitle className="text-md">Need Help?</CardTitle>
                 </CardHeader>
                 <CardContent className="text-sm opacity-90 space-y-3">
                   <p>Issues with your bill? Our support team is available 24/7 for premium clients.</p>
                   <Button variant="secondary" className="w-full font-semibold text-primary shadow-sm">
                     Contact Support
                   </Button>
                 </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Invoice History</CardTitle>
              <CardDescription>View all past transactions and download receipts.</CardDescription>
            </CardHeader>
            <CardContent>
              <ClientInvoiceList 
                invoices={(invoices || []) as unknown as ClientInvoice[]} 
                userPhone={profile?.phone}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium">Billing Information</h3>
                <p className="text-sm text-muted-foreground">
                  This information will appear on your future invoice PDFs.
                </p>
              </div>
              <BillingSettings initialData={profile?.billing_info || {}} />
            </div>

            <div className="space-y-6">
               <Card className="bg-muted/30">
                 <CardHeader>
                   <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Settings className="w-4 h-4" /> Preferences
                   </CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                          <div className="text-sm font-medium">Email Invoices</div>
                          <div className="text-xs text-muted-foreground">Receive PDFs via email</div>
                       </div>
                       <Badge variant="outline">Enabled</Badge>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                       <div className="space-y-0.5">
                          <div className="text-sm font-medium">SMS Notifications</div>
                          <div className="text-xs text-muted-foreground">Get payment alerts</div>
                       </div>
                       <Badge variant="secondary">Optional</Badge>
                    </div>
                 </CardContent>
               </Card>
            </div>
          </div>
        </TabsContent>

      </Tabs>
    </div>
  );
}