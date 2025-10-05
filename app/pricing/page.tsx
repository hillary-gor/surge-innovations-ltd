import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small projects and MVPs",
      price: "Custom",
      features: [
        "Custom web application",
        "Responsive design",
        "Basic integrations",
        "Cloud hosting setup",
        "3 months support",
        "Documentation",
      ],
      cta: "Get Started",
      highlighted: false,
    },
    {
      name: "Professional",
      description: "Ideal for growing organizations",
      price: "Custom",
      features: [
        "Everything in Starter",
        "Advanced integrations",
        "Custom workflows",
        "User authentication",
        "Analytics dashboard",
        "6 months support",
        "Priority support",
        "Training sessions",
      ],
      cta: "Get Started",
      highlighted: true,
    },
    {
      name: "Enterprise",
      description: "For large-scale operations",
      price: "Custom",
      features: [
        "Everything in Professional",
        "Multi-tenant architecture",
        "Advanced security",
        "Custom integrations",
        "Dedicated support team",
        "12 months support",
        "SLA guarantee",
        "On-site training",
        "White-label options",
      ],
      cta: "Contact Sales",
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
                Every project is unique. We provide custom quotes based on your
                specific needs, timeline, and scope.
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
                  } space-y-6 transition-all`}
                >
                  {plan.highlighted && (
                    <div className="inline-block px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="space-y-2">
                    <h3 className="text-2xl font-bold">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>
                  <div className="space-y-1">
                    <div className="text-4xl font-bold">{plan.price}</div>
                    <p className="text-sm text-muted-foreground">
                      Based on project scope
                    </p>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                    asChild
                  >
                    <Link href="/contact">{plan.cta}</Link>
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

        {/* FAQ */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Frequently Asked Questions
                </h2>
              </div>
              <div className="space-y-8">
                {[
                  {
                    q: "Why don’t you list fixed prices?",
                    a:
                      "Every project is unique with different requirements, complexity, and timelines. We provide detailed custom quotes after understanding your needs to ensure fair pricing.",
                  },
                  {
                    q: "What’s included in the support period?",
                    a:
                      "Support includes bug fixes, minor updates, technical assistance, and monitoring. Major new features are quoted separately.",
                  },
                  {
                    q: "Do you offer payment plans?",
                    a:
                      "Yes, we offer milestone-based payments — typically 30% upfront, 40% mid-project, and 30% upon completion.",
                  },
                  {
                    q: "What happens after project completion?",
                    a:
                      "You own all code and assets. We hand over documentation, training, and offer ongoing support options if needed.",
                  },
                ].map((item, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="text-xl font-semibold">{item.q}</h3>
                    <p className="text-muted-foreground leading-relaxed">
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
