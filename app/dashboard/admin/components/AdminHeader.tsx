"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Menu,
  X,
  ShieldCheck,
  LayoutDashboard,
  Layers,
  MessageSquare,
  LogOut,
  Settings,
  Mail,
  HeartHandshake,
  Receipt,
  Globe
} from "lucide-react";
import { createClient } from "@/utils/supabase/client";

export function AdminHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktopMenuOpen, setIsDesktopMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/auth/signin");
  };

  const navLinks = [
    { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/admin/projects", icon: Layers },
    { name: "Messages", href: "/dashboard/admin/messages", icon: MessageSquare },
    { name: "Email Hub", href: "/dashboard/admin/email", icon: Mail },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-border/40 transition-all duration-300">
        <div className="w-full px-6 md:px-8 h-20 flex items-center justify-between">
          <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="flex items-center gap-3 transition-transform group-hover:scale-105">
                <Image 
                  src="https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/logos/surge-rectandular-logo.png" 
                  alt="Surge Innovations" 
                  width={160}
                  height={32}
                  priority
                  className="h-8 w-auto object-contain block" 
                />
                <span className="bg-blue-600/10 text-blue-700 dark:text-blue-400 border border-blue-600/20 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold relative top-px hidden sm:inline-block">
                  Admin
                </span>
              </span>
            </Link>
          </div>

          <nav className="hidden md:flex flex-none items-center gap-8 font-medium text-sm">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`transition-colors hover:text-foreground flex items-center gap-2 ${
                  pathname === link.href ? "text-blue-600 font-bold" : "text-muted-foreground"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex-1 flex items-center justify-end gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-foreground hover:bg-muted/50 px-4 py-2.5 rounded-full transition-colors"
            >
              <Globe className="w-4 h-4" />
              View Site
            </Link>

            <div className="relative">
              <button
                onClick={() =>
                  window.innerWidth < 768
                    ? setIsMobileMenuOpen(true)
                    : setIsDesktopMenuOpen(!isDesktopMenuOpen)
                }
                className="flex items-center gap-3 border border-border/60 p-1 pl-3.5 rounded-full hover:shadow-md transition-all bg-card active:scale-95"
              >
                <Menu className="w-4 h-4 text-foreground shrink-0" />
                <div className="w-8 h-8 bg-blue-600/10 border border-blue-600/20 rounded-full flex items-center justify-center overflow-hidden shrink-0">
                  <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5" />
                </div>
              </button>

              <AnimatePresence>
                {isDesktopMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-3 w-64 bg-card border border-border/50 rounded-2xl shadow-xl py-2 hidden md:block"
                  >
                    <div className="flex flex-col">
                      <Link
                        href="/dashboard/admin"
                        className="px-5 py-3 text-sm font-bold text-blue-600 flex items-center gap-2 hover:bg-muted/50 transition-colors"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        <LayoutDashboard className="w-4 h-4" /> Admin Console
                      </Link>
                      <Link
                        href="/dashboard/admin/volunteers"
                        className="px-5 py-3 text-sm font-bold hover:bg-muted/50 transition-colors flex items-center gap-2"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        <HeartHandshake className="w-4 h-4" /> Volunteers
                      </Link>
                      <Link
                        href="/dashboard/admin/billing"
                        className="px-5 py-3 text-sm font-bold hover:bg-muted/50 transition-colors flex items-center gap-2"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        <Receipt className="w-4 h-4" /> Billing & Invoices
                      </Link>
                      <div className="h-px bg-border/50 my-1 mx-4" />
                      <Link
                        href="/dashboard/admin/settings"
                        className="px-5 py-3 text-sm font-medium hover:bg-muted/50 transition-colors flex items-center gap-2"
                        onClick={() => setIsDesktopMenuOpen(false)}
                      >
                        <Settings className="w-4 h-4" /> System Settings
                      </Link>
                      <div className="h-px bg-border/50 my-1 mx-4" />
                      <button
                        onClick={handleSignOut}
                        className="px-5 py-3 text-sm font-medium text-left text-destructive hover:bg-muted/50 transition-colors flex items-center gap-2 w-full"
                      >
                        <LogOut className="w-4 h-4" /> Log out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex items-end md:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative w-full bg-background rounded-t-4xl px-6 pb-10 pt-4 shadow-2xl flex flex-col z-10 max-h-[85vh] overflow-y-auto"
            >
              <div className="w-full flex justify-center mb-6">
                <div className="w-12 h-1.5 bg-muted-foreground/20 rounded-full" />
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="absolute top-6 right-6 p-2 bg-muted rounded-full hover:bg-muted/80 transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
              <div className="mb-8">
                <h2 className="text-2xl font-black tracking-tight mb-1 flex items-center gap-2">
                  System{" "}
                  <span className="bg-blue-600/10 text-blue-700 dark:text-blue-400 border border-blue-600/20 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-bold">
                    Admin
                  </span>
                </h2>
                <p className="text-sm text-muted-foreground font-medium">
                  Surge Innovations Management Console
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Link
                  href="/dashboard/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-blue-600/10 text-blue-700 dark:text-blue-500 border border-blue-600/20 active:scale-[0.98] transition-all"
                >
                  <div className="w-10 h-10 bg-blue-600/20 flex items-center justify-center rounded-xl shrink-0">
                    <LayoutDashboard className="w-5 h-5 text-blue-700 dark:text-blue-500" />
                  </div>
                  <span className="font-black text-lg">Dashboard</span>
                </Link>
                {navLinks.slice(1).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 bg-muted flex items-center justify-center rounded-xl shrink-0">
                      <link.icon className="w-5 h-5 text-foreground" />
                    </div>
                    <span className="font-bold text-lg">{link.name}</span>
                  </Link>
                ))}
                <div className="h-px bg-border/50 my-2 mx-4" />
                <Link
                  href="/dashboard/admin/settings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-muted/50 transition-colors active:scale-[0.98] mt-2"
                >
                  <div className="w-10 h-10 bg-muted flex items-center justify-center rounded-xl shrink-0">
                    <Settings className="w-5 h-5 text-foreground" />
                  </div>
                  <span className="font-bold text-lg">Settings</span>
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-4 p-4 rounded-2xl hover:bg-destructive/10 text-destructive transition-colors active:scale-[0.98]"
                >
                  <div className="w-10 h-10 bg-destructive/10 flex items-center justify-center rounded-xl shrink-0">
                    <LogOut className="w-5 h-5 text-destructive" />
                  </div>
                  <span className="font-bold text-lg">Log out</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}