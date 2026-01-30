"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

// 1. Define the shape of your Invoice data
export interface Invoice {
  id: string;
  amount: number;
  status: 'pending' | 'paid' | 'overdue' | 'cancelled';
  invoice_number: string;
  created_at: string;
  due_date: string;
  checkout_request_id?: string | null;
  phone_number?: string | null;
}

// 2. Define the Supabase Realtime Payload structure
interface RealtimePayload {
  new: Invoice;
  old: Invoice;
  eventType: "INSERT" | "UPDATE" | "DELETE";
}

export function useRealtimeInvoices(initialInvoices: Invoice[], userId: string) {
  const [invoices, setInvoices] = useState<Invoice[]>(initialInvoices);
  const supabase = createClient();
  const router = useRouter();

  useEffect(() => {
    // 3. FIX: Use 'userId' in the channel name to make it unique and silence the unused var warning
    const channel = supabase
      .channel(`invoices-realtime-${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*", // Listen to INSERT, UPDATE, and DELETE
          schema: "public",
          table: "invoices",
          // We rely on RLS to filter rows, so no 'filter' string is strictly needed here
          // provided RLS is enabled on the table.
        },
        (payload) => {
          // 4. FIX: Cast payload to unknown first if needed, or use the interface directly
          // Supabase types can be tricky, so we cast to our defined shape
          const typedPayload = payload as unknown as RealtimePayload;

          if (typedPayload.eventType === "INSERT") {
            setInvoices((prev) => [typedPayload.new, ...prev]);
          } else if (typedPayload.eventType === "UPDATE") {
            setInvoices((prev) =>
              prev.map((invoice) =>
                invoice.id === typedPayload.new.id ? typedPayload.new : invoice
              )
            );
          } else if (typedPayload.eventType === "DELETE") {
            setInvoices((prev) =>
              prev.filter((invoice) => invoice.id !== typedPayload.old.id)
            );
          }

          // Refresh server components to keep sync
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, router, userId]);

  return invoices;
}