import Link from "next/link";
import { Sprout } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-secondary/50 p-4">
       <div className="absolute top-4 left-4">
          <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
            <Sprout className="h-6 w-6 text-primary" />
            SynergyChain
          </Link>
       </div>
      {children}
    </div>
  );
}
