import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { 
  Zap, 
  ArrowRight, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Layers,
  Flag,
  Activity
} from "lucide-react";

export default async function ClientDashboardPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const [profileRes, subRes, invoiceRes, visitRes, projectRes, updatesRes] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    
    supabase.from("subscriptions")
      .select("*, plans(name, price)")
      .eq("user_id", user.id)
      .eq("status", "active")
      .single(),

    supabase.from("invoices")
      .select("*, subscriptions!inner(user_id)") 
      .eq("subscriptions.user_id", user.id)
      .neq("status", "paid")
      .order("due_date", { ascending: true })
      .limit(1)
      .single(),

    supabase.from("scheduled_visits")
      .select("*")
      .eq("email", user.email || "") 
      .gte("preferred_date", new Date().toISOString())
      .order("preferred_date", { ascending: true })
      .limit(1)
      .single(),

    supabase.from("projects")
      .select("*")
      .eq("user_id", user.id)
      .neq("status", "completed")
      .neq("status", "on_hold")
      .order("updated_at", { ascending: false })
      .limit(1)
      .single(),

    supabase.from("project_updates")
      .select("*, projects!inner(user_id)")
      .eq("projects.user_id", user.id)
      .order("created_at", { ascending: false })
      .limit(5)
  ]);

  const profile = profileRes.data;
  const subscription = subRes.data;
  const overdueInvoice = invoiceRes.data;
  const nextVisit = visitRes.data;
  const activeProject = projectRes.data;
  const projectUpdates = updatesRes.data || [];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const initials = profile?.full_name
    ?.split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2) || "CL";

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200";
      case "in_progress": return "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200";
      case "review": return "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-background max-w-6xl mx-auto">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border-2 border-primary/20">
            <AvatarImage src={profile?.avatar_url || ""} />
            <AvatarFallback className="text-lg bg-primary/10 text-primary font-bold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              {getGreeting()}, {profile?.full_name?.split(" ")[0]}
            </h1>
            <p className="text-muted-foreground">
              Here is what is happening with your account today.
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild>
            <Link href="/dashboard/client/projects">
              <Layers className="mr-2 h-4 w-4" /> My Projects
            </Link>
          </Button>
        </div>
      </div>

      {overdueInvoice && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-md flex items-start justify-between">
          <div className="flex gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-red-900">Action Required: Unpaid Invoice</h3>
              <p className="text-sm text-red-700">
                Invoice #{overdueInvoice.invoice_number} for KES {overdueInvoice.amount.toLocaleString()} is {overdueInvoice.status}.
              </p>
            </div>
          </div>
          <Button size="sm" variant="destructive" asChild>
            <Link href="/dashboard/client/billing">Pay Now</Link>
          </Button>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        
        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Active Project
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            {activeProject ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between">
                   <span className="font-bold truncate max-w-37.5" title={activeProject.name}>
                     {activeProject.name}
                   </span>
                   <Badge variant="outline" className={getStatusColor(activeProject.status)}>
                      {activeProject.status.replace("_", " ")}
                   </Badge>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span>{activeProject.progress}%</span>
                  </div>
                  <Progress value={activeProject.progress} className="h-2" />
                </div>
                {activeProject.due_date && (
                   <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Due {new Date(activeProject.due_date).toLocaleDateString()}
                   </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="text-xl font-semibold text-muted-foreground">No active work</span>
                <p className="text-sm text-muted-foreground">Ready to start a new project?</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-muted/10 p-4">
              <Link href="/dashboard/client/projects" className="text-sm text-primary flex items-center font-medium hover:underline">
                View Project Board <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Service
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1">
            {subscription ? (
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold flex items-center gap-2">
                  {subscription.plans?.name}
                  <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-green-200 pointer-events-none">
                    Active
                  </Badge>
                </span>
                <p className="text-sm text-muted-foreground">
                  Renews {new Date(subscription.next_billing_date).toLocaleDateString()}
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <span className="text-2xl font-bold text-muted-foreground">No Active Plan</span>
                <p className="text-sm text-muted-foreground">Start a subscription to get support.</p>
              </div>
            )}
          </CardContent>
          <CardFooter className="border-t bg-muted/10 p-4">
              <Link href="/dashboard/client/billing" className="text-sm text-primary flex items-center font-medium hover:underline">
                View Plan Details <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
          </CardFooter>
        </Card>

        <Card className="flex flex-col">
           <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Account Health
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 grid gap-4">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <CheckCircle className="h-4 w-4 text-green-500" />
                   <span className="text-sm font-medium">Profile Completed</span>
                 </div>
                 <span className="text-sm text-muted-foreground">100%</span>
              </div>
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-2">
                   <FileText className="h-4 w-4 text-blue-500" />
                   <span className="text-sm font-medium">Contracts Signed</span>
                 </div>
                 <span className="text-sm text-muted-foreground">1/1</span>
              </div>
          </CardContent>
           <CardFooter className="border-t bg-muted/10 p-4">
             <Link href="/dashboard/client/settings" className="text-sm text-primary flex items-center font-medium hover:underline">
               Update Profile <ArrowRight className="ml-1 h-3 w-3" />
             </Link>
          </CardFooter>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
         <div className="md:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Recent Activity</h2>
            <Card>
              <CardContent className="p-0">
                <div className="divide-y">
                   {projectUpdates.length > 0 ? (
                      projectUpdates.map((update) => (
                        <div key={update.id} className="flex items-start gap-4 p-4">
                          <div className="bg-indigo-100 p-2 rounded-full mt-1">
                             {update.update_type === 'milestone' ? (
                               <Flag className="h-4 w-4 text-indigo-600" />
                             ) : (
                               <Activity className="h-4 w-4 text-indigo-600" />
                             )}
                          </div>
                          <div>
                             <p className="text-sm font-medium">{update.title}</p>
                             <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                               {update.description}
                             </p>
                          </div>
                          <div className="ml-auto text-xs text-muted-foreground whitespace-nowrap">
                             {new Date(update.created_at).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}
                          </div>
                        </div>
                      ))
                   ) : (
                     <>
                       {subscription && (
                         <div className="flex items-start gap-4 p-4">
                           <div className="bg-green-100 p-2 rounded-full">
                             <Zap className="h-4 w-4 text-green-600" />
                           </div>
                           <div>
                             <p className="text-sm font-medium">Subscription Active</p>
                             <p className="text-xs text-muted-foreground">
                               Your <strong>{subscription.plans?.name}</strong> plan is running smoothly.
                             </p>
                           </div>
                           <div className="ml-auto text-xs text-muted-foreground">Today</div>
                         </div>
                       )}
                       {nextVisit && (
                         <div className="flex items-start gap-4 p-4">
                           <div className="bg-orange-100 p-2 rounded-full">
                             <Clock className="h-4 w-4 text-orange-600" />
                           </div>
                           <div>
                             <p className="text-sm font-medium">Site Visit Scheduled</p>
                             <p className="text-xs text-muted-foreground">
                               Technician arriving on {new Date(nextVisit.preferred_date).toLocaleDateString()}.
                             </p>
                           </div>
                         </div>
                       )}
                       {!subscription && !nextVisit && (
                         <div className="p-8 text-center text-muted-foreground">
                           No recent activity to report.
                         </div>
                       )}
                     </>
                   )}
                </div>
              </CardContent>
            </Card>
         </div>

         <div className="space-y-4">
            <h2 className="text-lg font-semibold tracking-tight">Need Assistance?</h2>
            <Card className="bg-primary text-primary-foreground border-none">
              <CardHeader>
                <CardTitle className="text-md">Dedicated Support</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  As a client, you have priority access to our engineering team.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="secondary" className="w-full text-primary font-semibold" asChild>
                  <Link href="/dashboard/client/support">Open Ticket</Link>
                </Button>
                <Button variant="outline" className="w-full border-primary-foreground/20 hover:bg-primary-foreground/10 text-primary-foreground" asChild>
                  <a href="tel:+254700000000">Call Emergency Line</a>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Documentation</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                  Read our guides on how to manage your tech infrastructure.
              </CardContent>
              <CardFooter>
                 <Button variant="ghost" size="sm" className="w-full justify-start px-0 hover:bg-transparent hover:underline text-primary" asChild>
                   <Link href="/dashboard/client/documents">
                     Browse Documents <ArrowRight className="ml-1 h-3 w-3" />
                   </Link>
                  </Button>
              </CardFooter>
            </Card>
         </div>
      </div>
    </div>
  );
}