"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, Calendar } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { AuthHeader } from "@/components/layout/AuthHeader";

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/case-studies", label: "Case Studies" },
    { href: "/tech-as-a-service", label: "Tech-as-a-Service" },
    { href: "/pricing", label: "Pricing" },
    { href: "/resources", label: "Resources" },
    { href: "/join-team", label: "Join Team" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/surge-logo.png"
              alt="Surge Innovations"
              width={120}
              height={40}
              className="h-8 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* CTA + AuthHeader (right side) */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" asChild>
              <Link href="/schedule-visit">
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Visit
              </Link>
            </Button>

            {/* Auth Header (user avatar / sign in) */}
            <AuthHeader />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t border-border">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button variant="outline" asChild className="w-full bg-transparent">
              <Link
                href="/schedule-visit"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule Visit
              </Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                Contact Us
              </Link>
            </Button>

            {/* AuthHeader in mobile view */}
            <div className="pt-2 border-t border-border">
              <AuthHeader />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
