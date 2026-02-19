"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  ExternalLink, 
  Globe, 
  Layout, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight,
  X,
  Maximize2,
  Quote,
  Code2,
  Database,
  Cloud,
  Smartphone
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const testimonials = [
  {
    quote: "The transition to the new billing and admin platform was seamless. It completely eliminated our manual invoicing bottlenecks and gave us real-time visibility into our revenue.",
    author: "Operations Director",
    company: "Surge Innovations Ltd"
  },
  {
    quote: "They understood exactly what a healthcare staffing platform needs. The security, the speed, and the intuitive dashboard for our families and caregivers is unmatched.",
    author: "Founder",
    company: "6Care Plus"
  },
  {
    quote: "Our student application rate jumped simply because the new portal is so easy to use on mobile. The intake management system saves our admin team hours every week.",
    author: "Admissions Head",
    company: "Code Blue Medical Training Institute"
  }
];

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      title: "Surge Innovations",
      client: "Surge Innovations Ltd",
      category: "Corporate Systems",
      description: "A flagship corporate platform featuring advanced admin billing capabilities and project management integrations. The system centralizes revenue tracking, client invoicing, and subscription management into a single, cohesive dashboard.",
      results: [
        "Automated recurring billing and subscription tracking",
        "Streamlined admin workflows for project management",
        "Centralized client data and financial reporting",
      ],
      imageLight: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/surgelightmode.png",
      imageDark: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/surgelightmode.png",
      tags: ["Next.js", "Admin Billing", "Dashboard"],
      website: "https://www.surgeinnovations.org",
    },
    {
      title: "6Care Plus",
      client: "6Care",
      category: "Healthcare",
      description: "A specialized platform for hiring caregivers, CNAs, and HCAs. Features include a robust dashboard for settings management, caregiver profile verification, and a seamless hiring workflow connecting families with qualified professionals.",
      results: [
        "Simplified caregiver vetting process",
        "Real-time dashboard for application tracking",
        "Secure user data management and settings",
      ],
      imageLight: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/6carelightmode.png",
      imageDark: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/6caredarkmode.png",
      tags: ["Healthcare", "Hiring Platform", "User Settings"],
      website: "https://www.6care.org",
    },
    {
      title: "CBMTI Public Website",
      client: "Code Blue Medical Training Institute",
      category: "Education",
      description: "The primary public-facing platform for the institute, redesigned for 2025. Features dynamic intake popups, active course listings, and a modern UI to drive student enrollments and streamline admissions.",
      results: [
        "Increased visibility for active student intakes",
        "Modernized brand and web presence",
        "Streamlined prospective student funnel",
      ],
      imageLight: "/projects/cbmti2025.png",
      imageDark: "/projects/cbmti2025.png",
      tags: ["Marketing Site", "Next.js", "Lead Generation"],
      website: "https://codebluemedical.co.ke",
    },
    {
      title: "CBMTI E-Hub",
      client: "Code Blue Medical Training Institute",
      category: "Education",
      description: "An educational portal designed to handle student intakes and secure access. Serves as the backbone infrastructure for student resources and announcement hubs.",
      results: [
        "Digital management of student intakes",
        "Secure access to educational resources",
        "Improved communication via announcement hubs",
      ],
      imageLight: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/ehublightmode.png",
      imageDark: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/ehublightmode.png",
      tags: ["Education Portal", "Supabase", "Student Portal"],
      website: "https://ehub.codebluemedical.co.ke",
    },
    {
      title: "Aleko Grooming",
      client: "Aleko Grooming",
      category: "Service Booking",
      description: "A modern booking application featuring a quick-booking flow. The system reduces friction for customers scheduling appointments, utilizing a mobile-first design approach for on-the-go access.",
      results: [
        "Streamlined appointment scheduling",
        "Mobile-responsive booking interface",
        "Reduced administrative overhead for scheduling",
      ],
      imageLight: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/alekogroominglightmode.png",
      imageDark: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/alekogroomingdarkmode.png",
      tags: ["Booking System", "Mobile First", "UX Design"],
      website: "https://aleko-grooming-1oyi.vercel.app",
    },
    {
      title: "Casamisa",
      client: "Casamisa",
      category: "Real Estate",
      description: "A highly visual showcase platform tailored for real estate and interior design. Built for high-performance rendering of property images, fluid navigation, and immersive user experiences.",
      results: [
        "Immersive visual property showcase",
        "Fast loading speeds with Next.js image optimization",
        "Fluid and responsive user interface across all devices",
      ],
      imageLight: "/projects/casamisa.png",
      imageDark: "/projects/casamisa.png",
      tags: ["Real Estate", "Showcase", "Vercel"],
      website: "https://casamisa-six.vercel.app/",
    },
    {
      title: "Ffitlux",
      client: "Ffitlux",
      category: "E-Commerce",
      description: "An ongoing development project for a premium lifestyle and fitness brand. Focuses on high-quality image asset delivery, SEO metadata optimization, and a sleek, modern brand aesthetic.",
      results: [
        "Optimized image delivery and performance",
        "Enhanced SEO metadata structure",
        "Custom premium brand aesthetic",
      ],
      imageLight: "/projects/ffitlux.png",
      imageDark: "/projects/ffitlux.png",
      tags: ["E-Commerce", "Lifestyle", "Ongoing Dev"],
      website: "https://ffitlux.com",
    },
    {
      title: "Tanks Store Kenya",
      client: "Tanks Store Kenya",
      category: "E-Commerce",
      description: "A digital storefront for water storage solutions. Features include alternating product sections, gallery integrations, and a catalog system designed to showcase inventory effectively to potential buyers.",
      results: [
        "Enhanced product visibility via digital catalog",
        "Improved navigation for product categories",
        "Direct enquiry channels for sales",
      ],
      imageLight: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/tanksstorelightmode.png",
      imageDark: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/tanksstorelightmode.png",
      tags: ["E-Commerce", "Product Gallery", "Next.js"],
      website: "https://www.tankstorekenya.co.ke",
    },
    {
      title: "ACCGK Portal",
      client: "Association of Certified Caregivers Kenya",
      category: "Healthcare",
      description: "A comprehensive institutional platform supporting multiple file uploads with validation. It serves as a verification and membership hub for caregivers and training institutions across the region.",
      results: [
        "Digital verification of credentials",
        "Secure document upload and management",
        "Centralized member registry",
      ],
      imageLight: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/accgklightmode.png",
      imageDark: "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/case-study-projects/accgklightmode.png",
      tags: ["Membership System", "File Uploads", "Verification"],
      website: "https://www.accgk.co.ke",
    },
    {
      title: "Carol's Portfolio",
      client: "Carol",
      category: "Portfolio",
      description: "A personalized creative portfolio designed to highlight professional achievements, visual assets, and project case studies with a clean, minimalist aesthetic.",
      results: [
        "Professional digital presence",
        "Responsive and accessible design",
        "Easy content manageability",
      ],
      imageLight: "/projects/carol.png",
      imageDark: "/projects/carol.png",
      tags: ["Portfolio", "Creative", "Minimalist"],
      website: "https://carol-portfolio09.vercel.app",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliderHovered, setIsSliderHovered] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = useMemo(() => {
    const cats = new Set(caseStudies.map(study => study.category));
    return ["All", ...Array.from(cats)];
  }, [caseStudies]);

  const filteredStudies = useMemo(() => {
    if (activeFilter === "All") return caseStudies;
    return caseStudies.filter(study => study.category === activeFilter);
  }, [activeFilter, caseStudies]);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % caseStudies.length);
  }, [caseStudies.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + caseStudies.length) % caseStudies.length);
  }, [caseStudies.length]);

  useEffect(() => {
    if (isSliderHovered || lightboxIndex !== null) return; 
    const timer = setInterval(nextSlide, 4500); 
    return () => clearInterval(timer);
  }, [isSliderHovered, lightboxIndex, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxIndex(null);
    };

    if (lightboxIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  return (
    <>
      <Navigation />
      
      {lightboxIndex !== null && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 backdrop-blur-md p-2 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setLightboxIndex(null)}
        >
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-4 right-4 md:top-8 md:right-8 h-10 w-10 md:h-12 md:w-12 rounded-full shadow-xl bg-background border-border/50 z-50 hover:scale-105 transition-transform"
            onClick={() => setLightboxIndex(null)}
          >
            <X className="h-5 w-5 md:h-6 md:w-6 text-foreground" />
          </Button>
          
          <div 
            className="relative w-full max-w-7xl aspect-[4/3] sm:aspect-video rounded-xl overflow-hidden shadow-2xl border border-border/50 bg-muted/20"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={caseStudies[lightboxIndex].imageLight}
              alt="Project Fullscreen"
              fill
              className={`object-contain ${caseStudies[lightboxIndex].imageLight !== caseStudies[lightboxIndex].imageDark ? 'dark:hidden block' : ''}`}
              quality={100}
            />
            {caseStudies[lightboxIndex].imageLight !== caseStudies[lightboxIndex].imageDark && (
              <Image
                src={caseStudies[lightboxIndex].imageDark}
                alt="Project Fullscreen"
                fill
                className="object-contain hidden dark:block"
                quality={100}
              />
            )}
          </div>
        </div>
      )}

      <main className="min-h-screen pt-16 bg-background selection:bg-primary/20">
        
        <section className="py-12 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full max-w-2xl h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_1.3fr] gap-12 lg:gap-10 items-center">
              
              <div className="space-y-6 md:space-y-8 text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0">
                <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm">
                  <Layout className="w-4 h-4 mr-2" /> Our Portfolio
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-bold tracking-tight text-balance leading-[1.1]">
                  Real Results for <br className="hidden sm:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/60">
                    Real Businesses
                  </span>
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance leading-relaxed">
                  Discover how we&apos;ve transformed operations with custom-built 
                  digital solutions—from powerful billing dashboards to seamless 
                  booking systems.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <Button size="lg" className="h-12 px-8 text-base shadow-lg hover:shadow-xl transition-all w-full sm:w-auto" asChild>
                    <Link href="/contact">Start Your Project <ArrowRight className="ml-2 h-5 w-5" /></Link>
                  </Button>
                  <Button size="lg" variant="outline" className="h-12 px-8 text-base w-full sm:w-auto" asChild>
                    <a href="#case-studies">View Case Studies</a>
                  </Button>
                </div>
              </div>

              <div className="w-full min-w-0">
                <div 
                  className="relative rounded-2xl overflow-hidden border border-border/60 shadow-2xl bg-card group"
                  onMouseEnter={() => setIsSliderHovered(true)}
                  onMouseLeave={() => setIsSliderHovered(false)}
                >
                  <div className="absolute top-0 left-0 right-0 z-20 flex items-center px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border/40">
                    <div className="flex space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-400/80" />
                      <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                      <div className="w-3 h-3 rounded-full bg-green-400/80" />
                    </div>
                    <div className="mx-auto px-4 py-1 text-[10px] sm:text-xs font-medium tracking-wide text-muted-foreground bg-foreground/5 rounded-md truncate max-w-[200px] sm:max-w-none">
                      {caseStudies[currentSlide].website.replace('https://', '')}
                    </div>
                  </div>

                  <div 
                    className="flex w-full transition-transform duration-700 ease-in-out pt-10 sm:pt-12" 
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {caseStudies.map((study, idx) => (
                      <div key={idx} className="w-full flex-shrink-0 flex flex-col bg-card">
                        <div 
                          className="relative w-full aspect-[4/3] md:aspect-[16/10] cursor-zoom-in overflow-hidden group/image"
                          onClick={() => setLightboxIndex(idx)}
                        >
                          <Image
                            src={study.imageLight}
                            alt={study.title}
                            fill
                            className={`object-cover object-top transition-transform duration-700 group-hover/image:scale-[1.02] ${study.imageLight !== study.imageDark ? 'dark:hidden block' : ''}`}
                            sizes="(max-width: 1024px) 100vw, 60vw"
                            priority={idx === 0}
                          />
                          {study.imageLight !== study.imageDark && (
                            <Image
                              src={study.imageDark}
                              alt={study.title}
                              fill
                              className="object-cover object-top transition-transform duration-700 group-hover/image:scale-[1.02] hidden dark:block"
                              sizes="(max-width: 1024px) 100vw, 60vw"
                              priority={idx === 0}
                            />
                          )}
                          <div className="absolute inset-0 bg-background/20 backdrop-blur-[2px] opacity-0 group-hover/image:opacity-100 transition-opacity flex items-center justify-center">
                            <div className="p-3 bg-background rounded-full shadow-xl">
                              <Maximize2 className="w-6 h-6 text-foreground" />
                            </div>
                          </div>
                        </div>

                        <div className="px-4 py-6 sm:px-6 sm:pt-6 sm:pb-10 text-center border-t border-border/40">
                          <p className="text-xs sm:text-sm font-semibold text-primary mb-1">{study.category}</p>
                          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground truncate">{study.title}</h3>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="absolute top-[40%] sm:top-1/2 -translate-y-1/2 left-0 right-0 z-30 pointer-events-none flex items-center justify-between px-2 sm:px-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <Button variant="secondary" size="icon" onClick={prevSlide} className="pointer-events-auto h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-lg bg-background/90 backdrop-blur hover:bg-background border border-border/50 text-foreground">
                      <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                    <Button variant="secondary" size="icon" onClick={nextSlide} className="pointer-events-auto h-8 w-8 sm:h-10 sm:w-10 rounded-full shadow-lg bg-background/90 backdrop-blur hover:bg-background border border-border/50 text-foreground">
                      <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
                    </Button>
                  </div>

                  <div className="absolute bottom-3 sm:bottom-4 left-0 right-0 z-30 flex justify-center gap-1.5 pointer-events-none px-4 flex-wrap">
                    {caseStudies.map((_, idx) => (
                      <div key={idx} className={`h-1.5 rounded-full transition-all duration-300 ${currentSlide === idx ? "w-6 bg-primary" : "w-1.5 bg-primary/30"}`} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-6 sm:py-8 border-y border-border/50 bg-muted/10 overflow-hidden">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <p className="text-center text-xs sm:text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4 sm:mb-6">Powered by Industry-Leading Technology</p>
            <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="flex items-center gap-2 font-bold text-base sm:text-xl"><Code2 className="w-5 h-5 sm:w-6 sm:h-6"/> Next.js</div>
              <div className="flex items-center gap-2 font-bold text-base sm:text-xl"><Database className="w-5 h-5 sm:w-6 sm:h-6"/> Supabase</div>
              <div className="flex items-center gap-2 font-bold text-base sm:text-xl"><Layout className="w-5 h-5 sm:w-6 sm:h-6"/> Tailwind</div>
              <div className="flex items-center gap-2 font-bold text-base sm:text-xl"><Cloud className="w-5 h-5 sm:w-6 sm:h-6"/> Vercel</div>
              <div className="flex items-center gap-2 font-bold text-base sm:text-xl"><Smartphone className="w-5 h-5 sm:w-6 sm:h-6"/> Mobile First</div>
            </div>
          </div>
        </section>

        <section id="case-studies" className="py-12 md:py-24">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            
            <div className="flex flex-col md:flex-row items-center justify-between mb-12 sm:mb-16 gap-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-center md:text-left">Browse Projects</h2>
              <div className="flex flex-wrap justify-center md:justify-end gap-2 bg-muted/30 p-1.5 rounded-xl border border-border w-full md:w-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-200 ${
                      activeFilter === cat 
                      ? "bg-background shadow-sm text-foreground" 
                      : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-20 md:space-y-32">
              {filteredStudies.map((study, index) => (
                <div
                  key={study.title} 
                  className={`flex flex-col md:grid md:grid-cols-2 gap-8 md:gap-16 lg:gap-20 items-center animate-in fade-in slide-in-from-bottom-8 duration-700 ${
                    index % 2 === 1 ? "md:flex-row-reverse" : ""
                  }`}
                >
                  <div className="w-full min-w-0 order-1">
                    <div className="relative rounded-2xl overflow-hidden border border-border/60 shadow-xl sm:shadow-2xl bg-muted/20 group hover:shadow-primary/5 transition-all duration-500">
                      <div className="flex items-center px-4 py-3 bg-muted/40 border-b border-border/40 backdrop-blur-md">
                        <div className="flex space-x-2">
                          <div className="w-3 h-3 rounded-full bg-red-400/80" />
                          <div className="w-3 h-3 rounded-full bg-amber-400/80" />
                          <div className="w-3 h-3 rounded-full bg-green-400/80" />
                        </div>
                      </div>
                      <div 
                        className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-background cursor-zoom-in"
                        onClick={() => {
                          const originalIndex = caseStudies.findIndex(s => s.title === study.title);
                          setLightboxIndex(originalIndex);
                        }}
                      >
                        <Image
                          src={study.imageLight}
                          alt={study.title}
                          fill
                          className={`object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] ${study.imageLight !== study.imageDark ? 'dark:hidden block' : ''}`}
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                        {study.imageLight !== study.imageDark && (
                          <Image
                            src={study.imageDark}
                            alt={study.title}
                            fill
                            className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.02] hidden dark:block"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        )}
                        <div className="absolute inset-0 bg-background/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <Maximize2 className="w-8 h-8 text-foreground drop-shadow-lg" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-6 md:space-y-8 order-2 text-center md:text-left min-w-0">
                    <div className="space-y-4">
                      <span className="inline-block text-xs sm:text-sm font-semibold text-primary uppercase tracking-wider">
                        {study.category}
                      </span>
                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
                        {study.title}
                      </h2>
                      <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                        {study.description}
                      </p>
                    </div>

                    <div className="bg-card p-5 md:p-6 rounded-2xl border border-border shadow-sm space-y-4 text-left">
                      <h3 className="font-semibold text-foreground flex items-center gap-2">
                        Key Outcomes
                      </h3>
                      <ul className="space-y-3">
                        {study.results.map((result, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                            <span className="text-sm md:text-base text-muted-foreground leading-snug">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {study.tags.map((tag, idx) => (
                        <span key={idx} className="px-3 py-1.5 rounded-lg bg-secondary/60 text-secondary-foreground text-xs font-semibold backdrop-blur-sm">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {study.website && (
                      <div className="pt-2">
                        <Button size="lg" className="w-full md:w-auto gap-2 group shadow-sm" asChild>
                          <a href={study.website} target="_blank" rel="noopener noreferrer">
                            <Globe className="h-4 w-4" /> Visit Live Site
                            <ExternalLink className="h-3 w-3 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              
              {filteredStudies.length === 0 && (
                <div className="text-center py-20 text-muted-foreground">
                  No case studies found for this category.
                </div>
              )}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28 bg-primary/5 border-t border-primary/10">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="text-center mb-12 sm:mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">What Our Clients Say</h2>
              <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
                Don&apos;t just take our word for it. Here is the impact our custom solutions have had on real businesses.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
              {testimonials.map((test, idx) => (
                <div key={idx} className="bg-background p-6 sm:p-8 rounded-2xl border border-border shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-shadow">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-primary/20" />
                  <p className="text-sm sm:text-base text-foreground leading-relaxed italic">&quot;{test.quote}&quot;</p>
                  <div>
                    <div className="font-bold text-foreground">{test.author}</div>
                    <div className="text-xs sm:text-sm text-primary">{test.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-20 md:py-28 bg-muted/30 border-y border-border">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
              {[
                { label: "Projects Delivered", value: "20+" },
                { label: "System Uptime", value: "99.9%" },
                { label: "Industries Served", value: "6+" },
                { label: "Support Available", value: "24/7" },
              ].map((stat, idx) => (
                <div key={idx} className="space-y-2 sm:space-y-3 p-2 sm:p-4 rounded-2xl hover:bg-background/50 transition-colors">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary tracking-tight">{stat.value}</div>
                  <div className="text-[10px] sm:text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-24 md:py-32 relative">
          <div className="mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8 p-6 sm:p-8 md:p-12 rounded-3xl bg-primary/5 border border-primary/10">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                Ready to Build the Future?
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Whether you need a bespoke hiring platform, a robust CRM, or a high-converting e-commerce store, we have the expertise to make it happen.
              </p>
              <Button size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base rounded-full shadow-lg hover:shadow-xl transition-all w-full sm:w-auto" asChild>
                <Link href="/contact">
                  Start Your Project <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
}