import { createAdminClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";
import { transporter } from "@/lib/nodemailer";

interface MpesaItem {
  Name: string;
  Value?: string | number;
}

interface StkCallback {
  MerchantRequestID: string;
  CheckoutRequestID: string;
  ResultCode: number;
  ResultDesc: string;
  CallbackMetadata?: {
    Item: MpesaItem[];
  };
}

interface MpesaPayload {
  Body: {
    stkCallback: StkCallback;
  };
}

interface InvoiceWithProfile {
  id: string;
  invoice_number: string;
  amount: number;
  subscriptions: {
    profiles: {
      full_name: string;
      email: string;
    } | null;
  } | null;
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as MpesaPayload;
    const { Body } = payload;
    
    if (!Body?.stkCallback) {
      return NextResponse.json({ result: "Invalid Payload" }, { status: 400 });
    }

    const { CheckoutRequestID, ResultCode, CallbackMetadata } = Body.stkCallback;

    if (ResultCode !== 0) {
      return NextResponse.json({ result: "Acknowledged Failure" });
    }

    const items = CallbackMetadata?.Item || [];
    const receiptItem = items.find((i: MpesaItem) => i.Name === "MpesaReceiptNumber");
    const mpesaReceipt = receiptItem?.Value?.toString();

    if (!mpesaReceipt) {
      return NextResponse.json({ result: "Data Error" });
    }

    const supabase = await createAdminClient();

    const { data: invoiceData, error: fetchError } = await supabase
      .from("invoices")
      .select(`
        id, 
        invoice_number, 
        amount,
        subscriptions (
          profiles (full_name, email)
        )
      `)
      .eq("checkout_request_id", CheckoutRequestID)
      .single();

    if (fetchError || !invoiceData) {
      return NextResponse.json({ result: "Invoice Missing" });
    }

    const { error: updateError } = await supabase
      .from("invoices")
      .update({
        status: "paid",
        mpesa_receipt_number: mpesaReceipt,
        paid_at: new Date().toISOString(),
      })
      .eq("id", invoiceData.id);

    if (updateError) throw updateError;

    const invoice = invoiceData as unknown as InvoiceWithProfile;
    const profile = invoice.subscriptions?.profiles;
    
    if (profile?.email) {
      await transporter.sendMail({
        from: `"Surge Accounts" <${process.env.SMTP_USER}>`,
        to: profile.email,
        subject: `Receipt: Payment for ${invoice.invoice_number}`,
        html: `
          <div style="font-family: sans-serif; color: #333; max-width: 600px;">
            <h2 style="color: #16a34a;">Payment Received</h2>
            <p>Hi ${profile.full_name},</p>
            <p>Thank you! We have received your payment via M-PESA.</p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <p style="margin: 5px 0;"><strong>Invoice:</strong> ${invoice.invoice_number}</p>
              <p style="margin: 5px 0;"><strong>Amount:</strong> KES ${invoice.amount.toLocaleString()}</p>
              <p style="margin: 5px 0;"><strong>Receipt Code:</strong> ${mpesaReceipt}</p>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>

            <p>Your invoice status has been updated to <strong>PAID</strong>.</p>
            <p style="font-size: 12px; color: #666;">Surge Innovations Ltd</p>
          </div>
        `,
      });
    }

    return NextResponse.json({ result: "Success" });

  } catch (error) {
    console.error("Callback Error:", error);
    return NextResponse.json({ result: "Server Error" }, { status: 500 });
  }
}