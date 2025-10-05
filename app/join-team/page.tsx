import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Users, Code, Rocket, Award, Heart, Lightbulb } from "lucide-react";

export default function JoinTeamPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Heart className="h-4 w-4" />
            Volunteer Opportunity
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
            Build Real Products.
            <br />
            <span className="text-primary">Grow Your Skills.</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Join our volunteer program and work alongside experienced engineers
            on live client projects. Gain hands-on experience, build your
            portfolio, and make an impact—all while learning from the best.
          </p>
        </div>
      </section>

      {/* Why Join Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Volunteer at Surge?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6">
              <Code className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Real-World Experience
              </h3>
              <p className="text-muted-foreground">
                Work on actual client projects that impact thousands of users.
                Build production-ready software, not just tutorials.
              </p>
            </Card>
            <Card className="p-6">
              <Users className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Mentorship & Growth
              </h3>
              <p className="text-muted-foreground">
                Learn from senior engineers through code reviews, pair
                programming, and direct feedback. Level up your skills fast.
              </p>
            </Card>
            <Card className="p-6">
              <Award className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Portfolio & References
              </h3>
              <p className="text-muted-foreground">
                Build an impressive portfolio with real projects. Get references
                and recommendations for future opportunities.
              </p>
            </Card>
            <Card className="p-6">
              <Rocket className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Modern Tech Stack</h3>
              <p className="text-muted-foreground">
                Work with cutting-edge technologies: Next.js, React, TypeScript,
                Node.js, cloud platforms, and more.
              </p>
            </Card>
            <Card className="p-6">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">
                Flexible Commitment
              </h3>
              <p className="text-muted-foreground">
                Contribute on your schedule. We value quality over quantity and
                understand you have other commitments.
              </p>
            </Card>
            <Card className="p-6">
              <Heart className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">Community Impact</h3>
              <p className="text-muted-foreground">
                Help startups, schools, and non-profits build technology that
                makes a difference in people&apos;s lives.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Look For */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            What We&apos;re Looking For
          </h2>
          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Passion for Learning
              </h3>
              <p className="text-muted-foreground">
                You&apos;re eager to grow, open to feedback, and excited about
                building great software.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Foundation in Development
              </h3>
              <p className="text-muted-foreground">
                You have basic knowledge of web development (HTML, CSS,
                JavaScript) and are ready to level up. Self-taught? Bootcamp
                grad? CS degree? All backgrounds welcome.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Commitment & Reliability
              </h3>
              <p className="text-muted-foreground">
                You can dedicate consistent time each week and follow through on
                commitments.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-2">
                Collaborative Spirit
              </h3>
              <p className="text-muted-foreground">
                You work well with others, communicate clearly, and contribute
                positively to the team.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Apply to Join Our Team</h2>
            <p className="text-muted-foreground">
              Fill out the form below and we&apos;ll review your application.
              Selected candidates will be invited for an interview to discuss
              the opportunity further.
            </p>
          </div>

          <Card className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input id="firstName" placeholder="John" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input id="lastName" placeholder="Doe" required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+254 700 000 000"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location (City, Country) *</Label>
                <Input id="location" placeholder="Nairobi, Kenya" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">Experience Level *</Label>
                <Select>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select your experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">
                      Beginner (0-1 years)
                    </SelectItem>
                    <SelectItem value="intermediate">
                      Intermediate (1-3 years)
                    </SelectItem>
                    <SelectItem value="advanced">
                      Advanced (3+ years)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="background">Educational Background *</Label>
                <Select>
                  <SelectTrigger id="background">
                    <SelectValue placeholder="Select your background" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self-taught">Self-Taught</SelectItem>
                    <SelectItem value="bootcamp">Bootcamp Graduate</SelectItem>
                    <SelectItem value="cs-degree">
                      Computer Science Degree
                    </SelectItem>
                    <SelectItem value="other-degree">
                      Other Degree + Self-Study
                    </SelectItem>
                    <SelectItem value="currently-studying">
                      Currently Studying
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills">Technical Skills *</Label>
                <Textarea
                  id="skills"
                  placeholder="List your technical skills (e.g., JavaScript, React, Node.js, Python, SQL, etc.)"
                  rows={3}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="portfolio">Portfolio / GitHub URL</Label>
                <Input
                  id="portfolio"
                  type="url"
                  placeholder="https://github.com/yourusername or your portfolio site"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="availability">Weekly Availability *</Label>
                <Select>
                  <SelectTrigger id="availability">
                    <SelectValue placeholder="How many hours per week can you commit?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5-10">5-10 hours/week</SelectItem>
                    <SelectItem value="10-15">10-15 hours/week</SelectItem>
                    <SelectItem value="15-20">15-20 hours/week</SelectItem>
                    <SelectItem value="20+">20+ hours/week</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="motivation">
                  Why do you want to join Surge? *
                </Label>
                <Textarea
                  id="motivation"
                  placeholder="Tell us what excites you about this opportunity and what you hope to learn..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="projects">
                  Previous Projects or Experience
                </Label>
                <Textarea
                  id="projects"
                  placeholder="Describe any projects you've worked on, even personal or learning projects..."
                  rows={4}
                />
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox id="terms" required />
                <label
                  htmlFor="terms"
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  I understand this is an unpaid volunteer position focused on
                  learning and skill development. I commit to being reliable,
                  communicative, and contributing positively to the team. *
                </label>
              </div>

              <Button type="submit" size="lg" className="w-full">
                Submit Application
              </Button>
            </form>
          </Card>

          <p className="text-center text-sm text-muted-foreground mt-6">
            We review applications on a rolling basis and will reach out within
            1-2 weeks if your profile is a good fit.
          </p>
        </div>
      </section>
    </div>
  );
}
