"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { ModeToggle } from "@/components/layout/mode-toggle";

const logoUrl =
  "https://fmkjragqxbepihujxemw.supabase.co/storage/v1/object/public/logos/surge-rectandular-logo.png";

export default function FloatingHeader() {
  return (
    <>
      {/* Floating Logo Top-Left */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Image
            src={logoUrl}
            alt="Surge Innovations"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Grouped Top-Right Elements: Mode Toggle & Close Button */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-3">
        {/* Theme Toggle */}
        <ModeToggle />

        {/* Close Button */}
        <Link href="/">
          <Button className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-full p-2 shadow-lg transition">
            Close
          </Button>
        </Link>
      </div>
    </>
  );
}