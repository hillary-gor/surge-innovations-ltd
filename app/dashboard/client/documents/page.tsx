import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, FileImage, Box, Calendar } from "lucide-react";

export default async function DocumentsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  // Fetch documents from our metadata table
  const { data: documents } = await supabase
    .from("documents")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const getIcon = (type: string) => {
    if (type?.includes('pdf')) return <FileText className="h-8 w-8 text-red-500" />;
    if (type?.includes('image')) return <FileImage className="h-8 w-8 text-blue-500" />;
    return <Box className="h-8 w-8 text-gray-500" />;
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 min-h-screen bg-background max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Documents Vault</h1>
        <p className="text-muted-foreground">Access your contracts, proposals, and project deliverables.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {!documents || documents.length === 0 ? (
          <div className="col-span-full py-12 text-center border-2 border-dashed rounded-lg">
            <Box className="h-12 w-12 text-muted-foreground/30 mx-auto mb-3" />
            <h3 className="text-lg font-semibold">No Documents Yet</h3>
            <p className="text-muted-foreground">Your project files will appear here once uploaded by the admin.</p>
          </div>
        ) : (
          documents.map((doc) => (
            <Card key={doc.id} className="group hover:border-primary/50 transition-colors">
              <CardHeader className="flex flex-row items-start justify-between pb-2 space-y-0">
                <div className="bg-muted p-2 rounded-md">
                  {getIcon(doc.file_type)}
                </div>
                <Badge variant="outline" className="capitalize">
                  {doc.category}
                </Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <CardTitle className="text-base truncate" title={doc.name}>
                    {doc.name}
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-1 text-xs">
                    <span className="font-medium">{formatSize(doc.size_bytes)}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" /> 
                      {new Date(doc.created_at).toLocaleDateString()}
                    </span>
                  </CardDescription>
                </div>
                
                <Button className="w-full" variant="secondary" asChild>
                  <a href={doc.file_url} target="_blank" rel="noopener noreferrer" download>
                    <Download className="w-4 h-4 mr-2" /> Download
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}