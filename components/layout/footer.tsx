import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  Github, 
  Linkedin, 
  Twitter, 
  MapPin, 
  Mail 
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // REDUCED HEIGHT: Changed pt-16 to pt-10 and pb-8 to pb-6
    <footer className="border-t border-border/50 bg-muted/30 pt-10 pb-6">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* TOP SECTION: Grid Layout */}
        {/* REDUCED GAP: Changed gap-12 mb-16 to gap-8 mb-10 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
          
          {/* Column 1: Brand & Bio */}
          <div className="space-y-4">
            <Link href="/" className="block">
              <Image
                src="/logo/surge-rectandular-logo.png"
                alt="Surge Innovations"
                width={120}
                height={35}
                className="h-8 w-auto opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
              Strategy, Code & Scalable Impact. Transforming businesses through digital excellence.
            </p>
            <div className="flex gap-3 pt-1">
              <SocialLink href="#" icon={Linkedin} />
              <SocialLink href="#" icon={Twitter} />
              <SocialLink href="#" icon={Github} />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-3">Company</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/projects">Case Studies</FooterLink>
              <FooterLink href="/join-team">Careers / Join Team</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-3">Contact</h3>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="h-3.5 w-3.5 mt-0.5 text-primary" />
                <span>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-3.5 w-3.5 text-primary" />
                <a href="mailto:hello@surgeinnovations.org" className="hover:text-foreground transition-colors">
                  hello@surgeinnovations.org
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: CTA */}
          <div className="flex flex-col gap-3">
            <h3 className="font-semibold text-foreground text-sm">Start a Project</h3>
            <Button asChild className="w-full sm:w-auto h-9 text-xs">
              <Link href="/contact">
                <Calendar className="h-3.5 w-3.5 mr-2" />
                Schedule Visit
              </Link>
            </Button>
          </div>
        </div>

        {/* BOTTOM SECTION: Copyright & Legal */}
        <div className="border-t border-border pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] md:text-xs text-muted-foreground">
          <p>© {currentYear} Surge Innovations Ltd.</p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/cookies" className="hover:text-foreground transition-colors">Cookies</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="hover:text-primary transition-colors block py-0.5">
        {children}
      </Link>
    </li>
  );
}

function SocialLink({ href, icon: Icon }: { href: string; icon: React.ElementType }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noreferrer"
      className="bg-background border border-border p-1.5 rounded-full hover:bg-muted hover:text-foreground transition-colors text-muted-foreground"
    >
      <Icon className="h-3.5 w-3.5" />
    </a>
  );
}