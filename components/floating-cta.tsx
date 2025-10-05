"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, X } from "lucide-react";
import Link from "next/link";

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= 500) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <div
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${
        isVisible
          ? "translate-y-0 opacity-100"
          : "translate-y-20 opacity-0 pointer-events-none"
      }`}
    >
      <div className="relative">
        <Button
          size="sm"
          variant="ghost"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 bg-background border border-border shadow-sm hover:bg-muted"
          onClick={() => setIsDismissed(true)}
        >
          <X className="h-3 w-3" />
        </Button>

        <Button
          asChild
          size="lg"
          className="shadow-lg hover:shadow-xl transition-shadow"
        >
          <Link href="/schedule-visit">
            <Calendar className="h-5 w-5 mr-2" />
            Schedule a Visit
          </Link>
        </Button>
      </div>
    </div>
  );
}
