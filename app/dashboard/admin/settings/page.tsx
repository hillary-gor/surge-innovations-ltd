import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { ProfileForm } from "./profile-form";
import { DangerZone } from "./danger-zone";
import { Separator } from "@/components/ui/separator";

export default async function SettingsPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  if (!profile) redirect("/");

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Manage your account profile and system preferences.
        </p>
      </div>

      <Separator className="bg-border" />

      <div className="grid gap-8 md:grid-cols-[250px_1fr]">
        <nav className="hidden md:block space-y-1">
          <div className="px-3 py-2 bg-muted/50 rounded-md text-sm font-medium text-foreground">
            General Profile
          </div>
          <div className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground cursor-not-allowed opacity-60">
            Notifications (Coming Soon)
          </div>
          <div className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground cursor-not-allowed opacity-60">
            Security (Coming Soon)
          </div>
        </nav>

        <div className="space-y-8">
          <section>
            <h2 className="text-lg font-semibold mb-4 text-foreground">Profile Information</h2>
            <ProfileForm profile={profile} email={user.email || ""} />
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-4 text-red-600 dark:text-red-500">Danger Zone</h2>
            <DangerZone />
          </section>
        </div>
      </div>
    </div>
  );
}