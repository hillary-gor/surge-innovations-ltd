"use client";

import Image from "next/image";
import Link from "next/link";
import { ModeToggle } from "@/components/layout/mode-toggle";

const logoUrl =
  "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/logos/Surge%20Dark%20Bg%20Logo.png";

const poweredByLogo =
  "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/logos/surge-rectandular-logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 px-4 sm:px-6 lg:px-8 py-8 mt-auto">
      <div className="max-w-7xl mx-auto">
        {/* Top grid (compact) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-8">
          {/* Logo + tagline */}
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Image
                src={logoUrl}
                alt="Surge"
                width={80}
                height={80}
                className="h-10 w-auto"
              />
              <h3 className="font-semibold text-foreground text-sm">
                Surge Connect
              </h3>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-50">
              Connecting families with trusted caregivers and medical
              professionals.
            </p>
          </div>

          {/* Clients */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-xs uppercase tracking-wider">
              For Clients
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/search"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Find Caregivers
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  How It Works
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Caregivers */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-xs uppercase tracking-wider">
              For Caregivers
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/signup/caregiver"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Join as Caregiver
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-3 text-xs uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <a
                  href="mailto:support@Surgeconnect.com"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom (very thin) */}
        <div className="border-t border-border pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
            <p>© 2025 Surge Connect. All rights reserved.</p>

            <div className="flex items-center gap-6">
              {/* Mode Toggle Here */}
              <ModeToggle />

              <div className="flex items-center gap-2">
                <span className="opacity-70">Powered by</span>
                <Link
                  href="https://surgeinnovations.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={poweredByLogo}
                    alt="Surge"
                    width={70}
                    height={70}
                    className="h-4 w-auto object-contain cursor-pointer"
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}