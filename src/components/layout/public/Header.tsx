import Link from "next/link";
import Logo from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

const routes = [
  { name: "Home", url: "/" },
  { name: "About", url: "/about-us" },
];

export default function Header() {
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
          <Button variant="outline">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
