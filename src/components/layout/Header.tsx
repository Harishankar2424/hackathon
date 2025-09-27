
'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Menu, Sprout } from "lucide-react";
import { useState } from "react";

const Logo = () => (
  <Link href="/" className="flex items-center gap-2 font-bold text-lg font-headline">
    <Sprout className="h-6 w-6 text-primary" />
    SynergyChain
  </Link>
);

export default function Header() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <header className="px-4 lg:px-6 h-14 flex items-center bg-card border-b">
      <Logo />
      <nav className="ml-auto hidden gap-4 sm:gap-6 lg:flex">
        <Link href="/#features" className="text-sm font-medium hover:underline underline-offset-4">
          Features
        </Link>
        <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
          Dashboard
        </Link>
        <Link href="/auth/login" className="text-sm font-medium hover:underline underline-offset-4">
          Login
        </Link>
        <Link href="/auth/signup/distributor">
          <Button>Get Started</Button>
        </Link>
      </nav>
      <div className="ml-auto lg:hidden">
        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
             <SheetHeader className="sr-only">
                <SheetTitle>Menu</SheetTitle>
                <SheetDescription>Main navigation menu for the application.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-4 p-4">
              <Logo />
              <Link href="/#features" onClick={() => setIsSheetOpen(false)} className="text-sm font-medium hover:underline underline-offset-4">
                Features
              </Link>
              <Link href="/dashboard" onClick={() => setIsSheetOpen(false)} className="text-sm font-medium hover:underline underline-offset-4">
                  Dashboard
              </Link>
              <Link href="/auth/login" onClick={() => setIsSheetOpen(false)} className="text-sm font-medium hover:underline underline-offset-4">
                Login
              </Link>
              <Link href="/auth/signup/distributor" onClick={() => setIsSheetOpen(false)}>
                <Button className="w-full">Get Started</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
