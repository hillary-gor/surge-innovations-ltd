"use client";

import { useState } from "react";
import Image from "next/image";
import { CheckCircle2, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const benefits = [
  {
    title: "Fast, secure, mobile-ready systems",
    description:
      "Our systems are designed for performance and security from the ground up. Whether on desktop or mobile, your users enjoy a seamless experience with encrypted data, fast load times, and modern architecture.",
    image: "/images/benefits/speed.jpg",
  },
  {
    title: "Tailored dashboards and workflows",
    description:
      "Every business operates differently. We craft dashboards that fit your exact workflows — from sales tracking to inventory management — making your data easy to visualize and act on.",
    image: "/images/benefits/dashboard.jpg",
  },
  {
    title: "Smart automation that saves time",
    description:
      "We integrate smart automation into your system so repetitive tasks run in the background — sending reminders, syncing reports, and handling approvals without you lifting a finger.",
    image: "/images/benefits/automation.jpg",
  },
  {
    title: "Cloud access from anywhere",
    description:
      "Access your data and tools securely from any device, anywhere in the world. Our systems use cloud-native infrastructure to ensure uptime and reliability, even during peak usage.",
    image: "/images/benefits/cloud.jpg",
  },
  {
    title: "Reliable, always-on performance",
    description:
      "We monitor and maintain your system for 24/7 uptime. That means fewer errors, faster updates, and a dependable experience for your team and customers.",
    image: "/images/benefits/reliability.jpg",
  },
  {
    title: "No need to manage tech teams",
    description:
      "We handle all technical setup, maintenance, and scaling — so you can focus on growth, not troubleshooting servers or hiring developers.",
    image: "/images/benefits/support.jpg",
  },
];

export function Benefits() {
  const [selected, setSelected] = useState<typeof benefits[0] | null>(null);

  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,146,60,0.08),transparent_50%)]" />
      <div className="mx-auto max-w-7xl px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              We don&apos;t just build systems —{" "}
              <span className="text-accent">we help you scale</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              Technology that moves with your vision
            </p>
          </div>

          <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <Dialog.Root key={index}>
                <Dialog.Trigger asChild>
                  <button
                    onClick={() => setSelected(benefit)}
                    className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-border/50 hover:border-accent/50 transition-colors w-full text-left cursor-pointer"
                  >
                    <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                    <p className="text-lg font-medium">{benefit.title}</p>
                  </button>
                </Dialog.Trigger>

                {selected && selected.title === benefit.title && (
                  <Dialog.Portal>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                    <Dialog.Content className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-card rounded-2xl shadow-xl overflow-hidden">
                      <Dialog.Title>
                        <VisuallyHidden>{selected.title}</VisuallyHidden>
                      </Dialog.Title>
                      <button
                        onClick={() => setSelected(null)}
                        className="absolute top-4 right-4 text-muted-foreground hover:text-accent transition"
                      >
                        <X className="w-6 h-6" />
                      </button>

                      <div className="flex flex-col md:flex-row">
                        {/* Left (Image) */}
                        <div className="hidden md:block md:w-1/2 relative">
                          <Image
                            src={selected.image}
                            alt={selected.title}
                            fill
                            className="object-cover rounded-l-2xl"
                          />
                        </div>

                        {/* Right (Details) */}
                        <div className="w-full md:w-1/2 p-8 space-y-4">
                          <h3 className="text-2xl font-bold">
                            {selected.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {selected.description}
                          </p>
                        </div>
                      </div>
                    </Dialog.Content>
                  </Dialog.Portal>
                )}
              </Dialog.Root>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
