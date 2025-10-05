import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

      <div className="container relative z-10 px-4 py-24 md:py-32">
        <div className="mx-auto max-w-5xl text-center space-y-8">
          {/* Logo/Brand */}
          <div className="inline-flex items-center justify-center mb-6">
            <Image src="/surge-logo.png" alt="Surge Innovations" width={200} height={67} className="h-16 w-auto" />
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-balance">
            Your Tech Partner for <span className="text-primary">Scalable Impact</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
            Every business is unique — your technology should be too. We design and build custom digital platforms that
            simplify work, automate tasks, and give you clarity across your operations.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="text-lg px-8 py-6 group" asChild>
              <Link href="/schedule-visit">
                <Calendar className="mr-2 h-5 w-5" />
                Schedule a Visit
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent" asChild>
              <Link href="/case-studies">View Our Work</Link>
            </Button>
          </div>

          {/* Trust Badge */}
          <p className="text-sm text-muted-foreground pt-8">
            Trusted by startups, schools, non-profits, and established organizations
          </p>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
