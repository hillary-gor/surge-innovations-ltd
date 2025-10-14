import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

const base64Encode = (str: string) => Buffer.from(str).toString("base64");

export async function POST(req: Request) {
  const supabase = await createClient();
  const { name, phone, amount } = await req.json();

  try {
    // Insert initial donation (pending)
    const { data: donation, error } = await supabase
      .from("donations")
      .insert([
        {
          donor_name: name,
          phone_number: phone,
          amount,
          account_reference: `DON-${Date.now()}`,
          transaction_desc: "Donation via web platform",
          status: "pending",
        },
      ])
      .select()
      .single();

    if (error) throw error;

    // Get M-Pesa token
    const tokenRes = await fetch(
      "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
      {
        headers: {
          Authorization:
            "Basic " +
            base64Encode(
              `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
            ),
        },
      }
    );
    const { access_token } = await tokenRes.json();

    // Build STK payload
    const shortCode = process.env.MPESA_SHORTCODE!;
    const passkey = process.env.MPESA_PASSKEY!;
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:\.Z]/g, "")
      .slice(0, 14);
    const password = base64Encode(shortCode + passkey + timestamp);

    const stkPayload = {
      BusinessShortCode: shortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Number(amount),
      PartyA: phone,
      PartyB: shortCode,
      PhoneNumber: phone,
      CallBackURL: `${process.env.NEXT_PUBLIC_SITE_URL}/api/stkpush/callback`,
      AccountReference: donation.account_reference,
      TransactionDesc: donation.transaction_desc,
    };

    const stkRes = await fetch(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(stkPayload),
      }
    );

    const stkData = await stkRes.json();

    // Update donation with request IDs
    await supabase
      .from("donations")
      .update({
        merchant_request_id: stkData.MerchantRequestID,
        checkout_request_id: stkData.CheckoutRequestID,
      })
      .eq("id", donation.id);

    return NextResponse.json({ success: true, data: stkData });
  } catch (err) {
    console.error("STK push error:", err);
    return NextResponse.json(
      { success: false, error: String(err) },
      { status: 500 }
    );
  }
}
