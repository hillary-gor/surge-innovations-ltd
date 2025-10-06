"use client";

import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { Services } from "@/components/services";
import { Benefits } from "@/components/benefits";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
// import MultiPromptPopup from "@/components/marketing/multi-prompt-popup"; // ✅ import popup

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        <Hero />
        <Features />
        <Services />
        <Benefits />
        <CTA />
        <Footer />
      </main>

      
      {/* <MultiPromptPopup /> */}
    </>
  );
}
