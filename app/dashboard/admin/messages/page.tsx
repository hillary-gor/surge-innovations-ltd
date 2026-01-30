import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { MessageList, ContactMessage } from "./message-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox | Admin Dashboard",
  description: "Manage customer inquiries and pricing requests.",
};

export default async function MessagesPage() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/auth/signin");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") redirect("/");

  const { data: messages, error } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch messages:", error);
  }

  const safeMessages = (messages || []) as unknown as ContactMessage[];

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 min-h-screen bg-background text-foreground">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inbox</h1>
          <p className="text-muted-foreground">
            View inquiries from the contact form and pricing page.
          </p>
        </div>
        <div className="bg-primary/10 text-primary dark:bg-primary/20 px-4 py-2 rounded-full text-sm font-medium self-start">
          {safeMessages.length} Total Messages
        </div>
      </div>

      <MessageList messages={safeMessages} />
    </div>
  );
}