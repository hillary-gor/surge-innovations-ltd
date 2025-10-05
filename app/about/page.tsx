import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Button } from "@/components/ui/button";
import { Users, Target, Lightbulb, Award } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="py-24 md:py-32">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-balance">
                Building Technology That{" "}
                <span className="text-primary">Scales With You</span>
              </h1>
              <p className="text-xl text-muted-foreground text-balance leading-relaxed">
                We&apos;re a team of strategists, designers, and engineers
                passionate about helping organizations leverage technology to
                achieve their mission.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  At Surge Innovations, we believe every organization deserves
                  access to world-class technology—without the complexity of
                  managing tech teams or the constraints of off-the-shelf
                  solutions.
                </p>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We partner with startups, schools, non-profits, and
                  established businesses to design and build custom platforms
                  that simplify operations, automate workflows, and provide
                  clarity across every level of your organization.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-card rounded-lg border border-border space-y-2">
                  <Users className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">50+ Clients</h3>
                  <p className="text-sm text-muted-foreground">
                    Trusted partners
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border space-y-2">
                  <Target className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">100+ Projects</h3>
                  <p className="text-sm text-muted-foreground">
                    Successfully delivered
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border space-y-2">
                  <Lightbulb className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">5+ Years</h3>
                  <p className="text-sm text-muted-foreground">
                    Industry experience
                  </p>
                </div>
                <div className="p-6 bg-card rounded-lg border border-border space-y-2">
                  <Award className="h-8 w-8 text-primary" />
                  <h3 className="font-semibold">99% Uptime</h3>
                  <p className="text-sm text-muted-foreground">
                    Reliable systems
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
              <h2 className="text-3xl md:text-4xl font-bold">Our Values</h2>
              <p className="text-lg text-muted-foreground">
                The principles that guide everything we do
              </p>
            </div>
            <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">1</span>
                </div>
                <h3 className="text-xl font-semibold">Simplicity First</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We believe the best technology is invisible. Our solutions are
                  intuitive, elegant, and easy to use.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">2</span>
                </div>
                <h3 className="text-xl font-semibold">Built to Scale</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every platform we build is designed to grow with you, from day
                  one to enterprise scale.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary">3</span>
                </div>
                <h3 className="text-xl font-semibold">Partnership Mindset</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We&apos;re not just vendors we&apos;re your long-term
                  technology partners, invested in your success.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-muted/30">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold">
                Ready to Build Together?
              </h2>
              <p className="text-lg text-muted-foreground">
                Let&apos;s discuss how we can help you achieve your technology
                goals.
              </p>
              <Button size="lg" asChild>
                <Link href="/contact">Start a Conversation</Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}
