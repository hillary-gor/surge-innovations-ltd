import { LegalLayout } from "@/components/legal/legal-layout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Surge Innovations",
  description: "How Surge Innovations collects, uses, and protects your business data and intellectual property.",
};

const TOC = [
  { id: "collection", label: "1. Data We Collect" },
  { id: "usage", label: "2. How We Use Data" },
  { id: "sharing", label: "3. Third-Party Sharing" },
  { id: "security", label: "4. Security & IP Protection" },
  { id: "rights", label: "5. Your Rights" },
  { id: "contact", label: "6. Contact" },
];

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      lastUpdated="January 26, 2026"
      tableOfContents={TOC}
    >
      <p className="lead text-xl text-muted-foreground mb-8">
        At Surge Innovations, we understand that your business ideas and code are your most valuable assets.
        This policy outlines how we handle your data, ensuring confidentiality and security throughout our development process.
      </p>

      <section id="collection" className="mb-12">
        <h2>1. Information We Collect</h2>
        <h3>A. Client Information</h3>
        <p>We collect names, business emails, billing addresses, and tax identification numbers (where applicable for invoicing).</p>
        
        <h3>B. Project Specifications</h3>
        <p>
          We collect detailed project requirements, design files, and access credentials to existing systems 
          necessary for us to perform our services.
        </p>

        <h3>C. Technical Telemetry</h3>
        <p>
          When you use our SaaS products or dashboards, we may collect technical logs (IP addresses, browser types) 
          for debugging and security auditing purposes.
        </p>
      </section>

      <section id="usage" className="mb-12">
        <h2>2. How We Use Your Information</h2>
        <ul>
          <li><strong>Service Delivery:</strong> To build, deploy, and maintain your software projects.</li>
          <li><strong>Communication:</strong> To send project updates, sprint reports, and invoices.</li>
          <li><strong>Security:</strong> To verify identity and prevent unauthorized access to your source code repositories.</li>
          <li>
            <strong>Legal Compliance:</strong> To comply with tax obligations and enforce our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link>.
          </li>
        </ul>
      </section>

      <section id="sharing" className="mb-12">
        <h2>3. Sharing of Information</h2>
        <p>We do not sell your data. We share information only when necessary to build your product:</p>
        
        <div className="grid md:grid-cols-2 gap-4 my-6 not-prose">
            <div className="p-4 border border-border rounded-lg bg-card shadow-sm">
                <h4 className="font-semibold text-foreground mb-2">Cloud Infrastructure</h4>
                <p className="text-sm text-muted-foreground">We deploy your apps to providers like Vercel, AWS, or Supabase. Your data resides on their secure servers.</p>
            </div>
            <div className="p-4 border border-border rounded-lg bg-card shadow-sm">
                <h4 className="font-semibold text-foreground mb-2">Payment Processors</h4>
                <p className="text-sm text-muted-foreground">Billing data is handled securely by Stripe or local payment gateways. We do not store raw credit card numbers.</p>
            </div>
        </div>
      </section>

      <section id="security" className="mb-12">
        <h2>4. Security & IP Protection</h2>
        <p>
          We treat your Intellectual Property (IP) with the highest level of care.
        </p>
        <ul className="list-disc pl-5 space-y-2 mt-4">
            <li><strong>Encryption:</strong> All data is encrypted in transit (SSL/TLS) and at rest (AES-256) where possible.</li>
            <li><strong>Access Control:</strong> Only developers assigned to your specific project have access to your source code.</li>
            <li><strong>NDAs:</strong> All our developers and contractors are bound by strict Non-Disclosure Agreements.</li>
        </ul>
      </section>

      <section id="rights" className="mb-12">
        <h2>5. Your Rights</h2>
        <p>
          You have the right to request access to your data or request the deletion of your account.
          For source code deletion requests, please refer to the data retention clause in your Master Services Agreement (MSA).
          <br/><br/>
          Contact our Data Protection Officer at <a href="mailto:info@surgeinnovations.org" className="text-primary hover:underline">info@surgeinnovations.org</a>.
        </p>
      </section>

      <section id="contact" className="border-t border-border pt-8">
        <h2>6. Contact Information</h2>
        <p>
            If you have questions about this Privacy Policy, please contact:
            <br />
            <strong>Surge Innovations Ltd</strong>
            <br />
            Email: <a href="mailto:info@surgeinnovations.org" className="text-primary hover:underline">info@surgeinnovations.org</a>
        </p>
      </section>
    </LegalLayout>
  );
}