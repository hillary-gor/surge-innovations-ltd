import { type NextRequest } from "next/server";
import { updateSession } from "@/utils/supabase/middleware";

// Default export function for Proxy
export default async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// URL matcher
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
