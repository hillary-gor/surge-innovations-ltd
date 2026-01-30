"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { createProjectAction } from "./actions";
import { toast } from "sonner";
import { Plus, Loader2 } from "lucide-react";

interface Client {
  id: string;
  full_name: string | null;
  email: string | null;
}

export function CreateProjectDialog({ clients }: { clients: Client[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    user_id: "",
    name: "",
    description: "",
    due_date: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.user_id) {
      toast.error("Please select a client");
      return;
    }

    setLoading(true);
    const res = await createProjectAction(formData);
    setLoading(false);

    if (res.success) {
      toast.success(res.message);
      setOpen(false);
      setFormData({ user_id: "", name: "", description: "", due_date: "" });
    } else {
      toast.error(res.message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="w-4 h-4 mr-2" /> New Project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create New Project</DialogTitle>
          <DialogDescription>Start a new development track for a client.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          
          <div className="grid gap-2">
            <Label>Client</Label>
            <Select onValueChange={(val) => setFormData({...formData, user_id: val})}>
              <SelectTrigger>
                <SelectValue placeholder="Select a client" />
              </SelectTrigger>
              <SelectContent>
                {clients.map(client => (
                  <SelectItem key={client.id} value={client.id}>
                    {client.full_name || "Unknown"} ({client.email})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label>Project Name</Label>
            <Input 
              required
              placeholder="e.g. E-commerce Platform Revamp"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid gap-2">
            <Label>Description</Label>
            <Textarea 
              placeholder="Brief scope of work..."
              value={formData.description}
              onChange={e => setFormData({...formData, description: e.target.value})}
            />
          </div>

          <div className="grid gap-2">
            <Label>Target Due Date (Optional)</Label>
            <Input 
              type="date"
              value={formData.due_date}
              onChange={e => setFormData({...formData, due_date: e.target.value})}
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
                </>
              ) : (
                "Create Project"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}