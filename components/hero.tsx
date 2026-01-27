"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  const thumbnails = [
    "/hero/Team collaboration.jpeg",
    "/hero/UX design.jpeg",
    "/hero/Developer coding.jpeg",
    "/hero/Dashboard mockup.jpeg",
    "/hero/Cloud computing.jpeg",
    "/hero/Server room.jpeg",
    "/hero/Client collaboration.jpeg",
    "/hero/Client collaboration.jpeg",
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-slider effect
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % thumbnails.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, thumbnails.length]);

  const handleThumbnailClick = (index: number) => {
    setActiveIndex(index);
    setIsPaused(true);
  };

  return (
    <section className="relative min-h-screen flex items-center bg-background overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.08),transparent_50%)]" />

      <div className="relative z-10 w-full mx-auto px-6 md:px-10 lg:px-[2cm] py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-8">
          {/* LEFT: text */}
          <div className="flex flex-col justify-center text-center lg:text-left space-y-8">
            <div className="inline-flex items-center justify-center lg:justify-start mb-4">
              <Image
                src="/surge-logo.png"
                alt="Surge Innovations"
                width={200}
                height={67}
                className="h-16 w-auto"
              />
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              Your Tech Partner for{" "}
              <span className="text-primary">Scalable Impact</span>
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl leading-relaxed mx-auto lg:mx-0">
              Every business is unique — your technology should be too. We
              design and build custom digital platforms that simplify work,
              automate tasks, and give you clarity across your operations.
            </p>

            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 pt-4">
              <Button size="lg" className="text-lg px-8 py-6 group" asChild>
                <Link href="/schedule-visit">
                  <Calendar className="mr-2 h-5 w-5" />
                  Schedule a Visit
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 bg-transparent"
                asChild
              >
                <Link href="/case-studies">View Our Work</Link>
              </Button>
            </div>

            {/* ✅ ADDED: Privacy & Terms Compliance Text */}
            <div className="text-xs text-muted-foreground/80 max-w-md mx-auto lg:mx-0 pt-2">
              <p>
                Trusted by startups, schools, and non-profits. <br className="hidden sm:block" />
                By engaging with us, you agree to our{" "}
                <Link href="/terms" className="underline hover:text-primary transition-colors">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="underline hover:text-primary transition-colors">
                  Privacy Policy
                </Link>.
              </p>
            </div>
          </div>

          {/* RIGHT: image + thumbnails */}
          <div className="relative flex justify-end items-center">
            <div className="relative w-full h-[72vh] rounded-3xl overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 1.02 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className="absolute inset-0"
                >
                  <Image
                    src={thumbnails[activeIndex]}
                    alt="Hero Illustration"
                    fill
                    sizes="(min-width:1024px) 50vw, 100vw"
                    className="object-cover"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Thumbnails */}
            <div className="absolute -bottom-8 right-0 flex gap-2 px-2">
              {thumbnails.map((src, i) => (
                <button
                  key={i}
                  onClick={() => handleThumbnailClick(i)}
                  className={`relative w-12 h-12 rounded-lg overflow-hidden border transition-all duration-300 ${
                    i === activeIndex
                      ? "border-primary ring-2 ring-primary/50 scale-105"
                      : "border-muted hover:scale-105"
                  }`}
                >
                  <Image
                    src={src}
                    alt={`Thumbnail ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-linear-to-t from-background to-transparent" />
    </section>
  );
}