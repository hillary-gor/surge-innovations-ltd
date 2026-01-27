"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  value: string;
  originalPassword?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
};

export default function PasswordConfirmationInput({ value, originalPassword = "", onChange, name = "confirmPassword" }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Logic: Only show status if user has started typing confirmation
  // AND the original password isn't empty
  const hasStarted = value.length > 0;
  const isMatch = value === originalPassword && originalPassword.length > 0;

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Confirm your password"
          className={cn(
            "pr-10 transition-colors",
            hasStarted && isMatch && "border-emerald-500 focus:border-emerald-500 ring-emerald-500/20",
            hasStarted && !isMatch && !isFocused && "border-rose-500 focus:border-rose-500" // Only red on blur to avoid annoyance while typing
          )}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>

      <AnimatePresence>
        {hasStarted && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex items-center text-xs overflow-hidden"
          >
            {isMatch ? (
              <span className="flex items-center text-emerald-600 dark:text-emerald-500 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
                Passwords match perfectly.
              </span>
            ) : (
              <span className="flex items-center text-rose-500 font-medium">
                <XCircle className="w-3.5 h-3.5 mr-1.5" />
                Passwords do not match yet.
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}