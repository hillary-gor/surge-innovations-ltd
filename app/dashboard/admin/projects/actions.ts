"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { 
  sendProjectCreatedEmail, 
  sendStatusUpdateEmail, 
  sendTimelineUpdateEmail 
} from "@/lib/emails/project-status";

// Helper to get client email
async function getClientProfile(userId: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("profiles")
    .select("full_name, email")
    .eq("id", userId)
    .single();
  return data;
}

// 1. Create a New Project
export async function createProjectAction(data: {
  user_id: string;
  name: string;
  description: string;
  start_date?: string;
  due_date?: string;
}) {
  const supabase = await createClient();
  
  if (!data.user_id || !data.name) {
    return { success: false, message: "Missing required fields" };
  }

  // A. Insert Project
  const { error } = await supabase.from("projects").insert({
    user_id: data.user_id,
    name: data.name,
    description: data.description,
    status: "planning",
    progress: 0,
    start_date: data.start_date || null,
    due_date: data.due_date || null,
  });

  if (error) {
    console.error("Create Project Error:", error);
    return { success: false, message: "Failed to create project" };
  }

  // B. Send Email
  const profile = await getClientProfile(data.user_id);
  if (profile?.email) {
    try {
      await sendProjectCreatedEmail(
        profile.email, 
        profile.full_name || "Client", 
        data.name
      );
    } catch (e) {
      console.error("Failed to send welcome email:", e);
    }
  }

  revalidatePath("/dashboard/admin/projects");
  return { success: true, message: "Project started and client notified!" };
}

// 2. Update Progress & Status
export async function updateProjectStateAction(projectId: string, updates: {
  status?: string;
  progress?: number;
}) {
  const supabase = await createClient();
  
  // A. Get current state for comparison
  const { data: currentProject } = await supabase
    .from("projects")
    .select("status, name, user_id")
    .eq("id", projectId)
    .single();

  if (!currentProject) return { success: false, message: "Project not found" };

  // B. Update DB
  const { error } = await supabase
    .from("projects")
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq("id", projectId);

  if (error) return { success: false, message: "Update failed" };

  // C. Send Email ONLY if Status Changed
  if (updates.status && updates.status !== currentProject.status) {
    const profile = await getClientProfile(currentProject.user_id);
    if (profile?.email) {
      try {
        await sendStatusUpdateEmail(
          profile.email,
          profile.full_name || "Client",
          currentProject.name,
          currentProject.status,
          updates.status
        );
      } catch (e) {
        console.error("Failed to send status email:", e);
      }
    }
  }

  revalidatePath(`/dashboard/admin/projects/${projectId}`);
  return { success: true, message: "Project updated" };
}

// 3. Post a Timeline Update
export async function postTimelineUpdateAction(data: {
  project_id: string;
  title: string;
  description: string;
  update_type: string;
}) {
  const supabase = await createClient();

  // A. Fetch Project Info
  const { data: project } = await supabase
    .from("projects")
    .select("name, user_id")
    .eq("id", data.project_id)
    .single();

  if (!project) return { success: false, message: "Project not found" };

  // B. Insert Update
  const { error } = await supabase.from("project_updates").insert({
    project_id: data.project_id,
    title: data.title,
    description: data.description,
    update_type: data.update_type
  });

  if (error) return { success: false, message: "Failed to post update" };

  // C. Bump Project Timestamp
  await supabase
    .from("projects")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", data.project_id);

  // D. Send Email
  const profile = await getClientProfile(project.user_id);
  if (profile?.email) {
    try {
      await sendTimelineUpdateEmail(
        profile.email,
        profile.full_name || "Client",
        project.name,
        data.title,
        data.description
      );
    } catch (e) {
      console.error("Failed to send timeline email:", e);
    }
  }

  revalidatePath(`/dashboard/admin/projects/${data.project_id}`);
  return { success: true, message: "Timeline updated & client notified" };
}