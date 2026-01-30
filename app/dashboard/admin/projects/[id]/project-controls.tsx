"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { updateProjectStateAction } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AdminProjectControlsProps {
  projectId: string;
  initialStatus: string;
  initialProgress: number;
}

export function AdminProjectControls({ projectId, initialStatus, initialProgress }: AdminProjectControlsProps) {
  const [status, setStatus] = useState(initialStatus);
  const [progress, setProgress] = useState(initialProgress);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    const res = await updateProjectStateAction(projectId, { status, progress });
    setLoading(false);
    
    if (res.success) toast.success("Project updated");
    else toast.error("Update failed");
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