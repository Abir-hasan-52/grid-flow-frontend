"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useGetMe, useLogout } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

import { UserRole } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about-us" },
  ];

  const dashboardRoutes: Record<UserRole, string> = {
    ADMIN: "/admin",
    CUSTOMER: "/customer",
    TECHNICIAN: "/technician",
    ZONE_MANAGER: "/zone-manager",
  };
  const router = useRouter();
  const { setTheme } = useTheme();
  const { data, isLoading } = useGetMe();
  console.log(data);
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const queryClient = useQueryClient();

  const role: UserRole = !!data?.data && data?.data.role;

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: (data) => {
        toast.add({
          title: "Logout Successful",
          description: "You have successfully logged out.",
          type: "success",
        });
        queryClient.removeQueries({ queryKey: ["user"] });
        router.push("/login");
        console.log("Logout successful:", data);
      },
      onError: (error) => {
        toast.add({
          title: "Logout Failed",
          description: "An error occurred while trying to log out.",
          type: "error",
        });
        console.error("Logout failed:", error);
      },
    });
  };
  return (
    <header className="w-full h-16 border-b">
      <div className="container mx-auto flex h-full items-center justify-between px-4">
        <Logo showText={true} size="md" href="/" />

        <nav className="flex items-center gap-6">
          {routes.map((route) => (
            <Link
              key={route.name}
              href={route.url}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-green-500"
            >
              {route.name}
            </Link>
          ))}
          {role && (
            <Link
              href={dashboardRoutes[role]}
              className="text-sm font-medium text-slate-700 transition-colors hover:text-green-500"
            >
              Dashboard
            </Link>
          )}
        </nav>
        <div>
          {!isLoading && !data && (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
          {!isLoading && data && (
            <Button
              variant="destructive"
              onClick={handleLogout}
              disabled={isLogoutPending}
            >
              {isLogoutPending ? "Logging out..." : "Logout"}
            </Button>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="icon" />}
            >
              <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
              <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
              <span className="sr-only">Toggle theme</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                System
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
