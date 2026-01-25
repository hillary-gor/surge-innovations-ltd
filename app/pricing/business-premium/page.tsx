"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Check,
  Server,
  Shield,
  Cloud,
  Wrench,
  AlertTriangle,
  Info,
  ArrowRight,
  X,
  Package,
  Star,
} from "lucide-react";
import Link from "next/link";

const PLANS = [
  {
    name: "Business Starter",
    description: "Foundational infrastructure for Startups & SMEs",
    price: "KES 16,000",
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
    price: "KES 35,000",
    period: "/ year",
    features: [
      "Priority Runtime (Unmetered Bandwidth)",
      "25 GB High-Speed Object Storage",
      "Daily Encrypted Backups (7-day retention)",
      "Priority Email & WhatsApp Line",
      "Same-Day Critical Response",
    ],
    cta: "Current Selection",
    href: "#",
    highlighted: true,
    current: true,
  },
  {
    name: "Corporate Platinum",
    description: "Mission critical infrastructure for Enterprises",
    price: "KES 85,000",
    period: "/ year",
    features: [
      "Dedicated Environment (99.99% Uptime)",
      "100 GB Enterprise Data Warehousing",
      "Dedicated Technical Lead (Direct Phone)",
      "< 4 Hours Critical Response Time",
      "Annual Penetration Testing",
    ],
    cta: "View Corporate Details",
    href: "/pricing/corporate-platinum",
    highlighted: false,
    current: false,
  },
];

function PackageComparisonModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  if (!isOpen) return null;

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

export default function BusinessPremiumPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Navigation />
      <PackageComparisonModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />

      <main className="min-h-screen pt-16 overflow-x-hidden">
        <section className="bg-gradient-to-b from-muted/50 to-background py-16 md:py-24 border-b border-border/50">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="space-y-6 max-w-2xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-blue-700 dark:fill-blue-400" />
                    Status: Active
                  </span>
                  <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 text-xs font-bold uppercase tracking-wider">
                    Cycle: Annual
                  </span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-foreground">
                  Business <span className="text-primary">Premium</span> Tier
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Our most popular package for growing companies. Increased
                  server resources and expanded cloud storage to help you
                  digitize operations and go paperless.
                </p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground bg-background/50 w-fit px-4 py-2 rounded-lg border border-border/50">
                  <Info className="h-4 w-4 text-primary" />
                  Target: Established SMEs & Service Providers
                </div>
              </div>

              <div className="flex flex-col gap-4 w-full md:w-auto">
                <div className="bg-card border border-border rounded-xl p-8 shadow-lg md:min-w-[340px] relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    MOST POPULAR
                  </div>
                  <p className="text-sm text-muted-foreground font-medium uppercase tracking-wide">
                    Annual Investment
                  </p>
                  <div className="flex items-baseline gap-1 mt-4 mb-6">
                    <span className="text-5xl font-bold text-primary tracking-tight">
                      KES 35k
                    </span>
                    <span className="text-muted-foreground font-medium">
                      / year
                    </span>
                  </div>
                  <div className="space-y-4">
                    <Button className="w-full h-12 text-base" size="lg" asChild>
                      <Link href="/contact">Activate Premium</Link>
                    </Button>
                    <p className="text-xs text-center text-muted-foreground bg-muted/50 py-2 rounded">
                      Includes 100% Development Subsidy
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsModalOpen(true)}
                  className="group flex items-center justify-between p-4 bg-background border border-border/60 rounded-xl hover:border-primary/50 hover:shadow-sm transition-all text-left"
                >
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-foreground">
                      Not the right fit?
                    </p>
                    <p className="text-xs text-muted-foreground">
                      View Starter & Corporate plans
                    </p>
                  </div>
                  <div className="h-8 w-8 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Package className="h-4 w-4" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
            <div className="space-y-8">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Development & Deployment Valuation
                </h2>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                  To facilitate your digital transformation, we have applied a
                  strategic subsidy to the initial setup costs.
                </p>
              </div>

              <div className="border border-border rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left text-sm">
                  <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                    <tr>
                      <th className="p-4 md:p-5 w-1/2">Service Item</th>
                      <th className="p-4 md:p-5 hidden md:table-cell text-right">
                        Standard Valuation
                      </th>
                      <th className="p-4 md:p-5 text-right bg-primary/5 text-primary">
                        Your Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr className="bg-card hover:bg-muted/20 transition-colors">
                      <td className="p-4 md:p-5">
                        <span className="font-semibold block text-base">
                          Custom App Development
                        </span>
                        <span className="text-xs text-muted-foreground mt-1 block">
                          UI/UX Design, Frontend Coding, Database Setup
                        </span>
                      </td>
                      <td className="p-4 md:p-5 text-muted-foreground line-through decoration-red-500/50 decoration-2 text-right hidden md:table-cell">
                        KES 120,000
                      </td>
                      <td className="p-4 md:p-5 text-right font-bold text-green-600 bg-green-50/10">
                        KES 0.00
                      </td>
                    </tr>
                    <tr className="bg-card hover:bg-muted/20 transition-colors">
                      <td className="p-4 md:p-5">
                        <span className="font-semibold block text-base">
                          Server Deployment & Config
                        </span>
                      </td>
                      <td className="p-4 md:p-5 text-muted-foreground line-through decoration-red-500/50 decoration-2 text-right hidden md:table-cell">
                        KES 25,000
                      </td>
                      <td className="p-4 md:p-5 text-right font-bold text-green-600 bg-green-50/10">
                        KES 0.00
                      </td>
                    </tr>
                    <tr className="bg-card hover:bg-muted/20 transition-colors">
                      <td className="p-4 md:p-5">
                        <span className="font-semibold block text-base">
                          Annual Infrastructure License
                        </span>
                      </td>
                      <td className="p-4 md:p-5 text-muted-foreground text-right hidden md:table-cell">
                        KES 35,000
                      </td>
                      <td className="p-4 md:p-5 text-right font-bold bg-primary/5">
                        KES 35,000
                      </td>
                    </tr>
                    <tr className="bg-foreground text-background">
                      <td className="p-4 md:p-5 font-bold text-lg">
                        TOTAL DUE
                      </td>
                      <td className="p-4 md:p-5 text-muted-foreground/50 line-through text-right hidden md:table-cell">
                        KES 180,000
                      </td>
                      <td className="p-4 md:p-5 text-right font-bold text-xl text-primary-foreground">
                        KES 35,000
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/20">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-12 text-center md:text-left">
              Detailed Service Inclusions
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                  <Server className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  1. Priority App Hosting
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Allocated resources for higher traffic volumes and faster
                  response times.
                </p>
                <ul className="space-y-3 text-sm">
                  {[
                    { l: "Runtime:", v: "Priority Server-Side Rendering" },
                    { l: "Bandwidth:", v: "Unmetered" },
                    { l: "Uptime:", v: "99.9% Service Level Agreement" },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">{item.l}</strong>{" "}
                        <span className="text-muted-foreground">{item.v}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow">
                <div className="h-12 w-12 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">
                  2. Enhanced Security
                </h3>
                <p className="text-muted-foreground text-sm mb-6">
                  Comprehensive protection for your growing digital assets.
                </p>
                <ul className="space-y-3 text-sm">
                  {[
                    { l: "Identity:", v: "Annual .co.ke or .com renewal" },
                    { l: "Encryption:", v: "Full SSL (HTTPS) Certification" },
                    { l: "Health Check:", v: "Quarterly Deep-Dive Audit" },
                  ].map((item, i) => (
                    <li key={i} className="flex gap-3">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground">{item.l}</strong>{" "}
                        <span className="text-muted-foreground">{item.v}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-1">
                    <div className="h-12 w-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6">
                      <Cloud className="h-6 w-6" />
                    </div>
                    <h3 className="text-xl font-bold mb-2">
                      3. Expanded Cloud Storage
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Significant capacity for digitizing paper records,
                      contracts, and media.
                    </p>
                    <ul className="space-y-3 text-sm">
                      <li className="flex gap-3">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Capacity:</strong>{" "}
                          25 GB High-Speed Object Storage
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                        <span>
                          <strong className="text-foreground">Access:</strong>{" "}
                          Instant Retrieval & CDN Delivery
                        </span>
                      </li>
                    </ul>
                  </div>
                  <div className="flex-1 bg-blue-50/50 dark:bg-blue-900/10 p-6 rounded-xl border border-blue-100 dark:border-blue-900/20 text-sm text-blue-900 dark:text-blue-100 leading-relaxed">
                    <p className="font-semibold mb-3 flex items-center gap-2">
                      <Info className="h-4 w-4" /> Why 25 GB?
                    </p>
                    "25GB allows for the storage of approximately 250,000 PDF
                    documents or 10,000 high-resolution images. This is ideal
                    for businesses moving from physical filing cabinets to
                    digital operations."
                  </div>
                </div>
              </div>

              <div className="bg-card p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow md:col-span-2">
                <div className="h-12 w-12 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6">
                  <Wrench className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-6">
                  4. Priority Maintenance
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      Daily Encrypted Backups
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Automatic snapshots retained for 7 days to ensure business
                      continuity.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      Proactive Patching
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Priority application of security updates to your server
                      environment.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-foreground">
                      Priority Support
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Direct Email & WhatsApp line with Same-Day Critical
                      Response.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-6">
              Transparent Cost Breakdown
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl">
              We believe in full transparency. Here is how your KES 35,000
              investment is utilized:
            </p>

            <div className="border border-border rounded-lg overflow-hidden">
              <div className="grid grid-cols-12 bg-muted/50 text-xs font-bold text-muted-foreground p-4 uppercase tracking-wider">
                <div className="col-span-4 md:col-span-3">Cost Center</div>
                <div className="col-span-5 md:col-span-6">Description</div>
                <div className="col-span-3 text-right">Allocation</div>
              </div>
              <div className="divide-y divide-border text-sm">
                {[
                  {
                    name: "Priority Compute",
                    desc: "Enhanced CPU & RAM Allocation",
                    cost: "KES 15,000",
                  },
                  {
                    name: "Cloud Storage",
                    desc: "25GB High-Availability Storage",
                    cost: "KES 10,000",
                  },
                  {
                    name: "Domain & SSL",
                    desc: "Registry Fees & Security Certificates",
                    cost: "KES 3,000",
                  },
                  {
                    name: "Backup Systems",
                    desc: "Automated Daily Snapshots & Retention",
                    cost: "KES 4,000",
                  },
                  {
                    name: "Support SLA",
                    desc: "Priority Support Access",
                    cost: "KES 3,000",
                  },
                ].map((item, i) => (
                  <div key={i} className="grid grid-cols-12 p-4 items-center">
                    <div className="col-span-4 md:col-span-3 font-semibold text-foreground">
                      {item.name}
                    </div>
                    <div className="col-span-5 md:col-span-6 text-muted-foreground text-xs md:text-sm">
                      {item.desc}
                    </div>
                    <div className="col-span-3 text-right font-mono text-muted-foreground">
                      {item.cost}
                    </div>
                  </div>
                ))}
                <div className="grid grid-cols-12 p-4 bg-primary/5 font-bold">
                  <div className="col-span-9">TOTAL ANNUAL FEE</div>
                  <div className="col-span-3 text-right text-primary text-base">
                    KES 35,000
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-8">
              <AlertTriangle className="h-6 w-6 text-amber-500" />
              <h2 className="text-2xl font-bold">
                Critical Terms & Conditions
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-3">
                  1. Reinstatement Fee
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Service continuity is automated. If the annual renewal fee is
                  not received by the due date, the system automatically
                  suspends the instance.
                </p>
                <div className="bg-amber-50 dark:bg-amber-950/30 p-3 rounded border-l-4 border-amber-500 text-xs italic text-amber-800 dark:text-amber-200">
                  "If service is suspended due to non-payment, a KES 2,500
                  Reinstatement Fee will be charged to re-deploy the server and
                  restore data from cold storage."
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border shadow-sm">
                <h3 className="font-bold text-lg mb-3">
                  2. Data Ownership & Rights
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  We respect your intellectual property. You are paying for the
                  tool, and you own what you put inside it.
                </p>
                <div className="bg-green-50 dark:bg-green-950/30 p-3 rounded border-l-4 border-green-500 text-xs italic text-green-800 dark:text-green-200">
                  "Upon full payment of the annual fee, the Client retains 100%
                  ownership of all customer data... The Provider (Us) claims no
                  intellectual property rights."
                </div>
              </div>

              <div className="bg-card p-6 rounded-xl border border-border shadow-sm md:col-span-2">
                <h3 className="font-bold text-lg mb-3">3. Scope of Support</h3>
                <p className="text-sm text-muted-foreground">
                  This package covers the maintenance of the existing system
                  (keeping it online and secure). It does not cover the
                  development of new features, design changes, or content entry.
                  Such requests are billed hourly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-24">
          <div className="mx-auto w-full max-w-3xl px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to upgrade?</h2>
            <p className="text-muted-foreground mb-8 text-lg">
              Secure your development subsidy and scale your operations today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="h-12 px-8 w-full sm:w-auto" asChild>
                <Link href="/contact">
                  Activate Premium License{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 px-8 w-full sm:w-auto"
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