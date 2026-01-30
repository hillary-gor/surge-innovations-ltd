"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { MoreHorizontal, Eye, CheckCircle, XCircle, Search, Calendar, User } from "lucide-react";
import { useState } from "react";
import { VolunteerSheet, VolunteerApplication } from "./volunteer-sheet"; 
import { updateApplicationStatus } from "./update-application-status";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export function VolunteerList({ applications }: { applications: VolunteerApplication[] }) {
  const [selectedApp, setSelectedApp] = useState<VolunteerApplication | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter by Search Query
  const filteredApps = applications.filter(app => 
    app.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.last_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    app.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter by Tab Status
  const getFilteredData = (status: string) => {
    if (status === "all") return filteredApps;
    return filteredApps.filter(a => (a.status || "pending") === status);
  }

  const handleStatusUpdate = async (id: string, status: "accepted" | "rejected") => {
    const toastId = toast.loading("Updating status...");
    const result = await updateApplicationStatus(id, status);
    
    if (result.success) {
      toast.success(result.message, { id: toastId });
    } else {
      toast.error(result.error, { id: toastId });
    }
  };

  const handleView = (app: VolunteerApplication) => {
    setSelectedApp(app);
    setIsSheetOpen(true);
  };

  return (
    <>
      <div className="flex items-center space-x-2 mb-4">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search applicants..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-8 bg-card"
          />
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full justify-start overflow-x-auto h-auto p-1 bg-muted/50 gap-1 mb-4">
          {["all", "pending", "reviewed", "accepted", "rejected"].map((tab) => (
             <TabsTrigger key={tab} value={tab} className="capitalize px-4 py-2">
               {tab}
             </TabsTrigger>
          ))}
        </TabsList>

        {["all", "pending", "reviewed", "accepted", "rejected"].map((tab) => (
          <TabsContent key={tab} value={tab}>
            <div className="flex flex-col gap-4">
              {/* Desktop View: Table */}
              <div className="hidden md:block border rounded-lg overflow-hidden bg-card shadow-sm">
                <DesktopTable 
                  data={getFilteredData(tab)} 
                  onView={handleView} 
                  onStatusUpdate={handleStatusUpdate} 
                />
              </div>

              {/* Mobile View: CardsStack */}
              <div className="block md:hidden space-y-3">
                <MobileCardList 
                  data={getFilteredData(tab)} 
                  onView={handleView} 
                  onStatusUpdate={handleStatusUpdate} 
                />
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>

      <VolunteerSheet 
        applicant={selectedApp} 
        open={isSheetOpen} 
        onOpenChange={setIsSheetOpen} 
        onStatusUpdate={handleStatusUpdate}
      />
    </>
  );
}

// --- SUB-COMPONENTS INTERFACES ---

interface ListProps {
  data: VolunteerApplication[];
  onView: (app: VolunteerApplication) => void;
  onStatusUpdate: (id: string, status: "accepted" | "rejected") => void;
}

interface ActionMenuProps {
  app: VolunteerApplication;
  onView: (app: VolunteerApplication) => void;
  onStatusUpdate: (id: string, status: "accepted" | "rejected") => void;
}

// --- DESKTOP TABLE ---

function DesktopTable({ data, onView, onStatusUpdate }: ListProps) {
  if (data.length === 0) return <EmptyState />;

  return (
    <table className="w-full text-sm text-left">
      <thead className="bg-muted text-muted-foreground font-medium border-b border-border">
        <tr>
          <th className="py-3 px-4">Date</th>
          <th className="py-3 px-4">Applicant</th>
          <th className="py-3 px-4">Role / Level</th>
          <th className="py-3 px-4">Status</th>
          <th className="py-3 px-4 text-right">Actions</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {data.map((app) => (
          <tr key={app.id} className="hover:bg-muted/30 transition-colors">
            <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
              {new Date(app.created_at).toLocaleDateString()}
            </td>
            <td className="py-3 px-4">
              <div className="font-medium text-foreground">{app.first_name} {app.last_name}</div>
              <div className="text-xs text-muted-foreground">{app.email}</div>
            </td>
            <td className="py-3 px-4">
              <div className="capitalize font-medium text-foreground">{app.experience_level || "Volunteer"}</div>
              <div className="text-xs text-muted-foreground truncate max-w-48">
                {app.technical_skills || "No skills listed"}
              </div>
            </td>
            <td className="py-3 px-4">
               <StatusBadge status={app.status} />
            </td>
            <td className="py-3 px-4 text-right">
              <ActionMenu app={app} onView={onView} onStatusUpdate={onStatusUpdate} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// --- MOBILE CARDS ---

function MobileCardList({ data, onView, onStatusUpdate }: ListProps) {
  if (data.length === 0) return <EmptyState />;

  return (
    <>
      {data.map((app) => (
        <div key={app.id} className="bg-card border border-border rounded-lg p-4 shadow-sm flex flex-col gap-3">
          <div className="flex justify-between items-start">
            <div className="flex gap-3 items-center">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {app.first_name[0]}{app.last_name[0]}
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{app.first_name} {app.last_name}</h3>
                <p className="text-xs text-muted-foreground">{app.experience_level || "Volunteer"}</p>
              </div>
            </div>
            <ActionMenu app={app} onView={onView} onStatusUpdate={onStatusUpdate} />
          </div>
          
          <div className="flex items-center justify-between text-sm mt-1">
             <div className="flex items-center text-muted-foreground text-xs">
                <Calendar className="w-3 h-3 mr-1" />
                {new Date(app.created_at).toLocaleDateString()}
             </div>
             <StatusBadge status={app.status} />
          </div>
          
          <Button variant="outline" size="sm" className="w-full mt-1" onClick={() => onView(app)}>
            View Application
          </Button>
        </div>
      ))}
    </>
  );
}

// --- SHARED UTILS ---

function EmptyState() {
  return (
    <div className="py-12 flex flex-col items-center justify-center text-center text-muted-foreground bg-card border border-dashed rounded-lg">
       <User className="h-10 w-10 mb-2 opacity-20" />
       <p>No applications found.</p>
    </div>
  );
}

function ActionMenu({ app, onView, onStatusUpdate }: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0 text-muted-foreground hover:text-foreground">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => onView(app)}>
          <Eye className="mr-2 h-4 w-4" /> View Details
        </DropdownMenuItem>
        {app.status !== "accepted" && app.status !== "rejected" && (
          <>
            <DropdownMenuItem onClick={() => onStatusUpdate(app.id, "accepted")} className="text-green-600 focus:text-green-700 dark:text-green-400 focus:bg-green-50 dark:focus:bg-green-950/30">
              <CheckCircle className="mr-2 h-4 w-4" /> Accept
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onStatusUpdate(app.id, "rejected")} className="text-red-600 focus:text-red-700 dark:text-red-400 focus:bg-red-50 dark:focus:bg-red-950/30">
              <XCircle className="mr-2 h-4 w-4" /> Reject
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function StatusBadge({ status }: { status: string | null }) {
  const styles: Record<string, string> = {
    accepted: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    rejected: "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800",
    reviewed: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800",
  };
  const s = status || "pending";
  return <Badge variant="outline" className={cn("capitalize", styles[s])}>{s}</Badge>;
}