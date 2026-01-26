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
  Check,
  Users,
  Zap,
  Shield,
  TrendingUp,
  Clock,
  DollarSign,
} from "lucide-react";
import Link from "next/link";

export default function TechAsAServicePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-linear-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Zap className="h-4 w-4" />
            Tech-as-a-Service
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Your On-Demand
            <br />
            <span className="text-primary">Technology Department</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-3xl mx-auto">
            Skip the complexity of hiring, managing, and scaling an internal
            tech team. Surge embeds as your complete technology
            partner—delivering strategy, design, development, and support at a
            fraction of the cost.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#inquiry-form">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/case-studies">View Our Work</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">
            Building a Tech Team is Hard
          </h2>
          <p className="text-lg text-muted-foreground mb-12 text-pretty">
            Hiring developers takes months. Managing them requires expertise.
            Scaling costs a fortune. And if someone leaves, your project stalls.
            There&apos;s a better way.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-left">
              <div className="text-4xl font-bold text-destructive mb-2">
                6+ months
              </div>
              <p className="text-muted-foreground">
                Average time to hire and onboard a senior developer
              </p>
            </Card>
            <Card className="p-6 text-left">
              <div className="text-4xl font-bold text-destructive mb-2">
                $150K+
              </div>
              <p className="text-muted-foreground">
                Annual cost per senior engineer (salary + benefits + overhead)
              </p>
            </Card>
            <Card className="p-6 text-left">
              <div className="text-4xl font-bold text-destructive mb-2">
                3-5 people
              </div>
              <p className="text-muted-foreground">
                Minimum team size needed for full-stack development
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              How Surge Works as Your Tech Team
            </h2>
            <p className="text-lg text-muted-foreground text-pretty max-w-2xl mx-auto">
              We operate as your embedded technology department, handling
              everything from strategy to deployment—so you can focus on your
              business.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">
                The Surge Pod Model
              </h3>
              <p className="text-muted-foreground mb-6">
                Each client gets a dedicated, cross-functional pod that owns
                your product end-to-end:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <strong>Full-Stack Developer(s)</strong> - Build your
                    frontend and backend systems
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <strong>UI/UX Designer</strong> - Create beautiful,
                    user-friendly interfaces
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <strong>Product Manager</strong> - Coordinate timelines and
                    requirements
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                  <span>
                    <strong>QA/DevOps Engineer</strong> - Ensure quality,
                    deployment, and monitoring
                  </span>
                </li>
              </ul>
            </Card>

            <Card className="p-8">
              <Clock className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-4">
                Fast, Predictable Delivery
              </h3>
              <p className="text-muted-foreground mb-6">
                Our sprint-driven methodology means you get working software
                quickly:
              </p>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Week 1-2</span>
                    <span className="text-sm text-muted-foreground">
                      Discovery & Design
                    </span>
                  </div>
                  <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-1/3" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Week 3-4</span>
                    <span className="text-sm text-muted-foreground">
                      Core Development
                    </span>
                  </div>
                  <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Week 5-6</span>
                    <span className="text-sm text-muted-foreground">
                      Testing & Launch
                    </span>
                  </div>
                  <div className="h-2 bg-primary/20 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full" />
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-6">
                <strong>Standard MVP: 4-6 weeks</strong> from kickoff to
                production
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Companies Choose Surge
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <DollarSign className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Cost-Effective</h3>
              <p className="text-muted-foreground">
                Get an entire tech team for less than the cost of one senior
                developer. No recruitment fees, benefits, or overhead.
              </p>
            </Card>
            <Card className="p-6">
              <Zap className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Instant Expertise</h3>
              <p className="text-muted-foreground">
                Access senior-level talent immediately. No months-long hiring
                process or onboarding delays.
              </p>
            </Card>
            <Card className="p-6">
              <TrendingUp className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Scalable on Demand</h3>
              <p className="text-muted-foreground">
                Scale your tech capacity up or down based on your needs. No
                long-term commitments or layoffs.
              </p>
            </Card>
            <Card className="p-6">
              <Shield className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Zero Management Overhead
              </h3>
              <p className="text-muted-foreground">
                We handle team coordination, technical decisions, and project
                management. You just review and approve.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                No Single Point of Failure
              </h3>
              <p className="text-muted-foreground">
                If someone is unavailable, we have backup. Your project never
                stalls due to one person leaving.
              </p>
            </Card>
            <Card className="p-6">
              <Check className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Full-Stack Coverage
              </h3>
              <p className="text-muted-foreground">
                From design to DevOps, we handle every layer of your tech stack.
                One team, complete ownership.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Included */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Everything You Need, Included
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">
                  Product Strategy & Planning
                </h3>
                <p className="text-sm text-muted-foreground">
                  Requirements mapping, technical architecture, roadmap planning
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">UI/UX Design</h3>
                <p className="text-sm text-muted-foreground">
                  User research, wireframes, high-fidelity prototypes, design
                  systems
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Full-Stack Development</h3>
                <p className="text-sm text-muted-foreground">
                  Frontend, backend, APIs, databases, integrations
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Cloud Infrastructure</h3>
                <p className="text-sm text-muted-foreground">
                  Deployment, hosting, scaling, security, monitoring
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Quality Assurance</h3>
                <p className="text-sm text-muted-foreground">
                  Testing, bug fixes, performance optimization
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Ongoing Support</h3>
                <p className="text-sm text-muted-foreground">
                  Maintenance, updates, technical support, feature additions
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Fractional CTO Services</h3>
                <p className="text-sm text-muted-foreground">
                  Strategic technical leadership and decision-making
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-6 w-6 text-primary mt-1 shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Systems Integration</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with payment gateways, CRMs, APIs, third-party tools
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ideal For Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Perfect For</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">
                Startups & Founders
              </h3>
              <p className="text-muted-foreground">
                Launch your MVP fast without burning cash on full-time hires.
                Get to market quickly and iterate based on real user feedback.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Growing Businesses</h3>
              <p className="text-muted-foreground">
                Scale your digital capabilities without the complexity of
                building an internal tech department from scratch.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">Non-Profits & NGOs</h3>
              <p className="text-muted-foreground">
                Get enterprise-grade technology at affordable rates. Maximize
                your impact with tools that streamline operations.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-3">
                Schools & Institutions
              </h3>
              <p className="text-muted-foreground">
                Modernize your systems with student portals, learning platforms,
                and management tools built for education.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section id="inquiry-form" className="py-16 px-4 bg-muted/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Let&apos;s Build Together
            </h2>
            <p className="text-muted-foreground">
              Tell us about your project and we&apos;ll get back to you within
              24 hours with a custom proposal and timeline.
            </p>
          </div>

          <Card className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input id="companyName" placeholder="Your Company" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industry">Industry *</Label>
                  <Select>
                    <SelectTrigger id="industry">
                      <SelectValue placeholder="Select industry" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="startup">Startup / Tech</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="nonprofit">
                        Non-Profit / NGO
                      </SelectItem>
                      <SelectItem value="fintech">Fintech</SelectItem>
                      <SelectItem value="ecommerce">E-Commerce</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Your Name *</Label>
                  <Input id="contactName" placeholder="John Doe" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Your Role *</Label>
                  <Input
                    id="role"
                    placeholder="CEO, CTO, Product Manager, etc."
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Email Address *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="john@company.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Phone Number *</Label>
                  <Input
                    id="contactPhone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectType">What do you need? *</Label>
                <Select>
                  <SelectTrigger id="projectType">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="new-product">
                      Build a new product/platform
                    </SelectItem>
                    <SelectItem value="existing-product">
                      Improve existing product
                    </SelectItem>
                    <SelectItem value="ongoing-team">
                      Ongoing tech team support
                    </SelectItem>
                    <SelectItem value="mvp">MVP development</SelectItem>
                    <SelectItem value="mobile-app">Mobile app</SelectItem>
                    <SelectItem value="web-app">Web application</SelectItem>
                    <SelectItem value="integration">
                      System integration
                    </SelectItem>
                    <SelectItem value="other">Other / Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="timeline">Desired Timeline *</Label>
                <Select>
                  <SelectTrigger id="timeline">
                    <SelectValue placeholder="When do you need this?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="urgent">ASAP (1-2 months)</SelectItem>
                    <SelectItem value="soon">Soon (2-3 months)</SelectItem>
                    <SelectItem value="flexible">
                      Flexible (3-6 months)
                    </SelectItem>
                    <SelectItem value="planning">
                      Just planning / exploring
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Estimated Budget Range</Label>
                <Select>
                  <SelectTrigger id="budget">
                    <SelectValue placeholder="Select budget range (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Under $10K</SelectItem>
                    <SelectItem value="medium">$10K - $25K</SelectItem>
                    <SelectItem value="large">$25K - $50K</SelectItem>
                    <SelectItem value="enterprise">$50K+</SelectItem>
                    <SelectItem value="unsure">Not sure yet</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectDetails">
                  Tell us about your project *
                </Label>
                <Textarea
                  id="projectDetails"
                  placeholder="What problem are you solving? Who are your users? What features do you need? Any technical requirements?"
                  rows={5}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="existingTech">
                  Existing Technology (if any)
                </Label>
                <Textarea
                  id="existingTech"
                  placeholder="Do you have existing systems, databases, or tools we need to integrate with?"
                  rows={3}
                />
              </div>

              <Button type="submit" size="lg" className="w-full">
                Submit Inquiry
              </Button>
            </form>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            We&apos;ll review your inquiry and respond within 24 hours with next
            steps and a custom proposal.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Build Without the Overhead?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join 15+ companies that trust Surge as their technology partner.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="#inquiry-form">Start a Conversation</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/schedule-visit">Schedule a Visit</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
