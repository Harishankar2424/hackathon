
import Link from "next/link";
import { Sprout } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
      <div className="flex items-center gap-2">
        <Sprout className="h-5 w-5 text-primary" />
        <p className="text-xs text-muted-foreground">&copy; {new Date().getFullYear()} SynergyChain. All rights reserved.</p>
      </div>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link href="/terms" className="text-xs hover:underline underline-offset-4">
          Terms of Service
        </Link>
        <Link href="/privacy" className="text-xs hover:underline underline-offset-4">
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
