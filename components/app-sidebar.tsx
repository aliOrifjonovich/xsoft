"use client";

import * as React from "react";
import {
  CalendarSync,
  Car,
  Command,
  Contact,
  GalleryVerticalEnd,
  ShoppingCart,
  Users,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavProjects } from "./nav-projects";
import { Separator } from "./ui/separator";
import Link from "next/link";

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },

  navMain: [
    {
      title: "Vehicles",
      icon: Car,
      isActive: true,
      items: [
        {
          title: "Categories",
          url: "/categories",
        },
        {
          title: "Cars",
          url: "/cars",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Dashboard",
      url: "/",
      icon: GalleryVerticalEnd,
      isActive: true,
    },
    {
      title: "Reservations",
      url: "/reservations",
      icon: ShoppingCart,
      isActive: true,
    },
    {
      title: "Schedule",
      url: "/schedule",
      icon: CalendarSync,
      isActive: true,
    },
    {
      title: "Staffs",
      url: "/staffs",
      icon: Contact,
      isActive: true,
    },
    {
      title: "Clients",
      url: "/clients",
      icon: Users,
      isActive: true,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">X Inc</span>
                  <span className="truncate text-xs">Software</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <Separator
        orientation="horizontal"
        className="mr-2 data-[orientation=vertical]:h-4"
      />

      <SidebarContent className="pt-2">
        <NavProjects projects={data.navSecondary} />
        <NavMain items={data.navMain} />
      </SidebarContent>

      <Separator
        orientation="horizontal"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
