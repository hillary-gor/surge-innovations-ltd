"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { 
  Mail, Phone, MapPin, Send, 
  CheckCircle2, CalendarDays, Loader2, ShieldCheck 
} from "lucide-react";
import { toast } from "sonner";
import { submitContactForm } from "./contact-actions";

// --- TYPES ---
interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  projectType: string;
  budget?: string;
  message: string;
}

// --- LOGIC COMPONENT (Wrapped in Suspense) ---
function ContactContent() {
  const searchParams = useSearchParams();
  
  // 1. Capture Data from URL
  const plan = searchParams.get("plan");
  const price = searchParams.get("price");
  const billing = searchParams.get("billing");
  const type = searchParams.get("type");
  // FIX: Capture currency, default to USD if missing
  const currencyCode = searchParams.get("currency") || "USD"; 

  // FIX: Determine Symbol based on code
  const currencySymbol = 
    currencyCode === "KES" ? "KES" : 
    currencyCode === "GBP" ? "£" : 
    currencyCode === "EUR" ? "€" : "$";

  const isBooking = type === "strategy-call";
  const isPlanRequest = !!plan && !isBooking;

  // 2. Initialize State based on Context
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    company: "",
    phone: "",
    projectType: isPlanRequest ? "Custom Platform" : "",
    // FIX: Use dynamic symbol here
    budget: price ? `${currencySymbol} ${parseInt(price).toLocaleString()}+` : "",
    message: isPlanRequest 
      ? `I would like to proceed with the ${plan} package (${billing || 'Annual'}).` 
      : "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { name, email, projectType, message } = formData;
    
    // Basic validation
    if (!name || !email || (!isPlanRequest && !projectType) || !message) {
      toast.warning("Please fill out all required fields.");
      setIsSubmitting(false);
      return;
    }

    try {
      // 3. Submit to Server Action (Handles the extra columns)
      const result = await submitContactForm({
        ...formData,
        // Pass context data to the backend
        selectedPlan: plan || undefined,
        planPrice: price || undefined,
        billingCycle: billing || undefined,
        requestType: isPlanRequest ? "invoice" : isBooking ? "strategy" : "general",
        // Pass currency to backend too if needed
      });

      if (!result.success) throw new Error(result.message);

      toast.success(isPlanRequest 
        ? "Request received! We're generating your pro-forma invoice." 
        : "Message sent successfully! We'll get back to you soon."
      );
      
      // Reset form
      setFormData({
        name: "", email: "", company: "", phone: "", 
        projectType: "", budget: "", message: "" 
      });

    } catch (err) {
      console.error("Error sending message:", err);
      toast.error("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      {/* Hero Section - Dynamic Text */}
      <section className="py-24 md:py-32">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
              {isBooking ? (
                <>Schedule Your <span className="text-primary">Strategy Call</span></>
              ) : isPlanRequest ? (
                <>Activate <span className="text-primary">{plan}</span></>
              ) : (
                <>Let&apos;s Build <span className="text-primary">Something Great</span></>
              )}
            </h1>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              {isBooking 
                ? "Book a time with our Lead Architect to discuss your enterprise requirements."
                : isPlanRequest
                ? "You are one step away from launch. Fill out the details below to generate your invoice."
                : "Ready to transform your organization with custom technology? Get in touch and let's discuss your project."}
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
            
            {/* LEFT COLUMN: Form or Calendar */}
            <div className="space-y-8">
              
              {/* 4. Scenario: Calendar Booking */}
              {isBooking ? (
                <div className="bg-card border border-border rounded-xl p-8 text-center space-y-6">
                   <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <CalendarDays className="h-8 w-8" />
                   </div>
                   <div>
                     <h3 className="text-2xl font-bold mb-2">Booking Calendar</h3>
                     <p className="text-muted-foreground">
                       
                       <br/>
                       (Integrate Calendly/Cal.com iframe here)
                     </p>
                   </div>
                   <div className="pt-4 border-t border-border">
                     <p className="text-sm text-muted-foreground">Prefer email? <br/> <a href="mailto:sales@surgeinnovations.org" className="text-primary hover:underline">sales@surgeinnovations.org</a></p>
                   </div>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    <h2 className="text-3xl font-bold">
                      {isPlanRequest ? "Account Details" : "Send Us a Message"}
                    </h2>
                    <p className="text-muted-foreground">
                      {isPlanRequest 
                        ? "Enter your details for the license agreement."
                        : "Fill out the form below and we'll get back to you within 24 hours."}
                    </p>
                  </div>

                  {/* 5. Scenario: Order Summary Card (Only if plan selected) */}
                  {isPlanRequest && (
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 mb-8">
                      <div className="flex items-center justify-between border-b border-primary/10 pb-4 mb-4">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5 text-primary" />
                          <span className="font-semibold text-lg">{plan}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-xl">
                             {/* FIX: Use dynamic currency symbol here instead of hardcoded KES */}
                             {price ? `${currencySymbol} ${parseInt(price).toLocaleString()}` : "Custom"}
                          </div>
                          <div className="text-xs text-muted-foreground uppercase">{billing || "Annual"}</div>
                        </div>
                      </div>
                      <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex gap-2 items-center"><ShieldCheck className="h-4 w-4 text-green-600"/> 100% Development Subsidy Applied</div>
                          <div className="flex gap-2 items-center"><ShieldCheck className="h-4 w-4 text-green-600"/> Data Ownership Guarantee</div>
                      </div>
                    </div>
                  )}

                  {/* Standard Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                        placeholder="+254..."
                      />
                    </div>

                    {/* Hide these fields if a Plan is already selected to reduce friction */}
                    {!isPlanRequest && (
                      <>
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
                      </>
                    )}

                    <FormTextarea
                      label={isPlanRequest ? "Additional Notes" : "Project Details *"}
                      id="message"
                      name="message"
                      required={!isPlanRequest} // Not strictly required if just buying a plan
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={isPlanRequest ? "Any specific invoicing details?" : "Tell us about your project, goals, and timeline..."}
                    />

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting 
                        ? "Processing..." 
                        : isPlanRequest 
                          ? "Request Invoice" 
                          : "Send Message"}
                      <Send className="ml-2 h-5 w-5" />
                    </Button>
                    
                    {isPlanRequest && (
                      <p className="text-xs text-center text-muted-foreground">
                        No payment required today. We will send a pro-forma invoice.
                      </p>
                    )}
                  </form>
                </>
              )}
            </div>

            {/* Right Column: Contact Info */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold">Get in Touch</h2>
                <p className="text-muted-foreground">
                  Prefer to reach out directly? Here are other ways to connect with us.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "Email Us",
                    lines: ["sales@surgeinnovations.org", "We’ll respond within 24 hours"],
                  },
                  {
                    icon: Phone,
                    title: "Call Us",
                    lines: ["+254 (113) 015-069", "Mon-Fri, 9am-6pm EAT"],
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    lines: ["City House, Standard Street", "Nairobi, 00100, Kenya"],
                  },
                ].map(({ icon: Icon, title, lines }, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-6 bg-card rounded-lg border border-border">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-semibold">{title}</h3>
                      {lines.map((line, i) => (
                        <p key={i} className="text-muted-foreground">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-6 bg-muted/30 rounded-lg space-y-4">
                <h3 className="font-semibold">What Happens Next?</h3>
                <ol className="space-y-3 text-sm text-muted-foreground">
                  {[
                    "We’ll review your details immediately",
                    "We’ll generate your custom agreement/invoice",
                    "We schedule a kickoff call to align on goals",
                    "Development begins immediately after sign-off!",
                  ].map((step, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-semibold text-primary">{i + 1}.</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// --- HELPER COMPONENTS WITH PROPER TYPES ---

interface FormInputProps {
  label: string;
  id: string;
  name: string;
  type?: string;
  required?: boolean;
  value?: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

function FormInput({ label, id, name, type = "text", required, value, onChange, placeholder }: FormInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <input
        type={type} id={id} name={name} required={required} value={value} onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background"
        placeholder={placeholder}
      />
    </div>
  );
}

interface FormSelectProps {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  value?: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLSelectElement>;
  options: string[];
}

function FormSelect({ label, id, name, required, value, onChange, options }: FormSelectProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <select
        id={id} name={name} required={required} value={value} onChange={onChange}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background"
      >
        <option value="">Select an option</option>
        {options.map((opt) => (
          <option key={opt} value={opt.toLowerCase().replace(/\s+/g, "-")}>{opt}</option>
        ))}
      </select>
    </div>
  );
}

interface FormTextareaProps {
  label: string;
  id: string;
  name: string;
  required?: boolean;
  value?: string | number | readonly string[];
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  rows?: number;
}

function FormTextarea({ label, id, name, required, value, onChange, placeholder, rows = 6 }: FormTextareaProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="text-sm font-medium">{label}</label>
      <textarea
        id={id} name={name} required={required} value={value} onChange={onChange} rows={rows}
        className="w-full px-4 py-3 rounded-lg border border-input bg-background resize-none"
        placeholder={placeholder}
      />
    </div>
  );
}

// --- MAIN EXPORT ---
export default function ContactPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16 overflow-x-hidden">
        <Suspense fallback={
          <div className="h-screen w-full flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }>
          <ContactContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}