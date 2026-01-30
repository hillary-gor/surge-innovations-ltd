"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState, useMemo } from "react";
import { User as SupabaseUser } from "@supabase/supabase-js";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SignOutButton } from "@/app/auth/SignOutButton";
import { Button } from "@/components/ui/button";
import { 
  Settings, 
  Calendar, 
  LayoutDashboard, 
  Camera, 
  CreditCard,
  Inbox,
  Layers,
  LifeBuoy
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Database } from "@/types/supabase";
import { AvatarUpload } from "@/components/profile/AvatarUpload"; 

type UserRole = Database["public"]["Enums"]["user_role"];

interface Profile {
  id: string;
  full_name: string;
  avatar_url: string | null;
  email: string;
  role: UserRole | null; 
  onboarded: boolean; 
}

export function AuthHeader() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const supabase = createClient();
  
  const getAvatarUrl = (url: string | null, size: number = 100) => {
    if (!url) return undefined;
    const cacheBuster = new Date().getHours(); 
    return `${url}?width=${size}&height=${size}&resize=cover&t=${cacheBuster}`;
  };

  const initials = useMemo(() => {
    if (!profile?.full_name) return "U";
    return profile.full_name
      .trim()
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  }, [profile?.full_name]);

  const dashboardLink = useMemo(() => {
    const role = profile?.role || 'client'; 
    return `/dashboard/${role}`;
  }, [profile?.role]);

  const userRole = profile?.role || 'client';

  useEffect(() => {
    let isMounted = true;

    async function fetchUserData() {
      try {
        const { data: { user: authUser }, error: userError } = await supabase.auth.getUser();
        
        if (userError || !authUser) {
          if (isMounted) setLoading(false);
          return;
        }

        if (isMounted) setUser(authUser);

        const { data: profileData } = await supabase
          .from("profiles")
          .select("id, full_name, avatar_url, email, role, onboarded") 
          .eq("id", authUser.id)
          .single();

        if (isMounted) {
          if (profileData) {
            setProfile(profileData as Profile);
          } else {
            // Fallback if profile doesn't exist yet
            setProfile({
              id: authUser.id,
              full_name: authUser.user_metadata?.full_name || "User",
              avatar_url: authUser.user_metadata?.avatar_url || null,
              email: authUser.email || "",
              role: "client", 
              onboarded: false,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchUserData();

    const { data: { subscription: authListener } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === "SIGNED_OUT") {
          setUser(null);
          setProfile(null);
          setLoading(false);
        } else if (event === "SIGNED_IN" && session?.user) {
          setLoading(true);
          fetchUserData();
        }
      }
    );

    // Real-time listener for Role/Avatar changes
    let profileChannel: ReturnType<typeof supabase.channel> | null = null;
    if (user?.id) {
      profileChannel = supabase
        .channel('profile-changes')
        .on(
          'postgres_changes',
          { event: 'UPDATE', schema: 'public', table: 'profiles', filter: `id=eq.${user.id}` },
          (payload) => { setProfile(payload.new as Profile); }
        )
        .subscribe();
    }

    return () => {
      isMounted = false;
      authListener.unsubscribe();
      if (profileChannel) supabase.removeChannel(profileChannel);
    };
  }, [supabase, user?.id]);

  if (loading) {
    return (
      <div className="h-9 w-9 rounded-full bg-muted/50 animate-pulse border border-border" />
    );
  }

  if (user && profile) {
    return (
      <>
        {/* --- AVATAR UPLOAD DIALOG --- */}
        <Dialog open={isAvatarOpen} onOpenChange={setIsAvatarOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Update Profile Picture</DialogTitle>
            </DialogHeader>
            <div className="flex justify-center py-4">
               <AvatarUpload 
                 uid={user.id} 
                 url={profile.avatar_url} 
                 onUpload={() => setIsAvatarOpen(false)} 
               />
            </div>
          </DialogContent>
        </Dialog>

        {/* --- MAIN DROPDOWN --- */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="h-9 w-9 rounded-full p-0 relative ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ml-2"
            >
              <Avatar className="h-9 w-9 border border-border transition-opacity hover:opacity-90">
                <AvatarImage
                  src={getAvatarUrl(profile.avatar_url, 64)}
                  alt={profile.full_name}
                  className="object-cover"
                />
                <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xs">
                  {initials}
                </AvatarFallback>
              </Avatar>
              {!profile.onboarded && (
                <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-rose-500 border-2 border-background" />
              )}
            </Button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-80 bg-card text-card-foreground border-border rounded-xl shadow-xl p-0" align="end" forceMount>
            
            {/* HEADER SECTION */}
            <div className="flex flex-col items-center justify-center p-6 border-b border-border bg-muted/20 relative">
              
              {!profile.onboarded && (
                <div className="absolute top-4 right-4">
                  <Link href={`${dashboardLink}/settings`}>
                    <Badge variant="destructive" className="h-5 px-1.5 text-[10px]">
                      Finish Setup
                    </Badge>
                  </Link>
                </div>
              )}

              <div className="relative mb-3 group">
                <Avatar className="h-20 w-20 border-4 border-background shadow-sm">
                  <AvatarImage
                    src={getAvatarUrl(profile.avatar_url, 200)}
                    alt={profile.full_name}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                
                {/* --- CLICKABLE CAMERA ICON --- */}
                <div 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsAvatarOpen(true);
                  }}
                  className="absolute bottom-0 right-0 p-1.5 bg-card border border-border rounded-full shadow-md text-foreground hover:bg-muted transition-colors cursor-pointer z-50"
                  title="Change Profile Picture"
                >
                  <Camera className="w-4 h-4" />
                </div>
              </div>

              <h3 className="text-lg font-semibold text-foreground text-center">
                Hi, {profile.full_name.split(' ')[0]}!
              </h3>
              <p className="text-sm text-muted-foreground text-center break-all px-4">
                {profile.email}
              </p>
              <Badge variant={userRole === 'admin' ? "default" : "outline"} className="mt-2 text-[10px] uppercase tracking-wider">
                 {userRole}
              </Badge>
            </div>

            <div className="p-2">
              <DropdownMenuGroup>
                <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer focus:bg-muted/50">
                  <Link href={dashboardLink}>
                    <LayoutDashboard className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>Dashboard</span>
                  </Link>
                </DropdownMenuItem>
                
                {/* --- ADMIN ONLY LINKS --- */}
                {userRole === 'admin' ? (
                  <>
                    <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer focus:bg-muted/50">
                      <Link href="/dashboard/admin/projects">
                        <Layers className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span>Projects</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer focus:bg-muted/50">
                      <Link href="/dashboard/admin/messages">
                        <Inbox className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span>Inbox</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                ) : (
                  // --- CLIENT LINKS ---
                  <>
                    <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer focus:bg-muted/50">
                      <Link href="/dashboard/client/projects">
                        <Layers className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span>My Projects</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer focus:bg-muted/50">
                      <Link href="/dashboard/client/bookings">
                        <Calendar className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span>My Bookings</span>
                      </Link>
                    </DropdownMenuItem>
                     <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer focus:bg-muted/50">
                      <Link href="/dashboard/client/billing">
                        <CreditCard className="mr-3 h-4 w-4 text-muted-foreground" />
                        <span>Billing</span>
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}

                <DropdownMenuSeparator className="my-1 bg-border" />

                {/* Common Links */}
                <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer focus:bg-muted/50">
                  <Link href={`${dashboardLink}/settings`}>
                    <Settings className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>Settings</span>
                  </Link>
                </DropdownMenuItem>
                
                 <DropdownMenuItem asChild className="rounded-lg py-2.5 cursor-pointer focus:bg-muted/50">
                  <Link href={userRole === 'admin' ? "/dashboard/admin/support" : "/dashboard/client/support"}>
                    <LifeBuoy className="mr-3 h-4 w-4 text-muted-foreground" />
                    <span>Support</span>
                  </Link>
                </DropdownMenuItem>

              </DropdownMenuGroup>

              <DropdownMenuSeparator className="my-1 bg-border" />
              
              <DropdownMenuItem 
                asChild 
                className="rounded-lg py-2.5 text-center justify-center focus:bg-destructive/10"
                onSelect={(event) => event.preventDefault()}
              >
                 <div className="w-full">
                    <SignOutButton />
                 </div>
              </DropdownMenuItem>
            </div>
            
            <div className="bg-muted/30 p-2 text-center text-[10px] text-muted-foreground border-t border-border rounded-b-xl">
                <Link href="/privacy" className="hover:underline">Privacy Policy</Link> • <Link href="/terms" className="hover:underline">Terms of Service</Link>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm" asChild className="text-muted-foreground hover:text-foreground">
        <Link href="/auth/signin">Sign In</Link>
      </Button>
      <Button size="sm" asChild>
        <Link href="/auth/signup">Register</Link>
      </Button>
    </div>
  );
}