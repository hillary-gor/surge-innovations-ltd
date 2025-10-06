"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type PromptType =
  | "consultation"
  | "quiz"
  | "download"
  | "specialOffer"
  | "chat";

interface Prompt {
  id: PromptType;
  title: string;
  description: string;
  cta: string;
  action: () => void;
}

const WHATSAPP_NUMBER = "254700000000";

export default function MultiPromptPopup() {
  const [currentPrompt, setCurrentPrompt] = useState<Prompt | null>(null);

  const prompts: Prompt[] = useMemo(
    () => [
      {
        id: "consultation",
        title: "Free Consultation",
        description:
          "Let’s turn your idea into impact. Schedule your free consultation — no commitment required.",
        cta: "Book Now",
        action: () => window.open("https://calendly.com/your-link", "_blank"),
      },
      {
        id: "quiz",
        title: "Quick Needs Assessment",
        description:
          "What’s your biggest tech challenge right now? Take our 3-question quiz and get a personalized solution roadmap.",
        cta: "Take Quiz",
        action: () => (window.location.href = "/quiz"),
      },
      {
        id: "download",
        title: "Free Guide",
        description:
          "Download our exclusive guide: ‘How to Automate Your Business Without a Tech Team’. Start scaling smarter — free today.",
        cta: "Download",
        action: () =>
          (window.location.href = "/resources/automation-guide.pdf"),
      },
      {
        id: "specialOffer",
        title: "Limited-Time Offer",
        description:
          "Get a free 30-minute strategy session to map out your next growth phase. Let’s build something powerful together.",
        cta: "Claim Now",
        action: () => (window.location.href = "/special-offer"),
      },
      {
        id: "chat",
        title: "Need Help?",
        description:
          "Have questions or want a quick chat? Connect instantly with our team on WhatsApp.",
        cta: "Chat on WhatsApp",
        action: () =>
          window.open(
            `https://wa.me/${WHATSAPP_NUMBER}?text=Hi! I want to discuss Surge services`,
            "_blank"
          ),
      },
    ],
    []
  );

  const isPromptShownToday = (id: PromptType) => {
    try {
      const stored = localStorage.getItem(`popup-${id}`);
      if (!stored) return false;
      const { date } = JSON.parse(stored);
      return date === new Date().toDateString();
    } catch {
      return false;
    }
  };

  const markPromptShown = (id: PromptType) => {
    localStorage.setItem(
      `popup-${id}`,
      JSON.stringify({ date: new Date().toDateString() })
    );
  };

  useEffect(() => {
    const now = new Date();
    const hour = now.getHours();
    let promptToShow: Prompt | null = null;

    if (!isPromptShownToday("consultation")) {
      promptToShow = prompts.find((p) => p.id === "consultation")!;
    } else if (!isPromptShownToday("quiz") && hour >= 8 && hour < 18) {
      promptToShow = prompts.find((p) => p.id === "quiz")!;
    } else if (!isPromptShownToday("download") && hour >= 8 && hour < 18) {
      promptToShow = prompts.find((p) => p.id === "download")!;
    } else if (!isPromptShownToday("specialOffer") && hour >= 18 && hour < 24) {
      promptToShow = prompts.find((p) => p.id === "specialOffer")!;
    } else if (!isPromptShownToday("chat") && (hour >= 18 || hour < 8)) {
      promptToShow = prompts.find((p) => p.id === "chat")!;
    }

    if (promptToShow) {
      const timer = setTimeout(() => setCurrentPrompt(promptToShow), 1500);
      markPromptShown(promptToShow.id);
      return () => clearTimeout(timer);
    }
  }, [prompts]);

  if (!currentPrompt) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="popup"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.4 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 sm:px-0"
      >
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Popup Box */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.9 }}
          transition={{ duration: 0.25 }}
          className="bg-background rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative z-10 text-center border border-border/40"
        >
          {/* Close Button */}
          <button
            onClick={() => setCurrentPrompt(null)}
            className="absolute top-4 right-4 text-muted-foreground hover:text-primary transition"
            aria-label="Close popup"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title & Description */}
          <h3 className="text-2xl font-bold mb-2">{currentPrompt.title}</h3>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {currentPrompt.description}
          </p>

          {/* CTA Button */}
          <button
            onClick={currentPrompt.action}
            className="bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:bg-primary/90 active:scale-95 transition w-full sm:w-auto"
          >
            {currentPrompt.cta}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
