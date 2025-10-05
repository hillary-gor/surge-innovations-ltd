"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Mail,
  Phone,
  CalendarDays,
  SendHorizonal,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function CTA() {
  const [contactOpen, setContactOpen] = useState(false);
  const [scheduleOpen, setScheduleOpen] = useState(false);

  return (
    <section className="py-24 md:py-32 bg-background relative">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Text */}
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Ready to transform your operations?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Let&apos;s discuss how we can build custom solutions that scale
              with your business.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              onClick={() => setContactOpen(true)}
              className="text-lg px-8 py-6 group bg-primary hover:bg-primary/90"
            >
              <Mail className="mr-2 h-5 w-5" />
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              onClick={() => setScheduleOpen(true)}
              className="text-lg px-8 py-6 bg-transparent"
            >
              <CalendarDays className="mr-2 h-5 w-5" />
              Schedule a Call
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-8">
            Free consultation • No commitment required • Response within 24
            hours
          </p>
        </div>
      </div>

      {/* Get in Touch Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <DialogContent className="max-w-lg p-8 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Mail className="h-6 w-6 text-primary" /> Get in Touch
            </DialogTitle>
          </DialogHeader>
          <form className="space-y-4 mt-4">
            <Input placeholder="Your Name" required />
            <Input type="email" placeholder="Your Email" required />
            <Textarea
              placeholder="Tell us briefly about your project..."
              required
            />
            <Button type="submit" className="w-full">
              <SendHorizonal className="mr-2 h-4 w-4" /> Send Message
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Schedule a Call Dialog */}
      <Dialog open={scheduleOpen} onOpenChange={setScheduleOpen}>
        <DialogContent className="max-w-md p-8 rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <Phone className="h-6 w-6 text-primary" /> Schedule a Call
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4 text-muted-foreground">
            <p>
              Choose a time that works best for you — our team will reach out
              via Google Meet or Zoom.
            </p>
            <div className="grid gap-3">
              <Button className="w-full" variant="outline" asChild>
                <a
                  href="https://calendly.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open Calendly
                </a>
              </Button>
              <Button className="w-full" variant="outline" asChild>
                <a
                  href="mailto:info@surgeinnovations.co.ke"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Request Manual Scheduling
                </a>
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
