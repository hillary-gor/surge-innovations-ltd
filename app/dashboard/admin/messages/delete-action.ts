"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteMessageAction(messageId: string) {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return { success: false, message: "Admin access required" };

  const { error } = await supabase
    .from("contact_messages")
    .delete()
    .eq("id", messageId);

  if (error) {
    console.error("Delete failed:", error);
    return { success: false, message: "Failed to delete message." };
  }

  revalidatePath("/dashboard/admin/messages");
  return { success: true, message: "Message deleted successfully." };
}