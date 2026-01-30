import { createClient } from "@/utils/supabase/server";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  ChevronLeft, Calendar, CheckCircle2, Circle, Clock, AlertCircle, Flag 
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ProjectUpdate {
  id: string;
  title: string;
  description: string;
  update_type: 'general' | 'milestone' | 'blocker' | 'completion';
  created_at: string;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  // Fetch Project + Updates
  const [projectRes, updatesRes] = await Promise.all([
    supabase.from("projects").select("*").eq("id", id).single(),
    supabase
      .from("project_updates")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false })
  ]);

  const project = projectRes.data;
  const updates = (updatesRes.data || []) as ProjectUpdate[];

  if (!project) notFound();
  // Security check
  if (project.user_id !== user.id) redirect("/dashboard/client/projects");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-700 border-blue-200";
      case "in_progress": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "review": return "bg-purple-100 text-purple-700 border-purple-200";
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getUpdateIcon = (type: string) => {
    switch (type) {
      case 'milestone': return <Flag className="h-5 w-5 text-indigo-500" />;
      case 'blocker': return <AlertCircle className="h-5 w-5 text-red-500" />;
      case 'completion': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      default: return <Circle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-muted/10 max-w-5xl mx-auto">
      
      {/* Navigation */}
      <div>
        <Button variant="ghost" size="sm" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
          <Link href="/dashboard/client/projects">
            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Projects
          </Link>
        </Button>
      </div>

      {/* Header Section */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
            <Badge variant="outline" className={getStatusColor(project.status)}>
              {project.status.replace("_", " ")}
            </Badge>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Stats Card */}
        <Card>
          <CardContent className="pt-6 space-y-6">
             <div className="space-y-2">
               <div className="flex justify-between text-sm">
                 <span className="font-semibold">Overall Progress</span>
                 <span className="font-mono">{project.progress}%</span>
               </div>
               <Progress value={project.progress} className="h-2" />
             </div>
             
             <Separator />
             
             <div className="space-y-3 text-sm">
               <div className="flex items-center justify-between">
                 <span className="text-muted-foreground flex items-center gap-2">
                   <Calendar className="w-4 h-4" /> Start Date
                 </span>
                 <span>{project.start_date ? new Date(project.start_date).toLocaleDateString() : "TBD"}</span>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-muted-foreground flex items-center gap-2">
                   <Clock className="w-4 h-4" /> Due Date
                 </span>
                 <span className="font-medium">
                   {project.due_date ? new Date(project.due_date).toLocaleDateString() : "Ongoing"}
                 </span>
               </div>
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Timeline Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold tracking-tight">Project Timeline</h2>
        
        <div className="relative border-l-2 border-muted ml-3 space-y-8 pb-10">
          {!updates || updates.length === 0 ? (
            <div className="pl-8 pt-1">
              <p className="text-muted-foreground italic">No updates posted yet.</p>
            </div>
          ) : (
            updates.map((update) => (
              <div key={update.id} className="relative pl-8">
                {/* Timeline Dot */}
                <div className="absolute -left-2.25 top-1 bg-background p-1 rounded-full border">
                  {getUpdateIcon(update.update_type)}
                </div>
                
                {/* Content */}
                <div className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                    <h3 className="font-semibold text-base">{update.title}</h3>
                    <span className="text-xs text-muted-foreground tabular-nums">
                      {new Date(update.created_at).toLocaleDateString(undefined, {
                        month: 'short', day: 'numeric', year: 'numeric'
                      })}
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed max-w-3xl">
                    {update.description}
                  </p>
                  {update.update_type === 'milestone' && (
                    <Badge variant="secondary" className="mt-2 text-[10px] uppercase tracking-wide">
                      Milestone Reached
                    </Badge>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}