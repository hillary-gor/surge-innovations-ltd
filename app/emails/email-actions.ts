"use server";

import { Resend } from "resend";
import { createClient } from "@/utils/supabase/server";
import { render } from "@react-email/components";
import { AdminBroadcastEmail } from "./AdminBroadcastEmail"; 

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendClientEmail(formData: FormData) {
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;
  const recipientGroup = formData.get("recipientGroup") as string;
  const specificEmail = formData.get("specificEmail") as string;
  const heroImage = formData.get("heroImage") as File | null;

  if (!subject || !message || !recipientGroup) {
    return { error: "Missing required fields" };
  }

  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Unauthorized" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { error: "Unauthorized" };

  let recipients: string[] = [];

  try {
    if (recipientGroup === "specific_client") {
      if (!specificEmail) return { error: "Please select a specific client." };
      recipients = [specificEmail];
    } else if (recipientGroup === "all_clients") {
      const { data } = await supabase.from("profiles").select("email").eq("role", "client");
      recipients = data?.map(d => d.email) || [];
    } else if (recipientGroup === "inquiries") {
      const { data } = await supabase.from("tech_as_a_service_inquiries").select("contact_email");
      recipients = data?.map(d => d.contact_email) || [];
    } else if (recipientGroup === "volunteers") {
      const { data } = await supabase.from("volunteer_applications").select("email").eq("status", "pending");
      recipients = data?.map(d => d.email) || [];
    }

    recipients = [...new Set(recipients)];

    if (recipients.length === 0) {
      return { error: "No recipients found for this group." };
    }

    let heroImageUrl: string | undefined = undefined;

    if (heroImage && heroImage.size > 0) {
      const buffer = Buffer.from(await heroImage.arrayBuffer());
      const fileExt = heroImage.name.split('.').pop() || 'png';
      const fileName = `hero-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("email-assets")
        .upload(fileName, buffer, {
          contentType: heroImage.type,
          upsert: false,
        });

      if (!uploadError && uploadData) {
        const { data: publicUrlData } = supabase.storage
          .from("email-assets")
          .getPublicUrl(uploadData.path);
        heroImageUrl = publicUrlData.publicUrl;
      }
    }

    const generatedAntiClipId = `msg-${Date.now()}-${Math.floor(Math.random() * 10000)}`;

    const emailHtml = await render(
      AdminBroadcastEmail({ 
        subject: subject, 
        message: message,
        userFirstname: recipientGroup === "specific_client" ? "Client" : "there", 
        antiClipId: generatedAntiClipId,
        heroImageUrl: heroImageUrl
      })
    );

    const { error } = await resend.emails.send({
      from: "Surge Innovations <hello@surgeinnovations.org>", 
      to: recipients, 
      subject: subject,
      html: emailHtml,
    });

    if (error) throw error;

    return { success: `Email successfully sent to ${recipients.length} recipient(s)!` };

  } catch (error: unknown) {
    console.error("Email sending failed:", error);
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Failed to send email." };
  }
}