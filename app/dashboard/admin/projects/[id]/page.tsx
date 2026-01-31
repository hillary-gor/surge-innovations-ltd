import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import { AdminProjectControls } from "./project-controls";
import { AdminTimelineForm } from "./timeline-form";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface ProjectUpdate {
  id: string;
  title: string;
  description: string | null;
  update_type: string;
  created_at: string;
}

interface ProjectProfile {
  full_name: string | null;
  email: string | null;
}

interface Project {
  id: string;
  name: string;
  status: string;
  progress: number;
  start_date: string | null;
  due_date: string | null;
  profiles: ProjectProfile | null;
}

export default async function AdminProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Fetch Data
  const [projectRes, updatesRes] = await Promise.all([
    supabase.from("projects")
      .select(`*, profiles(*)`)
      .eq("id", id)
      .single(),
    supabase.from("project_updates")
      .select("*")
      .eq("project_id", id)
      .order("created_at", { ascending: false })
  ]);

  const project = projectRes.data as unknown as Project;
  const updates = (updatesRes.data || []) as ProjectUpdate[];

  if (!project) notFound();

  return (
    // CHANGE 1: Use min-h-screen for mobile, lock height only on lg screens
    <div className="flex flex-col h-full min-h-screen lg:h-screen bg-muted/10 lg:overflow-hidden">
      
      {/* Header - Sticky on mobile for easy navigation */}
      <div className="sticky top-0 z-20 h-14 md:h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center px-4 md:px-6 justify-between shrink-0">
        <div className="flex items-center gap-2 md:gap-4 overflow-hidden">
          <Button variant="ghost" size="sm" className="-ml-2 md:ml-0" asChild>
            <Link href="/dashboard/admin/projects">
              <ChevronLeft className="w-4 h-4 md:mr-2" /> 
              <span className="hidden md:inline">Back</span>
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6 hidden md:block" />
          
          <div className="flex flex-col md:flex-row md:items-center gap-0.5 md:gap-4 overflow-hidden">
            <h1 className="font-semibold text-sm md:text-lg truncate">{project.name}</h1>
            <span className="text-xs text-muted-foreground px-2 py-0.5 bg-muted rounded truncate max-w-[150px] md:max-w-none">
              {project.profiles?.full_name || "Unknown Client"}
            </span>
          </div>
        </div>
      </div>

      {/* CHANGE 2: Flex Column on Mobile, Row on Desktop */}
      <div className="flex flex-col lg:flex-row flex-1 lg:overflow-hidden">
        
        {/* SIDEBAR CONTROLS 
            On Mobile: Shows FIRST (order-1) so you see status immediately.
            On Desktop: Shows Right (order-2).
        */}
        <div className="order-1 lg:order-2 w-full lg:w-96 border-b lg:border-b-0 lg:border-l bg-background p-4 md:p-6 lg:h-full lg:overflow-y-auto shrink-0">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4 text-sm md:text-base">Project Controls</h3>
              <AdminProjectControls 
                projectId={project.id} 
                initialStatus={project.status} 
                initialProgress={project.progress} 
              />
            </div>

            <Separator />
            
            <div className="space-y-2 text-sm">
              <h3 className="font-semibold">Project Meta</h3>
              <div className="flex justify-between py-1 border-b border-dashed">
                <span className="text-muted-foreground">Start Date</span>
                <span>{project.start_date ? new Date(project.start_date).toLocaleDateString() : "N/A"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-dashed">
                <span className="text-muted-foreground">Due Date</span>
                <span>{project.due_date ? new Date(project.due_date).toLocaleDateString() : "Ongoing"}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">Client Email</span>
                <span className="truncate max-w-[180px]">{project.profiles?.email}</span>
              </div>
            </div>
          </div>
        </div>

        {/* TIMELINE FEED 
            On Mobile: Shows SECOND (order-2).
            On Desktop: Shows Left (order-1) and takes remaining space.
        */}
        <div className="order-2 lg:order-1 flex-1 p-4 md:p-8 lg:h-full lg:overflow-y-auto bg-muted/10">
          <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 pb-10">
            
            <Card className="border-l-4 border-l-primary shadow-sm">
               <CardHeader className="pb-3">
                 <CardTitle className="text-base md:text-lg">Post New Update</CardTitle>
               </CardHeader>
               <CardContent>
                 <AdminTimelineForm projectId={project.id} />
               </CardContent>
            </Card>

            <div className="space-y-4 md:space-y-6">
              <h3 className="font-semibold text-base md:text-lg px-1">Timeline History</h3>
              
              {updates.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground bg-background/50 rounded-lg border border-dashed">
                  <p>No updates posted yet.</p>
                </div>
              ) : (
                updates.map((update) => (
                  <div key={update.id} className="bg-background p-4 rounded-lg border shadow-sm flex flex-col sm:flex-row gap-2 sm:gap-4 transition-all hover:border-primary/20">
                     <div className="text-xs text-muted-foreground whitespace-nowrap sm:pt-1 flex items-center gap-2 sm:block">
                        <span className="sm:hidden font-medium text-foreground">
                          {new Date(update.created_at).toLocaleDateString()}
                        </span>
                        <span className="hidden sm:block">
                          {new Date(update.created_at).toLocaleDateString()}
                        </span>
                     </div>
                     <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="font-semibold text-sm md:text-base">{update.title}</span>
                          <span className={`text-[10px] uppercase px-1.5 py-0.5 rounded border font-medium ${
                            update.update_type === 'milestone' ? 'bg-indigo-50 text-indigo-700 border-indigo-200' : 
                            update.update_type === 'blocker' ? 'bg-red-50 text-red-700 border-red-200' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {update.update_type}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
                          {update.description}
                        </p>
                     </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}