"use client";

import { useState } from "react";
import { 
  Building2, 
  BarChart4, 
  ShieldAlert, 
  Network, 
  FileCheck, 
  Users, 
  Lock, 
  Database,
  Workflow,
  Laptop2,
  BellRing,
  Fingerprint,
  ChevronDown,
  ChevronUp,
  MousePointerClick
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

export function PlatinumScope() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-12 max-w-6xl mx-auto font-sans">
      
      {/* 1. THE TEASER HEADER (Always Visible) */}
      <div className="text-center space-y-6 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-slate-50 text-slate-600 text-xs font-semibold uppercase tracking-wider">
          <Building2 className="w-3 h-3" />
          Mission Critical Infrastructure
        </div>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
          The Enterprise Architecture Suite
        </h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
          At this level, we stop counting pages. We build a <span className="text-slate-900 dark:text-white font-semibold">Custom Software Solution</span> tailored to your organizational hierarchy and long-term scalability.
        </p>

        {/* 2. THE TOGGLE BUTTON */}
        <div className="flex justify-center">
            <Button 
                onClick={() => setIsOpen(!isOpen)} 
                size="lg" 
                className={`gap-2 text-base h-14 px-8 rounded-full shadow-lg hover:scale-105 transition-all duration-300 ${isOpen ? "bg-slate-200 text-slate-900 hover:bg-slate-300" : "bg-purple-600 hover:bg-purple-700 text-white animate-pulse"}`}
            >
                {isOpen ? (
                    <>
                        Close Full Breakdown <ChevronUp className="w-5 h-5" />
                    </>
                ) : (
                    <>
                        <MousePointerClick className="w-5 h-5" /> View Enterprise Capabilities <ChevronDown className="w-5 h-5" />
                    </>
                )}
            </Button>
        </div>
      </div>

      {/* 3. THE COLLAPSIBLE CONTENT */}
      <div className={`grid transition-all duration-700 ease-in-out overflow-hidden ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <div className="min-h-0 space-y-20 pt-8">

            {/* --- CONTENT START --- */}

            {/* 1. THE COMMAND CENTER (DATA VIZ) */}
            <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4 space-y-4">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-indigo-600 rounded-lg text-white shadow-lg shadow-indigo-200">
                            <BarChart4 className="w-6 h-6" />
                        </div>
                        Intelligence Dashboard
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        We don&apos;t just show you tables; we show you intelligence. This is an Executive Command View designed for decision-makers.
                    </p>
                </div>
                <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
                    {[
                        { title: "Executive KPI View", desc: "Live charts & trend lines for Revenue, Growth, and User Activity." },
                        { title: "Departmental Isolation", desc: "Separate sub-dashboards for HR, Finance, and Ops (Siloed Views)." },
                        { title: "Real-Time Ticker", desc: "Live activity feed tracking organizational actions as they happen." },
                        { title: "Board Reporting", desc: "One-click generation of PDF/CSV reports for monthly meetings." },
                    ].map((item, i) => (
                        <Card key={i} className="bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800">
                            <CardContent className="p-6">
                                <h4 className="font-semibold text-slate-900 dark:text-slate-100 mb-2">{item.title}</h4>
                                <p className="text-sm text-slate-500 dark:text-slate-400">{item.desc}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Separator />

            {/* 2. AUTOMATION & INTELLIGENCE */}
            <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4 space-y-4">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-emerald-600 rounded-lg text-white shadow-lg shadow-emerald-200">
                            <Workflow className="w-6 h-6" />
                        </div>
                        Smart Automation
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Reduce manual overhead by automating document creation and communication flows.
                    </p>
                </div>
                <div className="md:col-span-8">
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="flex gap-4">
                            <FileCheck className="w-8 h-8 text-emerald-600 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-lg">Auto-PDF Generation</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    System automatically generates branded Invoices, Contracts, or Letters based on form inputs.
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <BellRing className="w-8 h-8 text-emerald-600 shrink-0" />
                            <div>
                                <h4 className="font-semibold text-lg">Notification Engine</h4>
                                <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                                    Automated Email & SMS triggers when specific actions happen (e.g., &quot;New Application Received&quot;).
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Separator />

            {/* 3. SECURITY & GOVERNANCE */}
            <div className="grid md:grid-cols-12 gap-8 items-start">
                <div className="md:col-span-4 space-y-4">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                        <div className="p-2 bg-rose-600 rounded-lg text-white shadow-lg shadow-rose-200">
                            <ShieldAlert className="w-6 h-6" />
                        </div>
                        Governance & Security
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                        Forensic-grade logging and access control to meet Enterprise compliance standards.
                    </p>
                </div>
                <div className="md:col-span-8 grid sm:grid-cols-2 gap-4">
                    {[
                        { icon: Fingerprint, title: "Audit Logs", desc: "Immutable log of every login, deletion, and edit for accountability." },
                        { icon: Lock, title: "RBAC System", desc: "Granular roles (e.g., 'Intern' can view, 'Manager' can edit)." },
                        { icon: Users, title: "Access Control", desc: "IP Whitelisting and Session Management capabilities." },
                        { icon: Database, title: "Data Sovereignty", desc: "Enterprise storage with 100GB capacity and redundancy." },
                    ].map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-slate-100 bg-white dark:bg-slate-950 dark:border-slate-800 shadow-sm">
                            <item.icon className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-semibold text-sm">{item.title}</h4>
                                <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 4. THE INTEGRATION LAYER */}
            <div className="bg-slate-900 text-slate-50 rounded-2xl p-8 md:p-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                        <Badge className="bg-blue-500 text-white hover:bg-blue-600">Connectivity</Badge>
                        <h3 className="text-3xl font-bold">The Integration Layer</h3>
                        <p className="text-slate-300 text-lg">
                            We don&apos;t just build an island; we connect to your world. The Platinum tier includes custom API development to sync with your existing tools.
                        </p>
                        <ul className="space-y-4">
                            {[
                                "Payment Gateways (M-Pesa, Stripe, PayPal)",
                                "CRM Sync (Salesforce, HubSpot, Zoho)",
                                "ERP Connections (SAP, Oracle, Microsoft Dynamics)",
                                "SSO (Single Sign-On with Google/Microsoft)",
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-3">
                                    <Network className="w-5 h-5 text-blue-400" />
                                    <span className="font-medium">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    {/* Visual Representation of Modules */}
                    <div className="bg-slate-800/50 rounded-xl p-8 border border-slate-700/50">
                        <div className="text-center mb-6">
                            <h4 className="text-xl font-bold text-white mb-2">20+ Enterprise Modules</h4>
                            <p className="text-sm text-slate-400">Map your entire organization to the cloud.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                "Donor Management", "Grant Reporting", "Inventory Alerts", "Supplier Portal",
                                "Loan Pipeline", "KYC Verification", "Leave Approval", "Performance Reviews"
                            ].map((mod, i) => (
                                <div key={i} className="bg-slate-900 border border-slate-700 p-3 rounded text-xs font-mono text-center text-slate-300">
                                    {mod}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 5. WHITE GLOVE SERVICE */}
            <div className="grid md:grid-cols-3 gap-6">
                <Card className="border-l-4 border-l-purple-600 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Laptop2 className="w-5 h-5 text-purple-600" /> Dedicated Tech Lead
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600 dark:text-slate-400">
                        You get a direct WhatsApp/Phone line to a Senior Engineer. No support tickets, just direct access.
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-600 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <ShieldAlert className="w-5 h-5 text-purple-600" /> 4-Hour SLA
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600 dark:text-slate-400">
                        Guaranteed response time for critical issues. Your business continuity is our priority.
                    </CardContent>
                </Card>
                <Card className="border-l-4 border-l-purple-600 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Workflow className="w-5 h-5 text-purple-600" /> Content Updates
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm text-slate-600 dark:text-slate-400">
                        Includes 2 hours/month of minor updates (banners, text changes) at no extra cost.
                    </CardContent>
                </Card>
            </div>

            {/* FINAL VALUE SUMMARY */}
            <div className="bg-slate-900 text-white p-8 rounded-2xl text-center space-y-4 shadow-xl">
                <h4 className="text-2xl font-bold">Total Value Proposition</h4>
                <p className="text-lg opacity-90 max-w-3xl mx-auto leading-relaxed">
                    You are acquiring a <span className="font-bold text-white">Proprietary Technology Asset</span>. 
                    Unlimited Architectural Scope, Data Intelligence, and Enterprise Integration for a predictable annual fee of 
                    <span className="font-bold text-purple-400 mx-1">KES 85,000</span>.
                </p>
                
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