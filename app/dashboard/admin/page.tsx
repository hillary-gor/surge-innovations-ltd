import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Users, 
  Calendar, 
  CreditCard, 
  ArrowUpRight, 
  Briefcase,
  Layers,
  MessageSquare,
  Settings,
  LifeBuoy,
  Receipt,
  HeartHandshake
} from "lucide-react";
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
    supabase.from("projects").select("id", { count: "exact", head: true }).in("status", ["planning", "in_progress", "review"])
  ]);

  // 3. Stats Calculation
  const pendingVolunteers = volunteers.count || 0;
  const totalInquiries = techInquiries.count || 0;
  const activeProjects = projects.count || 0;
  const totalDonations = donations.data?.reduce((sum, d) => sum + (d.amount || 0), 0) || 0;
  const donationString = new Intl.NumberFormat('en-KE', { style: 'currency', currency: 'KES' }).format(totalDonations);

  // 4. Management Links (Added Volunteers here too)
  const managementLinks = [
    { title: "Volunteers", href: "/dashboard/admin/volunteers", icon: HeartHandshake, color: "text-pink-600 bg-pink-50" },
    { title: "Messages", href: "/dashboard/admin/messages", icon: MessageSquare, color: "text-blue-600 bg-blue-50" },
    { title: "Billing", href: "/dashboard/admin/billing", icon: Receipt, color: "text-green-600 bg-green-50" },
    { title: "Settings", href: "/dashboard/admin/settings", icon: Settings, color: "text-gray-600 bg-gray-50" },
    { title: "Support", href: "/dashboard/admin/support", icon: LifeBuoy, color: "text-orange-600 bg-orange-50" },
  ];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-muted/10 text-foreground pb-20 md:pb-8">
      
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Overview for {profile?.full_name?.split(" ")[0] || "Admin"}.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
           <Button asChild variant="outline" size="sm" className="h-9">
             <Link href="/">View Site</Link>
           </Button>
           {/* Process Volunteers Button */}
           <Button asChild size="sm" className="h-9 bg-black text-white hover:bg-gray-800 dark:bg-white dark:text-black">
             <Link href="/dashboard/admin/volunteers">
               <Users className="mr-2 h-4 w-4" /> Process Volunteers
             </Link>
           </Button>
           <Button asChild variant="default" size="sm" className="h-9">
             <Link href="/dashboard/admin/projects">
               <Layers className="mr-2 h-4 w-4" /> Projects
             </Link>
           </Button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
        <StatsCard 
          title="Projects" 
          value={activeProjects} 
          icon={Layers} 
          desc="Active"
          trend={activeProjects > 0 ? "high" : undefined}
        />
        <Link href="/dashboard/admin/volunteers">
          <StatsCard 
            title="Volunteers" 
            value={pendingVolunteers} 
            icon={Users} 
            desc="Pending"
            trend={pendingVolunteers > 0 ? "high" : undefined}
            className="hover:border-primary/50 transition-colors h-full"
          />
        </Link>
        <StatsCard 
          title="Donations" 
          value={donationString} 
          icon={CreditCard} 
          desc="Lifetime"
          className="col-span-2 md:col-span-1"
        />
        <StatsCard 
          title="Inquiries" 
          value={totalInquiries} 
          icon={Briefcase} 
          desc="Leads"
        />
        <StatsCard 
          title="Visits" 
          value={visits.data?.length || 0} 
          icon={Calendar} 
          desc="Upcoming"
        />
      </div>

      {/* SYSTEM MANAGEMENT SHORTCUTS */}
      <div>
        <h2 className="text-lg font-semibold mb-3">System Management</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {managementLinks.map((item) => (
            <Link key={item.href} href={item.href} className="group">
              <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer shadow-sm">
                <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-3">
                  <div className={`p-3 rounded-full ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <span className="text-sm font-medium">{item.title}</span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* MAIN CONTENT SPLIT */}
      <div className="grid gap-6 lg:grid-cols-7">
        
        {/* LEFT COLUMN: Recent Messages */}
        <Card className="lg:col-span-4 bg-card border-border shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Recent Messages</CardTitle>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/admin/messages">
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            </div>
            <CardDescription>Latest contact form submissions.</CardDescription>
          </CardHeader>
          <CardContent className="px-0 md:px-6">
            <div className="space-y-0 md:space-y-4">
              {messages.data?.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground text-sm">No new messages.</div>
              ) : (
                messages.data?.map((msg, i) => (
                  <div key={msg.id} className={`flex items-start gap-4 p-4 md:rounded-lg transition-colors hover:bg-muted/40 ${i !== messages.data.length - 1 ? 'border-b md:border-b-0' : ''}`}>
                    <Avatar className="h-9 w-9 mt-0.5 border">
                      <AvatarFallback className="bg-primary/5 text-primary text-xs font-bold">
                        {msg.name.substring(0,2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0 grid gap-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium truncate">{msg.name}</p>
                        <span className="text-[10px] text-muted-foreground">
                          {new Date(msg.created_at || "").toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-muted-foreground line-clamp-2">
                        {msg.message}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-4 pt-2 md:px-0">
               <Button asChild variant="outline" className="w-full text-xs">
                 <Link href="/dashboard/admin/messages">View All Messages</Link>
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: Schedule */}
        <Card className="lg:col-span-3 bg-card border-border shadow-sm h-fit">
          <CardHeader className="pb-3">
             <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Schedule</CardTitle>
              <Button variant="ghost" size="icon" asChild>
                <Link href="/dashboard/admin/visits">
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              </Button>
            </div>
            <CardDescription>Upcoming meetings.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-3">
                {visits.data?.length === 0 ? (
                   <p className="text-sm text-muted-foreground py-4 text-center">No visits scheduled.</p>
                ) : (
                  visits.data?.map((visit) => (
                    <div key={visit.id} className="flex items-center p-3 rounded-lg border bg-muted/20">
                       <div className="mr-3 flex flex-col items-center justify-center h-10 w-10 bg-background rounded border text-center">
                          <span className="text-[9px] text-muted-foreground uppercase font-bold leading-none">
                            {new Date(visit.preferred_date).toLocaleDateString(undefined, { month: 'short' })}
                          </span>
                          <span className="text-sm font-bold leading-none mt-0.5">
                            {new Date(visit.preferred_date).getDate()}
                          </span>
                       </div>
                       <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{visit.full_name}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <Badge variant="secondary" className="text-[10px] px-1 h-4 font-normal capitalize">
                              {visit.visit_type}
                            </Badge>
                          </div>
                       </div>
                    </div>
                  ))
                )}
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
  icon: import("lucide-react").LucideIcon;
  desc: string;
  trend?: "high" | "low";
  className?: string;
}

function StatsCard({ title, value, icon: Icon, desc, trend, className }: StatsCardProps) {
  return (
    <Card className={`bg-card border-border shadow-sm ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
        <CardTitle className="text-xs font-medium uppercase text-muted-foreground tracking-wider">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground opacity-70" />
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="text-xl md:text-2xl font-bold truncate">{value}</div>
        <p className="text-[10px] md:text-xs text-muted-foreground mt-1 flex items-center gap-1">
          {trend === "high" && <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse"/>}
          {desc}
        </p>
      </CardContent>
    </Card>
  )
}