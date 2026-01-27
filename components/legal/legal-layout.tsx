import React from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  FileText, 
  Shield, 
  Mail, 
  Info, 
  ExternalLink, 
  CreditCard, 
  Cookie 
} from "lucide-react";

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
  tableOfContents?: { id: string; label: string }[];
}

export function LegalLayout({
  children,
  title,
  lastUpdated,
  tableOfContents,
}: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans antialiased">
      {/* Header / Breadcrumb */}
      <div className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-350 mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>
          <span className="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-1 rounded border border-border">
            Last updated: {lastUpdated}
          </span>
        </div>
      </div>

      <div className="max-w-350 mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3">
            <nav className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-4">
              <p className="px-3 pb-3 text-xs font-bold text-muted-foreground uppercase tracking-wider">
                On this page
              </p>
              <div className="space-y-1">
                {tableOfContents?.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block px-3 py-2 text-sm text-muted-foreground hover:text-primary hover:bg-primary/5 rounded-md transition-all border-l-2 border-transparent hover:border-primary truncate"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>
          </aside>

          {/* MIDDLE COLUMN: Main Content */}
          <main className="lg:col-span-6">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground mb-8">
              {title}
            </h1>
            
            <div className="prose prose-lg max-w-none 
              prose-headings:text-foreground prose-headings:font-bold prose-headings:scroll-mt-24
              prose-p:text-muted-foreground prose-li:text-muted-foreground
              prose-strong:text-foreground prose-strong:font-semibold
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline
              prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground">
              {children}
            </div>
          </main>

          {/* RIGHT COLUMN: Quick Links & Support */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-24 space-y-6">
              
              <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 flex items-center">
                  <FileText className="w-3 h-3 mr-2 text-primary" />
                  Legal Documents
                </h3>
                <nav className="space-y-1">
                  <NavLink href="/terms" active={title.includes("Terms")} icon={FileText} label="Terms of Service" />
                  <NavLink href="/privacy" active={title.includes("Privacy")} icon={Shield} label="Privacy Policy" />
                  <NavLink href="/refund-policy" active={title.includes("Refund")} icon={CreditCard} label="Refund Policy" />
                  <NavLink href="/cookies" active={title.includes("Cookie")} icon={Cookie} label="Cookie Policy" />
                </nav>
              </div>

              {/* Support Card */}
              <div className="bg-card rounded-xl p-5 border border-border shadow-sm">
                <h3 className="text-xs font-bold text-foreground uppercase tracking-wider mb-4 flex items-center">
                  <Info className="w-3 h-3 mr-2 text-primary" />
                  Help Center
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link href="/contact" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                      <Mail className="w-4 h-4 mr-3 opacity-70" />
                      Contact Legal Team
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
                      <ExternalLink className="w-4 h-4 mr-3 opacity-70" />
                      About Surge
                    </Link>
                  </li>
                </ul>
                <div className="mt-5 pt-5 border-t border-border">
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Have a contract question? <br/>
                    <Link href="/contact" className="text-primary hover:underline">Get in touch with support</Link>
                  </p>
                </div>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

function NavLink({ 
  href, 
  active, 
  icon: Icon, 
  label 
}: { 
  href: string; 
  active: boolean; 
  icon: React.ElementType; 
  label: string 
}) {
  return (
    <Link 
      href={href} 
      className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-colors 
        ${active 
          ? "bg-primary/10 text-primary font-medium" 
          : "text-muted-foreground hover:bg-muted hover:text-foreground"
        }`}
    >
      <Icon className="w-4 h-4 mr-3 opacity-70" />
      {label}
      {active && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
    </Link>
  )
}