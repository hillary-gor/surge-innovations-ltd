import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Layers, Clock } from "lucide-react";

// Types
interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'in_progress' | 'review' | 'completed' | 'on_hold';
  progress: number;
  due_date: string | null;
  updated_at: string;
}

export default async function ClientProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  // Fetch Projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200";
      case "in_progress": return "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200";
      case "review": return "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200";
      case "completed": return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
      default: return "bg-gray-100 text-gray-700 hover:bg-gray-100";
    }
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-muted/10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">My Projects</h1>
        <p className="text-muted-foreground">Track the progress of your active development.</p>
      </div>

      {!projects || projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 border-2 border-dashed rounded-lg bg-background/50">
          <Layers className="h-12 w-12 text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold">No Active Projects</h3>
          <p className="text-muted-foreground max-w-sm text-center mb-6">
            You don&apos;t have any active projects with us yet. Ready to start something new?
          </p>
          <Button asChild>
            <Link href="/dashboard/client/support">Contact Support</Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {(projects as Project[]).map((project) => (
            <Card key={project.id} className="flex flex-col group hover:border-primary/50 transition-colors">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start gap-2">
                  <Badge variant="outline" className={getStatusColor(project.status)}>
                    {project.status.replace("_", " ")}
                  </Badge>
                  {project.due_date && (
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1 bg-muted px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3" /> 
                      Due {new Date(project.due_date).toLocaleDateString()}
                    </span>
                  )}
                </div>
                <CardTitle className="text-xl mt-2 line-clamp-1" title={project.name}>
                  {project.name}
                </CardTitle>
                <CardDescription className="line-clamp-2 min-h-10">
                  {project.description || "No description provided."}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pb-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium text-muted-foreground">Progress</span>
                    <span className="font-bold">{project.progress}%</span>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </div>
              </CardContent>

              <CardFooter className="mt-auto pt-0">
                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/dashboard/client/projects/${project.id}`}>
                    View Details <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}