// app/auth/callback/route.ts

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const errorParam = requestUrl.searchParams.get("error");
  const errorCodeParam = requestUrl.searchParams.get("error_code");
  const errorDescriptionParam =
    requestUrl.searchParams.get("error_description");

  if (errorParam || errorCodeParam || errorDescriptionParam) {
    console.error("Supabase callback error:", {
      errorParam,
      errorCodeParam,
      errorDescriptionParam,
    });

    let userFriendlyMessage =
      "Something unexpected happened. Please try again!";

    if (errorCodeParam === "otp_expired") {
      userFriendlyMessage =
        "This link has gone on a little vacation. Please request a new one!";
    } else if (errorDescriptionParam) {
      if (
        errorDescriptionParam.includes("invalid") ||
        errorDescriptionParam.includes("expired")
      ) {
        userFriendlyMessage =
          "Oops! Looks like that link is no longer valid. Please try logging in again!";
      } else {
        userFriendlyMessage =
          "Our digital gremlins are acting up. Please try again!";
      }
    }

    return redirect(
      `/auth/signin?error=${encodeURIComponent(userFriendlyMessage)}`
    );
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error: profileFetchError } = await supabase
          .from("profiles")
          .select("full_name, role")
          .eq("id", user.id)
          .single();

        if (profileFetchError) {
          return redirect("/auth/complete-profile");
        }

        if (!profile.full_name) {
          return redirect("/auth/complete-profile");
        }

        const userRole = profile.role;

        switch (userRole) {
          case "admin":
            return redirect("/dashboard/admin");
          case "vendor":
            return redirect("/");
          case "client":
            return redirect("/");
          default:
            return redirect("/");
        }
      } else {
        return redirect("/auth/signin?error=User not found after signin.");
      }
    } else {
      console.error("Error exchanging code for session:", error.message);
      return redirect(
        `/auth/signin?error=${encodeURIComponent(
          "Our magic link machine is a bit shy right now. Please try again!"
        )}`
      );
    }
  }

  return redirect(
    `/auth/signin?error=${encodeURIComponent(
      "Did a digital ninja steal your code? Please try logging in again!"
    )}`
  );
}
