"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Coffee,
  LayoutDashboard,
  UtensilsCrossed,
  Clock,
  Bell,
  Settings,
  ExternalLink,
  Menu as MenuIcon,
  X,
  Star,
} from "lucide-react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/menu", label: "Menu Items", icon: UtensilsCrossed },
  { href: "/admin/hours", label: "Opening Hours", icon: Clock },
  { href: "/admin/wall-of-fame", label: "Wall of Fame", icon: Star },
  { href: "/admin/notifications", label: "Notifications", icon: Bell },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (item: (typeof navItems)[0]) =>
    item.exact ? pathname === item.href : pathname.startsWith(item.href);

  const sidebar = (
    <aside className="flex flex-col w-64 h-full bg-sidebar border-r border-sidebar-border">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <Coffee className="w-6 h-6 text-primary mr-3" />
        <span className="text-sidebar-foreground font-display font-bold text-xl tracking-wide">
          Waffela Admin
        </span>
        <button
          type="button"
          aria-label="Close sidebar menu"
          onClick={() => setOpen(false)}
          className="ml-auto text-sidebar-foreground/50 hover:text-sidebar-foreground lg:hidden"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1">
        {navItems.map((item) => {
          const active = isActive(item);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                active
                  ? "bg-primary/10 text-primary"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              <item.icon
                className={`w-5 h-5 mr-3 ${active ? "text-primary" : "text-sidebar-foreground/50"}`}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sidebar-border">
        <a
          href="/"
          target="_blank"
          className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors"
        >
          <ExternalLink className="w-4 h-4 mr-3" />
          View Public Site
        </a>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:flex lg:fixed lg:inset-y-0 lg:left-0 lg:z-50">
        {sidebar}
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: -256 }}
            animate={{ x: 0 }}
            exit={{ x: -256 }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed top-0 left-0 bottom-0 z-50 lg:hidden"
          >
            {sidebar}
          </motion.div>
        )}
      </AnimatePresence>

      <header className="h-16 bg-card border-b border-border flex items-center px-4 lg:hidden sticky top-0 z-30">
        <button
          type="button"
          aria-label="Toggle sidebar menu"
          onClick={() => setOpen(true)}
          className="p-2 -ml-2 text-foreground/70 hover:text-foreground rounded-lg hover:bg-secondary"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
        <span className="ml-2 font-display font-bold text-lg">
          Waffela Admin
        </span>
      </header>
    </>
  );
}
