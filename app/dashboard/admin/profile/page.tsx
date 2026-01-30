import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Mail, 
  Phone, 
  Calendar, 
  ShieldCheck, 
  Edit 
} from "lucide-react";
import Link from "next/link";

export default async function ProfilePage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/");

  const initials = profile.full_name
    ? profile.full_name.split(" ").map((n: string) => n[0]).join("").substring(0, 2).toUpperCase()
    : "AD";

  return (
    <div className="container max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      
      {/* 1. HERO CARD */}
      <div className="relative bg-card border border-border rounded-xl shadow-sm overflow-hidden">
        {/* Gradient Banner */}
        <div className="h-32 bg-linear-to-r from-blue-600 to-indigo-600 dark:from-blue-900 dark:to-indigo-900"></div>
        
        <div className="px-6 pb-6">
          <div className="flex flex-col md:flex-row items-start md:items-end -mt-12 gap-6">
            
            {/* Avatar */}
            <Avatar className="h-32 w-32 border-4 border-background bg-background shadow-md">
              <AvatarImage src={profile.avatar_url || ""} />
              <AvatarFallback className="text-4xl font-bold text-muted-foreground bg-muted">
                {initials}
              </AvatarFallback>
            </Avatar>

            {/* Basic Info */}
            <div className="flex-1 space-y-1 mt-2 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">{profile.full_name || "Admin User"}</h1>
                  <div className="flex items-center gap-2 text-muted-foreground mt-1">
                    <ShieldCheck className="w-4 h-4 text-green-600" />
                    <span className="capitalize text-sm font-medium">{profile.role}</span>
                    <span className="text-border">•</span>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-3 h-3 mr-1" />
                      {profile.location || "Location not set"}
                    </div>
                  </div>
                </div>
                
                {/* Action Button */}
                <Button asChild variant="outline" className="shrink-0">
                  <Link href="/dashboard/admin/settings">
                    <Edit className="w-4 h-4 mr-2" /> Edit Profile
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DETAILS GRID */}
      <div className="grid gap-6 md:grid-cols-3">
        
        {/* Left Column: Contact Info */}
        <Card className="md:col-span-1 h-fit bg-card border-border">
          <CardContent className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-muted-foreground">Email Address</p>
                    <p className="font-medium truncate" title={user.email}>{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Phone Number</p>
                    <p className="font-medium">{profile.phone || "Not provided"}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-sm">
                  <div className="p-2 bg-primary/10 rounded-full text-primary">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Joined</p>
                    <p className="font-medium">
                      {new Date(profile.created_at || "").toLocaleDateString(undefined, {
                        month: 'long',
                        year: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />
            
            <div className="space-y-3">
              <h3 className="font-semibold text-foreground text-sm">Account Status</h3>
              <div className="flex gap-2">
                <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Active
                </Badge>
                {profile.onboarded && (
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    Onboarded
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Right Column: Bio & Activity (Placeholder) */}
        <div className="md:col-span-2 space-y-6">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <h3 className="font-semibold text-foreground mb-2">About</h3>
              {profile.bio ? (
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {profile.bio}
                </p>
              ) : (
                <div className="text-center py-8 bg-muted/30 rounded-lg border border-dashed border-border">
                  <p className="text-muted-foreground text-sm mb-2">You haven&apos;t written a bio yet.</p>
                  <Button asChild variant="link" className="text-primary h-auto p-0">
                    <Link href="/dashboard/admin/settings">Add a bio in settings</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Simple Activity Placeholder */}
          <Card className="bg-card border-border">
             <CardContent className="p-6">
                <h3 className="font-semibold text-foreground mb-4">Recent System Activity</h3>
                <div className="flex flex-col items-center justify-center py-8 text-center text-muted-foreground bg-muted/10 rounded-lg border border-dashed border-border">
                   <ShieldCheck className="h-10 w-10 mb-2 opacity-20" />
                   <p className="text-sm">Activity logs coming soon.</p>
                </div>
             </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}