import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "SkyJet Aircraft Spares",
      client: "SkyJet Aircraft Spares",
      category: "Aviation / Aerospace Supplies",
      description:
        "A digital storefront for aircraft spares, safety equipment, engine components, and more. Features advanced search and filtering by part number or name, with seamless enquiry options via WhatsApp, email, and phone. Full product inventory categorization includes tools, engine parts, hangar supplies, and avionics.",
      results: [
        "Reduced search time for customers",
        "Increased enquiries and orders via digital channels",
        "Improved inventory visibility and fewer out-of-stock cases",
      ],
      image: "/aviation-aircraft-parts-ecommerce-catalog-interfac.jpg",
      tags: ["E-Commerce", "Cloud Backend", "Mobile Responsive"],
      website: "https://skyjetaircraftspares.com",
    },
    {
      title: "Code Blue Medical Training Institute",
      client: "CBMTI",
      category: "Education / Healthcare Training",
      description:
        "A comprehensive website showcasing healthcare training programs including Healthcare Assistance, Peri-operative Theatre Technology, and Nutrition & Dietetics. Features graduates count, student job success rates, accredited programs, modern training facilities, intakes, course offerings, and application management.",
      results: [
        "Increased online applications",
        "Faster student admission and onboarding process",
        "Higher student satisfaction and visitor-to-enrollee conversion",
      ],
      image: "/medical-training-institute-education-platform-dash.jpg",
      tags: ["Web Presence", "Course Management", "Responsive UI"],
      website: "https://codebluemedical.co.ke",
    },
    {
      title: "Association of Certified Caregivers Kenya",
      client: "ACCGK",
      category: "Certification / Professional Association",
      description:
        "A membership and certification platform where caregivers and institutions can register, verify credentials, partner, and submit complaints. Includes continuous professional development, training workshops, certification, mentorship, resource access, and institutional partner portal with regulation and standards enforcement framework.",
      results: [
        "Increased number of certified caregivers",
        "New institutional partnerships formed",
        "Reduced credential verification time and improved member satisfaction",
      ],
      image: "/professional-certification-membership-portal-dashb.jpg",
      tags: ["Membership System", "Certification Workflows", "Training Portal"],
      website: "https://accgk.co.ke",
    },
    {
      title: "Greenfield Academy",
      client: "Greenfield Academy",
      category: "Education / K-12 School",
      description:
        "A complete school management system with student information management, grade tracking, attendance monitoring, parent portal, and staff collaboration tools. Features automated report card generation, fee management, timetable scheduling, and real-time parent-teacher communication.",
      results: [
        "90% reduction in administrative paperwork",
        "Improved parent engagement with 85% portal adoption",
        "Streamlined fee collection with automated reminders",
      ],
      image: "/modern-school-management-dashboard-with-student-gra.jpg",
      tags: ["School Management", "Parent Portal", "Automation"],
    },
    {
      title: "Hope Foundation",
      client: "Hope Foundation",
      category: "Non-Profit / Social Impact",
      description:
        "A donor management and fundraising platform with online donation processing, campaign tracking, volunteer coordination, and impact reporting. Features automated donor receipts, recurring donation management, event registration, and transparent fund allocation dashboards.",
      results: [
        "300% increase in online donations",
        "Reduced donation processing time by 75%",
        "Improved donor retention with personalized impact reports",
      ],
      image: "/nonprofit-donation-platform-dashboard-with-fundrais.jpg",
      tags: ["Fundraising", "Donor Management", "Impact Tracking"],
    },
    {
      title: "FreshMart Distribution",
      client: "FreshMart Distribution",
      category: "Retail / Supply Chain",
      description:
        "An inventory and operations management system for a food distribution company. Features real-time stock tracking, automated reorder alerts, delivery route optimization, supplier management, and sales analytics. Integrated mobile app for delivery drivers with proof of delivery.",
      results: [
        "40% reduction in stock wastage",
        "Improved delivery efficiency by 35%",
        "Real-time visibility across 12 distribution centers",
      ],
      image: "/inventory-management-dashboard-with-stock-levels-an.jpg",
      tags: ["Inventory Management", "Route Optimization", "Mobile App"],
    },
  ];

  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
                Real Results for{" "}
                <span className="text-primary">Real Organizations</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                See how we&apos;ve helped startups, schools, non-profits, and
                businesses transform their operations with custom technology
                solutions.
              </p>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-16">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto space-y-24">
              {caseStudies.map((study, index) => (
                <div
                  key={index}
                  className={`grid md:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`space-y-6 ${
                      index % 2 === 1 ? "md:order-2" : ""
                    }`}
                  >
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                      {study.category}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold">
                      {study.title}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {study.description}
                    </p>
                    <div className="space-y-3">
                      <h3 className="font-semibold">Key Results:</h3>
                      <ul className="space-y-2">
                        {study.results.map((result, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-2 text-muted-foreground"
                          >
                            <ArrowRight className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span>{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 rounded-full bg-muted text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {study.website && (
                      <Button variant="outline" asChild>
                        <a
                          href={study.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2"
                        >
                          Visit Website
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                    )}
                  </div>
                  <div className={index % 2 === 1 ? "md:order-1" : ""}>
                    <div className="relative rounded-lg overflow-hidden border border-border shadow-lg aspect-[16/9]">
                      <Image
                        src={study.image || "/placeholder.svg"}
                        alt={study.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-muted/30">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  50+
                </div>
                <div className="text-muted-foreground">Projects Delivered</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  99.9%
                </div>
                <div className="text-muted-foreground">Average Uptime</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  100K+
                </div>
                <div className="text-muted-foreground">Users Served</div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold text-primary">
                  24/7
                </div>
                <div className="text-muted-foreground">Support Available</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Write Your Success Story?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let&apos;s discuss how we can help you achieve similar results
                for your organization.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Start Your Project</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
