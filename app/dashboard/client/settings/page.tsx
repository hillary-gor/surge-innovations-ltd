import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "./profile-form";
import { BillingSettings } from "../billing/billing-settings"; 
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { KeyRound, ShieldAlert } from "lucide-react";
import { PasswordResetButton } from "./password-reset-button";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-background max-w-5xl mx-auto">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Account Settings</h1>
        <p className="text-muted-foreground">Manage your profile, billing preferences, and security.</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="w-full md:w-auto grid grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Billing Info</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <ProfileForm 
            initialData={{
              full_name: profile?.full_name,
              email: profile?.email || user.email || "",
              phone: profile?.phone,
              location: profile?.location,
              bio: profile?.bio,
              avatar_url: profile?.avatar_url
            }} 
          />
        </TabsContent>

        <TabsContent value="billing">
          <div className="grid gap-6">
            <div className="space-y-1">
              <h3 className="text-lg font-medium">Billing Details</h3>
              <p className="text-sm text-muted-foreground">
                These details are used to generate your invoices and for tax compliance.
              </p>
            </div>
            <BillingSettings initialData={profile?.billing_info || {}} />
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Password</CardTitle>
                <CardDescription>
                  Manage your password and authentication methods.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <KeyRound className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Login Password</p>
                      <p className="text-sm text-muted-foreground">Last changed: Never</p>
                    </div>
                  </div>
                  <PasswordResetButton />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" /> Danger Zone
                </CardTitle>
                <CardDescription>
                  Irreversible actions related to your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                 <p className="text-sm text-muted-foreground mb-4">
                   Deleting your account will remove all your data, including invoice history and active subscriptions. This action cannot be undone.
                 </p>
                 <Button variant="destructive">Delete Account</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}