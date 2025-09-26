import React from "react";
import Link from "next/link";
import {
  Search,
  Sprout,
} from "lucide-react";

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UserNav } from "@/components/dashboard/UserNav";
import { DashboardNav } from "@/components/dashboard/DashboardNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen">
        <Sidebar>
          <SidebarContent className="p-0">
             <SidebarHeader className="border-b">
                 <div className="flex items-center gap-2 font-bold text-lg font-headline">
                    <Sprout className="h-6 w-6 text-primary" />
                    <span className="group-data-[collapsible=icon]:hidden">SynergyChain</span>
                 </div>
              </SidebarHeader>
              <div className="flex flex-col h-full">
                <DashboardNav />
              </div>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
              {/* Can add a search form here if needed */}
            </div>
            <UserNav />
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
