"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  Home,
  FileText,
  Users,
  Briefcase,
  FilePlus,
  BarChart,
  BookOpen,
} from "lucide-react";

const vendorNav = [
  {
    href: "/dashboard/vendor",
    label: "Home",
    icon: <Home />,
  },
  {
    href: "/dashboard/vendor/contracts/new",
    label: "New Contract",
    icon: <FilePlus />,
  },
  {
    href: "/dashboard/vendor/applicants",
    label: "Applicants",
    icon: <Users />,
  },
  {
    href: "/dashboard/vendor/reports",
    label: "Reports",
    icon: <BarChart />,
  }
];

const distributorNav = [
  {
    href: "/dashboard/distributor",
    label: "Home",
    icon: <Home />,
  },
  {
    href: "/dashboard/distributor/offers",
    label: "Contract Offers",
    icon: <Briefcase />,
  },
  {
    href: "/dashboard/distributor/my-contracts",
    label: "My Contracts",
    icon: <FileText />,
  },
  {
    href: "/dashboard/distributor/training",
    label: "Training Sessions",
    icon: <BookOpen />,
  }
];

export function DashboardNav() {
  const pathname = usePathname();
  const isVendor = pathname.startsWith("/dashboard/vendor");
  const isDistributor = pathname.startsWith("/dashboard/distributor");

  let navItems = [];
  if (isVendor) {
    navItems = vendorNav;
  } else if (isDistributor) {
    navItems = distributorNav;
  }

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          {navItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                as={Link}
                href={item.href}
                isActive={isActive(item.href)}
                tooltip={item.label}
              >
                {item.icon}
                <span>{item.label}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
