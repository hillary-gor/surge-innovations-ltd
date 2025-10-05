"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  MapPin,
  Building2,
  CheckCircle2,
  Clock,
  Mail,
  Phone,
  User,
  Video,
} from "lucide-react";

export default function ScheduleVisitPage() {
  const [visitType, setVisitType] = useState<
    "visit-us" | "we-visit" | "online-meet"
  >("visit-us");
  const [meetingMethod, setMeetingMethod] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <main className="min-h-screen pt-24 pb-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-4xl font-bold">Visit Scheduled!</h1>
            <p className="text-xl text-muted-foreground">
              Thank you for scheduling a visit with Surge Innovations.
              We&apos;ll be in touch within 24 hours to confirm the details.
            </p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/">Return Home</Link>
            </Button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-16">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-balance">
              Schedule a Visit
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
              Let&apos;s meet in person to discuss how we can help transform
              your business with custom technology solutions.
            </p>
          </div>

          {/* Visit Type Selection */}
          <div className="mb-12">
            <RadioGroup
              value={visitType}
              onValueChange={(value) =>
                setVisitType(value as "visit-us" | "we-visit" | "online-meet")
              }
              className="grid md:grid-cols-3 gap-4"
            >
              {[
                {
                  id: "visit-us",
                  icon: <Building2 className="h-6 w-6 text-primary" />,
                  title: "Visit Our Office",
                  text:
                    "Come to our location for a tour and in-depth consultation about your project needs.",
                },
                {
                  id: "we-visit",
                  icon: <MapPin className="h-6 w-6 text-primary" />,
                  title: "We Visit You",
                  text:
                    "One of our team members will come to your location for a personalized consultation.",
                },
                {
                  id: "online-meet",
                  icon: <Video className="h-6 w-6 text-primary" />,
                  title: "Online Meet",
                  text:
                    "Connect with us remotely via video call, phone, or your preferred platform.",
                },
              ].map(({ id, icon, title, text }) => (
                <Card
                  key={id}
                  className={`relative cursor-pointer hover:border-primary transition-colors ${
                    visitType === id ? "border-primary shadow-md" : ""
                  }`}
                >
                  <label htmlFor={id} className="cursor-pointer block">
                    <RadioGroupItem
                      value={id}
                      id={id}
                      className="absolute top-4 right-4"
                    />
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10">
                        {icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{title}</h3>
                        <p className="text-muted-foreground">{text}</p>
                      </div>
                    </div>
                  </label>
                </Card>
              ))}
            </RadioGroup>
          </div>

          {/* Form */}
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Contact Information
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input id="name" placeholder="John Doe" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company/Organization</Label>
                    <Input id="company" placeholder="Acme Inc." />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+254 700 000 000"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  {visitType === "online-meet"
                    ? "Meeting Details"
                    : "Visit Details"}
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="date">Preferred Date *</Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="date" type="date" className="pl-10" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="time">Preferred Time *</Label>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input id="time" type="time" className="pl-10" required />
                    </div>
                  </div>
                </div>

                {visitType === "we-visit" && (
                  <div className="space-y-2">
                    <Label htmlFor="address">Your Location Address *</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="address"
                        placeholder="123 Main St, Nairobi"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                )}

                {visitType === "online-meet" && (
                  <div className="space-y-2">
                    <Label htmlFor="meeting-method">
                      Preferred Meeting Method *
                    </Label>
                    <Select
                      value={meetingMethod}
                      onValueChange={setMeetingMethod}
                    >
                      <SelectTrigger id="meeting-method">
                        <SelectValue placeholder="Select your preferred method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="whatsapp">WhatsApp Call</SelectItem>
                        <SelectItem value="video">Video Call</SelectItem>
                        <SelectItem value="google-meet">Google Meet</SelectItem>
                        <SelectItem value="phone">Phone Call</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll send you the meeting link or call you at your
                      preferred time.
                    </p>
                  </div>
                )}
              </div>

              {/* Project Details */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">
                  Tell Us About Your Project
                </h3>
                <div className="space-y-2">
                  <Label htmlFor="message">
                    What would you like to discuss? *
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us about your business needs, challenges, or project ideas..."
                    rows={5}
                    required
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Schedule Visit
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                We&apos;ll confirm your visit within 24 hours via email or
                phone.
              </p>
            </form>
          </Card>

          {/* Additional Info */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Clock className="h-8 w-8 text-primary mx-auto" />,
                title: "Quick Response",
                text: "We’ll confirm within 24 hours",
              },
              {
                icon: <Calendar className="h-8 w-8 text-primary mx-auto" />,
                title: "Flexible Scheduling",
                text: "Choose what works best for you",
              },
              {
                icon: <CheckCircle2 className="h-8 w-8 text-primary mx-auto" />,
                title: "No Obligation",
                text: "Free consultation, no strings attached",
              },
            ].map(({ icon, title, text }, i) => (
              <Card key={i} className="p-6 text-center space-y-2">
                {icon}
                <h4 className="font-semibold">{title}</h4>
                <p className="text-sm text-muted-foreground">{text}</p>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
