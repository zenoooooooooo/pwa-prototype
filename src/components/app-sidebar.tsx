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

const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
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
      <SidebarHeader className="flex-row justify-center items-center p-4 font-bold hover:cursor-default ">
        <Goal />
        SaaS Accountability PWA
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup className="px-0 ">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  className="p-4 w-full hover:bg-accent active:opacity-70 dark:hover:bg-[] transition-all duration-100"
                >
                  <SidebarMenuButton
                    className="text-md font-semibold hover:bg-transparent active:bg-transparent"
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
          className="flex items-center justify-center gap-2 p-2 w-full 
    bg-accent font-semibold rounded-[8px] transition-all duration-100
    dark:bg-white dark:text-black hover:opacity-80"
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
