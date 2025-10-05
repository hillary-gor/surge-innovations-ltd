import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="mx-auto max-w-7xl px-6 md:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
            <div className="flex flex-col items-center md:items-start gap-4 text-center md:text-left">
              <Image
                src="/surge-logo.png"
                alt="Surge Innovations"
                width={150}
                height={50}
                className="h-10 w-auto"
              />
              <p className="text-muted-foreground">
                Technology that moves with your vision
              </p>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4 text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                Ready to transform your business?
              </p>
              <Button asChild size="lg">
                <Link href="/schedule-visit">
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule a Visit
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Surge Innovations. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
