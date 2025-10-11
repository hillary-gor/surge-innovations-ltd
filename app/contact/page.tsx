"use client";

import React, { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: "",
    budget: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const supabase = createClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, projectType, message } = formData;
    if (!name || !email || !projectType || !message) {
      toast.warning("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.from("contact_messages").insert([
        {
          name: formData.name,
          email: formData.email,
          company: formData.company,
          phone: formData.phone,
          project_type: formData.projectType,
          budget: formData.budget,
          message: formData.message,
        },
      ]);

      if (error) throw error;

      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        projectType: "",
        budget: "",
        message: "",
      });
    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 overflow-x-hidden">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
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
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
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
                  {/* Row 1 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput
                      label="Name *"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                    />
                    <FormInput
                      label="Email *"
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Row 2 */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormInput
                      label="Company"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company"
                    />
                    <FormInput
                      label="Phone"
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  {/* Project Type */}
                  <FormSelect
                    label="Project Type *"
                    id="projectType"
                    name="projectType"
                    required
                    value={formData.projectType}
                    onChange={handleChange}
                    options={[
                      "Web Application",
                      "Mobile Application",
                      "Custom Platform",
                      "System Integration",
                      "Consulting",
                      "Other",
                    ]}
                  />

                  {/* Budget */}
                  <FormSelect
                    label="Budget Range"
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    options={[
                      "Under $25,000",
                      "$25,000 - $50,000",
                      "$50,000 - $100,000",
                      "$100,000+",
                      "Not sure yet",
                    ]}
                  />

                  {/* Message */}
                  <FormTextarea
                    label="Project Details *"
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project, goals, and timeline..."
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
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
                  {[
                    {
                      icon: Mail,
                      title: "Email Us",
                      lines: [
                        "sales@surgeinnovations.org",
                        "We’ll respond within 24 hours",
                      ],
                    },
                    {
                      icon: Phone,
                      title: "Call Us",
                      lines: ["+254 (113) 015-069", "Mon-Fri, 9am-6pm EAT"],
                    },
                    {
                      icon: MapPin,
                      title: "Visit Us",
                      lines: [
                        "City House, Standard Street",
                        "Nairobi, 00100, Kenya",
                      ],
                    },
                  ].map(({ icon: Icon, title, lines }, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-semibold">{title}</h3>
                        {lines.map((line, i) => (
                          <p key={i} className="text-muted-foreground">
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-muted/30 rounded-lg space-y-4">
                  <h3 className="font-semibold">What Happens Next?</h3>
                  <ol className="space-y-3 text-sm text-muted-foreground">
                    {[
                      "We’ll review your message and schedule a discovery call",
                      "We’ll discuss your goals, requirements, and timeline",
                      "We’ll provide a detailed proposal and custom quote",
                      "Once approved, we’ll kick off your project!",
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <span className="font-semibold text-primary">
                          {i + 1}.
                        </span>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Common Questions
                </h2>
              </div>
              <div className="space-y-8">
                <FAQItem
                  q="How long does a typical project take?"
                  a="Project timelines vary based on complexity and scope. Simple projects can be completed in 4–8 weeks, while complex platforms may take 3–6 months."
                />
                <FAQItem
                  q="Do you work with organizations outside Kenya?"
                  a="Absolutely. We serve clients globally across multiple time zones and regions."
                />
                <FAQItem
                  q="What if I’m not sure exactly what I need?"
                  a="That’s totally fine — our discovery process helps clarify your needs and identify the right solutions."
                />
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}

// --- Reusable Inputs ---
function FormInput({
  label,
  id,
  name,
  type = "text",
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background"
        placeholder={placeholder}
      />
    </div>
  );
}

function FormSelect({
  label,
  id,
  name,
  required,
  value,
  onChange,
  options,
}: {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase().replace(/\s+/g, "-")}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

function FormTextarea({
  label,
  id,
  name,
  required,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  value: string | undefined;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        rows={6}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background resize-none"
        placeholder={placeholder}
      />
    </div>
  );
}

function FAQItem({ q, a }: { q: string; a: string }) {
  return (
    <div className="space-y-3">
      <h3 className="text-xl font-semibold">{q}</h3>
      <p className="text-muted-foreground leading-relaxed">{a}</p>
    </div>
  );
}
