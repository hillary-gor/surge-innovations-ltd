import { createClient } from "@/utils/supabase/server";
import { generateInvoiceBuffer } from "@/lib/pdf-service";
import { NextResponse } from "next/server";

const unwrap = <T>(value: T | T[]): T | null => {
  if (Array.isArray(value)) {
    return value.length > 0 ? value[0] : null;
  }
  return value;
};

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  // 1. Auth Check
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // 2. Fetch Invoice
  const { data: invoice, error } = await supabase
    .from("invoices")
    .select(`
      invoice_number,
      created_at,
      amount,
      status, 
      subscriptions!inner (
        user_id,
        plans (
          name, 
          billing_cycle,
          currency
        ),
        profiles (
          full_name, 
          email
        )
      )
    `)
    .eq("id", id)
    .eq("subscriptions.user_id", user.id)
    .single();

  if (error || !invoice) {
    console.error("Invoice Fetch Error:", error);
    return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
  }

  // 3. Safe Data Unwrapping
  const sub = unwrap(invoice.subscriptions);
  const plan = sub ? unwrap(sub.plans) : null;
  const profile = sub ? unwrap(sub.profiles) : null;

  // 4. Strict Guard Clause
  if (!sub || !profile || !plan) {
    console.error("Missing relation data:", { sub, profile, plan });
    return NextResponse.json({ error: "Incomplete subscription details" }, { status: 500 });
  }

  try {
    // 5. Generate PDF
    const pdfBuffer = await generateInvoiceBuffer({
      invoiceNum: invoice.invoice_number,
      // Format date for Kenya locale
      date: new Date(invoice.created_at || new Date()).toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      status: invoice.status || 'pending', 
      recipientName: profile.full_name,
      recipientEmail: profile.email,
      planName: plan.name,
      amount: invoice.amount,
      currency: plan.currency || 'KES',
      billingCycle: plan.billing_cycle,
    });

    // 6. Return Download
    return new NextResponse(pdfBuffer as unknown as BodyInit, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="Invoice-${invoice.invoice_number}.pdf"`,
      },
    });

  } catch (err) {
    console.error("PDF Gen Error:", err);
    return NextResponse.json({ error: "Failed to generate PDF" }, { status: 500 });
  }
}