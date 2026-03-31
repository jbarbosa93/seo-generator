import Link from "next/link";
import { Sparkles, LayoutDashboard, Wand2, History, Settings } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { href: "/", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/generate", icon: Wand2, label: "Générer" },
    { href: "/history", icon: History, label: "Historique" },
    { href: "/settings", icon: Settings, label: "Paramètres" },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-muted/30 p-4 flex flex-col">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg mb-8 px-2">
          <Sparkles className="h-5 w-5 text-primary" />
          SEO Generator
        </Link>
        <nav className="space-y-1 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-muted transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
