import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Phone, MapPin, Globe, Clock, Briefcase, 
  GraduationCap, CheckCircle, XCircle, LucideIcon, 
  Calendar, ExternalLink, Mail
} from "lucide-react";
import { StatusBadge } from "./volunteer-list";

export interface VolunteerApplication {
  id: string;
  created_at: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  location: string | null;
  status: string | null;
  experience_level: string | null;
  education_background: string | null;
  technical_skills: string | null;
  portfolio_url: string | null;
  weekly_availability: string | null;
  motivation: string | null;
  previous_projects: string | null;
}

interface VolunteerSheetProps {
  applicant: VolunteerApplication | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusUpdate?: (id: string, status: "accepted" | "rejected") => void;
}

export function VolunteerSheet({ applicant, open, onOpenChange, onStatusUpdate }: VolunteerSheetProps) {
  if (!applicant) return null;

  const initials = `${applicant.first_name[0]}${applicant.last_name[0]}`.toUpperCase();
  const skillsList = applicant.technical_skills 
    ? applicant.technical_skills.split(",").map(s => s.trim()).filter(s => s.length > 0)
    : [];
  const isPending = !applicant.status || applicant.status === "pending";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-2xl p-0 flex flex-col h-full bg-background border-l-border">
        
        {/* HEADER */}
        <div className="p-6 bg-card border-b border-border sticky top-0 z-10 shadow-sm">
          <div className="flex items-start gap-4">
            <Avatar className="h-16 w-16 border-2 border-muted shadow-sm">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <div>
                  <SheetTitle className="text-xl sm:text-2xl font-bold tracking-tight text-foreground truncate">
                    {applicant.first_name} {applicant.last_name}
                  </SheetTitle>
                  <p className="text-muted-foreground text-sm font-medium flex items-center gap-1.5 mt-1">
                     <Mail className="w-3.5 h-3.5" /> {applicant.email}
                  </p>
                </div>
                <StatusBadge status={applicant.status} />
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                <Calendar className="w-3 h-3" />
                Applied on {new Date(applicant.created_at).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT */}
        <ScrollArea className="flex-1">
          <div className="p-6 space-y-8">
            
            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <InfoCard icon={Briefcase} label="Experience" value={applicant.experience_level} />
              <InfoCard icon={GraduationCap} label="Education" value={applicant.education_background} />
              <InfoCard icon={Clock} label="Availability" value={applicant.weekly_availability ? `${applicant.weekly_availability} hrs/week` : null} />
              <InfoCard icon={MapPin} label="Location" value={applicant.location} />
            </div>

            <Separator className="bg-border" />

            {/* Contact Details */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Contact & Links</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-card p-4 rounded-lg border border-border shadow-sm">
                <ContactItem icon={Phone} label="Phone" value={applicant.phone} />
                <ContactItem icon={Globe} label="Portfolio" value={applicant.portfolio_url} isLink />
              </div>
            </div>

            {/* Skills */}
            <div className="space-y-3">
               <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Technical Stack</h3>
               <div className="flex flex-wrap gap-2">
                  {skillsList.length > 0 ? (
                    skillsList.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="px-3 py-1 bg-muted hover:bg-muted/80 text-foreground border-transparent">
                        {skill}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground italic">No specific skills listed.</p>
                  )}
               </div>
            </div>

            {/* Long Text */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Motivation</h3>
              <div className="bg-muted/30 p-5 rounded-lg border border-border text-foreground leading-relaxed text-sm whitespace-pre-wrap">
                {applicant.motivation || "No motivation provided."}
              </div>
            </div>

            {applicant.previous_projects && (
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Previous Projects</h3>
                <div className="bg-muted/30 p-5 rounded-lg border border-border text-foreground leading-relaxed text-sm whitespace-pre-wrap">
                  {applicant.previous_projects}
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* FOOTER */}
        {onStatusUpdate && isPending && (
          <SheetFooter className="p-6 border-t border-border bg-card flex-col sm:flex-row gap-3 sm:justify-between items-center z-10">
             <span className="text-xs text-muted-foreground hidden sm:block">
               Reviewing candidate...
             </span>
             <div className="flex gap-3 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  className="flex-1 sm:flex-none border-red-200 text-red-700 hover:bg-red-50 hover:text-red-800 dark:border-red-900 dark:text-red-400 dark:hover:bg-red-950/50"
                  onClick={() => {
                    onStatusUpdate(applicant.id, "rejected");
                    onOpenChange(false);
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" /> Reject
                </Button>
                <Button 
                  className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white dark:bg-green-700 dark:hover:bg-green-600"
                  onClick={() => {
                    onStatusUpdate(applicant.id, "accepted");
                    onOpenChange(false);
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" /> Accept
                </Button>
             </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: LucideIcon, label: string, value: string | null | undefined }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-card shadow-sm">
      <div className="p-2 bg-muted rounded-full text-muted-foreground">
        <Icon className="w-4 h-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] uppercase font-bold text-muted-foreground">{label}</div>
        <div className="text-sm font-semibold capitalize text-foreground truncate">{value}</div>
      </div>
    </div>
  )
}

function ContactItem({ icon: Icon, label, value, isLink }: { icon: LucideIcon, label: string, value: string | null | undefined, isLink?: boolean }) {
  if (!value) return null;
  return (
    <div className="flex items-center gap-3">
      <div className="p-2 bg-muted rounded-md text-muted-foreground">
        <Icon className="w-4 h-4" />
      </div>
      <div className="overflow-hidden">
        <div className="text-xs text-muted-foreground">{label}</div>
        {isLink ? (
          <a href={value} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 truncate">
            {value} <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <div className="text-sm font-medium truncate text-foreground">{value}</div>
        )}
      </div>
    </div>
  )
}