"use client";

import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";
import { useGetMe, useLogout } from "@/hooks";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export default function Header() {
  const routes = [
    { name: "Home", url: "/" },
    { name: "About", url: "/about-us" },
  ];
  const router = useRouter();
  const { data, isLoading } = useGetMe();
  console.log(data);
  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  const  queryClient = useQueryClient();

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
        </nav>
        <div>
          {!isLoading && !data && (
            <Link href="/login">
              <Button variant="outline">Login</Button>
            </Link>
          )}
          {!isLoading && data && <Button variant="destructive" onClick={handleLogout}>Logout</Button>}
        </div>
      </div>
    </header>
  );
}
