import Link from "next/link";
import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  FolderKanban,
  Images,
  LayoutDashboard,
  LogOut,
  Mail,
  Settings,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SITE_CONFIG } from "@/lib/site";
import { Button } from "../ui/button";

type DashboardNavKey =
  | "overview"
  | "portfolio"
  | "clientLogos"
  | "services"
  | "enquiries"
  | "settings";

type SidebarLink = {
  label: string;
  href: string;
  icon: LucideIcon;
  key?: DashboardNavKey;
};

const sidebarLinks: SidebarLink[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard, key: "overview" },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: FolderKanban, key: "portfolio" },
  { label: "Client Logos", href: "/dashboard/client-logos", icon: Images, key: "clientLogos" },
  { label: "Services", href: "/dashboard/services", icon: Briefcase, key: "services" },
  { label: "Enquiries", href: "/dashboard/inquiries", icon: Mail, key: "enquiries" },
  { label: "Settings", href: "/dashboard/settings", icon: Settings, key: "settings" },
];

type DashboardShellProps = {
  activeItem: DashboardNavKey;
  children: ReactNode;
};

export default function DashboardShell({ activeItem, children }: DashboardShellProps) {
  return (
    <section className="min-h-screen bg-[#eef3e8] text-[#0A211F]">
      <div className="lg:pl-[280px]">
        <aside className="relative overflow-hidden border-b border-[#E9F3E6]/10 bg-[#0A211F] px-4 py-6 text-[#E9F3E6] lg:fixed lg:inset-y-0 lg:left-0 lg:w-[280px] lg:overflow-y-auto lg:border-b-0 lg:border-r lg:border-r-[#E9F3E6]/10 lg:py-8">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-52 bg-[radial-gradient(circle_at_top_right,rgba(138,247,183,0.25),transparent_65%)]"
          />

          <div className="relative flex h-full flex-col gap-8">
            <div className="space-y-4">
              <Badge className="rounded-full bg-[#D8F782] px-3 py-1 text-[#0A211F] hover:bg-[#D8F782]">
                Admin Panel
              </Badge>

              <div className="space-y-2">
                <p className="text-2xl font-semibold tracking-tight">{SITE_CONFIG.name}</p>
                <p className="max-w-xs text-sm leading-relaxed text-[#E9F3E6]/68">
                  Website control area for portfolio, services, and content management.
                </p>
              </div>
            </div>

            <nav className="grid gap-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = link.key === activeItem;

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`inline-flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${isActive
                      ? "bg-[#E9F3E6] text-[#0A211F]"
                      : "text-[#E9F3E6]/72 hover:bg-white/6 hover:text-[#E9F3E6]"
                      }`}
                  >
                    <Icon className="size-4" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-auto">
              <Button
                variant={"destructive"}
                className="w-full cursor-pointer"
              >
                Log out <LogOut />
              </Button>
            </div>
          </div>
        </aside>

        <main className="min-h-screen px-4 py-4">{children}</main>
      </div>
    </section>
  );
}
