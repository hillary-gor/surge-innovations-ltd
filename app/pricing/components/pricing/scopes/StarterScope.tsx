"use client";

import { useState } from "react";
import { 
  Layout, 
  FileText, 
  ShieldCheck, 
  Settings, 
  Zap, 
  Smartphone, 
  Search, 
  Lock, 
  MessageCircle, 
  BarChart3,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  MousePointerClick
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function StarterScope() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 md:px-6">
      
      {/* 1. THE TEASER HEADER (Always Visible) */}
      <div className="text-center space-y-6 mb-8">
        <Badge variant="outline" className="px-4 py-1 text-base font-medium border-primary/50 text-primary bg-primary/5">
          Scope of the &apos;Free&apos; Build
        </Badge>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
           What exactly do I get?
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
           Most agencies give you a 5-page template. We build you a <span className="font-semibold text-foreground">20-Page Business Operating System</span> with a private dashboard and custom modules.
        </p>

        {/* 2. THE TOGGLE BUTTON */}
        <div className="flex justify-center">
            <Button 
                onClick={() => setIsOpen(!isOpen)} 
                size="lg" 
                className={`gap-2 text-base h-14 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ${isOpen ? "bg-muted text-foreground hover:bg-muted/80" : "animate-pulse"}`}
                variant={isOpen ? "secondary" : "default"}
            >
                {isOpen ? (
                    <>
                        Close Full Breakdown <ChevronUp className="w-5 h-5" />
                    </>
                ) : (
                    <>
                        <MousePointerClick className="w-5 h-5" /> View Full App Features (20+ Pages) <ChevronDown className="w-5 h-5" />
                    </>
                )}
            </Button>
        </div>
      </div>

      {/* 3. THE COLLAPSIBLE CONTENT */}
      <div className={`grid transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 space-y-16">
            
            {/* --- CONTENT START --- */}
            
            {/* CORE DELIVERABLES GRID */}
            <div className="grid md:grid-cols-2 gap-8 pt-8">
                
                {/* 1. Showroom Pages */}
                <Card className="bg-card/50 border-border/60 hover:border-primary/20 transition-all">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                                <Layout className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">1. Public &quot;Showroom&quot; Pages</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { title: "The 'Hero' Landing Page", desc: "High-impact conversion design" },
                                { title: "About Us / Mission", desc: "Trust & team showcase" },
                                { title: "Services Overview", desc: "Catalog view of offerings" },
                                { title: "Pricing / Packages", desc: "Clear rate tables" },
                                { title: "Contact & Location", desc: "Embedded Map & WhatsApp link" },
                                { title: "FAQ Section", desc: "Automated Q&A" },
                                { title: "Testimonials", desc: "Social proof integration" },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="font-semibold text-foreground">{item.title}:</strong> <span className="text-muted-foreground">{item.desc}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* 2. Dynamic Content */}
                <Card className="bg-card/50 border-border/60 hover:border-primary/20 transition-all">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                                <FileText className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">2. Dynamic Content Templates</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">We build &quot;Templates&quot; that allow you to create unlimited content without paying for new pages.</p>
                        <ul className="space-y-3">
                            {[
                                "Dynamic Service Detail Template",
                                "Blog/News Feed Index",
                                "Single Article Reading View",
                                "Portfolio/Case Study Gallery",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0" />
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* 3. Dashboard */}
                <Card className="bg-card/50 border-border/60 hover:border-primary/20 transition-all">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                                <Settings className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">3. &quot;Command Center&quot; Dashboard</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                { title: "Secure Admin Login", desc: "Encrypted entry point" },
                                { title: "Dashboard Overview", desc: "Performance summary" },
                                { title: "The 'Lead Inbox'", desc: "Private message table" },
                                { title: "Content Manager (CMS)", desc: "Update text/prices yourself" },
                                { title: "Account Settings", desc: "Profile management" },
                            ].map((item, i) => (
                                <li key={i} className="flex gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                                    <span>
                                        <strong className="font-semibold text-foreground">{item.title}:</strong> <span className="text-muted-foreground">{item.desc}</span>
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                {/* 4. Utility Pages */}
                <Card className="bg-card/50 border-border/60 hover:border-primary/20 transition-all">
                    <CardContent className="p-8 space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="p-3 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
                                <ShieldCheck className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold">4. Utility & Legal</h3>
                        </div>
                        <ul className="space-y-3">
                            {[
                                "Privacy Policy (GDPR Compliant)",
                                "Terms of Service",
                                "Custom 404 (Error Page)",
                                "Maintenance Mode Screen",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0" />
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

            </div>

            {/* 5. THE BONUS SECTION */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/10 via-background to-primary/5 border border-primary/20 p-8 md:p-12 text-center">
                <div className="absolute top-0 right-0 p-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
                
                <Badge className="mb-6 bg-primary text-primary-foreground hover:bg-primary/90 text-sm px-3 py-1">
                    Exclusive Bonus
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    The &quot;Your Business is Unique&quot; Bonus
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
                    Standard templates aren&apos;t enough. We differentiate you by building up to <strong className="text-foreground">10 Custom Modules</strong> tailored to your specific industry. You list them, we build them.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-left max-w-4xl mx-auto">
                    {[
                        { label: "Restaurant", val: "Menu + Reservations" },
                        { label: "NGO", val: "Donations + Volunteers" },
                        { label: "Consultant", val: "Booking Calendar" },
                        { label: "Real Estate", val: "Property Grid" },
                        { label: "Recruitment", val: "Job Board + CVs" },
                    ].map((item, i) => (
                        <div key={i} className="bg-background/80 backdrop-blur border border-border p-4 rounded-xl">
                            <div className="text-xs font-bold text-primary uppercase mb-1">{item.label}</div>
                            <div className="text-sm font-medium leading-tight">{item.val}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* TECH SPECS */}
            <div className="space-y-8">
                <h3 className="text-2xl font-bold text-center">Under-The-Hood Tech (Included)</h3>
                <div className="grid md:grid-cols-3 gap-6">
                    {[
                        { icon: Zap, title: "Instant-Load Tech", desc: "Powered by Next.js for blazing fast speeds." },
                        { icon: Smartphone, title: "Mobile-First", desc: "Feels like a native app on all devices." },
                        { icon: Search, title: "Technical SEO", desc: "Auto-generated Sitemaps & Robots.txt." },
                        { icon: Lock, title: "Bank-Grade Security", desc: "Modern encryption (JWT/Auth.js)." },
                        { icon: MessageCircle, title: "WhatsApp Integration", desc: "Direct chat button included." },
                        { icon: BarChart3, title: "Analytics Ready", desc: "Google Analytics pre-installed." },
                    ].map((feat, i) => (
                        <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-muted/50 transition-colors">
                            <feat.icon className="w-8 h-8 text-muted-foreground shrink-0" />
                            <div>
                                <h4 className="font-semibold">{feat.title}</h4>
                                <p className="text-sm text-muted-foreground">{feat.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* FINAL VALUE SUMMARY */}
            <div className="bg-primary text-primary-foreground p-8 rounded-2xl text-center space-y-4">
                <h4 className="text-2xl font-bold">Value Summary</h4>
                <p className="text-lg opacity-90 max-w-2xl mx-auto">
                    You are getting a <span className="font-bold underline decoration-white/30 underline-offset-4">20-Page Custom Application</span>, a Private Dashboard, and Enterprise-Grade Hosting for a flat fee of <span className="font-extrabold bg-white/20 px-2 py-0.5 rounded">KES 16,000 / Year</span>.
                </p>
                <p className="font-medium opacity-80">No development fees. No hourly rates. Just results.</p>
                
                {/* Close Button at bottom to scroll back up/close */}
                <Button 
                    variant="secondary" 
                    onClick={() => {
                        setIsOpen(false);
                        if (typeof window !== "undefined") {
                            window.scrollBy({ top: -300, behavior: "smooth" });
                        }
                    }}
                    className="mt-4"
                >
                    Collapse Section <ChevronUp className="w-4 h-4 ml-2" />
                </Button>
            </div>
            

        </div>
      </div>
    </div>
  );
}