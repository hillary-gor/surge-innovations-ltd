import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateProjectDialog } from "./create-project-dialog";
import { 
  ArrowRight, 
  Calendar, 
  Search, 
  Briefcase, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  FileSearch,
  User
} from "lucide-react";

// Types
interface ProjectWithProfile {
  id: string;
  name: string;
  description: string;
  status: "planning" | "in_progress" | "review" | "completed" | "on_hold";
  progress: number;
  due_date: string | null;
  updated_at: string;
  profiles: { full_name: string | null; email: string | null; } | null;
}

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const supabase = await createClient();
  
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";
  const statusFilter = params.status || "all";

  // Fetch Data
  const { data: rawProjects, error } = await supabase
    .from("projects")
    .select(`*, profiles(full_name, email)`)
    .order("updated_at", { ascending: false }); 

  const { data: rawClients } = await supabase
    .from("profiles")
    .select("id, full_name, email")
    .order("full_name", { ascending: true });

  const projects = (rawProjects as unknown as ProjectWithProfile[]) || [];
  const clients = rawClients || [];

  // Filtering
  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(query) || 
      p.profiles?.full_name?.toLowerCase().includes(query);
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Stats
  const stats = {
    total: projects.length,
    active: projects.filter((p) => ["planning", "in_progress", "review"].includes(p.status)).length,
    completed: projects.filter((p) => p.status === "completed").length,
    urgent: projects.filter((p) => p.due_date && new Date(p.due_date) < new Date() && p.status !== "completed").length
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning": return "bg-blue-100 text-blue-700 border-blue-200";
      case "in_progress": return "bg-indigo-100 text-indigo-700 border-indigo-200";
      case "review": return "bg-purple-100 text-purple-700 border-purple-200";
      case "completed": return "bg-green-100 text-green-700 border-green-200";
      case "on_hold": return "bg-orange-100 text-orange-700 border-orange-200";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-muted/10">
      
      {/* Header Section - Stacked on Mobile */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Project Manager</h1>
          <p className="text-sm md:text-base text-muted-foreground">Manage development cycles.</p>
        </div>
        <div className="w-full md:w-auto">
          <CreateProjectDialog clients={clients} />
        </div>
      </div>

      {/* Stats Overview - 2 Columns on Mobile, 4 on Desktop */}
      <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Active</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.active}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Urgent</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold text-red-600">{stats.urgent}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Done</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.completed}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-4">
            <CardTitle className="text-xs font-medium uppercase text-muted-foreground">Total</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
      </div>

      {/* Controls - Search & Filter */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
          
          {/* Scrollable Tabs for Mobile */}
          <Tabs defaultValue="all" value={statusFilter} className="w-full lg:w-auto overflow-x-auto">
            <TabsList className="inline-flex w-auto lg:grid lg:w-auto lg:grid-cols-6 h-9 md:h-10 p-1">
              <TabsTrigger value="all" asChild className="px-3 md:px-4">
                <Link href="/dashboard/admin/projects">All</Link>
              </TabsTrigger>
              <TabsTrigger value="planning" asChild className="px-3 md:px-4">
                <Link href="/dashboard/admin/projects?status=planning">Plan</Link>
              </TabsTrigger>
              <TabsTrigger value="in_progress" asChild className="px-3 md:px-4">
                <Link href="/dashboard/admin/projects?status=in_progress">Active</Link>
              </TabsTrigger>
              <TabsTrigger value="review" asChild className="px-3 md:px-4">
                <Link href="/dashboard/admin/projects?status=review">Review</Link>
              </TabsTrigger>
              <TabsTrigger value="completed" asChild className="px-3 md:px-4">
                <Link href="/dashboard/admin/projects?status=completed">Done</Link>
              </TabsTrigger>
              <TabsTrigger value="on_hold" asChild className="px-3 md:px-4">
                <Link href="/dashboard/admin/projects?status=on_hold">Hold</Link>
              </TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Search Bar */}
          <form className="relative w-full lg:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              name="q" 
              placeholder="Search..." 
              className="pl-8 bg-card" 
              defaultValue={query}
            />
            <input type="hidden" name="status" value={statusFilter} />
          </form>
        </div>
      </div>

          {/* // VIEW 1: MOBILE CARD LIST (Visible on < md) */}
      <div className="grid gap-4 md:hidden">
        {filteredProjects.length === 0 ? (
          <div className="text-center p-8 border-2 border-dashed rounded-lg text-muted-foreground">
             <FileSearch className="h-8 w-8 mx-auto mb-2 opacity-50" />
             <p>No projects found.</p>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              <CardHeader className="pb-3 p-4">
                <div className="flex justify-between items-start gap-2">
                   <div>
                     <CardTitle className="text-base line-clamp-1">{project.name}</CardTitle>
                     <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                       <User className="h-3 w-3" /> {project.profiles?.full_name || "Unknown"}
                     </p>
                   </div>
                   <Badge variant="secondary" className={`shrink-0 ${getStatusColor(project.status)}`}>
                     {project.status === 'review' ? 'QA' : project.status.replace("_", " ")}
                   </Badge>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0 space-y-3">
                <div className="space-y-1">
                   <div className="flex justify-between text-xs text-muted-foreground">
                     <span>Progress</span>
                     <span>{project.progress}%</span>
                   </div>
                   <Progress value={project.progress} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground bg-muted/30 p-2 rounded">
                   <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      {project.due_date ? new Date(project.due_date).toLocaleDateString() : "No deadline"}
                   </div>
                   {new Date(project.due_date || '') < new Date() && project.status !== 'completed' && (
                      <span className="text-red-500 font-medium">Overdue</span>
                   )}
                </div>
              </CardContent>
              <CardFooter className="p-2 bg-muted/20 border-t">
                <Button variant="ghost" className="w-full justify-between h-9 text-sm" asChild>
                  <Link href={`/dashboard/admin/projects/${project.id}`}>
                    Manage Project <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

          {/* VIEW 2: DESKTOP TABLE (Visible on >= md) */}
      <div className="hidden md:block rounded-md border bg-card overflow-hidden shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>Project Name</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-36">Progress</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {error ? (
               <TableRow>
                 <TableCell colSpan={6} className="h-24 text-center text-red-500">
                    Error loading projects: {error.message}
                 </TableCell>
               </TableRow>
            ) : filteredProjects.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center text-muted-foreground">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <FileSearch className="h-10 w-10 opacity-20" />
                    <p className="text-lg font-medium">No projects found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProjects.map((project) => (
                <TableRow key={project.id} className="hover:bg-muted/40 transition-colors">
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="text-base font-semibold">{project.name}</span>
                      <span className="text-xs text-muted-foreground line-clamp-1 max-w-xs">
                        {project.description}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span className="font-medium">{project.profiles?.full_name || "Unknown"}</span>
                      <Link href={`mailto:${project.profiles?.email}`} className="text-xs text-muted-foreground hover:underline hover:text-primary">
                        {project.profiles?.email}
                      </Link>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className={`capitalize font-medium ${getStatusColor(project.status)}`}>
                      {project.status === 'review' ? 'Review / QA' : project.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1.5">
                      <div className="flex justify-between text-[10px] text-muted-foreground">
                        <span>Completion</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-1.5 w-full" />
                    </div>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    <div className="flex flex-col gap-1">
                      {project.due_date ? (
                        <span className={`flex items-center gap-1.5 text-xs ${
                           new Date(project.due_date) < new Date() && project.status !== 'completed' ? 'text-red-600 font-bold' : ''
                        }`}>
                          <Calendar className="w-3 h-3" /> 
                          {new Date(project.due_date).toLocaleDateString()}
                        </span>
                      ) : (
                        <span className="text-[10px] italic opacity-70">No deadline</span>
                      )}
                      <span className="text-[10px] opacity-60">
                         Last active: {new Date(project.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="hover:bg-primary/5 hover:text-primary" asChild>
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