"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { AuthHeader } from "@/components/layout/AuthHeader";
import { ModeToggle } from "@/components/layout/mode-toggle";
// import NavStatsPulse from "@/components/layout/NavStatsPulse";

const logoUrl =
  "https://zuggwwlcnerirseltooj.supabase.co/storage/v1/object/public/icons-logos/6care-logo-transparent.png";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/jobs-listing", label: "Quick Jobs" },
    { href: "/practitioners-listing", label: "Find a Medic" },
    // { href: "/Shop", label: "Care Equipment" },
    { href: "/about", label: "About Us" },
    { href: "/help", label: "Help & FAQ" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg w-full">
      <div className="w-full px-4 md:px-8">
        <div className="relative flex items-center justify-between h-16">
          
          {/* --- LEFT: LOGO --- */}
          <div className="shrink-0 flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logoUrl}
                alt="6Care"
                width={100}
                height={100}
                className="h-12 w-auto"
                priority
              />
            </Link>
            
            {/* Visible on ALL screens.
            <div className="ml-2">
               <NavStatsPulse />
            </div> */}
          </div>

          {/* --- NAVIGATION --- */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* --- RIGHT: ACTIONS --- */}
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-3">
              <Button variant="ghost" asChild className="hidden lg:flex">
                <Link href="/jobs-listing">
                  Need a Job?
                </Link>
              </Button>
              <ModeToggle />
              <AuthHeader />
            </div>

            {/* Mobile Toggle */}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* --- MOBILE MENU --- */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            {/* MOBILE PULSE: Full width, always visible inside menu
            <div className="pb-2 border-b border-border">
               <p className="text-xs text-muted-foreground mb-2 px-1">Live Platform Stats:</p>
               <NavStatsPulse className="w-full justify-start" />
            </div> */}

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
              <AuthHeader />
              <ModeToggle />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}