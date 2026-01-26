"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import FloatingHeader from "@/components/floating-logo-&-close-button";
import {
  CheckCircle2,
  ShieldCheck,
  Cloud,
  HelpCircle,
  Lock,
  Phone,
  CreditCard,
  Smartphone,
} from "lucide-react";

// ---------------------------------------
// PRICING DATA WITH "ANCHORING"
// ---------------------------------------
const plans = [
  {
    name: "Starter",
    tagline: "For Personal Brands",
    hosting: 11999,
    domain: 2000,
    total: 13999,
    standardPrice: "KES 150,000",
    features: [
      "5-Page Professional Website",
      "Free .com or .co.ke Domain",
      "AWS Cloud Hosting (1GB)",
      "SSL Security (Green Lock)",
      "WhatsApp Chat Integration",
      "Weekly Backups",
    ],
    cta: "Choose Starter",
    highlight: false,
  },
  {
    name: "Business Pro",
    tagline: "Best for Companies",
    hosting: 14999,
    domain: 2000,
    total: 16999,
    standardPrice: "KES 250,000",
    features: [
      "10-Page Corporate Platform",
      "SEO & Google Maps Setup",
      "AWS Auto-Scaling (5GB)",
      "Professional Email (info@your.com)",
      "Admin Dashboard Access",
      "Priority WhatsApp Support",
    ],
    cta: "Choose Business Pro",
    highlight: true,
  },
  {
    name: "E-Commerce",
    tagline: "For Selling Online",
    hosting: 21999,
    domain: 2000,
    total: 23999,
    standardPrice: "KES 350,000",
    features: [
      "15+ Pages / Online Store",
      "M-Pesa / Stripe Integration",
      "Customer Portal / Login",
      "Unlimited Bandwidth",
      "Inventory Management System",
      "24/7 Critical Support",
    ],
    cta: "Choose E-Commerce",
    highlight: false,
  },
];

export default function HostingPlans() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 relative overflow-x-hidden">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px] -z-10"></div>

      <FloatingHeader />

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-16 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-xs font-bold text-green-700 mb-8"
        >
          <span className="mr-2 h-2 w-2 rounded-full bg-green-600 animate-pulse"></span>
          DECEMBER OFFER: 100% DEV FEE WAIVER
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter text-gray-950 mb-6 leading-[1.1]"
        >
          Don&apos;t pay for development. <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-gray-500 to-gray-900">
            Just pay for hosting.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
        >
          Agencies and or rather &apos;we&apos; charge <strong>KES 150,000+</strong> to build these
          platforms. <br className="hidden md:block" />
          We waive that fee entirely. You only cover the annual infrastructure
          costs.
        </motion.p>
      </section>

      {/* TRUST BADGES STRIP (M-PESA / AWS) */}
      <section className="border-y border-gray-100 bg-gray-50/50 py-8 mb-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-8 md:gap-16 items-center text-gray-400 grayscale opacity-80">
          <div className="flex items-center gap-2 font-bold text-sm">
            <Smartphone size={18} /> M-Pesa Accepted
          </div>
          <div className="flex items-center gap-2 font-bold text-sm">
            <CreditCard size={18} /> Visa / MasterCard
          </div>
          <div className="flex items-center gap-2 font-bold text-sm">
            <Cloud size={18} /> AWS Secured
          </div>
          <div className="flex items-center gap-2 font-bold text-sm">
            <Lock size={18} /> SSL Encrypted
          </div>
        </div>
      </section>

      {/* PRICING CARDS */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8 items-end">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* MOST POPULAR BADGE */}
              {plan.highlight && (
                <div className="absolute -top-4 left-0 right-0 flex justify-center z-20">
                  <span className="bg-black text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                    MOST BUSINESSES CHOOSE THIS
                  </span>
                </div>
              )}

              <Card
                className={`
                  relative overflow-hidden transition-all duration-300
                  ${
                    plan.highlight
                      ? "border-black ring-2 ring-black/5 shadow-2xl scale-105 z-10 bg-white"
                      : "border-gray-200 shadow-sm hover:shadow-md bg-white"
                  }
                `}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {/* Header */}
                  <div className="mb-4">
                    <h3 className="font-bold text-2xl text-gray-900">
                      {plan.name}
                    </h3>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wide mt-1">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* The "ANCHOR" Price Comparison */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="flex justify-between items-center mb-2 border-b border-gray-200 pb-2">
                      <span className="text-xs text-gray-500">
                        Agency Build Fee
                      </span>
                      <span className="text-xs font-bold text-red-400 line-through decoration-red-400/50">
                        {plan.standardPrice}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Your One-Time Offer
                      </span>
                      <span className="text-xs font-bold text-green-600">
                        FREE
                      </span>
                    </div>
                  </div>

                  {/* The Real Price */}
                  <div className="mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-sm font-bold text-gray-500">
                        KES
                      </span>
                      <span className="text-4xl font-extrabold tracking-tight text-gray-900">
                        {plan.total.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      Billed annually. Includes Domain & Hosting.
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-sm text-gray-700"
                      >
                        <CheckCircle2
                          className={`w-5 h-5 shrink-0 ${
                            plan.highlight ? "text-green-600" : "text-gray-400"
                          }`}
                        />
                        <span className="font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <Button
                    asChild
                    className={`w-full h-14 rounded-xl font-bold text-base transition-all shadow-lg ${
                      plan.highlight
                        ? "bg-black text-white hover:bg-gray-800 hover:scale-[1.02]"
                        : "bg-white border-2 border-gray-200 text-gray-900 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <Link href="/contact">{plan.cta}</Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* GUARANTEE SECTION (RISK REVERSAL) */}
      <section className="py-16 px-6 max-w-4xl mx-auto">
        <div className="bg-gray-50 border border-gray-200 p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          <div className="bg-white p-4 rounded-full shadow-sm">
            <ShieldCheck className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              The 14-Day Launch Guarantee
            </h3>
            <p className="text-gray-600 leading-relaxed">
              We are confident in our speed. Once you secure your hosting, we
              guarantee your platform will be ready for review within 14 days,
              or we refund your hosting fee 100%. No questions asked.
            </p>
          </div>
        </div>
      </section>

      {/* "WHY NOT CHEAPER?" FAQ (Objection Handling) */}
      <section className="py-20 px-6 max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">
          Common Questions
        </h2>
        <div className="space-y-6">
          <div className="bg-white border-b border-gray-100 pb-6">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-gray-400" />
              Why is this more expensive than GoDaddy/Bluehost?
            </h3>
            <p className="text-gray-600 text-sm pl-8 leading-relaxed">
              GoDaddy sells &quot;Shared Hosting&quot; (slow, insecure, DIY). We
              provide &quot;Managed Cloud Infrastructure.&quot; We handle the
              updates, security patches, backups, and server scaling so you
              don&apos;t have to hire an IT guy. It&apos;s like comparing a
              public bus to a private driver.
            </p>
          </div>

          <div className="bg-white border-b border-gray-100 pb-6">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-3">
              <Smartphone className="w-5 h-5 text-gray-400" />
              Can I pay with M-Pesa?
            </h3>
            <p className="text-gray-600 text-sm pl-8 leading-relaxed">
              Yes. Once you apply, we will send you an invoice with our M-Pesa
              Till Number or Paybill. We also accept Bank Transfers and Card
              payments.
            </p>
          </div>

          <div className="bg-white border-b border-gray-100 pb-6">
            <h3 className="font-bold text-lg mb-2 flex items-center gap-3">
              <Cloud className="w-5 h-5 text-gray-400" />
              Do I own the domain name?
            </h3>
            <p className="text-gray-600 text-sm pl-8 leading-relaxed">
              100%. We register the domain in your name/company name. If you
              ever decide to leave Surge, you take your domain and your code
              with you.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL URGENCY CTA */}
      <section className="py-24 px-6 bg-black text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
            Campaign ends Dec 23rd.
          </h2>
          <p className="text-lg text-gray-400 mb-10">
            We only have capacity for <strong>5 more builds</strong> this month.{" "}
            <br />
            Secure your infrastructure now to lock in the free development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-white text-black hover:bg-gray-200 h-14 px-10 rounded-full font-bold text-lg"
            >
              <Link href="/contact">Start My Build</Link>
            </Button>
            <div className="flex items-center justify-center gap-2 text-sm text-gray-500 sm:hidden">
              <Phone size={14} /> Call us: +254 ...
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
