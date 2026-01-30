"use client";

import { useState, useEffect } from "react";
import { Check, ChevronsUpDown, Search, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { searchUsersAction } from "./actions";

interface UserResult {
  id: string;
  full_name: string;
  email: string;
}

export function UserPicker({ 
  onSelect 
}: { 
  onSelect: (userId: string) => void 
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<UserResult[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserResult | null>(null);
  const [loading, setLoading] = useState(false);

  // Debounced Search Effect
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setLoading(true);
        const users = await searchUsersAction(query);
        setResults(users);
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedUser ? (
            <div className="flex flex-col items-start text-left">
              <span className="font-semibold">{selectedUser.full_name}</span>
              <span className="text-xs text-muted-foreground">{selectedUser.email}</span>
            </div>
          ) : (
            <span className="text-muted-foreground">Search for a client...</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-75 p-0" align="start">
        <div className="flex items-center border-b px-3">
          <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
          <Input 
            className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-none focus-visible:ring-0"
            placeholder="Type name (e.g. Hillary)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="max-h-50 overflow-y-auto p-1">
          {loading && (
            <div className="py-6 text-center text-sm text-muted-foreground flex justify-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Searching...
            </div>
          )}
          
          {!loading && results.length === 0 && query.length >= 2 && (
             <div className="py-6 text-center text-sm text-muted-foreground">No client found.</div>
          )}

          {!loading && results.map((user) => (
            <div
              key={user.id}
              className={cn(
                "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                selectedUser?.id === user.id && "bg-accent"
              )}
              onClick={() => {
                setSelectedUser(user);
                onSelect(user.id);
                setOpen(false);
              }}
            >
              <User className="mr-2 h-4 w-4 text-muted-foreground" />
              <div className="flex flex-col">
                <span>{user.full_name}</span>
                <span className="text-xs text-muted-foreground">{user.email}</span>
              </div>
              {selectedUser?.id === user.id && (
                <Check className="ml-auto h-4 w-4 opacity-50" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}