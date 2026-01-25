import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check, Info } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
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
        "Daily Database Backups",
        "Quarterly Security Patching",
        "Email Support (48hr Resolution)",
      ],
      cta: "See Package Details",
      href: "/pricing/business-starter",
      highlighted: false,
    },
    {
      name: "Business Premium",
      description: "For growing companies needing automation & scale",
      price: "KES 35,000",
      period: "/ year",
      features: [
        "Everything in Starter",
        "Priority Runtime (Unmetered Bandwidth)",
        "25 GB High-Speed Object Storage",
        "Daily Encrypted Backups (7-day retention)",
        "Priority Email & WhatsApp Line",
        "Same-Day Critical Response",
        "Quarterly Deep-Dive Health Check",
      ],
      cta: "See Package Details",
      href: "/pricing/business-premium",
      highlighted: true,
    },
    {
      name: "Corporate Platinum",
      description: "Mission critical infrastructure for Enterprises",
      price: "KES 85,000",
      period: "/ year",
      features: [
        "Everything in Premium",
        "Dedicated Environment (99.99% Uptime)",
        "100 GB Enterprise Data Warehousing",
        "Dedicated Technical Lead (Direct Phone)",
        "< 4 Hours Critical Response Time",
        "Annual Penetration Testing",
        "Monthly Content Updates (2 hrs included)",
      ],
      cta: "See Package Details",
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
        <section className="py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
                Transparent <span className="text-primary">Pricing</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                We waive the heavy development fees in exchange for a long-term
                partnership. Access a full engineering pod for a fraction of the
                cost of hiring.
              </p>
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
                  className={`p-8 rounded-lg border ${
                    plan.highlighted
                      ? "border-primary bg-primary/5 shadow-lg scale-105"
                      : "border-border bg-card"
                  } space-y-6 transition-all flex flex-col`}
                >
                  {plan.highlighted && (
                    <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium w-fit">
                      Most Popular
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground text-sm h-12">
                      {plan.description}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground text-sm font-medium">
                        {plan.period}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Development Fee Waived (Subsidy Applied)
                    </p>
                  </div>
                  <ul className="space-y-3 flex-grow">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-tight">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full mt-6"
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
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
                  className="p-6 bg-card rounded-lg border border-border space-y-2"
                >
                  <h3 className="font-semibold">{addon.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {addon.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ - Updated with Terms from Documents */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Critical Terms & FAQ
                </h2>
              </div>
              <div className="space-y-8">
                {[
                  {
                    q: "Why is the development fee waived?",
                    a: "We operate on a 'Strategic Partnership' model. Instead of charging huge upfront fees (e.g., KES 85k-250k), we invest in your build and recover costs through the annual infrastructure license.",
                  },
                  {
                    q: "What happens if I miss a renewal payment?",
                    a: "Service continuity is automated. If payment is not received by the due date, the system automatically suspends the instance. A KES 2,500 Reinstatement Fee applies to re-deploy the server.", // [cite: 289, 333, 378]
                  },
                  {
                    q: "Who owns the data?",
                    a: "You do. Upon full payment of the annual fee, the Client retains 100% ownership of all customer data, database records, and uploaded files. We claim no IP rights over your business data.", // [cite: 291, 336, 381]
                  },
                  {
                    q: "Can I upgrade my storage later?",
                    a: "Yes. You can move from the Starter Tier (1GB) to Premium (25GB) at any time. We simply prorate the difference in the annual fee to upgrade your capacity instantly.", // [cite: 367]
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-3 bg-card p-6 rounded-lg border border-border/50">
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                      <Info className="h-5 w-5 text-primary" />
                      {item.q}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed pl-7">
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
              <Button size="lg" asChild>
                <Link href="/contact">Get a Custom Quote</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}