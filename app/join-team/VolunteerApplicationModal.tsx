"use client";

import { useState, useEffect, useRef } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, AlertCircle, LogIn } from "lucide-react";
import { toast } from "sonner";
import { submitVolunteerApplication } from "./apply-volunteer";
import { volunteerSchema } from "@/lib/schemas/volunteer-schema";
import Link from "next/link";

export function VolunteerApplicationModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const formRef = useRef<HTMLFormElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function checkUser() {
      if (!open) return;

      setIsLoadingAuth(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      setIsLoadingAuth(false);
    }

    checkUser();
  }, [open, supabase.auth]);

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    setErrors({}); 

    const rawData = Object.fromEntries(formData.entries());
    if (!rawData.terms) rawData.terms = ""; 

    const validation = volunteerSchema.safeParse(rawData);

    if (!validation.success) {
      const fieldErrors: Record<string, string> = {};
      validation.error.issues.forEach((issue) => {
        const path = issue.path[0]; 
        if (path) fieldErrors[path.toString()] = issue.message;
      });
      setErrors(fieldErrors);
      setIsSubmitting(false);
      toast.error("Please fix the errors in the form.");
      return; 
    }

    const result = await submitVolunteerApplication(formData);
    setIsSubmitting(false);

    if (result.success) {
      toast.success(result.message);
      setOpen(false);
      formRef.current?.reset(); 
    } else {
      toast.error(result.error);
    }
  }

  const metaName = user?.user_metadata?.full_name || "";
  const [defaultFirst, ...rest] = metaName.split(" ");
  const defaultLast = rest.join(" ");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-3xl w-[95vw] max-h-[90vh] overflow-y-auto p-6 md:p-8">
        
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold">Join the Surge Volunteer Program</DialogTitle>
          <DialogDescription className="text-base">
            Complete this form to apply.
          </DialogDescription>
        </DialogHeader>

        {isLoadingAuth ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
             <Loader2 className="h-8 w-8 animate-spin text-primary" />
             <p className="text-muted-foreground">Checking account status...</p>
          </div>
        ) : !user ? (
          
          <div className="flex flex-col items-center justify-center py-8 space-y-6 text-center">
            <div className="bg-primary/10 p-4 rounded-full">
              <LogIn className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">Sign in to Apply</h3>
              <p className="text-muted-foreground max-w-sm mt-2">
                To ensure quality and security, we require all volunteers to have a registered account.
              </p>
            </div>
            <div className="flex gap-4 w-full max-w-xs">
              <Button asChild className="w-full" size="lg">
                <Link href="/auth/signin?next=/join-team">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full" size="lg">
                 <Link href="/auth/signup?next=/join-team">Create Account</Link>
              </Button>
            </div>
          </div>

        ) : (

          <form ref={formRef} action={handleSubmit} className="space-y-6">
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className={errors.firstName ? "text-destructive" : ""}>First Name</Label>
                <Input 
                   name="firstName" 
                   id="firstName" 
                   defaultValue={defaultFirst || ""}
                   className={errors.firstName ? "border-destructive" : "h-10"} 
                />
                <ErrorMessage message={errors.firstName} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className={errors.lastName ? "text-destructive" : ""}>Last Name</Label>
                <Input 
                   name="lastName" 
                   id="lastName" 
                   defaultValue={defaultLast || ""}
                   className={errors.lastName ? "border-destructive" : "h-10"} 
                />
                <ErrorMessage message={errors.lastName} />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
               <div className="space-y-2">
                  <Label htmlFor="email" className={errors.email ? "text-destructive" : ""}>Email Address</Label>
                  <Input 
                     name="email" 
                     id="email" 
                     type="email" 
                     defaultValue={user.email}
                     readOnly
                     className="bg-muted/50 h-10 cursor-not-allowed" 
                  />
                  <p className="text-[10px] text-muted-foreground">Signed in as {user.email}</p>
               </div>
               <div className="space-y-2">
                  <Label htmlFor="phone" className={errors.phone ? "text-destructive" : ""}>Phone Number</Label>
                  <Input name="phone" id="phone" type="tel" className={errors.phone ? "border-destructive" : "h-10"} />
                  <ErrorMessage message={errors.phone} />
               </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="location" className={errors.location ? "text-destructive" : ""}>Location (City, Country)</Label>
               <Input name="location" id="location" placeholder="e.g. Nairobi, Kenya" className={errors.location ? "border-destructive" : "h-10"} />
               <ErrorMessage message={errors.location} />
            </div>

            <div className="bg-muted/30 p-4 rounded-lg border border-border/50 space-y-4">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className={errors.experienceLevel ? "text-destructive" : ""}>Experience Level</Label>
                  <Select name="experienceLevel">
                    <SelectTrigger className={`h-10 ${errors.experienceLevel ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="beginner">Beginner (0-1 yrs)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 yrs)</SelectItem>
                      <SelectItem value="advanced">Advanced (3+ yrs)</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={errors.experienceLevel} />
                </div>
                <div className="space-y-2">
                  <Label className={errors.educationBackground ? "text-destructive" : ""}>Education</Label>
                  <Select name="educationBackground">
                    <SelectTrigger className={`h-10 ${errors.educationBackground ? "border-destructive" : ""}`}>
                      <SelectValue placeholder="Select background" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="self-taught">Self-Taught</SelectItem>
                      <SelectItem value="bootcamp">Bootcamp</SelectItem>
                      <SelectItem value="cs-degree">CS Degree</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                  <ErrorMessage message={errors.educationBackground} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="skills" className={errors.technicalSkills ? "text-destructive" : ""}>Technical Skills</Label>
                <Textarea 
                  name="technicalSkills" 
                  id="skills" 
                  placeholder="List your stack: React, Node.js, Python, Tailwind..." 
                  className={`resize-none ${errors.technicalSkills ? "border-destructive" : ""}`}
                />
                <ErrorMessage message={errors.technicalSkills} />
              </div>
            </div>

            <div className="space-y-2">
               <Label htmlFor="portfolio" className={errors.portfolioUrl ? "text-destructive" : ""}>Portfolio / GitHub (Optional)</Label>
               <Input name="portfolioUrl" id="portfolio" placeholder="https://..." className={errors.portfolioUrl ? "border-destructive" : "h-10"} />
               <ErrorMessage message={errors.portfolioUrl} />
            </div>

            <div className="space-y-2">
               <Label className={errors.weeklyAvailability ? "text-destructive" : ""}>Weekly Availability</Label>
               <Select name="weeklyAvailability">
                  <SelectTrigger className={`h-10 ${errors.weeklyAvailability ? "border-destructive" : ""}`}>
                     <SelectValue placeholder="Hours per week you can commit" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="5-10">5-10 hours</SelectItem>
                     <SelectItem value="10-20">10-20 hours</SelectItem>
                     <SelectItem value="20+">20+ hours</SelectItem>
                  </SelectContent>
               </Select>
               <ErrorMessage message={errors.weeklyAvailability} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="motivation" className={errors.motivation ? "text-destructive" : ""}>Why do you want to join?</Label>
              <Textarea 
                name="motivation" 
                id="motivation" 
                placeholder="Tell us about your goals and what you hope to learn..."
                rows={4}
                className={errors.motivation ? "border-destructive" : ""}
              />
              <ErrorMessage message={errors.motivation} />
            </div>

            <div className="space-y-2">
              <div className={`flex items-start space-x-3 pt-2 p-4 rounded-md ${errors.terms ? "bg-destructive/10" : "bg-primary/5"}`}>
                <Checkbox name="terms" id="terms" className="mt-1" />
                <label htmlFor="terms" className="text-sm text-muted-foreground leading-tight cursor-pointer">
                  I agree to the <a href="/terms/volunteer" target="_blank" className="underline text-primary hover:text-primary/80">Volunteer Participation Agreement</a>. 
                  I understand this is an unpaid position.
                </label>
              </div>
              <ErrorMessage message={errors.terms} />
            </div>

            <Button type="submit" size="lg" className="w-full text-base py-6" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

function ErrorMessage({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="text-[0.8rem] font-medium text-destructive flex items-center gap-1 mt-1 animate-in slide-in-from-top-1 fade-in">
      <AlertCircle className="w-3 h-3" /> {message}
    </p>
  );
}