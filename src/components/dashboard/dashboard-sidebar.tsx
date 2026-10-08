"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Logo from "../shared/Logo";
import { UserRole } from "@/types";
import {
  AdminRoutes,
  CustomerRoutes,
  TechnicianRoutes,
  ZoneManagerRoutes,
} from "@/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

const sidebarRouter = {
  ADMIN: AdminRoutes,
  CUSTOMER: CustomerRoutes,
  TECHNICIAN: TechnicianRoutes,
  ZONE_MANAGER: ZoneManagerRoutes,
};
export function DashboardSidebar({ role }: { role: UserRole }) {
  const pathName = usePathname();
  const routers = sidebarRouter[role];

  return (
    <Sidebar>
      <SidebarHeader>
        <Logo size="sm" />
      </SidebarHeader>
      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routers.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      render={<Link href={item.url} />}
                      isActive={pathName === item.url}
                    >
                      {item.title}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
