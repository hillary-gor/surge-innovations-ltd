"use client";

import Link from "next/link";
import Image from "next/image";

export default function FloatingHeader() {
  return (
    <>
      {/* Floating Logo Top-Left */}
      <div className="fixed top-4 left-4 z-50">
        <Link href="/">
          <Image
            src="/logo/surge logo (2).ico"
            alt="Surge Logo"
            width={50}
            height={50}
            className="cursor-pointer"
          />
        </Link>
      </div>

      {/* Floating Close Button Top-Right */}
      <div className="fixed top-4 right-4 z-50">
        <Link href="/">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-full p-2 shadow-lg transition">
            Close
          </button>
        </Link>
      </div>
    </>
  );
}
