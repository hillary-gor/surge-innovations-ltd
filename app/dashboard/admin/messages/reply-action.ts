"use server";

import { z } from "zod";
import { createClient } from "@/utils/supabase/server";
import { transporter } from "@/lib/nodemailer";
import { revalidatePath } from "next/cache";
import { generateInvoiceBuffer } from "@/lib/pdf-service";

const ReplySchema = z.object({
  messageId: z.uuid(),
  recipientEmail: z.email(),
  recipientName: z.string(),
  subject: z.string().min(1, "Subject is required"),
  replyBody: z.string().min(10, "Message must be at least 10 characters"),
});

export type ReplyState = {
  success?: boolean;
  message?: string;
  errors?: {
    subject?: string[];
    replyBody?: string[];
  };
};

export async function sendReplyAction(_prevState: ReplyState, formData: FormData): Promise<ReplyState> {
  const validatedFields = ReplySchema.safeParse({
    messageId: formData.get("messageId"),
    recipientEmail: formData.get("recipientEmail"),
    recipientName: formData.get("recipientName"),
    subject: formData.get("subject"),
    replyBody: formData.get("replyBody"),
  });

  if (!validatedFields.success) {
    return { success: false, message: "Invalid fields", errors: validatedFields.error.flatten().fieldErrors };
  }

  const { messageId, recipientEmail, subject, replyBody } = validatedFields.data;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { success: false, message: "Unauthorized" };
  
  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single();
  if (profile?.role !== "admin") return { success: false, message: "Admin access required" };

  try {
    const htmlContent = `
      <div style="font-family: sans-serif; color: #333; line-height: 1.6;">
        ${replyBody.replace(/\n/g, "<br>")}
      </div>
    `;

    await transporter.sendMail({
      from: `"Surge Support" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: subject,
      html: htmlContent,
    });
  } catch (error) {
    console.error("Email send failed:", error);
    return { success: false, message: "Failed to send email." };
  }

  await supabase.from("contact_messages").update({ status: "replied" }).eq("id", messageId);
  revalidatePath("/dashboard/admin/messages");
  return { success: true, message: "Reply sent successfully!" };
}

const InvoiceSchema = z.object({
  messageId: z.string().uuid(),
  recipientEmail: z.string().email(),
  recipientName: z.string(),
  planName: z.string(),
  planPrice: z.string(),
  billingCycle: z.string(),
});

export async function sendInvoiceAction(_prevState: ReplyState, formData: FormData): Promise<ReplyState> {
  const validatedFields = InvoiceSchema.safeParse({
    messageId: formData.get("messageId"),
    recipientEmail: formData.get("recipientEmail"),
    recipientName: formData.get("recipientName"),
    planName: formData.get("planName"),
    planPrice: formData.get("planPrice"),
    billingCycle: formData.get("billingCycle"),
  });

  if (!validatedFields.success) {
    return { success: false, message: "Missing invoice details." };
  }

  const { recipientEmail, recipientName, planName, planPrice, billingCycle, messageId } = validatedFields.data;
  
  const invoiceNum = `INV-${Math.floor(100000 + Math.random() * 900000)}`;
  const date = new Date().toLocaleDateString();
  const numericAmount = parseFloat(planPrice.replace(/[^0-9.]/g, '')) || 0;

  let pdfBuffer: Buffer;
  try {
    pdfBuffer = await generateInvoiceBuffer({
      invoiceNum,
      date,
      status: 'Pending',
      currency: 'KES',
      amount: numericAmount,
      recipientName,
      recipientEmail,
      planName,
      billingCycle
    });
  } catch (pdfError) {
    console.error("PDF Generation failed:", pdfError);
    return { success: false, message: "Failed to generate PDF invoice." };
  }

  const emailHtml = `
    <div style="font-family: sans-serif; color: #333; max-width: 600px;">
      <h2>Invoice #${invoiceNum}</h2>
      <p>Hi ${recipientName},</p>
      <p>Please find attached the invoice for your <strong>${planName}</strong> plan.</p>
      
      <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #000;">
        <p style="margin: 0;"><strong>Amount Due:</strong> ${planPrice}</p>
        <p style="margin: 5px 0 0 0; font-size: 14px;">Pay via M-PESA Paybill <strong>123456</strong> Account <strong>${invoiceNum}</strong></p>
      </div>

      <p>Best regards,<br>Surge Billing Team</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Surge Billing" <${process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `Invoice #${invoiceNum} from Surge Innovations`,
      html: emailHtml,
      attachments: [
        {
          filename: `Invoice-${invoiceNum}.pdf`,
          content: pdfBuffer,
          contentType: 'application/pdf'
        }
      ]
    });
  } catch (e) {
    console.error("Email send error:", e);
    return { success: false, message: "Failed to send invoice email." };
  }
  
  const supabase = await createClient();
  await supabase.from("contact_messages").update({ status: "invoiced" }).eq("id", messageId);
  revalidatePath("/dashboard/admin/messages");

  return { success: true, message: "Invoice sent successfully!" };
}