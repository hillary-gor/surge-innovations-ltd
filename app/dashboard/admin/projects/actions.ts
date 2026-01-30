"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

// 1. Create a New Project
export async function createProjectAction(data: {
  user_id: string;
  name: string;
  description: string;
  start_date?: string;
  due_date?: string;
}) {
  const supabase = await createClient();
  
  // Basic validation
  if (!data.user_id || !data.name) {
    return { success: false, message: "Missing required fields" };
  }

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

  revalidatePath("/dashboard/admin/projects");
  return { success: true, message: "Project started!" };
}

// 2. Update Progress & Status
export async function updateProjectStateAction(projectId: string, updates: {
  status?: string;
  progress?: number;
}) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("projects")
    .update(updates)
    .eq("id", projectId);

  if (error) return { success: false, message: "Update failed" };

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

  const { error } = await supabase.from("project_updates").insert({
    project_id: data.project_id,
    title: data.title,
    description: data.description,
    update_type: data.update_type
  });

  if (error) return { success: false, message: "Failed to post update" };

  await supabase
    .from("projects")
    .update({ updated_at: new Date().toISOString() })
    .eq("id", data.project_id);

  revalidatePath(`/dashboard/admin/projects/${data.project_id}`);
  return { success: true, message: "Timeline updated" };
}