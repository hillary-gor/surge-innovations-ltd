import { Button } from "@/components/ui/button"
import { ArrowRight, Mail } from "lucide-react"

export function CTA() {
  return (
    <section className="py-24 md:py-32 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance">
              Ready to transform your operations?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
              Let's discuss how we can build custom solutions that scale with your business
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="text-lg px-8 py-6 group bg-primary hover:bg-primary/90">
              <Mail className="mr-2 h-5 w-5" />
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-6 bg-transparent">
              Schedule a Call
            </Button>
          </div>

          <p className="text-sm text-muted-foreground pt-8">
            Free consultation • No commitment required • Response within 24 hours
          </p>
        </div>
      </div>
    </section>
  )
}
