"use client";

import { useState, useTransition, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sendClientEmail } from "@/app/emails/email-actions";
import { Send, Loader2, Search, Trash2, CheckCircle, PlusCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";
import { RichTextEditor } from "@/components/ui/rich-text-editor"; 
import { ImageCropper } from "@/components/ui/image-cropper";
import Image from "next/image";

interface ClientProfile {
  email: string;
  full_name: string;
}

export default function AdminEmailPage() {
  const [isPending, startTransition] = useTransition();
  const [errorFeedback, setErrorFeedback] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMetrics, setSuccessMetrics] = useState("");
  
  // Form State
  const [recipientGroup, setRecipientGroup] = useState<string>("");
  const [specificEmail, setSpecificEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [messageHtml, setMessageHtml] = useState("");
  
  // Client Search State
  const [clients, setClients] = useState<ClientProfile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoadingClients, setIsLoadingClients] = useState(false);
  
  // Image State
  const [rawImageSrc, setRawImageSrc] = useState<string | null>(null);
  const [heroImageFile, setHeroImageFile] = useState<File | null>(null);
  const [croppedPreviewUrl, setCroppedPreviewUrl] = useState<string | null>(null);
  
  const supabase = createClient();

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      if (croppedPreviewUrl) URL.revokeObjectURL(croppedPreviewUrl);
    };
  }, [croppedPreviewUrl]);

  // Fetch clients (Warning: Replace with server-side pagination for production scale)
  useEffect(() => {
    if (recipientGroup === "specific_client" && clients.length === 0) {
      const fetchClients = async () => {
        setIsLoadingClients(true);
        const { data, error } = await supabase
          .from("profiles")
          .select("email, full_name")
          .eq("role", "client")
          .order("full_name")
          .limit(1000); // Added a safety limit
          
        if (data && !error) setClients(data);
        setIsLoadingClients(false);
      };
      fetchClients();
    }
  }, [recipientGroup, supabase, clients.length]);

  const filteredClients = clients.filter(client => 
    client.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    client.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setRawImageSrc(reader.result?.toString() || null);
      });
      reader.readAsDataURL(file);
      // Reset input so same file can be selected again if cancelled
      e.target.value = ''; 
    }
  };

  const handleRemoveImage = () => {
    setHeroImageFile(null);
    if (croppedPreviewUrl) {
      URL.revokeObjectURL(croppedPreviewUrl);
      setCroppedPreviewUrl(null);
    }
  };

  const resetForm = () => {
    setRecipientGroup("");
    setSpecificEmail("");
    setSubject("");
    setMessageHtml("");
    setSearchQuery("");
    handleRemoveImage();
    setErrorFeedback(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorFeedback(null);
    
    // Strict validation
    if (!messageHtml || messageHtml.replace(/<[^>]*>?/gm, '').trim().length === 0) {
      setErrorFeedback("Email message cannot be empty.");
      return;
    }
    if (recipientGroup === "specific_client" && !specificEmail) {
      setErrorFeedback("You must select a specific client.");
      return;
    }

    const formData = new FormData();
    formData.set("recipientGroup", recipientGroup);
    formData.set("subject", subject);
    formData.set("message", messageHtml);
    if (specificEmail) formData.set("specificEmail", specificEmail);
    if (heroImageFile) formData.set("heroImage", heroImageFile);

    startTransition(async () => {
      const result = await sendClientEmail(formData);
      if (result.error) {
        setErrorFeedback(result.error);
      } else if (result.success) {
        setSuccessMetrics(result.success);
        setShowSuccessModal(true);
      }
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto relative">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Email Hub</h1>
        <p className="text-muted-foreground">Broadcast rich messages and updates to your platform users.</p>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle>Compose Message</CardTitle>
          <CardDescription>Select a target group, optionally add a hero banner, and compose your email.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="recipientGroup" className="text-sm font-bold text-foreground">Target Audience</label>
                <select 
                  name="recipientGroup" 
                  id="recipientGroup" 
                  required
                  value={recipientGroup}
                  onChange={(e) => {
                    setRecipientGroup(e.target.value);
                    setSpecificEmail("");
                  }}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <option value="">Select an audience...</option>
                  <option value="all_clients">All Registered Clients</option>
                  <option value="inquiries">Tech Service Inquiries (Leads)</option>
                  <option value="volunteers">Pending Volunteers</option>
                  <option value="specific_client">Specific Client</option>
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-bold text-foreground">Subject Line</label>
                <input 
                  type="text" 
                  name="subject" 
                  id="subject" 
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="e.g., Important Platform Update"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                />
              </div>
            </div>

            {recipientGroup === "specific_client" && (
              <div className="space-y-4 p-5 border border-blue-100 dark:border-blue-900 rounded-xl bg-blue-50/30 dark:bg-blue-900/10 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="space-y-2">
                  <label className="text-sm font-bold">Search Client Database</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input 
                      type="text" 
                      placeholder="Search by name or email..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex h-10 w-full rounded-md border border-input bg-background pl-10 pr-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <select 
                    name="specificEmail" 
                    id="specificEmail" 
                    required={recipientGroup === "specific_client"}
                    value={specificEmail}
                    onChange={(e) => setSpecificEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    disabled={isLoadingClients}
                  >
                    <option value="">
                      {isLoadingClients ? "Loading clients database..." : "Select client from results..."}
                    </option>
                    {filteredClients.map((client) => (
                      <option key={client.email} value={client.email}>
                        {client.full_name} ({client.email})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] font-medium text-muted-foreground text-right">
                    Showing {filteredClients.length} result(s)
                  </p>
                </div>
              </div>
            )}

            <div className="space-y-3">
              <label className="text-sm font-bold text-foreground flex items-center justify-between">
                <span>Hero Banner</span>
                <span className="text-xs font-normal text-muted-foreground">Recommended: 16:9 ratio</span>
              </label>
              
              {!croppedPreviewUrl ? (
                <div className="border-2 border-dashed border-border rounded-xl p-8 hover:bg-muted/50 transition-colors text-center">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={onFileSelect}
                    id="hero-upload"
                    className="hidden"
                  />
                  <label htmlFor="hero-upload" className="cursor-pointer flex flex-col items-center justify-center gap-2">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full">
                      <PlusCircle className="w-6 h-6" />
                    </div>
                    <span className="text-sm font-medium">Click to browse and crop banner</span>
                    <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
                  </label>
                </div>
              ) : (
                <div className="relative group rounded-xl overflow-hidden border border-border shadow-sm">
                  <div className="aspect-video w-full relative bg-muted">
                    <Image 
                      src={croppedPreviewUrl} 
                      alt="Hero banner preview" 
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                    <Button type="button" variant="destructive" onClick={handleRemoveImage} className="gap-2">
                      <Trash2 className="w-4 h-4" /> Remove Banner
                    </Button>
                  </div>
                </div>
              )}

              {rawImageSrc && (
                <ImageCropper 
                  imageSrc={rawImageSrc}
                  aspectRatio={21 / 9}
                  onCropComplete={(file) => {
                    setHeroImageFile(file);
                    setCroppedPreviewUrl(URL.createObjectURL(file));
                    setRawImageSrc(null);
                  }}
                  onCancel={() => setRawImageSrc(null)}
                />
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-foreground">Message Content</label>
              <div className="min-h-64 border rounded-xl overflow-hidden shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <RichTextEditor 
                  value={messageHtml} 
                  onChange={setMessageHtml} 
                />
              </div>
            </div>

            {errorFeedback && (
              <div className="p-4 text-sm rounded-xl bg-destructive/10 text-destructive border border-destructive/20 flex items-start gap-3 animate-in fade-in">
                <span className="font-bold">Error:</span> {errorFeedback}
              </div>
            )}

            <div className="pt-4 border-t border-border flex justify-end">
              <Button type="submit" disabled={isPending} className="w-full sm:w-auto gap-2 px-8" size="lg">
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Transmitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Launch Broadcast
                  </>
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Enterprise Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-background border border-border shadow-2xl rounded-2xl w-full max-w-md p-6 animate-in zoom-in-95 duration-200">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-500 rounded-full flex items-center justify-center mb-2">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Transmission Complete</h3>
              <p className="text-muted-foreground font-medium">{successMetrics}</p>
              
              <div className="w-full flex flex-col gap-3 mt-6 pt-6 border-t border-border">
                <Button 
                  onClick={() => setShowSuccessModal(false)} 
                  variant="outline" 
                  className="w-full font-bold"
                >
                  Keep Editor Contents
                </Button>
                <Button 
                  onClick={() => {
                    resetForm();
                    setShowSuccessModal(false);
                  }} 
                  className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Clear Editor & Start Fresh
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}