import { NextResponse } from "next/server";
import { createAdminClient } from "@/utils/supabase/server";
import { generateInvoiceBuffer } from "@/lib/pdf-service";
import { Resend } from "resend";
import { InvoiceEmail } from "@/app/emails/InvoiceEmail";

export const maxDuration = 300;
export const dynamic = "force-dynamic";

if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY missing");
const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createAdminClient();

  try {
    const { data: subs, error: fetchError } = await supabase
      .from("subscriptions")
      .select(
        `
        id, next_billing_date, custom_price,
        profiles (full_name, email),
        plans (name, price, billing_cycle, currency)
      `,
      )
      .eq("status", "active")
      .lte("next_billing_date", new Date().toISOString());

    if (fetchError) throw fetchError;
    if (!subs || subs.length === 0) {
      return NextResponse.json({ message: "No invoices due today." });
    }

    const BATCH_SIZE = 5;
    let successfulCount = 0;
    let failedCount = 0;

    for (let i = 0; i < subs.length; i += BATCH_SIZE) {
      const batch = subs.slice(i, i + BATCH_SIZE);

      const batchPromises = batch.map(async (sub) => {
        const profile = Array.isArray(sub.profiles)
          ? sub.profiles[0]
          : sub.profiles;
        const plan = Array.isArray(sub.plans) ? sub.plans[0] : sub.plans;

        if (!profile || !plan)
          throw new Error(`Sub ${sub.id}: Missing relations`);

        const finalPrice = sub.custom_price ?? plan.price;
        const currency = plan.currency || "KES";
        const invoiceNum = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const pdfBuffer = await generateInvoiceBuffer({
          invoiceNum,
          date: new Date().toLocaleDateString(),
          status: "Pending",
          currency,
          amount: finalPrice,
          recipientName: profile.full_name,
          recipientEmail: profile.email,
          planName: plan.name,
          billingCycle: plan.billing_cycle,
        });

        const { error: emailError } = await resend.emails.send({
          from: "Surge Billing <billing@surgeinnovations.org>",
          to: profile.email,
          subject: `Invoice #${invoiceNum} - ${plan.name} Renewal`,
          react: (
            <InvoiceEmail
              customerName={profile.full_name}
              planName={plan.name}
              currency={currency}
              amount={finalPrice}
            />
          ),
          attachments: [
            {
              filename: `Invoice-${invoiceNum}.pdf`,
              content: pdfBuffer,
            },
          ],
        });

        if (emailError) throw new Error(`Email failed: ${emailError.message}`);

        const { error: dbError } = await supabase.from("invoices").insert({
          subscription_id: sub.id,
          invoice_number: invoiceNum,
          amount: finalPrice,
          status: "pending",
          due_date: new Date().toISOString(),
        });

        if (dbError) throw new Error(`DB Insert failed: ${dbError.message}`);

        const nextDate = new Date(sub.next_billing_date);
        if (plan.billing_cycle === "yearly") {
          nextDate.setFullYear(nextDate.getFullYear() + 1);
        } else {
          nextDate.setMonth(nextDate.getMonth() + 1);
        }

        const { error: updateError } = await supabase
          .from("subscriptions")
          .update({ next_billing_date: nextDate.toISOString() })
          .eq("id", sub.id);

        if (updateError)
          throw new Error(`Sub Update failed: ${updateError.message}`);

        return sub.id;
      });

      const results = await Promise.allSettled(batchPromises);

      results.forEach((result) => {
        if (result.status === "fulfilled") {
          successfulCount++;
        } else {
          failedCount++;
          console.error("[CRON BATCH ERROR]:", result.reason);
        }
      });
    }

    return NextResponse.json({
      success: true,
      processed: successfulCount,
      failed: failedCount,
    });
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Critical failure";
    console.error("[CRON FATAL]:", err);
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
