import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { VolunteerList } from "./volunteer-list";

export default async function AdminVolunteersPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  const { data: applications } = await supabase
    .from("volunteer_applications")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="min-h-screen w-full bg-background transition-colors duration-300">
      <div className="container mx-auto py-6 sm:py-10 px-4 sm:px-6 max-w-6xl">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
          <div>
             <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">Applications</h1>
             <p className="text-sm text-muted-foreground">Manage incoming volunteer requests.</p>
          </div>
          <div className="self-start sm:self-auto bg-primary/10 text-primary dark:bg-primary/20 px-3 py-1 rounded-full text-sm font-medium">
             {applications?.length || 0} Total
          </div>
        </div>
        
        <VolunteerList applications={applications || []} />
      </div>
    </div>
  );
}