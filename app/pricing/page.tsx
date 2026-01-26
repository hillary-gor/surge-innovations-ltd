"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  Info,
  Globe,
  ChevronDown,
  ArrowRight,
  ShieldCheck,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// --- CONFIGURATION ---
type CurrencyCode = "USD" | "KES" | "GBP" | "EUR";

const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; label: string; flag: string }
> = {
  USD: { symbol: "$", label: "USD - US Dollar", flag: "🇺🇸" },
  KES: { symbol: "KES", label: "KES - Kenya Shilling", flag: "🇰🇪" },
  GBP: { symbol: "£", label: "GBP - British Pound", flag: "🇬🇧" },
  EUR: { symbol: "€", label: "EUR - Euro", flag: "🇪🇺" },
};

// Eurozone countries mapping
const EURO_COUNTRIES = ["DE", "FR", "IT", "ES", "NL", "BE", "AT", "IE", "FI", "PT", "GR"];

const PRICING_TIERS = {
  starter: { USD: "129", KES: "16,000", GBP: "99", EUR: "119" },
  premium: { USD: "299", KES: "35,000", GBP: "249", EUR: "279" },
  platinum: { USD: "699", KES: "85,000", GBP: "549", EUR: "649" },
};

export default function PricingPage() {
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  // Automatic Location Detection
  useEffect(() => {
    const detectLocation = async () => {
      try {
        // We use a free IP lookup service (ipapi.co or similar)
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const countryCode = data.country_code; // e.g., "KE", "US", "GB"

        if (countryCode === "KE") {
          setCurrency("KES");
        } else if (countryCode === "GB") {
          setCurrency("GBP");
        } else if (EURO_COUNTRIES.includes(countryCode)) {
          setCurrency("EUR");
        } else {
          // Default to USD for everywhere else
          setCurrency("USD");
        }
      } catch (error) {
        console.error("Failed to auto-detect location:", error);
        // Fallback silently to USD default
      } finally {
        setIsLoadingLocation(false);
      }
    };

    detectLocation();
  }, []);

  const plans = [
    {
      id: "starter",
      name: "Business Starter",
      description: "Foundational infrastructure for Startups & SMEs",
      price: PRICING_TIERS.starter[currency],
      period: "/ year",
      features: [
        "High-Performance Next.js Hosting",
        "1 GB Managed Cloud Storage",
        "Free .co.ke/.com Domain Renewal",
        "SSL Encryption & Basic Firewall",
        "Daily Database Backups",
        "Quarterly Security Patching",
        "Email Support (48hr Resolution)",
      ],
      cta: "View Starter Details",
      href: "/pricing/business-starter",
      highlighted: false,
    },
    {
      id: "premium",
      name: "Business Premium",
      description: "For growing companies needing automation & scale",
      price: PRICING_TIERS.premium[currency],
      period: "/ year",
      features: [
        "Everything in Starter",
        "Priority Runtime (Unmetered)",
        "25 GB High-Speed Object Storage",
        "Daily Encrypted Backups (7-day)",
        "Priority Email & WhatsApp Line",
        "Same-Day Critical Response",
        "Quarterly Deep-Dive Health Check",
      ],
      cta: "View Premium Details",
      href: "/pricing/business-premium",
      highlighted: true,
    },
    {
      id: "platinum",
      name: "Corporate Platinum",
      description: "Mission critical infrastructure for Enterprises",
      price: PRICING_TIERS.platinum[currency],
      period: "/ year",
      features: [
        "Everything in Premium",
        "Dedicated Environment (99.99%)",
        "100 GB Enterprise Data Warehousing",
        "Dedicated Technical Lead (Phone)",
        "< 4 Hours Critical Response Time",
        "Annual Penetration Testing",
        "Monthly Content Updates (2 hrs)",
      ],
      cta: "View Corporate Details",
      href: "/pricing/corporate-platinum",
      highlighted: false,
    },
  ];

  const addOns = [
    {
      name: "Mobile App Development",
      description: "Native iOS and Android applications",
    },
    { name: "API Development", description: "Custom REST or GraphQL APIs" },
    { name: "Database Migration", description: "Migrate from legacy systems" },
    {
      name: "Performance Optimization",
      description: "Speed and efficiency improvements",
    },
    {
      name: "Security Audit",
      description: "Comprehensive security assessment",
    },
    {
      name: "Extended Support",
      description: "Additional support hours and SLA",
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-24 md:py-32 bg-linear-to-b from-muted/30 to-background">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-balance">
                  Transparent <span className="text-primary">Global Pricing</span>
                </h1>
                <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                  We waive the heavy development fees in exchange for a long-term
                  partnership. Access a full engineering pod for a fraction of
                  the cost of hiring.
                </p>
              </div>

              {/* Currency Switcher */}
              <div className="flex justify-center items-center gap-3">
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="lg"
                        className="gap-2 rounded-full border-primary/20 bg-background hover:bg-muted/50 transition-all shadow-sm min-w-50 justify-between"
                      >
                        {isLoadingLocation ? (
                          <div className="flex items-center gap-2">
                            <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                            <span className="text-muted-foreground">Detecting...</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4 text-primary" />
                            <span className="font-medium">
                              {CURRENCIES[currency].flag} {CURRENCIES[currency].label}
                            </span>
                          </div>
                        )}
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center" className="w-56">
                      {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                        <DropdownMenuItem
                          key={code}
                          onClick={() => setCurrency(code)}
                          className="gap-3 py-3 cursor-pointer"
                        >
                          <span className="text-lg">{CURRENCIES[code].flag}</span>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {CURRENCIES[code].label}
                            </span>
                          </div>
                          {currency === code && (
                            <Check className="h-4 w-4 ml-auto text-primary" />
                          )}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground animate-in fade-in duration-700">
                <ShieldCheck className="h-3 w-3" />
                <span>
                  {currency === "KES" 
                    ? "Local Payment Methods: M-Pesa & Card accepted" 
                    : "Secure International Payments via Stripe & Flutterwave"}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`relative p-8 rounded-xl border ${
                    plan.highlighted
                      ? "border-primary bg-primary/5 shadow-xl scale-105 z-10"
                      : "border-border bg-card shadow-sm hover:shadow-md"
                  } space-y-6 transition-all flex flex-col`}
                >
                  {plan.highlighted && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-sm">
                      Most Popular
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm h-12 leading-snug">
                      {plan.description}
                    </p>
                  </div>
                  <div className="space-y-1 py-2">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-muted-foreground self-start mt-2">
                        {CURRENCIES[currency].symbol}
                      </span>
                      <span className="text-5xl font-extrabold tracking-tight">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground text-sm font-medium">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground font-medium dark:text-green-400 flex items-center gap-1.5 pt-1">
                      <Check className="h-3 w-3" />
                      Development Fee Waived
                    </p>
                  </div>
                  <div className="w-full h-px bg-border/50" />
                  <ul className="space-y-4 grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="leading-tight text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6 h-12 text-base font-semibold"
                    variant={plan.highlighted ? "default" : "outline"}
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Add-ons */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                Additional Services
              </h2>
              <p className="text-lg text-muted-foreground">
                Enhance your platform with these optional add-ons
              </p>
            </div>
            <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
              {addOns.map((addon, index) => (
                <div
                  key={index}
                  className="p-6 bg-card rounded-xl border border-border shadow-sm hover:border-primary/30 transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-2">{addon.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {addon.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Critical Terms & FAQ
                </h2>
              </div>
              <div className="space-y-6">
                {[
                  {
                    q: "Why is the development fee waived?",
                    a: "We operate on a 'Strategic Partnership' model. Instead of charging huge upfront fees (e.g., $2,500 - $10,000), we invest in your build and recover costs through the annual infrastructure license.",
                  },
                  {
                    q: "What happens if I miss a renewal payment?",
                    a: "Service continuity is automated. If payment is not received by the due date, the system automatically suspends the instance. A reinstatement fee applies to re-deploy the server from cold storage.",
                  },
                  {
                    q: "Who owns the data?",
                    a: "You do. Upon full payment of the annual fee, the Client retains 100% ownership of all customer data, database records, and uploaded files. We claim no IP rights over your business data.",
                  },
                  {
                    q: "Can I pay in my local currency?",
                    a: "Yes. Our payment processor (Flutterwave/Stripe) automatically handles currency conversion. The prices above are set estimates for your region.",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="space-y-3 bg-card p-6 rounded-xl border border-border/50 shadow-sm"
                  >
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary shrink-0" />
                      {item.q}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed pl-7 text-sm">
                      {item.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Discuss Your Project?
              </h2>
              <p className="text-lg text-muted-foreground">
                Schedule a free consultation to get a custom quote tailored to
                your needs.
              </p>
              <div className="flex justify-center gap-4">
                <Button size="lg" className="h-12 px-8 text-base" asChild>
                  <Link href="/contact">
                    Get a Custom Quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}