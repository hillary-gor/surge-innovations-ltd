"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { postTimelineUpdateAction } from "../actions";
import { toast } from "sonner";

export function AdminTimelineForm({ projectId }: { projectId: string }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    update_type: "general"
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;
    
    setLoading(true);
    const res = await postTimelineUpdateAction({ 
      project_id: projectId,
      ...formData 
    });
    setLoading(false);

    if (res.success) {
      toast.success("Update posted to client timeline");
      setFormData({ title: "", description: "", update_type: "general" });
    } else {
      toast.error("Failed to post");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
           <Input 
             placeholder="Update Title (e.g. Design Approved)" 
             value={formData.title}
             onChange={e => setFormData({...formData, title: e.target.value})}
             required
           />
        </div>
        <div className="w-35">
          <Select 
            value={formData.update_type} 
            onValueChange={v => setFormData({...formData, update_type: v})}
          >
            <SelectTrigger>
               <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="general">General</SelectItem>
              <SelectItem value="milestone">Milestone</SelectItem>
              <SelectItem value="blocker">Blocker</SelectItem>
              <SelectItem value="completion">Completion</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <Textarea 
        placeholder="Details visible to client..." 
        value={formData.description}
        onChange={e => setFormData({...formData, description: e.target.value})}
      />

      <div className="flex justify-end">
        <Button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Post to Timeline"}
        </Button>
      </div>
    </form>
  );
}