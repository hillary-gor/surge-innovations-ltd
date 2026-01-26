"use client";

import { useState } from "react";
import { 
  TrendingUp, 
  Calculator, 
  Users, 
  Briefcase, 
  Layout, 
  FolderOpen, 
  Database, 
  Key, 
  FileText, 
  History,
  Truck,
  Scale,
  HardHat,
  Stethoscope,
  GraduationCap,
  Layers,
  ChevronDown,
  ChevronUp,
  MousePointerClick
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function PremiumScope() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-12 max-w-5xl mx-auto px-4 md:px-6 font-sans">
      
      {/* 1. THE TEASER HEADER (Always Visible) */}
      <div className="text-center space-y-6 mb-8">
        <Badge variant="outline" className="px-4 py-1 text-base font-medium border-teal-500/50 text-teal-600 bg-teal-50 dark:bg-teal-950/30 dark:text-teal-400">
          Scope of the &apos;Free&apos; Build
        </Badge>
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
           The &quot;Digital Operations&quot; Suite
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          The Premium Tier replaces your physical filing cabinets and manual spreadsheets. We build a platform that doesn&apos;t just &quot;show&quot; your business, but helps you <span className="font-semibold text-foreground">run it</span>.
        </p>

        {/* 2. THE TOGGLE BUTTON */}
        <div className="flex justify-center">
            <Button 
                onClick={() => setIsOpen(!isOpen)} 
                size="lg" 
                className={`gap-2 text-base h-14 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ${isOpen ? "bg-muted text-foreground hover:bg-muted/80" : "bg-teal-600 hover:bg-teal-700 text-white animate-pulse"}`}
            >
                {isOpen ? (
                    <>
                        Close Full Breakdown <ChevronUp className="w-5 h-5" />
                    </>
                ) : (
                    <>
                        <MousePointerClick className="w-5 h-5" /> View Operational Features (40+ Views) <ChevronDown className="w-5 h-5" />
                    </>
                )}
            </Button>
        </div>
        
        {!isOpen && (
             <div className="flex flex-wrap justify-center gap-4 pt-4 opacity-60">
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full text-sm font-medium border border-border">
                    <Layout className="w-4 h-4 text-teal-500" /> ~40+ Unique Views
                </div>
                <div className="flex items-center gap-2 bg-muted/50 px-4 py-2 rounded-full text-sm font-medium border border-border">
                    <Layers className="w-4 h-4 text-orange-500" /> 15 Custom Modules
                </div>
            </div>
        )}
      </div>

      {/* 3. THE COLLAPSIBLE CONTENT */}
      <div className={`grid transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 space-y-16 pt-8">


            {/* 1. PUBLIC FACING GROWTH PAGES */}
            <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4 space-y-4">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-teal-100 dark:bg-teal-900/50 rounded-lg text-teal-600 dark:text-teal-400">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        Growth Pages
                    </h3>
                    <p className="text-muted-foreground">
                        Beyond the basics. These interfaces are designed to capture leads, qualify prospects, and recruit talent automatically.
                    </p>
                </div>
                <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
                    <Card className="border-l-4 border-l-teal-500 shadow-sm">
                        <CardContent className="p-5 space-y-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <Calculator className="w-4 h-4 text-teal-500" /> Interactive Cost Calculator
                            </div>
                            <p className="text-sm text-muted-foreground">A custom tool for clients to generate their own estimated quotes instantly on your site.</p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-teal-500 shadow-sm">
                        <CardContent className="p-5 space-y-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <Briefcase className="w-4 h-4 text-teal-500" /> Recruitment Portal
                            </div>
                            <p className="text-sm text-muted-foreground">A dynamic &quot;Careers&quot; board that lists open roles and accepts CV applications automatically.</p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-teal-500 shadow-sm">
                        <CardContent className="p-5 space-y-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <Users className="w-4 h-4 text-teal-500" /> &quot;Meet the Team&quot; Grid
                            </div>
                            <p className="text-sm text-muted-foreground">Dynamic staff profiles with individual bio pages to build trust with high-value clients.</p>
                        </CardContent>
                    </Card>
                    <Card className="border-l-4 border-l-teal-500 shadow-sm">
                        <CardContent className="p-5 space-y-2">
                            <div className="flex items-center gap-2 font-semibold">
                                <FileText className="w-4 h-4 text-teal-500" /> Resource Center
                            </div>
                            <p className="text-sm text-muted-foreground">A dedicated public library for downloadable brochures, whitepapers, and guides.</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Separator />

            {/* 2. OPERATIONS DASHBOARD */}
            <div className="grid md:grid-cols-12 gap-8">
                <div className="md:col-span-4 space-y-4">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/50 rounded-lg text-orange-600 dark:text-orange-400">
                            <FolderOpen className="w-6 h-6" />
                        </div>
                        The &quot;Digital Office&quot;
                    </h3>
                    <p className="text-muted-foreground">
                        A multi-user environment where your staff can actually work. Replace Dropbox, Google Sheets, and physical files.
                    </p>
                </div>
                <div className="md:col-span-8">
                    <div className="bg-muted/30 rounded-xl p-6 border border-border space-y-6">
                        
                        {/* Feature List */}
                        <div className="grid gap-4">
                            {[
                                { icon: Key, title: "Multi-User Login Gate", desc: "Separate secure access for Admin vs. Staff roles." },
                                { icon: FolderOpen, title: "Digital Filing Cabinet", desc: "Drag-and-drop interface to upload, tag, & search internal docs (25GB)." },
                                { icon: Database, title: "Client Registry", desc: "A database view of all your clients with history, notes, and files." },
                                { icon: History, title: "Basic Audit Trail", desc: "Track who uploaded a file or changed a record for accountability." },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="mt-1 bg-background p-1.5 rounded-md border shadow-sm">
                                        <item.icon className="w-5 h-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-foreground">{item.title}</h4>
                                        <p className="text-sm text-muted-foreground">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>

            {/* 3. THE EFFICIENCY UPGRADE (CUSTOM MODULES) */}
            <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-teal-500/10 via-background to-orange-500/10 border border-border p-8 md:p-12 text-center">
                
                <Badge className="mb-6 bg-linear-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white border-0">
                    The Efficiency Upgrade
                </Badge>
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    15 Custom Operational Modules
                </h3>
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-10">
                    We digitize your specific paperwork. You can request up to 15 specialized forms or workflows tailored to your industry.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 text-left">
                    {/* School */}
                    <div className="bg-background/80 backdrop-blur border border-border p-4 rounded-xl hover:border-teal-500/50 transition-colors group">
                        <GraduationCap className="w-6 h-6 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Education</div>
                        <div className="text-sm font-medium leading-tight">Student Admission + Term Dates</div>
                    </div>

                    {/* Logistics */}
                    <div className="bg-background/80 backdrop-blur border border-border p-4 rounded-xl hover:border-teal-500/50 transition-colors group">
                        <Truck className="w-6 h-6 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Logistics</div>
                        <div className="text-sm font-medium leading-tight">Shipment Tracker + Driver Onboarding</div>
                    </div>

                    {/* Legal */}
                    <div className="bg-background/80 backdrop-blur border border-border p-4 rounded-xl hover:border-teal-500/50 transition-colors group">
                        <Scale className="w-6 h-6 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Legal</div>
                        <div className="text-sm font-medium leading-tight">Case File Manager + Discovery</div>
                    </div>

                    {/* Construction */}
                    <div className="bg-background/80 backdrop-blur border border-border p-4 rounded-xl hover:border-teal-500/50 transition-colors group">
                        <HardHat className="w-6 h-6 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Construction</div>
                        <div className="text-sm font-medium leading-tight">Project Timeline + Site Reports</div>
                    </div>

                    {/* Medical */}
                    <div className="bg-background/80 backdrop-blur border border-border p-4 rounded-xl hover:border-teal-500/50 transition-colors group">
                        <Stethoscope className="w-6 h-6 text-teal-600 mb-3 group-hover:scale-110 transition-transform" />
                        <div className="text-xs font-bold text-muted-foreground uppercase mb-1">Medical</div>
                        <div className="text-sm font-medium leading-tight">Patient Reg + Appointment Logs</div>
                    </div>
                </div>
            </div>

            {/* FINAL VALUE SUMMARY */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl text-center space-y-4 shadow-xl">
                <h4 className="text-2xl font-bold">Total Value Proposition</h4>
                <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
                    You are moving your operations into the cloud. You get a <span className="font-bold text-teal-400">40-Page Operational Platform</span>, Multi-Staff Access, Digital Filing Systems, and <span className="font-bold text-orange-400">15 Custom Workflows</span>. 
                </p>
                <p className="font-medium opacity-80 border-t border-white/10 pt-4 mt-4 inline-block">
                    This replaces the need for Dropbox, Google Forms, and manual Excel sheets.
                </p>
                
                {/* Close Button */}
                <div className="pt-4">
                    <Button 
                        variant="secondary" 
                        onClick={() => {
                            setIsOpen(false);
                            if (typeof window !== "undefined") {
                                window.scrollBy({ top: -300, behavior: "smooth" });
                            }
                        }}
                    >
                        Collapse Section <ChevronUp className="w-4 h-4 ml-2" />
                    </Button>
                </div>
            </div>


        </div>
      </div>
    </div>
  );
}