import { CheckCircle2 } from "lucide-react"

const benefits = [
  "Fast, secure, mobile-ready systems",
  "Tailored dashboards and workflows",
  "Smart automation that saves time",
  "Cloud access from anywhere",
  "Reliable, always-on performance",
  "No need to manage tech teams",
]

export function Benefits() {
  return (
    <section className="py-24 md:py-32 bg-muted/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(251,146,60,0.08),transparent_50%)]" />

      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              We don't just build systems — <span className="text-accent">we help you scale</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              Technology that moves with your vision
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-start gap-4 p-6 rounded-lg bg-card/50 border border-border/50 hover:border-accent/50 transition-colors"
              >
                <CheckCircle2 className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                <p className="text-lg font-medium">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
