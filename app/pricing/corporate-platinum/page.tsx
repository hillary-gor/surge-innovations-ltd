"use client";

import React, { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  Cpu,
  HardDrive,
  Users,
  ShieldAlert,
  AlertTriangle,
  FileCheck,
  Building2,
  PhoneCall,
  ArrowRight,
  X,
  Globe,
  ChevronDown,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  PricingExplainerSection,
  CURRENCIES,
  PRICING_DATA,
  type CurrencyCode,
} from "../pricing-explainer-section";

const EURO_COUNTRIES = ["DE", "FR", "IT", "ES", "NL", "BE", "AT", "IE", "FI", "PT", "GR"];

function PackageComparisonModal({
  isOpen,
  onClose,
  currency,
}: {
  isOpen: boolean;
  onClose: () => void;
  currency: CurrencyCode;
}) {
  if (!isOpen) return null;

  const PLANS = [
    {
      name: "Business Starter",
      description: "Foundational infrastructure for Startups & SMEs",
      price: `${CURRENCIES[currency].symbol} ${PRICING_DATA.starter[currency]}`,
      period: "/ year",
      features: [
        "High-Performance Next.js Hosting",
        "1 GB Managed Cloud Storage",
        "Free .co.ke/.com Domain Renewal",
        "SSL Encryption & Basic Firewall",
      ],
      cta: "View Starter Details",
      href: "/pricing/business-starter",
      highlighted: false,
      current: false,
    },
    {
      name: "Business Premium",
      description: "For growing companies needing automation & scale",
      price: `${CURRENCIES[currency].symbol} ${PRICING_DATA.premium[currency]}`,
      period: "/ year",
      features: [
        "Priority Runtime (Unmetered Bandwidth)",
        "25 GB High-Speed Object Storage",
        "Daily Encrypted Backups (7-day retention)",
        "Priority Email & WhatsApp Line",
        "Same-Day Critical Response",
      ],
      cta: "View Premium Details",
      href: "/pricing/business-premium",
      highlighted: false,
      current: false,
    },
    {
      name: "Corporate Platinum",
      description: "Mission critical infrastructure for Enterprises",
      price: `${CURRENCIES[currency].symbol} ${PRICING_DATA.platinum[currency]}`,
      period: "/ year",
      features: [
        "Dedicated Environment (99.99% Uptime)",
        "100 GB Enterprise Data Warehousing",
        "Dedicated Technical Lead (Direct Phone)",
        "< 4 Hours Critical Response Time",
        "Annual Penetration Testing",
      ],
      cta: "Current Selection",
      href: "#",
      highlighted: true,
      current: true,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="relative w-full max-w-6xl bg-card border border-border rounded-xl shadow-2xl max-h-[90vh] overflow-y-auto flex flex-col animate-in fade-in zoom-in-95 duration-200">
        <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 border-b border-border bg-card/95 backdrop-blur">
          <div>
            <h2 className="text-lg font-bold">Compare Packages</h2>
            <p className="text-sm text-muted-foreground">
              Find the right infrastructure for your stage of growth.
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-6 rounded-xl border ${
                plan.highlighted
                  ? "border-primary bg-primary/5 shadow-md"
                  : plan.current
                  ? "border-green-500/50 bg-green-500/5"
                  : "border-border bg-card"
              }`}
            >
              {plan.highlighted && !plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  Recommended
                </div>
              )}
              {plan.current && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-green-600 text-white text-xs font-medium">
                  Viewing Now
                </div>
              )}

              <div className="mb-6 space-y-2">
                <h3 className="text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground min-h-[40px]">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground text-sm">
                    {plan.period}
                  </span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-sm">
                    <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={
                  plan.current
                    ? "outline"
                    : plan.highlighted
                    ? "default"
                    : "secondary"
                }
                className="w-full"
                asChild={!plan.current}
                disabled={plan.current}
              >
                {plan.current ? (
                  <span>Selected</span>
                ) : (
                  <Link href={plan.href}>{plan.cta}</Link>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CorporatePlatinumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>("USD");
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        const countryCode = data.country_code;

        if (countryCode === "KE") {
          setCurrency("KES");
        } else if (countryCode === "GB") {
          setCurrency("GBP");
        } else if (EURO_COUNTRIES.includes(countryCode)) {
          setCurrency("EUR");
        } else {
          setCurrency("USD");
        }
      } catch (error) {
        console.error("Failed to auto-detect location:", error);
      } finally {
        setIsLoadingLocation(false);
      }
    };

    detectLocation();
  }, []);

  const symbol = CURRENCIES[currency].symbol;

  return (
    <>
      <Navigation />
      <PackageComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        currency={currency}
      />

      <main className="min-h-screen pt-16 overflow-x-hidden">
        
        {/* Header / Hero */}
        <section className="bg-slate-950 text-white py-16 md:py-24 border-b border-white/10 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute right-0 top-0 h-[500px] w-[500px] bg-blue-600 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute left-0 bottom-0 h-[300px] w-[300px] bg-purple-600 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-200 border border-blue-500/30 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <Building2 className="h-3 w-3" /> Status: Active
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-slate-200 border border-white/10 text-xs font-bold uppercase tracking-wider">
                    Cycle: Annual
                  </span>
                  
                  <div className="md:hidden">
                     {isLoadingLocation ? (
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                      ) : (
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                           <Globe className="h-3 w-3" /> {CURRENCIES[currency].label}
                        </span>
                      )}
                  </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Corporate Platinum Tier
                </h1>
                <p className="text-xl text-slate-300 leading-relaxed">
                  Our "Mission Critical" infrastructure package. Designed for established organizations requiring maximum performance, data warehousing, and white-glove support.
                </p>
                <div className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                  <FileCheck className="h-4 w-4" />
                  Target: Large Enterprises & High-Volume Operations
                </div>
              </div>
              
              <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 shadow-2xl min-w-[300px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-white/10 to-transparent"></div>
                
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm text-slate-400 font-medium">Annual Investment</p>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="sm" className="h-8 gap-1 px-2 text-xs border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white">
                          {isLoadingLocation ? (
                             <Loader2 className="h-3 w-3 animate-spin" />
                          ) : (
                             <>
                              {CURRENCIES[currency].flag} {currency} <ChevronDown className="h-3 w-3" />
                             </>
                          )}
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-slate-900 border-slate-700 text-slate-200">
                        {(Object.keys(CURRENCIES) as CurrencyCode[]).map((code) => (
                          <DropdownMenuItem 
                            key={code} 
                            onClick={() => setCurrency(code)}
                            className="focus:bg-slate-800 focus:text-white cursor-pointer"
                          >
                            <span className="mr-2">{CURRENCIES[code].flag}</span> {CURRENCIES[code].label}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold text-white">
                    {symbol} {PRICING_DATA.platinum[currency]}
                  </span>
                  <span className="text-slate-400">/ yr</span>
                </div>
                <div className="mt-4 space-y-3">
                  <Button className="w-full bg-white text-slate-950 hover:bg-slate-200" size="lg" asChild>
                    <Link href="/contact">Contact Strategy Team</Link>
                  </Button>
                  <p className="text-xs text-center text-slate-500">
                    Includes 100% Development Subsidy
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Explainer Section */}
        <PricingExplainerSection tier="platinum" currency={currency} />

        {/* Valuation Table */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
            <div className="space-y-6">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold">Development & Deployment Valuation</h2>
                <p className="text-muted-foreground">
                  To support your organization's digital strategy, we have subsidized the heavy lifting of the initial build.
                </p>
              </div>

              <div className="border border-border rounded-lg overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-muted-foreground font-medium">
                    <tr>
                      <th className="p-4">Service Item</th>
                      <th className="p-4 hidden md:table-cell">Standard Valuation</th>
                      <th className="p-4 text-right">Your Cost</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-card">
                      <td className="p-4 font-medium">
                        Enterprise App Development
                        <span className="block text-xs text-muted-foreground font-normal mt-1">Full Stack Custom Build</span>
                      </td>
                      <td className="p-4 text-muted-foreground line-through decoration-red-500 decoration-2 hidden md:table-cell">
                        {symbol} {PRICING_DATA.val_platinum_dev[currency]}
                      </td>
                      <td className="p-4 text-right font-bold text-green-600">
                        {symbol} 0.00
                      </td>
                    </tr>
                    <tr className="bg-card">
                      <td className="p-4 font-medium">Server Architecture & Database Setup</td>
                      <td className="p-4 text-muted-foreground line-through decoration-red-500 decoration-2 hidden md:table-cell">
                        {symbol} {PRICING_DATA.val_platinum_arch[currency]}
                      </td>
                      <td className="p-4 text-right font-bold text-green-600">
                        {symbol} 0.00
                      </td>
                    </tr>
                    <tr className="bg-card">
                      <td className="p-4 font-medium">Annual Enterprise Infrastructure Fee</td>
                      <td className="p-4 text-muted-foreground hidden md:table-cell">
                        {symbol} {PRICING_DATA.platinum[currency]}
                      </td>
                      <td className="p-4 text-right font-bold">
                        {symbol} {PRICING_DATA.platinum[currency]}
                      </td>
                    </tr>
                    <tr className="bg-slate-900 text-white border-t-2 border-slate-900">
                      <td className="p-4 font-bold text-lg">TOTAL DUE</td>
                      <td className="p-4 text-slate-400 line-through hidden md:table-cell">
                        {symbol} {PRICING_DATA.val_platinum_total[currency]}
                      </td>
                      <td className="p-4 text-right font-bold text-xl">
                        {symbol} {PRICING_DATA.platinum[currency]}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground bg-muted/30 p-4 rounded-lg border border-border/50">
                <strong>Note:</strong> The 100% Development Subsidy applies exclusively to the initial build.
              </p>
            </div>
          </div>
        </section>

        {/* Detailed Inclusions (Static Content) */}
        <section className="py-16 bg-muted/20">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12">Detailed Service Inclusions</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Feature 1 */}
              <div className="bg-card p-6 rounded-xl border border-border space-y-4 shadow-sm">
                <div className="h-10 w-10 bg-blue-900 text-white rounded-lg flex items-center justify-center">
                  <Cpu className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">1. Dedicated Performance Environment</h3>
                <p className="text-muted-foreground text-sm">
                  Your application runs on our highest-tier availability zone with dedicated resources.
                </p>
                <ul className="space-y-2 text-sm pt-2">
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0"/> <span><strong>Engine:</strong> Next.js SSR with Dedicated CPU/RAM</span></li>
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0"/> <span><strong>SLA:</strong> 99.99% Uptime Guarantee</span></li>
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0"/> <span><strong>Traffic:</strong> Unmetered & Prioritized</span></li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div className="bg-card p-6 rounded-xl border border-border space-y-4 shadow-sm">
                <div className="h-10 w-10 bg-slate-700 text-white rounded-lg flex items-center justify-center">
                  <HardDrive className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">2. Enterprise Storage (Data Warehousing)</h3>
                <p className="text-muted-foreground text-sm">
                   Transforms your app into a central hub for massive archiving and media libraries.
                </p>
                <ul className="space-y-2 text-sm pt-2">
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0"/> <span><strong>Capacity:</strong> 100 GB Secure Object Storage</span></li>
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0"/> <span><strong>Use Case:</strong> Massive archiving & internal backups</span></li>
                  <li className="flex gap-2"><Check className="h-4 w-4 text-primary shrink-0"/> <span><strong>Redundancy:</strong> Multi-node replication</span></li>
                </ul>
              </div>

              {/* Feature 3 (Highlighted) */}
              <div className="bg-slate-900 text-white p-6 rounded-xl border border-slate-700 space-y-4 md:col-span-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-5">
                   <Users className="h-40 w-40" />
                </div>
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                  <div className="space-y-4 flex-1">
                    <div className="h-10 w-10 bg-white text-slate-900 rounded-lg flex items-center justify-center">
                      <PhoneCall className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold">3. "White Glove" Support & Maintenance</h3>
                    <p className="text-slate-300 text-sm">
                      Direct access to senior engineering. No ticketing queues for urgent issues.
                    </p>
                    <ul className="space-y-2 text-sm pt-2 text-slate-200">
                      <li className="flex gap-2"><Check className="h-4 w-4 text-white shrink-0"/> <span><strong>Direct Access:</strong> Dedicated Technical Lead (WhatsApp/Phone)</span></li>
                      <li className="flex gap-2"><Check className="h-4 w-4 text-white shrink-0"/> <span><strong>Response Time:</strong> &lt; 4 Hours for critical issues</span></li>
                    </ul>
                  </div>
                  <div className="bg-white/10 p-4 rounded-lg border border-white/10 flex-1 text-sm leading-relaxed flex flex-col justify-center">
                    <p className="font-bold mb-2 flex items-center gap-2 text-white">🎁 Bonus Inclusion:</p>
                    <p className="text-slate-300 italic">
                      "Includes up to <strong>2 hours per month</strong> of minor content updates (e.g., changing a banner, updating a phone number, or replacing a team member photo) at no extra cost."
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature 4 */}
              <div className="bg-card p-6 rounded-xl border border-border space-y-4 md:col-span-2">
                <div className="h-10 w-10 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold">4. Advanced Security Suite</h3>
                <div className="grid md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Penetration Testing</h4>
                    <p className="text-xs text-muted-foreground">Annual vulnerability scanning of your application.</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Audit Logs</h4>
                    <p className="text-xs text-muted-foreground">Track who logged in and when (essential for audits).</p>
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-medium text-sm">Off-Site Backups</h4>
                    <p className="text-xs text-muted-foreground">Daily backups retained for 30 days.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Cost Transparency */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">Transparent Cost Breakdown</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              How your {symbol} {PRICING_DATA.platinum[currency]} investment is utilized for mission-critical operations:
            </p>
            
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 bg-slate-100 dark:bg-slate-800 text-xs font-medium text-muted-foreground p-3 uppercase tracking-wider">
                <div className="col-span-4 md:col-span-3">Cost Center</div>
                <div className="col-span-5 md:col-span-6">Description</div>
                <div className="col-span-3 text-right">Allocation</div>
              </div>
              <div className="divide-y divide-border text-sm">
                {[
                  { name: "Dedicated Resources", desc: "High-availability server environment", cost: `${symbol} ${PRICING_DATA.bd_resources[currency]}` },
                  { name: "Enterprise Storage", desc: "100GB Redundant Cloud Storage", cost: `${symbol} ${PRICING_DATA.bd_storage_plat[currency]}` },
                  { name: "Security & Compliance", desc: "Pen-testing, SSL, Audit Logging", cost: `${symbol} ${PRICING_DATA.bd_security_plat[currency]}` },
                  { name: "Support Retainer", desc: "Priority SLAs & Monthly Content Updates", cost: `${symbol} ${PRICING_DATA.bd_support_plat[currency]}` },
                  { name: "Admin & Domain", desc: "Registry Fees & Account Management", cost: `${symbol} ${PRICING_DATA.bd_admin_plat[currency]}` },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-12 p-4 items-center">
                    <div className="col-span-4 md:col-span-3 font-medium">{item.name}</div>
                    <div className="col-span-5 md:col-span-6 text-muted-foreground text-xs md:text-sm">{item.desc}</div>
                    <div className="col-span-3 text-right font-mono text-muted-foreground">{item.cost}</div>
                  </div>
                ))}
                <div className="grid grid-cols-12 p-4 bg-slate-900 text-white font-bold">
                  <div className="col-span-9">TOTAL</div>
                  <div className="col-span-3 text-right">{symbol} {PRICING_DATA.platinum[currency]}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Critical Terms */}
        <section className="py-16 bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <h2 className="text-2xl font-bold">Critical Terms & Conditions</h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Term 1 */}
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-3">1. Reinstatement Fee</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Service continuity is automated. If the annual renewal fee is not received by the due date, the system automatically suspends the instance.
                </p>
                <div className="bg-muted/50 p-3 rounded border-l-4 border-amber-500 text-xs italic text-muted-foreground">
                  "If service is suspended due to non-payment, a {symbol} {PRICING_DATA.fee_reinstatement[currency]} Reinstatement Fee will be charged to re-deploy the server and restore data from cold storage."
                </div>
              </div>

              {/* Term 2 */}
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-3">2. Data Ownership & Rights</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We respect your intellectual property. You are paying for the tool, and you own what you put inside it.
                </p>
                <div className="bg-muted/50 p-3 rounded border-l-4 border-green-500 text-xs italic text-muted-foreground">
                  "Upon full payment of the annual fee, the Client retains 100% ownership of all customer data... The Provider (Us) claims no intellectual property rights."
                </div>
              </div>

              {/* Term 3 (NDA - Exclusive to Platinum) */}
              <div className="bg-card p-6 rounded-lg border border-border shadow-sm md:col-span-2">
                <h3 className="font-bold text-lg mb-3">3. Confidentiality (NDA)</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We understand that Enterprise clients store sensitive data.
                </p>
                <div className="bg-slate-900 text-white p-4 rounded border-l-4 border-blue-500 text-sm italic">
                  "We agree to treat all stored data as strictly confidential and will not disclose it to third parties unless required by Kenyan Law."
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Strategy?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Book a session with our Lead Architect to discuss your enterprise requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="h-12 px-8 bg-slate-900 text-white hover:bg-slate-800" asChild>
                <Link href="/contact">Book Strategy Call <ArrowRight className="ml-2 h-4 w-4"/></Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="h-12 px-8" 
                onClick={() => setIsModalOpen(true)}
              >
                Compare Other Plans
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}