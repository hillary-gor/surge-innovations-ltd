import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, Rocket, Award, Heart, Lightbulb, 
  CheckCircle2, XCircle, Terminal 
} from "lucide-react";
import { VolunteerApplicationModal } from "./VolunteerApplicationModal";

export default function JoinTeamPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      {/* HERO SECTION */}
      <section className="relative py-24 px-4 overflow-hidden border-b border-border/40">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <Badge variant="secondary" className="mb-6 px-4 py-1.5 text-sm rounded-full border-primary/20 bg-primary/5 text-primary">
            <Heart className="h-3.5 w-3.5 mr-2 fill-primary/20" />
            Volunteer Career Accelerator
          </Badge>
          
          <h1 className="text-4xl md:text-7xl font-extrabold mb-6 tracking-tight text-balance">
            Don&apos;t just watch tutorials. <br />
            <span className="text-primary">Ship Production Code.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Surge as a volunteer engineer. Bridge the gap between &quot;learning to code&quot; and &quot;being a professional developer&quot; by working on live client projects.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <VolunteerApplicationModal>
              <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary/20">
                 Apply to Join Now
              </Button>
            </VolunteerApplicationModal>
            <Button variant="outline" size="lg" className="h-14 px-8 text-base" asChild>
              <a href="#how-it-works">How it works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* WHO IS THIS FOR? (Filtering Section) */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Is this program right for you?</h2>
            <p className="text-muted-foreground">We value your time. Check if we are a match.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8 border-green-500/20 bg-green-500/5">
              <h3 className="text-xl font-bold flex items-center mb-6 text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-6 h-6 mr-2" /> This IS for you if...
              </h3>
              <ul className="space-y-4">
                <CheckItem text="You know the basics (HTML/JS/React) but lack real-world experience." />
                <CheckItem text="You want to fill your portfolio with live, deployed projects." />
                <CheckItem text="You can commit 5-10 hours/week reliably." />
                <CheckItem text="You are proactive and can research solutions independently." />
              </ul>
            </Card>

            <Card className="p-8 border-rose-500/20 bg-rose-500/5">
              <h3 className="text-xl font-bold flex items-center mb-6 text-rose-700 dark:text-rose-400">
                <XCircle className="w-6 h-6 mr-2" /> This is NOT for you if...
              </h3>
              <ul className="space-y-4">
                <CrossItem text="You represent an agency looking to outsource work." />
                <CrossItem text="You have absolutely zero coding knowledge (we are not a bootcamp)." />
                <CrossItem text="You cannot communicate or attend sync meetings." />
                <CrossItem text="You are looking for an immediate full-time salary (this is a volunteer role)." />
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* WHY JOIN SECTION (MOBILE SLIDER) */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12">
            <div>
              <h2 className="text-3xl font-bold mb-2">Why Volunteer at Surge?</h2>
              <p className="text-muted-foreground">It&apos;s an exchange: Your time for our mentorship & platform.</p>
            </div>
            {/* Mobile Hint */}
            <p className="md:hidden text-xs text-muted-foreground mt-4 animate-pulse">
              ← Swipe to see more →
            </p>
          </div>
          
          {/* MOBILE: Flex + Overflow + Snap
             DESKTOP: Grid + No Overflow
          */}
          <div className="
            flex overflow-x-auto snap-x snap-mandatory gap-4 pb-8 -mx-4 px-4 
            md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:pb-0 md:mx-0 md:px-0
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          ">
            <div className="min-w-[85vw] md:min-w-0 snap-center">
              <FeatureCard 
                icon={Terminal} 
                title="Modern Stack Only" 
                desc="Forget jQuery. We build with Next.js 14, TypeScript, Supabase, Tailwind, and OpenAI APIs." 
              />
            </div>
            <div className="min-w-[85vw] md:min-w-0 snap-center">
              <FeatureCard 
                icon={Users} 
                title="Senior Code Reviews" 
                desc="Get your Pull Requests reviewed by senior engineers. This is the fastest way to improve." 
              />
            </div>
            <div className="min-w-[85vw] md:min-w-0 snap-center">
              <FeatureCard 
                icon={Award} 
                title="Job References" 
                desc="Perform well, and we will serve as a glowing reference for your future job applications." 
              />
            </div>
            <div className="min-w-[85vw] md:min-w-0 snap-center">
              <FeatureCard 
                icon={Rocket} 
                title="Shipping Culture" 
                desc="We ship fast. You will learn CI/CD, deployment pipelines, and production monitoring." 
              />
            </div>
            <div className="min-w-[85vw] md:min-w-0 snap-center">
              <FeatureCard 
                icon={Lightbulb} 
                title="Business Context" 
                desc="Learn how to translate client requirements into technical specs—a vital senior skill." 
              />
            </div>
            <div className="min-w-[85vw] md:min-w-0 snap-center">
              <FeatureCard 
                icon={Heart} 
                title="Community Impact" 
                desc="Help us build tools for non-profits and local startups that actually need them." 
              />
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS (Timeline Slider on Mobile) */}
      <section id="how-it-works" className="py-20 px-4 border-t border-border/50 bg-muted/10">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10 md:mb-16">How it works</h2>
          
          <div className="relative">
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-border -z-10 -translate-y-1/2"></div>

            <div className="
              flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 -mx-4 px-4
              md:grid md:grid-cols-4 md:gap-8 md:overflow-visible md:pb-0 md:mx-0 md:px-0
              [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
            ">
              <div className="min-w-[70vw] md:min-w-0 snap-center">
                <TimelineStep number="1" title="Apply" desc="Fill out the form. Tell us what you know and what you want to learn." />
              </div>
              <div className="min-w-[70vw] md:min-w-0 snap-center">
                <TimelineStep number="2" title="Chat" desc="A quick 15-min call to align expectations and check technical fit." />
              </div>
              <div className="min-w-[70vw] md:min-w-0 snap-center">
                <TimelineStep number="3" title="Onboard" desc="Get access to our GitHub, Slack, and your first 'Good First Issue'." />
              </div>
              <div className="min-w-[70vw] md:min-w-0 snap-center">
                <TimelineStep number="4" title="Build" desc="Pick tasks, write code, get reviewed, and merge to production." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="py-24 bg-primary/5 text-center px-4">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to accelerate your career?</h2>
          <p className="text-muted-foreground mb-8 text-lg">
            We review applications on a rolling basis. Spots are limited to ensure quality mentorship.
          </p>
          
          <VolunteerApplicationModal>
             <Button size="lg" className="h-12 px-8 text-lg">Start Your Application</Button>
          </VolunteerApplicationModal>
          
          <p className="text-xs text-muted-foreground mt-6">
            By applying, you agree to our terms of volunteer engagement.
          </p>
        </div>
      </section>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function FeatureCard({ icon: Icon, title, desc }: { icon: React.ElementType, title: string, desc: string }) {
  return (
    <Card className="h-full p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-lg group">
      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
        <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
    </Card>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
      <span className="text-sm text-foreground/90">{text}</span>
    </li>
  )
}

function CrossItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-3">
      <XCircle className="w-5 h-5 text-rose-600 mt-0.5 shrink-0" />
      <span className="text-sm text-foreground/90">{text}</span>
    </li>
  )
}

function TimelineStep({ number, title, desc }: { number: string, title: string, desc: string }) {
  return (
    <div className="flex flex-col items-center text-center bg-background md:bg-transparent p-6 rounded-xl border border-border md:border-none shadow-sm md:shadow-none h-full md:p-0">
      <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold mb-4 border-4 border-background z-10 shadow-sm shrink-0">
        {number}
      </div>
      <h3 className="font-bold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{desc}</p>
    </div>
  )
}