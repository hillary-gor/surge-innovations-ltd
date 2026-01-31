"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { updateProjectStateAction } from "../actions";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react"; // Import Mail icon

interface AdminProjectControlsProps {
  projectId: string;
  initialStatus: string;
  initialProgress: number;
}

export function AdminProjectControls({ projectId, initialStatus, initialProgress }: AdminProjectControlsProps) {
  const [status, setStatus] = useState(initialStatus);
  const [progress, setProgress] = useState(initialProgress);
  const [loading, setLoading] = useState(false);

  // Check if status changed to show email hint
  const statusChanged = status !== initialStatus;

  const handleSave = async () => {
    setLoading(true);
    const res = await updateProjectStateAction(projectId, { status, progress });
    setLoading(false);
    
    if (res.success) {
      toast.success(res.message);
      // Optional: Reset initial state logic if you want to hide the mail icon after save
      // typically needs a router.refresh() from the parent or prop update
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label>Status Phase</Label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="planning">Planning</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="review">Review / QA</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="on_hold">On Hold</SelectItem>
          </SelectContent>
        </Select>
        
        {/* Visual Cue for Email */}
        {statusChanged && (
          <div className="text-xs text-blue-600 flex items-center gap-1.5 bg-blue-50 p-2 rounded border border-blue-100 animate-in fade-in slide-in-from-top-1">
            <Mail className="w-3 h-3" />
            Client will be notified of this change.
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between">
          <Label>Completion Percentage</Label>
          <span className="font-mono text-sm font-bold">{progress}%</span>
        </div>
        <Slider 
          value={[progress]} 
          max={100} 
          step={5} 
          onValueChange={(val) => setProgress(val[0])} 
        />
      </div>

      <Button onClick={handleSave} disabled={loading} className="w-full">
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
          </>
        ) : (
          "Update Project State"
        )}
      </Button>
    </div>
  );
}