"use client";

import { useState, FormEvent, Suspense, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Loader2, Mail, ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";
import { signup } from "./signup-actions";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FloatingHeader from "@/components/layout/floating-logo-&-close-button";
import { toast } from "sonner";
import { GoogleSignInButton } from "@/components/auth/GoogleSignInButton";
import PasswordInputWithLiveCheck from "@/components/PasswordInputWithLiveCheck";
import { TermsCheckbox } from "@/components/auth/TermsCheckbox";

// SURGE LOGO
const logoUrl = "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/logos/surge-rectandular-logo.png";

type SignupResponse = {
  success: boolean;
  message: string;
};

// --- COMPONENT: SUCCESS STATE (The "Google Style" Confirmation) ---
function VerificationSentState({ email }: { email: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      className="text-center space-y-6 py-4"
    >
      <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-4">
        <Mail className="h-8 w-8 text-green-600 dark:text-green-400" />
      </div>
      
      <div className="space-y-2">
        <h2 className="text-2xl font-bold tracking-tight">Check your email</h2>
        <p className="text-muted-foreground text-sm max-w-xs mx-auto">
          We sent a verification link to <br/>
          <span className="font-medium text-foreground">{email}</span>
        </p>
      </div>

      <div className="bg-muted/50 p-4 rounded-lg text-xs text-muted-foreground text-left space-y-2 border border-border">
        <p className="font-semibold text-foreground flex items-center gap-2">
          <CheckCircle2 className="h-3 w-3 text-green-600" /> Next Steps:
        </p>
        <ol className="list-decimal list-inside space-y-1 ml-1">
          <li>Click the link in the email.</li>
          <li>Your account will be verified instantly.</li>
          <li>Log in to access your dashboard.</li>
        </ol>
      </div>

      <div className="pt-4 space-y-3">
        <Button asChild className="w-full" size="lg">
          <Link href="/auth/signin">
            Proceed to Sign In <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        
        <p className="text-xs text-muted-foreground">
          Did not receive the email?{" "}
          <button className="text-primary hover:underline font-medium" onClick={() => toast.info("Please wait 60 seconds before requesting again.")}>
            Click to resend
          </button>
        </p>
      </div>
    </motion.div>
  );
}

// --- COMPONENT: SIGN UP FORM ---
function SignUpForm({ onBack, onSuccess }: { onBack: () => void, onSuccess: (email: string) => void }) {
  const searchParams = useSearchParams();
  const next = searchParams.get("next");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordStrictlyValid, setIsPasswordStrictlyValid] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.includes(" ")) return;
    setFormData((prev) => ({ ...prev, firstName: value }));
    if (error) setError("");
  };

  const handlePasswordValidation = useCallback((valid: boolean, value: string) => {
    setIsPasswordStrictlyValid(valid);
    setFormData((prev) => {
      if (prev.password === value) return prev;
      return { ...prev, password: value };
    });
  }, []);

  const arePasswordsMatching = formData.password === formData.confirmPassword;

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.email.trim() !== "" &&
    isPasswordStrictlyValid &&
    formData.confirmPassword.trim() !== "" &&
    arePasswordsMatching &&
    agreedToTerms;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!isPasswordStrictlyValid) {
      setError("Please ensure your password meets all security requirements.");
      return;
    }
    if (!arePasswordsMatching) {
      setError("Passwords do not match.");
      return;
    }
    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service to proceed.");
      return;
    }

    if (isLoading) return;
    setIsLoading(true);

    const form = new FormData();
    form.append("full_name", `${formData.firstName} ${formData.lastName}`);
    form.append("email", formData.email);
    form.append("password", formData.password);

    try {
      const result: SignupResponse = await signup(form, next ?? undefined);

      if (result.success) {
        // TRIGGER SUCCESS STATE INSTEAD OF TOAST
        onSuccess(formData.email);
      } else {
        toast.error(result.message);
        setError(result.message);
      }
    } catch (err) {
      console.error("Signup failed:", err);
      setError("Connection error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <button 
        type="button" 
        onClick={onBack}
        className="flex items-center text-sm text-muted-foreground hover:text-primary mb-1 transition-colors"
      >
        <ArrowLeft className="mr-1 h-3 w-3" /> Back to options
      </button>

      {error && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </motion.div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="Jane"
            value={formData.firstName}
            onChange={handleFirstNameChange}
            required
            className="focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleInputChange}
            required
            className="focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Work Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="name@company.com"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <div className="space-y-2">
        <Label>Password</Label>
        <PasswordInputWithLiveCheck 
          name="password"
          onValidPassword={handlePasswordValidation}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">
          Confirm Password
          {formData.confirmPassword && formData.password && !arePasswordsMatching && (
            <span className="text-xs text-destructive ml-2">(Mismatch)</span>
          )}
        </Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
            className="pr-10 transition focus:ring-2 focus:ring-primary/20"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <TermsCheckbox checked={agreedToTerms} onCheckedChange={setAgreedToTerms} />

      <Button type="submit" className="w-full" disabled={isLoading || !isFormValid}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creating Account...
          </>
        ) : (
          "Create Account"
        )}
      </Button>
    </form>
  );
}

// --- MAIN PAGE ---
export default function SignUpPage() {
  const [view, setView] = useState<"options" | "form" | "success">("options");
  const [successEmail, setSuccessEmail] = useState("");

  const handleSuccess = (email: string) => {
    setSuccessEmail(email);
    setView("success");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
      <FloatingHeader />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl p-6 md:p-8 space-y-6 border border-zinc-200 dark:border-zinc-800"
      >
        {/* Only show Header in options or form view, hide in success view to focus on the message */}
        {view !== "success" && (
          <div className="text-center space-y-3">
            <div className="flex justify-center items-center pb-2">
              <div className="relative w-48 h-16">
                  <Image
                    src={logoUrl}
                    alt="Surge Innovations"
                    fill
                    className="object-contain"
                    priority
                  />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Welcome to Surge
              </h1>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
                Join us to build, scale, and transform your digital presence.
              </p>
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          
          {/* VIEW 1: SUCCESS STATE */}
          {view === "success" && (
             <VerificationSentState key="success" email={successEmail} />
          )}

          {/* VIEW 2: OPTIONS */}
          {view === "options" && (
            <motion.div 
              key="options"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-4 pt-2"
            >
              <div className="w-full">
                <GoogleSignInButton text="Sign up with Google" /> 
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-200 dark:border-zinc-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground">
                    or
                  </span>
                </div>
              </div>

              <Button 
                variant="outline" 
                className="w-full flex gap-2 items-center justify-center py-5 border-zinc-200 hover:bg-zinc-50 hover:text-primary dark:border-zinc-700 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setView("form")}
              >
                <Mail className="h-4 w-4" />
                Sign up with Email
              </Button>
              
              <div className="mt-6 pt-4 text-center">
                 <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/auth/signin"
                    className="font-medium text-blue-600 hover:underline hover:text-blue-500"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </motion.div>
          )}

          {/* VIEW 3: FORM */}
          {view === "form" && (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <Suspense fallback={<div className="flex justify-center py-10"><Loader2 className="animate-spin text-primary" /></div>}>
                <SignUpForm onBack={() => setView("options")} onSuccess={handleSuccess} />
              </Suspense>

              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-zinc-200 dark:border-zinc-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-zinc-900 px-2 text-muted-foreground">
                    or connect via
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <GoogleSignInButton text="Google" />
                <Button variant="outline" className="w-full flex gap-2 items-center" disabled>
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.74.79 3.61 1.95-3.16 1.66-2.52 6.07.6 7.42-.64 1.58-1.54 3.02-2.8 3.66zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
                  Apple
                </Button>
              </div>
              
              <p className="text-center text-sm text-muted-foreground pt-4">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-medium text-blue-600 hover:underline hover:text-blue-500"
                >
                  Sign in
                </Link>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}