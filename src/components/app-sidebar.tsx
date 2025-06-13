import {
  Archive,
  ChartBarStacked,
  Goal,
  Home,
  Search,
  Settings,
  Gem,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { Button } from "./ui/button";

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Categories",
    url: "#",
    icon: ChartBarStacked,
  },
  {
    title: "Archived",
    url: "#",
    icon: Archive,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="flex-row justify-center items-center p-4 font-bold hover:cursor-default">
        <Goal />
        SaaS Accountability PWA
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="p-4 hover:bg-accent active:bg-accent transition-colors duration-100 rounded-[8px]"
                >
                  <SidebarMenuButton
                    className="text-lg justify-center font-semibold hover:bg-transparent active:bg-transparent"
                    asChild
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col py-4 gap-4 items-center border-t">
        <Link
          href="#"
          className="flex items-center justify-center gap-2 p-2 w-full bg-accent font-semibold rounded-[8px] hover:bg-primary transition-colors duration-100"
        >
          <Gem />
          Upgrade Plan
        </Link>

        <div className="text-xs text-darkest">
          © 2025 Zeno™ — All rights reserved.
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
