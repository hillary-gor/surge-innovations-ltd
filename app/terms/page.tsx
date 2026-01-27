import { LegalLayout } from "@/components/legal/legal-layout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Surge Innovations",
  description: "Terms and conditions for engaging with Surge Innovations for software development, design, and consultancy services.",
};

const TOC = [
  { id: "intro", label: "1. Introduction" },
  { id: "nature", label: "2. Nature of Services" },
  { id: "accounts", label: "3. Accounts & Access" },
  { id: "booking", label: "4. Project Engagement" },
  { id: "payments", label: "5. Fees & Retainers" },
  { id: "reviews", label: "6. Intellectual Property" },
  { id: "disputes", label: "7. Acceptance & Revisions" },
  { id: "conduct", label: "8. Client Responsibilities" },
  { id: "liability", label: "9. Liability & Warranties" },
  { id: "contact", label: "10. Contact Us" },
];

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms of Service"
      lastUpdated="January 26, 2026"
      tableOfContents={TOC}
    >
      <p className="lead text-xl">
        Welcome to Surge Innovations. Please read these terms carefully as they govern the
        relationship between you (the &quot;Client&quot;) and Surge Innovations Ltd regarding our software solutions.
      </p>

      <section id="intro" className="mb-12">
        <h2>1. Introduction</h2>
        <p>
          Welcome to Surge Innovations (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;). 
          These Terms and Conditions (&quot;Terms&quot;) govern your use of our website located at surgeinnovations.org 
          (the &quot;Site&quot;) and our software development services. By engaging us for a project or subscribing to a plan, you agree to be bound by these Terms.
        </p>
      </section>

      <section id="nature" className="mb-12">
        <h2>2. Nature of Services</h2>
        <p>
          Surge Innovations is a digital transformation agency providing custom software development,
          UI/UX design, and cloud infrastructure management.
        </p>
        
        {/* SEMANTIC ALERT: ACCENT */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-600 p-4 my-4 rounded-r-lg not-prose">
          <h4 className="text-foreground font-bold text-sm uppercase tracking-wide mb-1">Scope Disclaimer</h4>
          <p className="text-muted-foreground text-sm">
            We provide technology tools and code. While we strive for perfection, we <strong>do not guarantee</strong> specific business outcomes (ROI) 
            resulting from the use of our software. Software is provided &quot;as is&quot; unless covered by a specific Maintenance Agreement.
          </p>
        </div>
      </section>

      <section id="accounts" className="mb-12">
        <h2>3. Accounts and Access</h2>
        <ul>
          <li><strong>Client Dashboard:</strong> Clients may be issued accounts to access project milestones, invoices, and beta builds.</li>
          <li>
            <strong>Security:</strong> You are responsible for maintaining the confidentiality of your login credentials. 
            Any action performed under your account is your responsibility.
          </li>
          <li><strong>Access Revocation:</strong> We reserve the right to suspend access to project dashboards in the event of non-payment or breach of contract.</li>
        </ul>
      </section>

      <section id="reviews" className="mb-12 scroll-mt-24">
        <h2>6. Intellectual Property Rights</h2>
        <p>
          Ownership of code and assets is a critical part of our relationship. Unless otherwise specified in a Master Services Agreement (MSA):
        </p>
        
        {/* SEMANTIC ALERT: INFO */}
        <div className="bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-5 rounded-lg my-6 not-prose">
            <h4 className="font-semibold text-foreground mb-2 flex items-center">
               © Ownership Structure
            </h4>
            <ul className="list-disc pl-5 space-y-2 text-sm text-muted-foreground">
                <li><strong className="text-foreground">Client Ownership:</strong> Upon full payment, the Client owns the specific source code, custom designs, and content created specifically for their project.</li>
                <li><strong className="text-foreground">Surge Background IP:</strong> Surge retains ownership of pre-existing code libraries, developer tools, and reusable frameworks used to build the project. You are granted a perpetual, non-exclusive license to use these.</li>
                <li><strong className="text-foreground">Third-Party Assets:</strong> Libraries, fonts, and stock assets are subject to their respective open-source or commercial licenses.</li>
            </ul>
        </div>
      </section>

      <section id="disputes" className="mb-12">
        <h2>7. Acceptance & Revisions</h2>
        <p>
          We adhere to an Agile development methodology. Deliverables are provided in sprints or milestones.
        </p>
        
        <h3>7.1 Acceptance Period</h3>
        <p>The Client has a standard <strong>5-business-day window</strong> (&quot;Review Period&quot;) upon delivery of a milestone to test and report bugs.</p>
        
        <h3>7.2 Bug Fixes vs. Change Requests</h3>
        <p>Distinguishing between errors and new features is vital for project velocity:</p>
        <ul className="text-sm space-y-2 mt-2">
            <li>✅ <strong>Bug (Included):</strong> The software crashes, fails to load, or behaves differently than the approved design mockups. We fix these at no cost during the Review Period.</li>
            <li>❌ <strong>Change Request (Billable):</strong> &quot;I want this button to be blue instead of red&quot; (after approving red), or &quot;Let&apos;s add a new payment method.&quot; These are new scope and will be billed hourly.</li>
        </ul>
      </section>

      <section id="liability" className="mb-12">
        <h2>9. Limitation of Liability</h2>
        <p>
           To the fullest extent permitted by applicable law (including Kenyan laws), Surge Innovations shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or business interruption, resulting from (i) technical bugs or server downtime; (ii) third-party API failures (e.g., Google Maps or Stripe going down); or (iii) unauthorized access to your data due to Client negligence (e.g., weak passwords).
        </p>
      </section>

      <section id="contact" className="border-t border-border pt-8">
        <h2>10. Contact Us</h2>
        <p>
          For legal inquiries regarding contracts or these terms, please contact:
          <br />
          <a href="mailto:info@surgeinnovations.org" className="font-semibold text-primary hover:underline">info@surgeinnovations.org</a>
        </p>
      </section>
    </LegalLayout>
  );
}