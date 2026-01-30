import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { 
  Users, 
  Calendar, 
  CreditCard, 
  ArrowUpRight, 
  Briefcase,
  Clock,
  LucideIcon,
  Layers
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  // 1. Auth Check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, full_name")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  // 2. Parallel Data Fetching
  const [
    volunteers, 
    messages, 
    visits, 
    techInquiries, 
    donations,
    projects
  ] = await Promise.all([
    supabase.from("volunteer_applications").select("status", { count: "exact" }).eq("status", "pending"),
    supabase.from("contact_messages").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("scheduled_visits").select("*").order("preferred_date", { ascending: true }).limit(5),
    supabase.from("tech_as_a_service_inquiries").select("id", { count: "exact", head: true }),
    supabase.from("donations").select("amount"),
    // Count projects that are NOT completed or on hold
    supabase.from("projects").select("id", { count: "exact", head: true }).in("status", ["planning", "in_progress", "review"])
  ]);

  // 3. Calculate Derived Stats
  const pendingVolunteers = volunteers.count || 0;
  const totalInquiries = techInquiries.count || 0;
  const activeProjects = projects.count || 0; // New Stat
  const totalDonations = donations.data?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;
  const donationString = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(totalDonations);

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-background text-foreground">
      
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {profile?.full_name?.split(" ")[0] || "Admin"}. Here&apos;s what&apos;s happening today.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
           <Button asChild variant="outline" size="sm">
             <Link href="/">View Site</Link>
           </Button>
           {/* New Project Manager Link */}
           <Button asChild variant="secondary" size="sm">
             <Link href="/dashboard/admin/projects">
               <Layers className="mr-2 h-4 w-4" /> Manage Projects
             </Link>
           </Button>
           <Button size="sm" className="bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
             <Link href="/dashboard/admin/volunteers">Process Volunteers</Link>
           </Button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <StatsCard 
          title="Active Projects" 
          value={activeProjects} 
          icon={Layers} 
          desc="In development"
          trend={activeProjects > 0 ? "high" : undefined}
        />
        <StatsCard 
          title="Pending Volunteers" 
          value={pendingVolunteers} 
          icon={Users} 
          desc="Needs review"
          trend={pendingVolunteers > 0 ? "high" : undefined}
        />
        <StatsCard 
          title="Total Donations" 
          value={donationString} 
          icon={CreditCard} 
          desc="Lifetime collected"
        />
        <StatsCard 
          title="Tech Inquiries" 
          value={totalInquiries} 
          icon={Briefcase} 
          desc="Potential leads"
        />
        <StatsCard 
          title="Upcoming Visits" 
          value={visits.data?.length || 0} 
          icon={Calendar} 
          desc="Scheduled next"
        />
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* LEFT COLUMN (4/7): Recent Messages */}
        <Card className="col-span-1 lg:col-span-4 bg-card border-border">
          <CardHeader>
            <CardTitle>Recent Messages</CardTitle>
            <CardDescription>
              Latest contact form submissions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {messages.data?.length === 0 ? (
                <p className="text-sm text-muted-foreground">No new messages.</p>
              ) : (
                messages.data?.map((msg) => (
                  <div key={msg.id} className="flex items-start justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-9 w-9 bg-primary/10 text-primary">
                        <AvatarFallback>{msg.name.substring(0,2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{msg.name}</p>
                        <p className="text-sm text-muted-foreground line-clamp-1 max-w-48 sm:max-w-72">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                       {new Date(msg.created_at || "").toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="mt-6">
               <Button asChild variant="ghost" className="w-full text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
                  <Link href="/dashboard/admin/messages">View All Messages <ArrowUpRight className="ml-1 h-3 w-3"/></Link>
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN (3/7): Schedule */}
        <Card className="col-span-1 lg:col-span-3 bg-card border-border">
          <CardHeader>
            <CardTitle>Upcoming Visits</CardTitle>
            <CardDescription>
              Scheduled site meetings.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
                {visits.data?.length === 0 ? (
                   <p className="text-sm text-muted-foreground">No visits scheduled.</p>
                ) : (
                  visits.data?.map((visit) => (
                    <div key={visit.id} className="flex items-center p-3 rounded-lg border border-border bg-muted/40">
                       <div className="mr-3 p-2 bg-background rounded-full">
                          <Clock className="h-4 w-4 text-primary" />
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{visit.full_name}</p>
                          <p className="text-xs text-muted-foreground capitalize">
                             {visit.visit_type} • {visit.preferred_date}
                          </p>
                       </div>
                       <Badge variant="outline" className="capitalize text-[10px] ml-2">
                          {visit.status || 'Scheduled'}
                       </Badge>
                    </div>
                  ))
                )}
             </div>
             <div className="mt-6">
               <Button asChild variant="ghost" className="w-full text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground">
                  <Link href="/dashboard/admin/visits">Manage Schedule <ArrowUpRight className="ml-1 h-3 w-3"/></Link>
               </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  desc: string;
  trend?: "high" | "low";
}

function StatsCard({ title, value, icon: Icon, desc, trend }: StatsCardProps) {
  return (
    <Card className="bg-card border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground mt-1">
          {trend === "high" && <span className="text-green-500 font-medium">Action Required </span>}
          {desc}
        </p>
      </CardContent>
    </Card>
  )
}