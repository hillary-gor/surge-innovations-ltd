"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export default function DonatePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/stkpush", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, amount }),
    });

    const data = await res.json();
    if (data.success) {
      setMessage("STK Push sent! Please check your phone to complete payment.");
    } else {
      setMessage("Failed to send STK Push. Try again.");
    }

    setLoading(false);
  };

  return (
    <section className="flex justify-center items-center min-h-screen bg-muted/30">
      <Card className="max-w-md w-full p-6 shadow-lg">
        <CardContent>
          <h2 className="text-2xl font-bold mb-4 text-center">
            Make a Donation
          </h2>
          <form onSubmit={handleDonate} className="space-y-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number (254...)</Label>
              <Input
                id="phone"
                placeholder="2547XXXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount (KES)</Label>
              <Input
                id="amount"
                type="number"
                placeholder="500"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>
            <Button className="w-full" type="submit" disabled={loading}>
              {loading ? "Processing..." : "Donate Now"}
            </Button>
          </form>
          {message && (
            <p className="text-center text-sm text-muted-foreground mt-4">
              {message}
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
