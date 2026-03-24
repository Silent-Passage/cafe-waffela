"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "@/components/admin/PageHeader";
import {
  Plus,
  Trash2,
  Loader2,
  MessageSquare,
  ShoppingBag,
} from "lucide-react";

interface Notification {
  id: number;
  type: string;
  message: string;
  createdAt: string;
}

export default function NotificationsPage() {
  const queryClient = useQueryClient();
  const { data: notifications, isLoading } = useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => fetch("/api/notifications").then((r) => r.json()),
  });

  const create = useMutation({
    mutationFn: (data: { type: string; message: string }) =>
      fetch("/api/notifications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      setOpen(false);
    },
  });

  const remove = useMutation({
    mutationFn: (id: number) =>
      fetch(`/api/notifications/${id}`, { method: "DELETE" }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notifications"] }),
  });

  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ type: "order", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(form);
  };

  return (
    <div>
      <PageHeader
        title="Live Benachrichtigungen"
        description="Manage the popups that appear on the public site."
        action={
          <button
            onClick={() => {
              setForm({ type: "order", message: "" });
              setOpen(true);
            }}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium flex items-center shadow-lg hover:-translate-y-0.5 transition-all"
          >
            <Plus className="w-5 h-5 mr-2" /> Neue Benachrichtigung
          </button>
        }
      />

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notifications?.map((n) => (
            <div
              key={n.id}
              className="bg-card rounded-2xl shadow-sm border border-border p-6 relative group hover:shadow-md transition-all"
            >
              <button
                onClick={() => {
                  if (confirm("Delete?")) remove.mutate(n.id);
                }}
                title="Eintrag löschen"
                aria-label="Eintrag löschen"
                className="absolute top-4 right-4 p-2 text-slate-300 hover:text-destructive hover:bg-destructive/10 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3 mb-3">
                <div
                  className={`p-2 rounded-lg ${n.type === "order" ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"}`}
                >
                  {n.type === "order" ? (
                    <ShoppingBag className="w-4 h-4" />
                  ) : (
                    <MessageSquare className="w-4 h-4" />
                  )}
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  {n.type}
                </span>
              </div>
              <p className="text-foreground font-medium">{n.message}</p>
            </div>
          ))}
          {!notifications?.length && (
            <div className="col-span-full p-12 text-center text-muted-foreground bg-card rounded-2xl border border-dashed border-border">
              No notifications yet. Add one to show social proof on your site.
            </div>
          )}
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-bold">Neue Benachrichtigung</h3>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary"
              >
                ✕
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Type</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { val: "order", Icon: ShoppingBag },
                    { val: "review", Icon: MessageSquare },
                  ].map(({ val, Icon }) => (
                    <label
                      key={val}
                      className={`border-2 rounded-xl p-3 flex flex-col items-center gap-2 cursor-pointer transition-colors ${form.type === val ? "border-primary bg-primary/5 text-primary" : "border-border hover:bg-secondary/50 text-muted-foreground"}`}
                    >
                      <input
                        type="radio"
                        name="type"
                        value={val}
                        className="sr-only"
                        checked={form.type === val}
                        onChange={() => setForm({ ...form, type: val })}
                      />
                      <Icon className="w-6 h-6" />
                      <span className="font-semibold text-sm capitalize">
                        {val}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message Text
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="e.g. 🧇 Someone just ordered a Waffle!"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Emojis highly recommended!
                </p>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="px-4 py-2 text-sm font-medium bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={create.isPending}
                  className="px-6 py-2 text-sm font-bold text-primary-foreground bg-primary rounded-xl shadow-md hover:bg-primary/90 disabled:opacity-50 flex items-center gap-2"
                >
                  {create.isPending && (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  )}{" "}
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
