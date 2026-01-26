"use client";

import { useState, useRef, useCallback } from "react";
import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Camera,
  Loader2,
  UploadCloud,
  Check,
  ZoomIn,
  RotateCw,
  ImagePlus
} from "lucide-react";
import { toast } from "sonner";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg, { readFile } from "@/lib/cropImage";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface AvatarUploadProps {
  uid: string;
  url: string | null;
  size?: number;
  onUpload?: (url: string) => void;
}

export function AvatarUpload({ uid, url, size = 150, onUpload }: AvatarUploadProps) {
  const supabase = createClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);
  const [isOpen, setIsOpen] = useState(false);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const handleImageClick = () => {
    setIsOpen(true);
  };

  const triggerFileInput = () => {
     fileInputRef.current?.click();
  }

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const imageDataUrl = await readFile(file);
      setImageSrc(imageDataUrl);
      setZoom(1);
      setRotation(0);
    }
  };

  const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleSaveCrop = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    try {
      setUploading(true);

      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
      
      const fileExt = "jpeg";
      const fileName = `avatar-${uid}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, croppedBlob, {
          contentType: "image/jpeg",
          upsert: true
        });

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", uid);

      if (updateError) throw updateError;

      const uniqueUrl = `${publicUrl}?t=${Date.now()}`;

      setAvatarUrl(uniqueUrl);
      setIsOpen(false);
      setImageSrc(null);
      if (onUpload) onUpload(uniqueUrl);
      
      toast.success("Profile photo updated");

    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Error uploading image";
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setImageSrc(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <>
      <div className="flex flex-col items-center gap-6">
         <div className="relative group cursor-pointer" onClick={handleImageClick}>
          <Avatar className="border-4 border-background shadow-xl" style={{ width: size, height: size }}>
            <AvatarImage src={avatarUrl || ""} className="object-cover" />
            <AvatarFallback className="text-4xl bg-muted">
               {uploading ? <Loader2 className="animate-spin" /> : "User"}
            </AvatarFallback>
          </Avatar>
          
          <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
             <Camera className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <div className="text-center">
            <Button variant="outline" onClick={handleImageClick} className="gap-2">
               Change Photo <UploadCloud className="w-4 h-4" />
            </Button>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-125 p-0 gap-0 overflow-hidden bg-background">
          
          <DialogHeader className="p-4 border-b">
            <DialogTitle>Update Profile Picture</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col h-full">
            <div className="relative w-full aspect-square bg-neutral-900 overflow-hidden">
               {!imageSrc ? (
                 <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
                    <div className="p-4 bg-neutral-800 rounded-full">
                       <ImagePlus className="w-8 h-8 text-neutral-400" />
                    </div>
                    <p className="text-sm">Upload a photo to resize and crop</p>
                    <Button onClick={triggerFileInput} variant="secondary">
                       Select Image
                    </Button>
                 </div>
               ) : (
                 <Cropper
                   image={imageSrc}
                   crop={crop}
                   zoom={zoom}
                   rotation={rotation}
                   aspect={1}
                   onCropChange={setCrop}
                   onCropComplete={onCropComplete}
                   onZoomChange={setZoom}
                   onRotationChange={setRotation}
                   showGrid={true}
                 />
               )}
            </div>

            {imageSrc && (
              <div className="p-6 space-y-6 bg-background">
                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <span className="flex items-center gap-1"><ZoomIn className="w-3 h-3" /> Zoom</span>
                      <span>{Math.round(zoom * 100 - 100)}%</span>
                   </div>
                   <Slider 
                      value={[zoom]} 
                      min={1} 
                      max={3} 
                      step={0.1} 
                      onValueChange={(v) => setZoom(v[0])} 
                   />
                </div>

                <div className="space-y-2">
                   <div className="flex justify-between text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      <span className="flex items-center gap-1"><RotateCw className="w-3 h-3" /> Rotate</span>
                      <span>{rotation}°</span>
                   </div>
                   <Slider 
                      value={[rotation]} 
                      min={0} 
                      max={360} 
                      step={1} 
                      onValueChange={(v) => setRotation(v[0])} 
                   />
                </div>
              </div>
            )}
            
            <DialogFooter className="p-4 border-t bg-muted/20">
               <input
                 type="file"
                 accept="image/*"
                 onChange={onFileChange}
                 ref={fileInputRef}
                 className="hidden"
               />
               
               {!imageSrc ? (
                 <div className="flex justify-end w-full">
                   <Button variant="ghost" onClick={handleClose}>Close</Button>
                 </div>
               ) : (
                 <div className="flex justify-between w-full items-center">
                    <Button 
                      variant="ghost" 
                      onClick={triggerFileInput} 
                      disabled={uploading}
                      size="sm"
                    >
                      Change Image
                    </Button>

                    <div className="flex gap-2">
                      <Button variant="outline" onClick={handleClose} disabled={uploading}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveCrop} disabled={uploading}>
                        {uploading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Check className="w-4 h-4 mr-2" />}
                        Save Photo
                      </Button>
                    </div>
                 </div>
               )}
            </DialogFooter>
          </div>

        </DialogContent>
      </Dialog>
    </>
  );
}