"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { deleteAccountAction } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function DangerZone() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsLoading(true);
    const result = await deleteAccountAction();
    
    if (result.success) {
      toast.success("Account deleted. Redirecting...");
      router.push("/auth/signin");
    } else {
      toast.error("Failed to delete account. Please try again.");
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <Card className="border-red-200 dark:border-red-900 bg-red-50/50 dark:bg-red-950/10">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-500" />
            <CardTitle className="text-red-700 dark:text-red-500">Delete Account</CardTitle>
          </div>
          <CardDescription className="text-red-600/80 dark:text-red-400/80">
            Permanently remove your personal data and account access. This action cannot be undone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="destructive" 
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
            onClick={() => setOpen(true)}
          >
            <Trash2 className="mr-2 h-4 w-4" /> Request Account Deletion
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              className="bg-red-600 hover:bg-red-700 text-white focus:ring-red-600"
              disabled={isLoading}
            >
              {isLoading ? "Deleting..." : "Yes, Delete Account"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}