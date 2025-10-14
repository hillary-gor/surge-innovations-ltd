import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

type MpesaMetadataItem = {
  Name: string;
  Value: string | number;
};

export async function POST(req: Request) {
  const supabase = await createClient();
  const body = await req.json();
  const callback = body.Body.stkCallback;

  const checkoutRequestId = callback.CheckoutRequestID;
  const resultCode = callback.ResultCode;
  const resultDesc = callback.ResultDesc;

  let mpesaReceipt: string | null = null;
  let transactionDate: string | null = null;

  if (resultCode === 0) {
    const metadata = callback.CallbackMetadata.Item as MpesaMetadataItem[];
    mpesaReceipt = metadata.find((i) => i.Name === "MpesaReceiptNumber")
      ?.Value as string;
    transactionDate = metadata.find((i) => i.Name === "TransactionDate")
      ?.Value as string;
  }

  await supabase
    .from("donations")
    .update({
      result_code: resultCode,
      result_desc: resultDesc,
      mpesa_receipt_number: mpesaReceipt,
      transaction_date: transactionDate,
      status: resultCode === 0 ? "success" : "failed",
    })
    .eq("checkout_request_id", checkoutRequestId);

  return NextResponse.json({ ok: true });
}
