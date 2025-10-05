import { Code2, Palette, Cog, BarChart3 } from "lucide-react"

const services = [
  {
    icon: Palette,
    title: "Strategy & Design",
    description:
      "We start by understanding your business goals and designing intuitive experiences that your users will love.",
  },
  {
    icon: Code2,
    title: "Custom Development",
    description: "Full-stack development tailored to your needs. From web apps to mobile platforms, we build it right.",
  },
  {
    icon: Cog,
    title: "Automation & Integration",
    description: "Connect your tools, automate workflows, and eliminate manual processes that slow you down.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Insights",
    description: "Get clarity with custom dashboards that show you exactly what matters for your business.",
  },
]

export function Services() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              We blend strategy, design, and engineering
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto text-balance leading-relaxed">
              Help startups, schools, non-profits and established organizations scale with confidence — without the
              complexity of managing tech teams
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group p-8 rounded-xl border border-border/50 hover:border-primary/50 bg-card/50 hover:bg-card transition-all"
              >
                <div className="mb-6 inline-flex p-4 rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <service.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-semibold mb-4">{service.title}</h3>
                <p className="text-muted-foreground text-lg leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
