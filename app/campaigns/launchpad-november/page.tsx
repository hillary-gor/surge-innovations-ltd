"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CheckCircle2,
  Zap,
  Globe,
  ArrowRight,
  Cloud,
  Lock,
  MessageCircle,
  Clock,
  Briefcase,
} from "lucide-react";
import FloatingHeader from "@/components/floating-logo-&-close-button";
import Image from "next/image";

const heroImage =
  "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/assets/WhatsApp_Image_2025-11-08_at_22.59.10_627e4fa2-removebg-preview.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LaunchpadNovember() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-orange-100 selection:text-orange-900 relative overflow-x-hidden">
      {/* BACKGROUND GRID */}
      <div className="absolute inset-0 h-full w-full bg-white bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] -z-10"></div>

      <FloatingHeader />

      {/* HERO SECTION */}
      <section className="relative w-full min-h-[90vh] flex flex-col justify-center pt-32 pb-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* LEFT: TEXT CONTENT */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 flex flex-col items-start space-y-8 max-w-2xl"
          >
            <motion.div variants={itemVariants}>
              <span className="inline-flex items-center rounded-full border border-orange-200 bg-orange-50 px-4 py-1.5 text-xs font-bold tracking-wide text-orange-700 uppercase">
                <span className="mr-2 h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                Portfolio Building Campaign • 3 Slots Left
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-950 leading-[1.1]"
            >
              Launch Your Brand <br />
              <span className="text-gray-400">In 14 Days.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-gray-600 leading-relaxed font-normal"
            >
              We are investing <b>KES 250,000</b> in development costs to build
              your platform for free. You get a market-ready business; we get a
              powerful case study.
            </motion.p>

            <motion.ul variants={itemVariants} className="space-y-3 pt-2">
              <li className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle2 className="text-green-600 h-5 w-5" />
                <span>Enterprise AWS Infrastructure</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle2 className="text-green-600 h-5 w-5" />
                <span>SEO & WhatsApp Integrated</span>
              </li>
              <li className="flex items-center gap-3 text-gray-700 font-medium">
                <CheckCircle2 className="text-green-600 h-5 w-5" />
                <span>100% Code Ownership (No Lock-in)</span>
              </li>
            </motion.ul>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-6"
            >
              <Button
                asChild
                size="lg"
                className="h-14 px-10 rounded-full bg-black text-white hover:bg-gray-800 transition-all text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1"
              >
                <Link href="/contact">
                  Apply for Sponsorship <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-14 px-8 rounded-full border-gray-300 hover:bg-gray-50 text-gray-700"
              >
                <Link href="/hosting">See Hosting Costs</Link>
              </Button>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-xs text-gray-400 font-medium"
            >
              * Valid for businesses ready to launch in November.
            </motion.p>
          </motion.div>

          {/* RIGHT: HERO VISUAL - Credibility Focused */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 w-full relative"
          >
            {/* Abstract shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-orange-100/50 blur-[100px] rounded-full -z-10"></div>

            <div className="relative z-10 bg-white border border-gray-200 rounded-2xl shadow-2xl overflow-hidden transform rotate-1 hover:rotate-0 transition duration-500">
              <div className="h-8 bg-gray-50 border-b border-gray-200 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-300"></div>
                </div>
                <div className="text-[10px] font-mono text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Lock size={8} /> Secure Connection
                </div>
              </div>
              <Image
                src={heroImage}
                alt="Dashboard Preview"
                width={700}
                height={700}
                className="w-full object-cover"
                priority
              />

              {/* Trust Badge Overlay */}
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm border border-gray-200 p-4 rounded-xl shadow-lg flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Infrastructure
                  </p>
                  <p className="text-sm font-bold text-gray-900 flex items-center gap-1">
                    <Cloud size={14} className="text-orange-500" /> AWS Cloud
                  </p>
                </div>
                <div className="h-8 w-[1px] bg-gray-200"></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Performance
                  </p>
                  <p className="text-sm font-bold text-green-600 flex items-center gap-1">
                    <Zap size={14} className="text-green-500" /> 99/100
                  </p>
                </div>
                <div className="h-8 w-[1px] bg-gray-200"></div>
                <div>
                  <p className="text-xs text-gray-500 font-bold uppercase">
                    Region
                  </p>
                  <p className="text-sm font-bold text-gray-900">Nairobi</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY FREE?*/}
      <section className="bg-black text-white py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            &quot;Why is this free?&quot;
          </h2>
          <div className="grid md:grid-cols-2 gap-12 text-left bg-white/5 p-8 rounded-2xl border border-white/10">
            <div>
              <h3 className="text-xl font-bold text-orange-400 mb-3 flex items-center gap-2">
                <Briefcase size={20} /> The Agency Goal
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We are a senior development team expanding into the Kenyan
                market. To attract high-paying enterprise clients in 2025, we
                need <b>5 flawless case studies</b> right now.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-400 mb-3 flex items-center gap-2">
                <CheckCircle2 size={20} /> The Deal
              </h3>
              <p className="text-gray-300 leading-relaxed">
                We build you a world-class platform (worth KES 250k) for free.
                In exchange, you agree to give us a video testimonial and allow
                us to feature your site in our portfolio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT YOU GET*/}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            More Than Just Code. A Business Asset.
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Most developers just give you a website. We give you a system ready
            to take payments and rank on Google.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-orange-200 transition-colors group">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Cloud className="w-6 h-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">AWS Cloud Hosting</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Stop worrying about your site crashing. We deploy on the same
              infrastructure used by Netflix and Banks. Fast, secure, and always
              online.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-green-200 transition-colors group">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">WhatsApp Conversion</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Kenyan business happens on WhatsApp. We integrate &quot;Click to
              Chat&quot; buttons directly into your product pages for instant
              lead generation.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 bg-gray-50 rounded-2xl border border-gray-100 hover:border-blue-200 transition-colors group">
            <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Globe className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold mb-3">Google & SEO Ready</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              We set up your Google Search Console, Sitemap, and Metadata so
              customers can actually find you when they search.
            </p>
          </div>
        </div>
      </section>

      {/* PRICING BREAKDOWN (KES) */}
      <section className="py-24 px-6 bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-6">
                Clear, Kenyan Pricing.
              </h2>
              <p className="text-gray-600 mb-8">
                We don&apos;t touch your money for hosting. You pay the
                infrastructure providers directly, ensuring you own the assets.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-green-700" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      Development Agency Fee
                    </p>
                    <p className="text-sm text-gray-500">Usually KES 250,000</p>
                  </div>
                  <div className="ml-auto font-bold text-green-600 text-xl">
                    WAIVED
                  </div>
                </div>
                <Button
                  variant="link"
                  className="text-orange-600 p-0 h-auto"
                  asChild
                >
                  <Link href="/hosting">
                    View detailed hosting breakdown &rarr;
                  </Link>
                </Button>
              </div>
            </div>

            <div className="flex-1 w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-6">
                Your Monthly Running Costs
              </h3>

              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                <span className="text-gray-700 font-medium">
                  AWS Cloud Hosting
                </span>
                <span className="font-bold">
                  ~KES 3,500{" "}
                  <span className="text-xs text-gray-400 font-normal">/mo</span>
                </span>
              </div>

              <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                <span className="text-gray-700 font-medium">
                  Domain (.co.ke)
                </span>
                <span className="font-bold">
                  ~KES 1,500{" "}
                  <span className="text-xs text-gray-400 font-normal">/yr</span>
                </span>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <div className="flex justify-between items-center">
                  <span className="text-blue-900 font-bold">
                    Total Payable to Us
                  </span>
                  <span className="text-3xl font-extrabold text-blue-600">
                    KES 0
                  </span>
                </div>
                <p className="text-xs text-blue-700/70 mt-2">
                  No hidden agency retainers.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - URGENCY */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block p-3 bg-orange-100 text-orange-700 rounded-full mb-6 animate-pulse">
            <Clock className="w-5 h-5 inline mr-2" />
            <strong>Deadline approaching:</strong> Campaign closes Nov 15th
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Don&apos;t build from scratch. <br />
            Start at the finish line.
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
            Secure your slot. Get a KES 250k website for the price of hosting.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="bg-black text-white hover:bg-gray-800 h-16 px-12 text-lg rounded-full shadow-2xl"
            >
              <Link href="/contact">Apply Now - It takes 2 mins</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 bg-gray-50 py-12 px-6 text-center">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} Surge Innovations. Nairobi, Kenya.</p>
          <div className="flex gap-6">
            <Link
              href="/hosting"
              className="hover:text-black transition underline"
            >
              Hosting Guide
            </Link>
            <Link
              href="/contact"
              className="hover:text-black transition underline"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
