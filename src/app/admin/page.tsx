"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  UtensilsCrossed,
  Clock,
  Bell,
  Settings,
  ArrowRight,
  TrendingUp,
  Star,
  Loader2,
} from "lucide-react";
import { PageHeader } from "@/components/admin/PageHeader";

const cards = [
  {
    href: "/admin/menu",
    label: "Menu Items",
    icon: UtensilsCrossed,
    desc: "Add, edit, or remove dishes",
    color: "bg-amber-100 text-amber-700",
  },
  {
    href: "/admin/hours",
    label: "Opening Hours",
    icon: Clock,
    desc: "Set daily open/close times",
    color: "bg-blue-100 text-blue-700",
  },
  {
    href: "/admin/notifications",
    label: "Notifications",
    icon: Bell,
    desc: "Social proof popups",
    color: "bg-purple-100 text-purple-700",
  },
  {
    href: "/admin/settings",
    label: "Site Settings",
    icon: Settings,
    desc: "Tagline, contact & more",
    color: "bg-green-100 text-green-700",
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();

  const [rating, setRating] = useState<string>("—");

  const { data: menuItems } = useQuery({
    queryKey: ["menu"],
    queryFn: () => fetch("/api/menu").then((r) => r.json()),
    enabled: status === "authenticated",
  });

  const { data: notifications } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => fetch("/api/notifications").then((r) => r.json()),
    enabled: status === "authenticated",
  });

  useEffect(() => {
    if (status === "authenticated") {
      fetch("/api/settings")
        .then((res) => res.json())
        .then((data) => {
          if (data.googleRating) {
            setRating(`${data.googleRating}★`);
          } else {
            setRating("n/a★");
          }
        })
        .catch(() => setRating("n/a★"));
    }
  }, [status]);

  if (status === "loading") {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary/50" />
      </div>
    );
  }

  if (status === "unauthenticated") {
    redirect("/api/auth/signin");
  }

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description={`Welcome back, ${session?.user?.name || "Admin"}.`}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <div className="bg-card rounded-2xl border border-border p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
            <TrendingUp className="w-6 h-6 text-amber-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {menuItems?.length ?? "—"}
            </p>
            <p className="text-sm text-muted-foreground">Menu Items</p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
            <Bell className="w-6 h-6 text-purple-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">
              {notifications?.length ?? "—"}
            </p>
            <p className="text-sm text-muted-foreground">
              Active Notifications
            </p>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
            <Star className="w-6 h-6 text-green-700 fill-green-700" />
          </div>
          <div>
            <p className="text-2xl font-bold text-foreground">{rating}</p>
            <p className="text-sm text-muted-foreground">Google Rating</p>
          </div>
        </div>
      </div>

      <h2 className="text-lg font-bold text-foreground mb-4 font-display">
        Quick Access
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className="group bg-card rounded-2xl border border-border p-6 hover:shadow-md hover:border-primary/30 transition-all duration-200 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${card.color}`}
            >
              <card.icon className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                {card.label}
              </h3>
              <p className="text-sm text-muted-foreground">{card.desc}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all shrink-0" />
          </Link>
        ))}
      </div>
    </div>
  );
}
