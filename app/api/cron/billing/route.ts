import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";
import { transporter } from "@/lib/nodemailer";
import { generateInvoiceBuffer } from "@/lib/pdf-service";

const CRON_SECRET = process.env.CRON_SECRET || "make-up-a-secure-password";

const unwrap = <T>(value: T | T[]): T | null => {
  if (Array.isArray(value)) return value.length > 0 ? value[0] : null;
  return value;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const key = searchParams.get("key");
  
  if (key !== CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createAdminClient();
  const results = { generated: 0, errors: 0 };

  try {
    const { data: subs, error: fetchError } = await supabase
      .from("subscriptions")
      .select(`
        id,
        next_billing_date,
        custom_price,
        profiles (full_name, email),
        plans (name, price, billing_cycle, currency)
      `)
      .eq("status", "active")
      .lte("next_billing_date", new Date().toISOString());

    if (fetchError) throw fetchError;
    
    if (!subs || subs.length === 0) {
      return NextResponse.json({ message: "No invoices due today." });
    }

    console.log(`Found ${subs.length} subscriptions due.`);

    for (const sub of subs) {
      try {
        const profile = unwrap(sub.profiles);
        const plan = unwrap(sub.plans);

        if (!profile || !plan) {
          console.error(`Skipping sub ${sub.id}: Missing relation data.`);
          continue;
        }

        const finalPrice = sub.custom_price ?? plan.price;
        const currency = plan.currency || "KES";
        
        const invoiceNum = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
        const dueDate = new Date();

        const pdfBuffer = await generateInvoiceBuffer({
          invoiceNum,
          date: new Date().toLocaleDateString(),
          status: 'Pending',
          currency,
          amount: finalPrice,
          recipientName: profile.full_name,
          recipientEmail: profile.email,
          planName: plan.name,
          billingCycle: plan.billing_cycle,
        });

        await transporter.sendMail({
          from: `"Surge Billing" <${process.env.SMTP_USER}>`,
          to: profile.email,
          subject: `Invoice #${invoiceNum} - ${plan.name} Renewal`,
          html: `
            <div style="font-family: sans-serif; color: #333;">
              <h2>Service Renewal Invoice</h2>
              <p>Hello ${profile.full_name},</p>
              <p>Your subscription for <strong>${plan.name}</strong> has renewed.</p>
              <p>Please find the invoice attached. Payment is due upon receipt.</p>
              <p><strong>Total Due: ${currency} ${finalPrice.toLocaleString()}</strong></p>
              <hr />
              <p style="font-size: 12px; color: #666;">Surge Innovations Ltd | Automated Billing System</p>
            </div>
          `,
          attachments: [
            {
              filename: `Invoice-${invoiceNum}.pdf`,
              content: pdfBuffer,
              contentType: "application/pdf",
            },
          ],
        });

        await supabase.from("invoices").insert({
          subscription_id: sub.id,
          invoice_number: invoiceNum,
          amount: finalPrice,
          status: "pending",
          due_date: dueDate.toISOString(),
        });

        const nextDate = new Date(sub.next_billing_date);
        if (plan.billing_cycle === 'yearly') {
          nextDate.setFullYear(nextDate.getFullYear() + 1);
        } else {
          nextDate.setMonth(nextDate.getMonth() + 1);
        }

        await supabase
          .from("subscriptions")
          .update({ next_billing_date: nextDate.toISOString() })
          .eq("id", sub.id);

        results.generated++;
        console.log(`Processed invoice for ${profile.email}`);

      } catch (innerError) {
        console.error(`Failed to process subscription ${sub.id}:`, innerError);
        results.errors++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Processed ${results.generated} invoices. Failed: ${results.errors}` 
    });

  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.error("Cron failed:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}