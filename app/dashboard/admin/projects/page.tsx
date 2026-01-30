import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreateProjectDialog } from "./create-project-dialog";
import { ArrowRight, Calendar } from "lucide-react";

// 1. Define strict types
interface ProjectWithProfile {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  due_date: string | null;
  profiles: {
    full_name: string | null;
    email: string | null;
  } | null;
}

interface ClientProfile {
  id: string;
  full_name: string | null;
  email: string | null;
}

export default async function AdminProjectsPage() {
  const supabase = await createClient();

  // Fetch Projects
  const { data: rawProjects } = await supabase
    .from("projects")
    .select(`*, profiles(full_name, email)`)
    .order("updated_at", { ascending: false });

  // Fetch Clients
  const { data: rawClients } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .order("full_name", { ascending: true });

  const projects = (rawProjects as unknown as ProjectWithProfile[]) || [];
  const clients = (rawClients as unknown as ClientProfile[]) || [];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200";
      case "in_progress": return "bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200";
      case "review": return "bg-purple-100 text-purple-700 hover:bg-purple-100 border-purple-200";
      case "completed": return "bg-green-100 text-green-700 hover:bg-green-100 border-green-200";
      default: return "bg-gray-100";
    }
  };

  return (
    <div className="flex flex-col gap-8 p-8 min-h-screen bg-muted/10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Project Manager</h1>
          <p className="text-muted-foreground">Oversee development and client deliverables.</p>
        </div>
        <CreateProjectDialog clients={clients} />
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-36">Progress</TableHead>
              <TableHead>Deadline</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!projects.length ? (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No active projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span>{project.name}</span>
                      <span className="text-[10px] text-muted-foreground line-clamp-1 max-w-xs">
                        {project.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span className="font-medium">{project.profiles?.full_name || "Unknown"}</span>
                      <span className="text-xs text-muted-foreground">{project.profiles?.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={getStatusColor(project.status)}>
                      {project.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={project.progress} className="h-2 w-full" />
                      <span className="text-xs text-muted-foreground">{project.progress}%</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm">
                    {project.due_date ? (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        {new Date(project.due_date).toLocaleDateString()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground italic">Ongoing</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" asChild>
                      <Link href={`/dashboard/admin/projects/${project.id}`}>
                        Manage <ArrowRight className="ml-1 w-3 h-3" />
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}