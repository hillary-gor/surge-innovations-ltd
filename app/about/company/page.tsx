"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Users, Workflow, Shield, Code2, Globe, Cpu, Star } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CompanyPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* HERO */}
        <section className="py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold tracking-tight text-balance"
            >
              Surge Innovations Ltd
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto"
            >
              We are your on-demand <strong>technology department</strong>,
              combining strategy, code, and scalable impact to power Africa’s
              digital transformation.
            </motion.p>
            <div className="mt-10 flex justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/contact">Partner With Us</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/services">Explore Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* OVERVIEW */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Company Overview
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Surge Innovations is a full-stack software company based in
                Nairobi, Kenya. We embed as your strategic technology partner —
                providing product squads, fractional CTO leadership, designers,
                and engineers who build and maintain scalable systems for
                startups, SMEs, nonprofits, and corporates.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Our <strong>Tech-as-a-Service (TaaS)</strong> model gives you a
                complete digital department — strategy, design, engineering, and
                DevOps — without the overhead of hiring in-house teams.
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-xl"
            >
              <Image
                src="/office-team.jpg"
                alt="Surge Innovations team at work"
                width={700}
                height={500}
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </section>

        {/* LEADERSHIP */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 text-center space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold">
              Leadership & Governance
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              A passionate leadership team dedicated to building reliable,
              scalable, and ethical technology systems for Africa and beyond.
            </p>

            <div className="grid md:grid-cols-3 gap-10 max-w-5xl mx-auto">
              {[
                {
                  name: "Stanley George",
                  role: "CTO | Full Stack Engineer",
                  img: "/team-stanley.jpg",
                },
                {
                  name: "Hillary Gor",
                  role: "Lead Solutions Architect",
                  img: "/team-hillary.jpg",
                },
                {
                  name: "Paul Otieno",
                  role: "Sales & Partnerships",
                  img: "/team-paul.jpg",
                },
              ].map((member, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-card border border-border rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-all"
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                    <Image
                      src={member.img}
                      alt={member.name}
                      width={96}
                      height={96}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* DELIVERY MODEL */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">
                The Surge Delivery Model
              </h2>
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto mt-4">
                We operate using agile engineering pods — autonomous cross-
                functional teams that deliver complete product cycles.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Workflow,
                  title: "Agile Pods",
                  desc:
                    "Each pod owns end-to-end delivery — from product design to DevOps.",
                },
                {
                  icon: Cpu,
                  title: "Full-Stack Capability",
                  desc:
                    "Designers, engineers, DevOps, QA — all under one roof.",
                },
                {
                  icon: Globe,
                  title: "Scalable Structure",
                  desc:
                    "Easily scale by adding more pods without reorganizing teams.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-card border border-border rounded-lg hover:shadow-md transition-all"
                >
                  <item.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 text-center space-y-10">
            <h2 className="text-3xl md:text-4xl font-bold">Our Impact</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Since 2023, we’ve partnered with 5+ organizations and delivered
              15+ systems across education, fintech, healthcare, and
              non-profits, reaching over 800K end-users.
            </p>

            <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {[
                { icon: Users, title: "5+", desc: "Active Clients" },
                { icon: Code2, title: "15+", desc: "Projects Delivered" },
                { icon: Shield, title: "99.9%", desc: "Uptime Reliability" },
                { icon: Star, title: "98%", desc: "Client Retention" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 bg-card border border-border rounded-lg"
                >
                  <stat.icon className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h3 className="text-2xl font-bold">{stat.title}</h3>
                  <p className="text-sm text-muted-foreground">{stat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Let’s Build the Future Together
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Partner with Surge and activate your full-stack technology
              department on demand — driven by strategy and built to scale.
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
