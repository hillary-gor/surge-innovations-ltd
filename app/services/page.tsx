"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import {
  Code,
  Palette,
  Database,
  Workflow,
  Cloud,
  Shield,
  Smartphone,
  BarChart,
  Zap,
  Users,
  Settings,
  Rocket,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Custom Platform Development",
      description:
        "We build tailored web and mobile applications from the ground up, designed specifically for your business needs and workflows.",
      features: [
        "Full-stack development",
        "API integrations",
        "Third-party services",
        "Scalable architecture",
      ],
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description:
        "Beautiful, intuitive interfaces that your team will love to use. We focus on user experience and accessibility.",
      features: [
        "User research",
        "Wireframing & prototyping",
        "Design systems",
        "Responsive design",
      ],
    },
    {
      icon: Database,
      title: "Database Architecture",
      description:
        "Robust, secure database solutions that handle your data efficiently and scale as your organization grows.",
      features: [
        "Schema design",
        "Data migration",
        "Performance optimization",
        "Backup & recovery",
      ],
    },
    {
      icon: Workflow,
      title: "Workflow Automation",
      description:
        "Eliminate repetitive tasks and streamline operations with intelligent automation that saves time and reduces errors.",
      features: [
        "Process mapping",
        "Integration automation",
        "Notification systems",
        "Task scheduling",
      ],
    },
    {
      icon: Cloud,
      title: "Cloud Infrastructure",
      description:
        "Reliable, secure cloud hosting with automatic scaling, backups, and monitoring to keep your systems running 24/7.",
      features: [
        "Cloud deployment",
        "Auto-scaling",
        "Load balancing",
        "CDN integration",
      ],
    },
    {
      icon: Shield,
      title: "Security & Compliance",
      description:
        "Enterprise-grade security measures to protect your data and ensure compliance with industry regulations.",
      features: [
        "Authentication & authorization",
        "Data encryption",
        "Security audits",
        "GDPR compliance",
      ],
    },
    {
      icon: Smartphone,
      title: "Mobile-First Development",
      description:
        "Responsive applications that work seamlessly across all devices, from smartphones to desktop computers.",
      features: [
        "Progressive web apps",
        "Native mobile apps",
        "Cross-platform development",
        "Offline functionality",
      ],
    },
    {
      icon: BarChart,
      title: "Analytics & Reporting",
      description:
        "Custom dashboards and reports that give you real-time insights into your operations and performance metrics.",
      features: [
        "Custom dashboards",
        "Real-time analytics",
        "Data visualization",
        "Automated reports",
      ],
    },
    {
      icon: Users,
      title: "User Management",
      description:
        "Sophisticated user authentication, role-based access control, and team management features.",
      features: [
        "SSO integration",
        "Role-based permissions",
        "User onboarding",
        "Activity tracking",
      ],
    },
    {
      icon: Settings,
      title: "System Integration",
      description:
        "Connect your existing tools and services into a unified platform that works together seamlessly.",
      features: [
        "API development",
        "Third-party integrations",
        "Data synchronization",
        "Webhook automation",
      ],
    },
    {
      icon: Zap,
      title: "Performance Optimization",
      description:
        "Lightning-fast applications optimized for speed, efficiency, and an exceptional user experience.",
      features: [
        "Code optimization",
        "Caching strategies",
        "Database tuning",
        "Load testing",
      ],
    },
    {
      icon: Rocket,
      title: "Ongoing Support & Maintenance",
      description:
        "Continuous monitoring, updates, and support to ensure your platform stays secure and performs optimally.",
      features: [
        "24/7 monitoring",
        "Regular updates",
        "Bug fixes",
        "Feature enhancements",
      ],
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* Hero */}
        <section className="py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
                Comprehensive{" "}
                <span className="text-primary">Technology Services</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                From strategy to deployment, we provide end-to-end solutions
                that transform how your organization operates.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <motion.div
                    key={index}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                    className="p-6 bg-card rounded-lg border border-border space-y-4 hover:shadow-lg transition-all"
                  >
                    <Icon className="h-10 w-10 text-primary" />
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li
                          key={idx}
                          className="text-sm text-muted-foreground flex items-center gap-2"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>
            <div className="text-center mt-16">
              <Button asChild size="lg">
                <Link href="/contact">Talk to Our Team</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Process */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Our Process</h2>
              <p className="text-lg text-muted-foreground">
                A proven approach to delivering exceptional results
              </p>
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-10 relative">
              {[
                {
                  step: "1",
                  title: "Discovery",
                  desc:
                    "We learn about your goals, challenges, and requirements.",
                },
                {
                  step: "2",
                  title: "Design",
                  desc:
                    "We create wireframes and prototypes for your approval.",
                },
                {
                  step: "3",
                  title: "Development",
                  desc: "We build your platform with regular progress updates.",
                },
                {
                  step: "4",
                  title: "Launch & Support",
                  desc: "We deploy your solution and provide ongoing support.",
                },
              ].map((item, i) => (
                <div key={i} className="text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/70 text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto shadow-md">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let&apos;s discuss your project and how we can help bring your
                vision to life.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <Link href="/contact">Schedule a Consultation</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/case-studies">View Our Work</Link>
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
