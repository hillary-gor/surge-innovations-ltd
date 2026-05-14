"use client";

import { useState, useCallback } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "@/utils/cropImage";
import { Loader2, X, Check } from "lucide-react";
import { toast } from "sonner";

interface ImageCropperProps {
  imageSrc: string;
  aspectRatio: number;
  onCropComplete: (croppedFile: File) => void;
  onCancel: () => void;
}

export function ImageCropper({ imageSrc, aspectRatio, onCropComplete, onCancel }: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const onCropChange = useCallback((crop: { x: number, y: number }) => setCrop(crop), []);
  const onZoomChange = useCallback((zoom: number) => setZoom(zoom), []);
  
  const onCropCompleteHandler = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleConfirm = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedFile = await getCroppedImg(imageSrc, croppedAreaPixels, `hero-${Date.now()}.jpeg`);
      onCropComplete(croppedFile);
    } catch (e) {
      console.error(e);
      toast.error("Failed to crop image.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-background rounded-3xl overflow-hidden w-full max-w-2xl shadow-2xl flex flex-col h-[80vh] md:h-150">
        
        <div className="flex justify-between items-center p-4 border-b border-border">
          <h3 className="font-bold text-lg">Position Header Banner</h3>
          <button onClick={onCancel} className="p-2 bg-muted hover:bg-muted/80 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="relative flex-1 bg-black/10">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspectRatio}
            onCropChange={onCropChange}
            onCropComplete={onCropCompleteHandler}
            onZoomChange={onZoomChange}
            objectFit="horizontal-cover"
          />
        </div>

        <div className="p-6 border-t border-border flex flex-col md:flex-row items-center gap-6 justify-between">
          <div className="flex items-center gap-4 w-full md:w-1/2">
            <span className="text-sm font-bold text-muted-foreground">Zoom</span>
            <input
              type="range"
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              onChange={(e) => setZoom(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
          
          <div className="flex gap-3 w-full md:w-auto">
            <button onClick={onCancel} className="flex-1 md:flex-none px-6 py-3 rounded-xl font-bold bg-muted hover:bg-muted/80 transition-colors">
              Cancel
            </button>
            <button 
              onClick={handleConfirm} 
              disabled={isProcessing}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : <Check className="w-5 h-5" />}
              {isProcessing ? "Processing..." : "Confirm Crop"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}