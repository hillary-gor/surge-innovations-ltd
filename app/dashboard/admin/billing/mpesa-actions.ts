"use server";

import { createClient } from "@/utils/supabase/server";

async function getMpesaToken() {
  const consumerKey = process.env.MPESA_CONSUMER_KEY!;
  const consumerSecret = process.env.MPESA_CONSUMER_SECRET!;
  const url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";
  
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString("base64");

  const res = await fetch(url, {
    headers: { Authorization: `Basic ${auth}` },
    cache: "no-store",
  });

  const data = await res.json();
  return data.access_token;
}

export async function triggerMpesaPayment(invoiceId: string, phoneNumber: string) {
  const supabase = await createClient();

  const { data: invoice } = await supabase
    .from("invoices")
    .select("amount, invoice_number")
    .eq("id", invoiceId)
    .single();

  if (!invoice) return { success: false, message: "Invoice not found" };

  let formattedPhone = phoneNumber.replace(/\+/g, "").replace(/\s/g, "");
  if (formattedPhone.startsWith("0")) formattedPhone = "254" + formattedPhone.slice(1);

  try {
    const token = await getMpesaToken();
    
    const timestamp = new Date().toISOString().replace(/[^0-9]/g, "").slice(0, 14);
    const shortcode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString("base64");

    const stkUrl = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    
    const payload = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.ceil(invoice.amount),
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
      AccountReference: invoice.invoice_number,
      TransactionDesc: `Payment for ${invoice.invoice_number}`,
    };

    const mpesaRes = await fetch(stkUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const mpesaData = await mpesaRes.json();

    if (mpesaData.ResponseCode !== "0") {
      throw new Error(mpesaData.errorMessage || "M-PESA failed");
    }

    await supabase
      .from("invoices")
      .update({
        checkout_request_id: mpesaData.CheckoutRequestID,
        phone_number: formattedPhone,
        status: "pending"
      })
      .eq("id", invoiceId);

    return { success: true, message: "STK Push sent to client" };

  } catch (error) {
    const message = error instanceof Error ? error.message : "Payment initiation failed";
    console.error("M-PESA Error:", error);
    return { success: false, message };
  }
}