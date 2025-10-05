"use client";

import type React from "react";

import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("[v0] Form submitted:", formData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
                Let&apos;s Build{" "}
                <span className="text-primary">Something Great</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                Ready to transform your organization with custom technology? Get
                in touch and let&apos;s discuss your project.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-16">
          <div className="container px-4">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Send Us a Message</h2>
                  <p className="text-muted-foreground">
                    Fill out the form below and we&apos;ll get back to you
                    within 24 hours.
                  </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium">
                        Company
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                        placeholder="Your Company"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-sm font-medium">
                        Phone
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="projectType"
                      className="text-sm font-medium"
                    >
                      Project Type *
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                    >
                      <option value="">Select a project type</option>
                      <option value="web-app">Web Application</option>
                      <option value="mobile-app">Mobile Application</option>
                      <option value="platform">Custom Platform</option>
                      <option value="integration">System Integration</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-medium">
                      Budget Range
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background"
                    >
                      <option value="">Select a budget range</option>
                      <option value="under-25k">Under $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k-100k">$50,000 - $100,000</option>
                      <option value="100k-plus">$100,000+</option>
                      <option value="not-sure">Not sure yet</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Project Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background resize-none"
                      placeholder="Tell us about your project, goals, and timeline..."
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-bold">Get in Touch</h2>
                  <p className="text-muted-foreground">
                    Prefer to reach out directly? Here are other ways to connect
                    with us.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Email Us</h3>
                      <p className="text-muted-foreground">
                        hello@surgeinnovations.com
                      </p>
                      <p className="text-sm text-muted-foreground">
                        We&apos;ll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Call Us</h3>
                      <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="text-sm text-muted-foreground">
                        Mon-Fri, 9am-6pm EST
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">Visit Us</h3>
                      <p className="text-muted-foreground">
                        123 Innovation Drive
                      </p>
                      <p className="text-muted-foreground">
                        San Francisco, CA 94105
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg space-y-4">
                  <h3 className="font-semibold">What Happens Next?</h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary">1.</span>
                      <span>
                        We&apos;ll review your message and schedule a discovery
                        call
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary">2.</span>
                      <span>
                        We&apos;ll discuss your goals, requirements, and
                        timeline
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary">3.</span>
                      <span>
                        We&apos;ll provide a detailed proposal and custom quote
                      </span>
                    </li>
                    <li className="flex gap-3">
                      <span className="font-semibold text-primary">4.</span>
                      <span>
                        Once approved, we&apos;ll kick off your project!
                      </span>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Common Questions
                </h2>
              </div>
              <div className="space-y-8">
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">
                    How long does a typical project take?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Project timelines vary based on complexity and scope. Simple
                    projects can be completed in 4-8 weeks, while more complex
                    platforms may take 3-6 months. We&apos;ll provide a detailed
                    timeline during our discovery phase.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">
                    Do you work with organizations outside the US?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Yes! We work with clients globally and have experience
                    managing projects across different time zones and regions.
                  </p>
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold">
                    What if I&apos;m not sure exactly what I need?
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    That&apos;s perfectly fine! Our discovery process is
                    designed to help clarify your needs and identify the best
                    solutions. We&apos;ll guide you through the entire planning
                    process.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
