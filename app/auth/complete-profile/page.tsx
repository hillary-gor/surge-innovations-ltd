"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle, User } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient as createClientBrowser } from "@/utils/supabase/client";
import {
  completeProfile,
  skipProfileCompletion,
} from "./completeProfileActions";

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label: string;
  defaultValue?: string;
}

function FormInput({
  id,
  name,
  label,
  defaultValue,
  type = "text",
  ...rest
}: FormInputProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-sm font-semibold text-gray-700">
        {label}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className="h-12 bg-blue-50/50 border-blue-200/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all"
        {...rest}
      />
    </div>
  );
}

export default function CompleteProfilePage() {
  const supabase = createClientBrowser();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  const [initialProfile, setInitialProfile] = useState({
    full_name: "",
    phone: "",
    bio: "",
    location: "",
  });
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error fetching user:", userError?.message);
        window.location.href = "/auth/login";
        return;
      }

      setUserId(user.id);
      setInitialProfile({
        full_name: user.user_metadata?.full_name || "",
        phone: user.phone || "",
        bio: user.user_metadata?.bio || "",
        location: user.user_metadata?.location || "",
      });
      setLoading(false);
    }
    fetchUserData();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);

    const result = await completeProfile(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({
        type: "success",
        text: result.message || "Profile updated successfully!",
      });
    }
    setSubmitting(false);
  };

  const handleSkip = async () => {
    setSubmitting(true);
    setMessage(null);

    if (!userId) {
      setMessage({
        type: "error",
        text: "User data not available to skip profile completion.",
      });
      setSubmitting(false);
      return;
    }

    const result = await skipProfileCompletion(userId);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({
        type: "success",
        text: result.message || "Profile skipped. Redirecting to dashboard.",
      });
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-600">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-100/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-300/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <div className="w-full max-w-lg relative z-10">
        <Card className="glass-card shadow-2xl border-0 slide-in">
          <CardHeader className="space-y-1 pb-6 text-center">
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-gray-600">
              Please provide additional details to enhance your portal
              experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <FormInput
                id="full_name"
                name="full_name"
                label="Full Name"
                defaultValue={initialProfile.full_name}
                required
              />
              <FormInput
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                type="tel"
                defaultValue={initialProfile.phone}
              />
              <FormInput
                id="bio"
                name="bio"
                label="Bio"
                defaultValue={initialProfile.bio}
              />
              <FormInput
                id="location"
                name="location"
                label="Current City"
                defaultValue={initialProfile.location}
              />

              {message && (
                <div
                  className={`px-4 py-3 rounded-md flex items-center gap-2 mt-4 text-sm ${
                    message.type === "error"
                      ? "bg-red-50 border border-red-200 text-red-700"
                      : "bg-green-50 border border-green-200 text-green-700"
                  }`}
                  role="alert"
                >
                  {message.type === "error" ? (
                    <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <CheckCircle className="h-5 w-5 flex-shrink-0" />
                  )}
                  <span className="flex-grow text-center">{message.text}</span>
                </div>
              )}

              <Button
                type="submit"
                className="w-full h-12 cyber-button text-base font-semibold mt-6"
                disabled={submitting}
              >
                {submitting ? "Saving Profile..." : "Save Profile"}
              </Button>
            </form>

            <Button
              type="button"
              variant="outline"
              className="w-full h-12 justify-center border-blue-200 text-blue-600 hover:bg-blue-50 bg-transparent mt-2"
              onClick={handleSkip}
              disabled={submitting}
            >
              Skip for now
            </Button>

            <div className="mt-6 p-4 rounded-lg bg-yellow-50 border border-yellow-200">
              <div className="flex items-center gap-2 text-yellow-800">
                <User className="h-4 w-4" />
                <span className="text-sm font-semibold">
                  Profile Importance
                </span>
              </div>
              <p className="text-xs text-yellow-700 mt-1">
                Completing your profile ensures full access to system features
                and proper role-based permissions.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
