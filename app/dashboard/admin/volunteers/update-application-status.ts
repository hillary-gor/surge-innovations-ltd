"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { createClient as createAdminClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { transporter } from "@/lib/nodemailer";
import { generateDecisionEmail } from "@/lib/emails/volunteer-emails";

const supabaseAdmin = createAdminClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  }
);

const UpdateStatusSchema = z.object({
  applicationId: z.uuid(),
  newStatus: z.enum(["accepted", "rejected"]),
});

export async function updateApplicationStatus(
  applicationId: string, 
  newStatus: "accepted" | "rejected"
) {
  const validatedFields = UpdateStatusSchema.safeParse({
    applicationId,
    newStatus,
  });

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Invalid input provided.",
    };
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { success: false, error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { success: false, error: "Only admins can perform this action." };
  }

  const { data: app, error: fetchError } = await supabaseAdmin
    .from("volunteer_applications")
    .select("id, first_name, email, experience_level, status")
    .eq("id", applicationId)
    .single();

  if (fetchError || !app) {
    return { success: false, error: "Application not found." };
  }

  if (app.status === newStatus) {
    return { success: true, message: `Application is already ${newStatus}.` };
  }

  const { error: updateError } = await supabaseAdmin
    .from("volunteer_applications")
    .update({ status: newStatus })
    .eq("id", applicationId);

  if (updateError) {
    return { success: false, error: "Database update failed." };
  }

  try {
    const emailContent = generateDecisionEmail(
      app.first_name, 
      newStatus, 
      app.experience_level || "Volunteer"
    );
    
    await transporter.sendMail({
      from: `"Surge Careers" <${process.env.SMTP_USER}>`, 
      to: app.email,
      subject: emailContent.subject,
      html: emailContent.html,
    });
  } catch (emailError) {
    console.error("Email Sending Failed:", emailError);
    return { 
      success: true, 
      message: `Status updated to ${newStatus}, but email failed to send.` 
    };
  }

  revalidatePath("/dashboard/admin/volunteers");
  return { success: true, message: `Candidate ${newStatus} successfully.` };
}