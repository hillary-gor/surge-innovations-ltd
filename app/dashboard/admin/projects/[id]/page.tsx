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

  // Fetch Project + Updates + Client Profile
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

  // 2. Cast the data
  const project = projectRes.data as unknown as Project;
  const updates = (updatesRes.data || []) as ProjectUpdate[];

  if (!project) notFound();

  return (
    <div className="flex flex-col h-screen bg-muted/10 overflow-hidden">
      
      {/* Header */}
      <div className="h-16 border-b bg-background flex items-center px-6 justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/admin/projects">
              <ChevronLeft className="w-4 h-4 mr-2" /> Back
            </Link>
          </Button>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="font-semibold text-lg">{project.name}</h1>
          <span className="text-sm text-muted-foreground px-2 py-1 bg-muted rounded">
            Client: {project.profiles?.full_name || "Unknown"}
          </span>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        
        {/* Left: Timeline Feed */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-8">
            <Card className="border-l-4 border-l-primary">
               <CardHeader>
                 <CardTitle>Post New Update</CardTitle>
               </CardHeader>
               <CardContent>
                 <AdminTimelineForm projectId={project.id} />
               </CardContent>
            </Card>

            <div className="space-y-6">
              <h3 className="font-semibold text-lg">Timeline History</h3>
              {updates.map((update) => (
                <div key={update.id} className="bg-card p-4 rounded-lg border shadow-sm flex gap-4">
                   <div className="text-xs text-muted-foreground whitespace-nowrap pt-1">
                      {new Date(update.created_at).toLocaleDateString()}
                   </div>
                   <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold">{update.title}</span>
                        <span className="text-[10px] uppercase bg-muted px-1.5 rounded border">
                          {update.update_type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{update.description}</p>
                   </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Sidebar Controls */}
        <div className="w-96 border-l bg-background p-6 space-y-6 overflow-y-auto">
          <div>
            <h3 className="font-semibold mb-4">Project Controls</h3>
            <AdminProjectControls 
              projectId={project.id} 
              initialStatus={project.status} 
              initialProgress={project.progress} 
            />
          </div>

          <Separator />
          
          <div className="space-y-2 text-sm">
            <h3 className="font-semibold">Project Meta</h3>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Start Date</span>
              <span>{project.start_date || "N/A"}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-muted-foreground">Due Date</span>
              <span>{project.due_date || "Ongoing"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}