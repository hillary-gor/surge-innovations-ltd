"use client";

import { updateProfile, ProfileState } from "./actions"; 
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Save } from "lucide-react";
import { useEffect } from "react";
import { toast } from "sonner";

interface Profile {
  full_name: string | null;
  phone: string | null;
  location: string | null;
  bio: string | null;
  avatar_url: string | null;
}

export function ProfileForm({ profile, email }: { profile: Profile; email: string }) {
  const initialState: ProfileState = { message: null, errors: {} };
  
  // FIXED: Renamed hook
  const [state, dispatch] = useActionState(updateProfile, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success(state.message);
    } else if (state.message && !state.success) {
      toast.error(state.message);
    }
  }, [state]);

  const initials = profile.full_name
    ? profile.full_name.split(" ").map((n) => n[0]).join("").substring(0, 2).toUpperCase()
    : "AD";

  return (
    <form action={dispatch}>
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle>Public Profile</CardTitle>
          <CardDescription>
            This information will be displayed publicly on the platform.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          
          <div className="flex items-center gap-6">
            <div className="relative group">
              <Avatar className="h-20 w-20 border-2 border-border">
                <AvatarImage src={profile.avatar_url || ""} />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-bold">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="space-y-1">
               <h3 className="font-medium text-foreground">Profile Picture</h3>
               <p className="text-xs text-muted-foreground">JPG, GIF or PNG. Max 1MB.</p>
               <Button variant="outline" size="sm" type="button" disabled className="h-8">
                 Upload New
               </Button>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input 
                id="fullName" 
                name="fullName" 
                defaultValue={profile.full_name || ""} 
                placeholder="John Doe"
              />
              {state.errors?.fullName && (
                <p className="text-xs text-red-500">{state.errors.fullName[0]}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                value={email} 
                disabled 
                className="bg-muted text-muted-foreground" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input 
                id="phone" 
                name="phone" 
                defaultValue={profile.phone || ""} 
                placeholder="+254 700 000000"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input 
                id="location" 
                name="location" 
                defaultValue={profile.location || ""} 
                placeholder="Nairobi, Kenya"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea 
              id="bio" 
              name="bio" 
              defaultValue={profile.bio || ""} 
              placeholder="Tell us a little about yourself..."
              className="min-h-25"
            />
            <p className="text-[10px] text-muted-foreground text-right">
              Max 160 characters.
            </p>
          </div>
        </CardContent>
        <CardFooter className="bg-muted/30 border-t border-border px-6 py-4 flex justify-between items-center">
           <p className="text-xs text-muted-foreground">
             Last updated: {new Date().toLocaleDateString()}
           </p>
           <SubmitButton />
        </CardFooter>
      </Card>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>Saving...</>
      ) : (
        <>
          <Save className="mr-2 h-4 w-4" /> Save Changes
        </>
      )}
    </Button>
  );
}