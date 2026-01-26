"use client";

import React from "react";
import {
  Check,
  Server,
  ShieldCheck,
  Users,
  HelpCircle,
  Calculator,
  Activity,
  Lock,
  X,
} from "lucide-react";

export type CurrencyCode = "USD" | "KES" | "GBP" | "EUR";
export type Tier = "starter" | "premium" | "platinum";

export const CURRENCIES: Record<
  CurrencyCode,
  { symbol: string; label: string; flag: string }
> = {
  USD: { symbol: "$", label: "USD", flag: "🇺🇸" },
  KES: { symbol: "KES", label: "KES", flag: "🇰🇪" },
  GBP: { symbol: "£", label: "GBP", flag: "🇬🇧" },
  EUR: { symbol: "€", label: "EUR", flag: "🇪🇺" },
};

export const PRICING_DATA = {
  // --- Plan Prices ---
  starter: { USD: "129", KES: "16,000", GBP: "99", EUR: "119" },
  premium: { USD: "299", KES: "35,000", GBP: "249", EUR: "279" },
  platinum: { USD: "699", KES: "85,000", GBP: "549", EUR: "649" },

  // --- Valuation: Starter ---
  val_dev: { USD: "699", KES: "85,000", GBP: "549", EUR: "649" },
  val_setup: { USD: "125", KES: "15,000", GBP: "99", EUR: "115" },
  val_total: { USD: "953", KES: "116,000", GBP: "747", EUR: "883" },

  // --- Valuation: Premium ---
  val_premium_dev: { USD: "999", KES: "120,000", GBP: "799", EUR: "929" },
  val_premium_total: { USD: "1,497", KES: "180,000", GBP: "1,207", EUR: "1,397" },

  // --- Valuation: Platinum ---
  val_platinum_dev: { USD: "2,500", KES: "250,000", GBP: "1,950", EUR: "2,300" },
  val_platinum_arch: { USD: "450", KES: "45,000", GBP: "350", EUR: "415" },
  val_platinum_total: { USD: "3,649", KES: "380,000", GBP: "2,849", EUR: "3,364" },

  // --- Cost Breakdown: Starter ---
  bd_runtime: { USD: "60", KES: "7,500", GBP: "45", EUR: "55" },
  bd_storage: { USD: "25", KES: "3,000", GBP: "20", EUR: "23" },
  bd_domain: { USD: "16", KES: "2,000", GBP: "12", EUR: "15" },
  bd_security: { USD: "12", KES: "1,500", GBP: "10", EUR: "11" },
  bd_admin: { USD: "16", KES: "2,000", GBP: "12", EUR: "15" },

  // --- Cost Breakdown: Premium ---
  bd_compute: { USD: "129", KES: "15,000", GBP: "109", EUR: "119" },
  bd_storage_prem: { USD: "85", KES: "10,000", GBP: "69", EUR: "79" },
  bd_domain_prem: { USD: "25", KES: "3,000", GBP: "20", EUR: "25" },
  bd_backup: { USD: "35", KES: "4,000", GBP: "28", EUR: "32" },
  bd_support: { USD: "25", KES: "3,000", GBP: "23", EUR: "24" },

  // --- Cost Breakdown: Platinum ---
  bd_resources: { USD: "205", KES: "25,000", GBP: "160", EUR: "190" },
  bd_storage_plat: { USD: "245", KES: "30,000", GBP: "195", EUR: "229" },
  bd_security_plat: { USD: "80", KES: "10,000", GBP: "65", EUR: "75" },
  bd_support_plat: { USD: "125", KES: "15,000", GBP: "95", EUR: "115" },
  bd_admin_plat: { USD: "44", KES: "5,000", GBP: "34", EUR: "40" },

  // --- Terms ---
  fee_reinstatement: { USD: "20", KES: "2,500", GBP: "15", EUR: "18" },

  // --- Hiring Math ---
  hiring_salary: { USD: "800", KES: "80,000", GBP: "600", EUR: "750" },
  hiring_equipment: { USD: "1,500", KES: "150,000", GBP: "1,200", EUR: "1,400" },
  hiring_total: { USD: "15,000", KES: "1,200,000", GBP: "12,000", EUR: "14,000" },
};

interface PricingExplainerSectionProps {
  tier: Tier;
  currency: CurrencyCode;
}

export function PricingExplainerSection({
  tier,
  currency,
}: PricingExplainerSectionProps) {
  const symbol = CURRENCIES[currency].symbol;

  const tierContent = {
    starter: {
      title: "Business Starter",
      subsidy: `${symbol} ${PRICING_DATA.val_dev[currency]}+`,
      features: [
        "Keeping your server online 24/7 (Hosting)",
        "Renewing your Domain & SSL Certificates",
        "Daily Database Backups",
        "Quarterly Security Patching",
      ],
    },
    premium: {
      title: "Business Premium",
      subsidy: `${symbol} ${PRICING_DATA.val_premium_dev[currency]}+`,
      features: [
        "Priority High-Speed Cloud Resources",
        "25GB Storage Management",
        "Proactive DevOps & Error Monitoring",
        "Priority Support Line (WhatsApp/Email)",
      ],
    },
    platinum: {
      title: "Corporate Platinum",
      subsidy: `${symbol} ${PRICING_DATA.val_platinum_dev[currency]}+`,
      features: [
        "Dedicated Technical Lead (Fractional CTO)",
        "Unlimited Bandwidth & Enterprise Security",
        "Monthly Content Updates (2 Hours included)",
        "Audit-Ready Compliance Logs",
      ],
    },
  };

  const content = tierContent[tier];

  return (
    <section className="py-16 bg-muted/20 border-b border-border/50">
      <div className="mx-auto w-full max-w-5xl px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-4">
            <HelpCircle className="h-3 w-3" />
            <span>Pricing Model Explained</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Why is this an annual investment?
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto text-lg">
            We operate differently from traditional agencies. Instead of charging
            for code, we charge for impact.
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-start">
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold tracking-tight">
                It&apos;s not just a subscription. <br /> It&apos;s a Partnership.
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Most agencies charge you a huge upfront fee (e.g.,{" "}
                {content.subsidy}) to build software, then leave you to manage
                it.
                <strong className="text-primary block mt-1">
                  {" "}
                  We do the opposite.
                </strong>
              </p>
            </div>

            <div className="bg-background p-6 rounded-xl border border-border shadow-sm">
              <h4 className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
                <Users className="h-5 w-5" /> 1. We Waive the Build Cost
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We apply a <strong>100% Development Subsidy</strong>. This means
                we design, code, and deploy your custom {content.title} platform
                without charging the standard development fee (valued at{" "}
                {content.subsidy}). We invest in your build upfront.
              </p>
            </div>
          </div>

          <div className="flex-1 space-y-6">
            <div className="space-y-4">
              <h3 className="font-bold text-lg flex items-center gap-2">
                <Server className="h-5 w-5" /> 2. What your Annual Fee covers
              </h3>
              <p className="text-sm text-muted-foreground">
                Instead of paying for code, you are paying for the{" "}
                <strong>Infrastructure & Team</strong> required to keep that code
                alive, secure, and running.
              </p>
              <div className="grid gap-3">
                {content.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 text-sm bg-background p-3 rounded-lg border border-border/50"
                  >
                    <Check className="h-4 w-4 text-green-600 mt-0.5 shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-4 items-start bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
              <ShieldCheck className="h-6 w-6 text-blue-600 dark:text-blue-400 shrink-0" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-blue-900 dark:text-blue-100">
                  Tech-as-a-Service (TaaS)
                </h4>
                <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                  Software requires updates, security patches, and server
                  management. Your annual fee ensures you have a{" "}
                  <strong>Fractional Tech Department</strong> handling this
                  24/7.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start bg-green-50 dark:bg-green-950/20 p-4 rounded-lg border border-green-100 dark:border-green-900/30">
              <Activity className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-green-900 dark:text-green-100">
                  Active SLA Protection
                </h4>
                <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                  Your annual fee includes our{" "}
                  <strong>Service Level Agreement</strong>. If your system goes
                  down, we are alerted instantly. Critical issues are patched
                  within <strong>3 hours</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-card border border-border rounded-xl overflow-hidden">
          <div className="bg-muted/50 p-4 border-b border-border">
            <h4 className="font-bold text-base flex items-center gap-2">
              <Calculator className="h-4 w-4 text-primary" />
              The &quot;Hiring vs. Partnering&quot; Math
            </h4>
          </div>
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border">
            <div className="p-6 space-y-4 opacity-75">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-bold text-muted-foreground">
                    Hiring In-House
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    1 Junior Developer + Tools
                  </p>
                </div>
                <X className="h-5 w-5 text-red-500" />
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  • Salary: ~{symbol} {PRICING_DATA.hiring_salary[currency]} /
                  mo
                </li>
                <li>
                  • Equipment: ~{symbol} {PRICING_DATA.hiring_equipment[currency]}{" "}
                  (One-off)
                </li>
                <li>• Training & Benefits: +20%</li>
              </ul>
              <div className="pt-4 border-t border-dashed">
                <p className="font-bold text-lg">
                  ~ {symbol} {PRICING_DATA.hiring_total[currency]} / year
                </p>
                <p className="text-xs text-red-500">
                  High Risk & Management Overhead
                </p>
              </div>
            </div>

            <div className="p-6 space-y-4 bg-primary/5">
              <div className="flex justify-between items-start">
                <div>
                  <h5 className="font-bold text-primary">
                    Partnering with Surge
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    Entire Tech Department (TaaS)
                  </p>
                </div>
                <Check className="h-5 w-5 text-green-600" />
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Full Stack Team (Dev, Design, DevOps)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Zero Management Required</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-3 w-3 text-green-600" />
                  <span>Managed Infrastructure</span>
                </li>
              </ul>
              <div className="pt-4 border-t border-dashed border-primary/20">
                <p className="font-bold text-2xl text-primary">
                  {symbol} {PRICING_DATA[tier][currency]} / year
                </p>
                <p className="text-xs text-green-600 font-medium">
                  Predictable & Scalable
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Lock className="h-3 w-3" />
            <strong>Ironclad Guarantee:</strong> You retain 100% ownership of
            your data & intellectual property upon payment.
          </p>
        </div>
      </div>
    </section>
  );
}