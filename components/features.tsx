"use client";

import { useState } from "react";
import { Zap, Shield, Smartphone, Cloud, Gauge, Wrench, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    icon: Zap,
    title: "Fast & Secure",
    description:
      "Experience a system that just works — lightning-fast, rock-solid secure, and effortless. Focus on your ideas, not the tech.",
    image: "/images/features/speed.jpg",
  },
  {
    icon: Smartphone,
    title: "Mobile-Ready",
    description:
      "Your business, anytime, anywhere. Seamless performance across phones, tablets, and desktops — freedom to move, freedom to grow.",
    image: "/images/features/mobile.jpg",
  },
  {
    icon: Wrench,
    title: "Tailored Solutions",
    description:
      "Every dashboard, every workflow, designed for your team. No fluff, no guesswork — just solutions that fit your way of working.",
    image: "/images/features/tailored.jpg",
  },
  {
    icon: Gauge,
    title: "Smart Automation",
    description:
      "Let the system handle the routine. From approvals to reminders, intelligent automation saves hours so your team can focus on impact.",
    image: "/images/features/automation.jpg",
  },
  {
    icon: Cloud,
    title: "Cloud Access",
    description:
      "Your data, your tools, everywhere. Secure cloud infrastructure keeps your business connected, resilient, and always-on.",
    image: "/images/features/cloud.jpg",
  },
  {
    icon: Shield,
    title: "Always-On Performance",
    description:
      "Reliability you can count on. Monitored systems, instant updates, and 99.9% uptime so your work never stops.",
    image: "/images/features/reliability.jpg",
  },
];

export function Features() {
  const [selected, setSelected] = useState<typeof features[0] | null>(null);

  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
            What you&apos;ll love
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Technology that works as hard as you do, without the complexity
          </p>
        </div>

        <div className="grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Dialog.Root key={index}>
              <Dialog.Trigger asChild>
                <Card
                  onClick={() => setSelected(feature)}
                  className="p-8 bg-card hover:bg-card/80 transition-all border border-border/50 hover:border-primary/50 group w-full cursor-pointer transform hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              </Dialog.Trigger>

              <AnimatePresence>
                {selected && selected.title === feature.title && (
                  <Dialog.Portal forceMount>
                    <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
                    <Dialog.Content asChild>
                      <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-4xl -translate-x-1/2 -translate-y-1/2 bg-card rounded-2xl shadow-xl overflow-hidden"
                      >
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
                          <div className="hidden md:block md:w-1/2 relative h-[300px] md:h-auto">
                            <Image
                              src={selected.image}
                              alt={selected.title}
                              fill
                              className="object-cover rounded-l-2xl"
                              priority
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
                      </motion.div>
                    </Dialog.Content>
                  </Dialog.Portal>
                )}
              </AnimatePresence>
            </Dialog.Root>
          ))}
        </div>
      </div>
    </section>
  );
}
