import React from 'react';
import Link from 'next/link';
import {Search, Sprout} from 'lucide-react';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import {Input} from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import {UserNav} from '@/components/dashboard/UserNav';
import {DashboardNav} from '@/components/dashboard/DashboardNav';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="min-h-screen w-full flex">
        <Sidebar>
          <SidebarContent className="p-0 flex flex-col">
            <SidebarHeader className="border-b">
              <div className="flex items-center gap-2 font-bold text-lg font-headline">
                <Sprout className="h-6 w-6 text-primary" />
                <span className="group-data-[collapsible=icon]:hidden">
                  SynergyChain
                </span>
              </div>
            </SidebarHeader>
            <div className="flex-1 overflow-y-auto">
              <DashboardNav />
            </div>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-col w-full">
          <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-card px-4 sm:h-[60px] sm:px-6">
            <SidebarTrigger className="md:hidden" />
            <div className="w-full flex-1">
              {/* Can add a search form here if needed */}
            </div>
            <UserNav />
          </header>
          <main className="flex-1 overflow-y-auto p-4 lg:p-6 lg:gap-6 gap-4">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
