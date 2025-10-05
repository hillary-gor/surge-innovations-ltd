"use client";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Award, Rocket, Shield, Workflow, ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-6xl font-bold tracking-tight text-balance"
              >
                Strategy, Code &{" "}
                <span className="text-primary">Scalable Impact</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl text-muted-foreground leading-relaxed text-balance"
              >
                Surge Innovations Ltd is a full-stack software company based in
                Nairobi, offering <strong>Tech-as-a-Service (TaaS)</strong> to
                organizations, startups, and nonprofits across Africa and
                beyond. We embed as your strategic tech partner — combining
                fractional CTO leadership, product design, and engineering pods
                to deliver systems that scale.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Mission, Vision, Values */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To empower organizations, businesses, non-profits, corporate
                teams, and institutions with reliable, flexible, and affordable
                technology solutions — cutting the need to build or manage large
                internal tech teams.
              </p>

              <h2 className="text-3xl md:text-4xl font-bold">Our Vision</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                To be the leading on-demand technology partner, fostering
                innovation, enabling sustainable digital transformation, and
                delivering world-class software solutions with speed, clarity,
                and long-term value.
              </p>
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Our Core Values
              </h2>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  {
                    title: "Growth",
                    desc:
                      "We invest in continuous learning and technical evolution, pushing boundaries through emerging frameworks and open-source contributions.",
                  },
                  {
                    title: "Responsibility",
                    desc:
                      "We protect client IP, deliver on promises, and act with integrity. Reliability isn’t a bonus — it’s our baseline.",
                  },
                  {
                    title: "Innovation",
                    desc:
                      "We move fast, prototype early, and build relevant, tested solutions that unlock real business value.",
                  },
                  {
                    title: "Tenacity",
                    desc:
                      "We commit fully, stay agile through complexity, and drive every project to the finish line — no matter the scale.",
                  },
                ].map((v, i) => (
                  <div
                    key={i}
                    className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all"
                  >
                    <h3 className="font-semibold text-lg text-primary">
                      {v.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-2">
                      {v.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Milestones Section */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 text-center space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold">Our Milestones</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: Rocket,
                  title: "2023",
                  desc:
                    "Our breakout year — officially launched Surge Innovations as a full-stack technology partner and delivered 15+ client solutions.",
                },
                {
                  icon: Workflow,
                  title: "2024",
                  desc:
                    "Refined our TaaS model and delivery pod structure. Expanded partnerships across education, fintech, and health tech sectors.",
                },
                {
                  icon: Shield,
                  title: "2025",
                  desc:
                    "Ongoing ISO/IEC 27001 certification, full Nairobi HQ establishment, and team scaling for AI/ML capabilities.",
                },
                {
                  icon: Award,
                  title: "2030 Goal",
                  desc:
                    "50+ cross-functional engineers, full SOC2 compliance, and continental partnerships driving digital transformation.",
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all"
                >
                  <item.icon className="h-10 w-10 text-primary mx-auto" />
                  <h3 className="font-semibold text-xl mt-4">{item.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* View Company Profile CTA */}
        <section className="py-16 bg-primary/5">
          <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 text-center space-y-6">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              viewport={{ once: true }}
              className="text-3xl font-bold"
            >
              Want the full story behind Surge?
            </motion.h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our detailed company profile — including leadership,
              structure, delivery model, and growth roadmap for 2025–2030.
            </p>
            <Button size="lg" asChild className="group">
              <Link href="/about/company">
                View Full Company Profile
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </section>

        {/* Approach Section */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 text-center space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Our Tech-as-a-Service Model
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Surge operates through lean, autonomous engineering pods — small,
              cross-functional teams that own the full product lifecycle from
              strategy to deployment. Each pod combines design, engineering,
              DevOps, and client support for end-to-end ownership.
            </p>
            <div className="grid md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto">
              {[
                {
                  title: "No Bureaucracy",
                  desc:
                    "Pods are autonomous and agile — decisions are made fast with minimal hand-offs.",
                },
                {
                  title: "End-to-End Ownership",
                  desc:
                    "Each pod manages its product area entirely, ensuring accountability and speed.",
                },
                {
                  title: "Scale with Pods",
                  desc:
                    "Add new pods as your needs grow, instead of overloading one team.",
                },
              ].map((p, i) => (
                <div
                  key={i}
                  className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all"
                >
                  <h3 className="font-semibold text-lg text-primary">
                    {p.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Let’s Build the Future Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partner with Surge and unlock the technology department your
              mission deserves — on demand, driven by strategy, and built to
              scale with you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Start a Conversation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Explore Our Services</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
