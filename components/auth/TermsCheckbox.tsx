"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";

interface TermsCheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function TermsCheckbox({ checked, onCheckedChange }: TermsCheckboxProps) {
  return (
    <div className="flex items-start space-x-2 py-4">
      <Checkbox 
        id="terms" 
        checked={checked} 
        onCheckedChange={onCheckedChange}
        className="mt-1 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
      />
      <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground leading-relaxed cursor-pointer">
        I agree to the{" "}
        <Link href="/terms" className="underline underline-offset-4 hover:text-primary transition-colors">
          Terms of Service
        </Link>{" "}
        and acknowledge the{" "}
        <Link href="/privacy" className="underline underline-offset-4 hover:text-primary transition-colors">
          Privacy Policy
        </Link>.
        <span className="block text-xs text-muted-foreground/60 mt-1">
          This site is protected by reCAPTCHA and the Google{" "}
          <a href="https://policies.google.com/privacy" className="hover:underline">Privacy Policy</a> and{" "}
          <a href="https://policies.google.com/terms" className="hover:underline">Terms of Service</a> apply.
        </span>
      </Label>
    </div>
  );
}