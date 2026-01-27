"use client";

import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Loader2, AlertCircle } from "lucide-react";
import { GoogleSignInButton } from "./GoogleSignInButton";

interface QuickLoginFormProps {
  onSuccess: () => void;
}

export function QuickLoginForm({ onSuccess }: QuickLoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      // Success!
      onSuccess();
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100 dark:bg-zinc-900 dark:border-zinc-800">
      <div className="text-center mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Welcome to 6Care</h3>
        <p className="text-sm text-gray-500">Please sign in to access your dashboard.</p>
      </div>

      <div className="space-y-4">
        {/* 1. Google Button */}
        <GoogleSignInButton text="Continue with Google" />

        {/* 2. Visual Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-zinc-700" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500 dark:bg-zinc-900">
              Or continue with email
            </span>
          </div>
        </div>

        {/* 3. Existing Email Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md flex items-center gap-2 dark:bg-red-900/20 dark:text-red-400">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
            <input 
              type="email" 
              placeholder="name@example.com"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:bg-zinc-950 dark:border-zinc-700 dark:text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
              <a href="/auth/forgot-password" className="text-xs text-rose-600 hover:underline">
                Forgot?
              </a>
            </div>
            <input 
              type="password" 
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-rose-500 focus:outline-none dark:bg-zinc-950 dark:border-zinc-700 dark:text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full flex justify-center items-center rounded-md bg-rose-600 py-2.5 text-sm font-bold text-white hover:bg-rose-700 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}