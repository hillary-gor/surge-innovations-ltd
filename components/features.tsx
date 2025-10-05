import { Zap, Shield, Smartphone, Cloud, Gauge, Wrench } from "lucide-react"
import { Card } from "@/components/ui/card"

const features = [
  {
    icon: Zap,
    title: "Fast & Secure",
    description: "Lightning-fast performance with enterprise-grade security built in from day one.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Ready",
    description: "Responsive designs that work flawlessly on any device, anywhere.",
  },
  {
    icon: Wrench,
    title: "Tailored Solutions",
    description: "Custom dashboards and workflows designed specifically for your business needs.",
  },
  {
    icon: Gauge,
    title: "Smart Automation",
    description: "Intelligent automation that saves time and eliminates repetitive tasks.",
  },
  {
    icon: Cloud,
    title: "Cloud Access",
    description: "Access your systems from anywhere with secure cloud infrastructure.",
  },
  {
    icon: Shield,
    title: "Always-On Performance",
    description: "Reliable, monitored systems with 99.9% uptime guarantee.",
  },
]

export function Features() {
  return (
    <section className="py-24 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">What you'll love</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance">
            Technology that works as hard as you do, without the complexity
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="p-8 bg-card hover:bg-card/80 transition-colors border-border/50 hover:border-primary/50 group"
            >
              <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
