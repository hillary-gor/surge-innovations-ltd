"use client";

import { useEffect, useState, useMemo } from "react";
import { Eye, EyeOff, Check, ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";

type Props = {
  name?: string;
  label?: string;
  error?: string;
  onValidPassword?: (valid: boolean, value: string) => void;
  className?: string;
};

const CriteriaItem = ({ valid, text }: { valid: boolean; text: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    animate={{ opacity: 1, x: 0 }}
    className={cn(
      "flex items-center text-xs transition-colors duration-300",
      valid ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground/70"
    )}
  >
    <div
      className={cn(
        "flex h-4 w-4 items-center justify-center rounded-full border mr-2 transition-all duration-300",
        valid
          ? "border-emerald-600 bg-emerald-600 text-white dark:border-emerald-500 dark:bg-emerald-500"
          : "border-muted-foreground/30 bg-transparent"
      )}
    >
      {valid && <Check className="h-2.5 w-2.5" />}
    </div>
    <span className={cn(valid && "font-medium text-foreground")}>{text}</span>
  </motion.div>
);

export default function PasswordInputWithLiveCheck({
  name = "password",
  error,
  onValidPassword,
  className,
}: Props) {
  const [value, setValue] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  // Track if the user has interacted to avoid showing errors too early
  const [, setIsDirty] = useState(false);

  const criteria = useMemo(() => {
    return {
      length: value.length >= 8 && value.length <= 60,
      upper: /[A-Z]/.test(value),
      lower: /[a-z]/.test(value),
      number: /[0-9]/.test(value),
      symbol: /[^A-Za-z0-9]/.test(value),
    };
  }, [value]);

  const validCount = Object.values(criteria).filter(Boolean).length;
  const isAllValid = validCount === 5;

  useEffect(() => {
    if (onValidPassword) {
      onValidPassword(isAllValid, value);
    }
  }, [isAllValid, value, onValidPassword]);

  // Calculate Progress Bar Width & Color
  const progress = (validCount / 5) * 100;
  const progressColor =
    validCount <= 2
      ? "bg-rose-500"
      : validCount <= 4
      ? "bg-amber-500"
      : "bg-emerald-500";

  return (
    <div className="space-y-2 relative group">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => {
            setValue(e.target.value);
            setIsDirty(true);
          }}
          placeholder="Create a secure password"
          className={cn(
            "pr-10 transition-all duration-300 focus:ring-0 focus:border-primary",
            isAllValid && "border-emerald-500/50 focus:border-emerald-500 ring-emerald-500/20",
            error && "border-rose-500 focus:border-rose-500",
            className
          )}
        />
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>

      {/* Progress Bar (Only visible when typing and not fully valid) */}
      <div className="h-1 w-full bg-muted/30 rounded-full overflow-hidden">
        <motion.div
          className={cn("h-full transition-colors duration-500", progressColor)}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* ERROR MESSAGE (External props) */}
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-rose-500 text-xs flex items-center mt-1"
        >
          <X className="w-3 h-3 mr-1" /> {error}
        </motion.p>
      )}

      {/* ANIMATED CRITERIA BOX */}
      <AnimatePresence>
        {/* State 1: User is typing, hasn't met criteria yet */}
        {isFocused && !isAllValid && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            className="overflow-hidden"
          >
            <div className="grid grid-cols-2 gap-2 p-4 mt-2 bg-background border border-border/50 rounded-lg shadow-lg relative z-10">
              <div className="absolute top-0 left-4 -mt-1 w-2 h-2 bg-background border-t border-l border-border/50 rotate-45" />
              <CriteriaItem valid={criteria.length} text="8+ characters" />
              <CriteriaItem valid={criteria.upper} text="Uppercase (A-Z)" />
              <CriteriaItem valid={criteria.lower} text="Lowercase (a-z)" />
              <CriteriaItem valid={criteria.number} text="Number (0-9)" />
              <CriteriaItem valid={criteria.symbol} text="Symbol (!@#)" />
            </div>
          </motion.div>
        )}

        {/* State 2: Password is Valid (Success Message) */}
        {isAllValid && value.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center text-emerald-600 dark:text-emerald-500 text-xs font-medium mt-2"
          >
            <ShieldCheck className="w-4 h-4 mr-1.5" />
            Excellent password format.
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}