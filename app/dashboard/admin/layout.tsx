import type { Metadata } from "next";
import { AdminHeader } from "./components/AdminHeader"; 

export const metadata: Metadata = {
  title: "Admin Console | Surge Innovations",
  description: "Enterprise management console and system administration.",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <AdminHeader />
      <main className="flex-1 w-full">
        {children}
      </main>
    </div>
  );
}