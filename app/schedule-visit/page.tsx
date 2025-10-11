"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Building2, MapPin, Video, CheckCircle2, User } from "lucide-react";
import { toast } from "sonner";
import { scheduleVisit } from "./schedule-visit-actions";

export default function ScheduleVisitPage() {
  const [visitType, setVisitType] = useState<
    "visit-us" | "we-visit" | "online-meet" | null
  >(null);
  const [meetingMethod, setMeetingMethod] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
  const [open, setOpen] = useState(false);

  const handleVisitTypeSelect = (
    type: "visit-us" | "we-visit" | "online-meet"
  ) => {
    setVisitType(type);
    setOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    if (!visitType) return;

    formData.append("visitType", visitType);
    formData.append("meetingMethod", meetingMethod);

    toast.loading("Scheduling your visit...", {
      description: "Please wait a moment.",
    });

    const res = await scheduleVisit(formData);

    toast.dismiss(); // Remove loading toast

    if (res.success) {
      setSubmitted(true);
      setOpen(false);
      toast.success("Visit scheduled successfully!", {
        description: "We’ll confirm within 24 hours.",
      });
    } else {
      toast.error("Something went wrong", {
        description: "Failed to schedule visit. Please try again later.",
      });
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 pb-16 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-6">
          <CheckCircle2 className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-4">Visit Scheduled!</h1>
        <p className="text-lg text-muted-foreground mb-6 max-w-xl">
          Thank you for scheduling a visit with Surge Innovations. We’ll be in
          touch within 24 hours to confirm the details.
        </p>
        <Button asChild size="lg">
          <Link href="/">Return Home</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold">Schedule a Visit</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose how you’d like to meet with us.
            </p>
          </div>

          {/* Feature Highlights (hidden on mobile) */}
          <div className="hidden md:grid md:grid-cols-3 gap-4 mb-10 text-center">
            {[
              {
                title: "Quick Response",
                text: "We’ll confirm within 24 hours",
              },
              {
                title: "Flexible Scheduling",
                text: "Choose what works best for you",
              },
              {
                title: "No Obligation",
                text: "Free consultation, no strings attached",
              },
            ].map(({ title, text }) => (
              <div
                key={title}
                className="p-6 rounded-lg border bg-card shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-lg mb-1">{title}</h3>
                <p className="text-sm text-muted-foreground">{text}</p>
              </div>
            ))}
          </div>

          {/* Visit Type Selection */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                id: "visit-us",
                icon: <Building2 className="h-6 w-6 text-primary" />,
                title: "Visit Our Office",
                text:
                  "Come to our location for a tour and in-depth consultation.",
              },
              {
                id: "we-visit",
                icon: <MapPin className="h-6 w-6 text-primary" />,
                title: "We Visit You",
                text:
                  "We’ll come to your location for a personalized consultation.",
              },
              {
                id: "online-meet",
                icon: <Video className="h-6 w-6 text-primary" />,
                title: "Online Meet",
                text:
                  "Connect remotely via video call, phone, or your preferred platform.",
              },
            ].map(({ id, icon, title, text }, index) => (
              <Card
                key={id}
                onClick={() =>
                  handleVisitTypeSelect(
                    id as "visit-us" | "we-visit" | "online-meet"
                  )
                }
                className={`cursor-pointer hover:border-primary transition-all hover:shadow-lg p-6 space-y-4 relative ${
                  visitType === id ? "border-primary shadow-md" : ""
                } ${
                  index === 0 && !visitType
                    ? "animate-pulse ring-2 ring-primary/40"
                    : ""
                }`}
              >
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                  {icon}
                </div>
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="text-muted-foreground text-sm">{text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Dialog with Form */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-semibold">
              {visitType === "visit-us"
                ? "Visit Our Office"
                : visitType === "we-visit"
                ? "We Visit You"
                : "Online Meeting"}
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <User className="h-5 w-5 text-primary" /> Contact Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name *</Label>
                  <Input
                    id="full_name"
                    name="full_name"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company">Company/Organization</Label>
                  <Input id="company" name="company" placeholder="Acme Inc." />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Date & Time */}
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="preferred_date">Preferred Date *</Label>
                <Input
                  id="preferred_date"
                  name="preferred_date"
                  type="date"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="preferred_time">Preferred Time *</Label>
                <Input
                  id="preferred_time"
                  name="preferred_time"
                  type="time"
                  required
                />
              </div>
            </div>

            {/* Conditional Fields */}
            {visitType === "we-visit" && (
              <div className="space-y-2">
                <Label htmlFor="address">Your Location Address *</Label>
                <Input
                  id="address"
                  name="address"
                  placeholder="123 Main St, Nairobi"
                  required
                />
              </div>
            )}

            {visitType === "online-meet" && (
              <div className="space-y-2">
                <Label>Preferred Meeting Method *</Label>
                <Select value={meetingMethod} onValueChange={setMeetingMethod}>
                  <SelectTrigger id="meetingMethod" name="meetingMethod">
                    <SelectValue placeholder="Select your preferred method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp Call</SelectItem>
                    <SelectItem value="video">Video Call</SelectItem>
                    <SelectItem value="google-meet">Google Meet</SelectItem>
                    <SelectItem value="phone">Phone Call</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Project Details */}
            <div className="space-y-2">
              <Label htmlFor="message">What would you like to discuss? *</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Tell us about your business needs, challenges, or project ideas..."
                rows={4}
                required
              />
            </div>

            <Button type="submit" size="lg" className="w-full">
              Schedule Visit
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
}
