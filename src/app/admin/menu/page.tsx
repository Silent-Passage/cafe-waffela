"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "@/components/admin/PageHeader";
import { Plus, Edit2, Trash2, Loader2 } from "lucide-react";

interface MenuItem {
  id: number;
  title: string;
  description: string;
  emoji: string;
  category: string;
  available: boolean;
  sortOrder: number;
}

type MenuItemInput = Omit<MenuItem, "id">;

const EMPTY_FORM: MenuItemInput = { title: "", description: "", emoji: "🧇", category: "Süß", available: true, sortOrder: 0 };

export default function MenuPage() {
  const queryClient = useQueryClient();
  const { data: items, isLoading } = useQuery<MenuItem[]>({
    queryKey: ["menu"],
    queryFn: () => fetch("/api/menu").then((r) => r.json()),
  });

  const create = useMutation({
    mutationFn: (data: MenuItemInput) =>
      fetch("/api/menu", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["menu"] }); setOpen(false); },
  });

  const update = useMutation({
    mutationFn: ({ id, data }: { id: number; data: MenuItemInput }) =>
      fetch(`/api/menu/${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["menu"] }); setOpen(false); },
  });

  const remove = useMutation({
    mutationFn: (id: number) => fetch(`/api/menu/${id}`, { method: "DELETE" }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["menu"] }),
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<MenuItem | null>(null);
  const [form, setForm] = useState<MenuItemInput>(EMPTY_FORM);

  const openNew = () => { setEditing(null); setForm(EMPTY_FORM); setOpen(true); };
  const openEdit = (item: MenuItem) => {
    setEditing(item);
    setForm({ title: item.title, description: item.description, emoji: item.emoji, category: item.category, available: item.available, sortOrder: item.sortOrder });
    setOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editing) update.mutate({ id: editing.id, data: form });
    else create.mutate(form);
  };

  return (
    <div>
      <PageHeader
        title="Speisekarte verwalten"
        action={
          <button onClick={openNew} className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-medium flex items-center shadow-lg hover:-translate-y-0.5 transition-all">
            <Plus className="w-5 h-5 mr-2" /> Neues Gericht
          </button>
        }
      />

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="p-4 font-semibold text-sm text-muted-foreground w-16">Icon</th>
                  <th className="p-4 font-semibold text-sm text-muted-foreground">Details</th>
                  <th className="p-4 font-semibold text-sm text-muted-foreground">Category</th>
                  <th className="p-4 font-semibold text-sm text-muted-foreground">Status</th>
                  <th className="p-4 font-semibold text-sm text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[...(items ?? [])].sort((a, b) => a.sortOrder - b.sortOrder).map((item) => (
                  <tr key={item.id} className="hover:bg-secondary/20 transition-colors">
                    <td className="p-4 text-3xl text-center">{item.emoji}</td>
                    <td className="p-4">
                      <div className="font-bold text-foreground">{item.title}</div>
                      <div className="text-sm text-muted-foreground line-clamp-1">{item.description}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-secondary text-xs font-medium">{item.category}</span>
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.available ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                        {item.available ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => openEdit(item)} className="p-2 text-slate-400 hover:text-primary hover:bg-primary/10 rounded-lg transition-colors">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => { if (confirm("Delete this item?")) remove.mutate(item.id); }}
                          className="p-2 text-slate-400 hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {!items?.length && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No menu items yet. Click &quot;Neues Gericht&quot; to add one.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-border flex justify-between items-center">
              <h3 className="text-xl font-bold">{editing ? "Gericht bearbeiten" : "Neues Gericht"}</h3>
              <button onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-secondary">✕</button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <div className="col-span-3">
                  <label className="block text-sm font-medium mb-1">Title</label>
                  <input required type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Emoji</label>
                  <input required type="text" value={form.emoji} onChange={(e) => setForm({ ...form, emoji: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 text-center text-xl" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea required rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50">
                    <option value="Süß">Süß</option>
                    <option value="Herzhaft">Herzhaft</option>
                    <option value="Getränke">Getränke</option>
                    <option value="Andere">Andere</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Sort Order</label>
                  <input type="number" value={form.sortOrder} onChange={(e) => setForm({ ...form, sortOrder: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 border border-border rounded-xl bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                </div>
              </div>
              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="available" checked={form.available} onChange={(e) => setForm({ ...form, available: e.target.checked })} className="w-4 h-4 rounded" />
                <label htmlFor="available" className="text-sm font-medium">Available on menu</label>
              </div>
              <div className="flex justify-end gap-3 pt-6 border-t border-border mt-6">
                <button type="button" onClick={() => setOpen(false)} className="px-4 py-2 text-sm font-medium bg-secondary rounded-xl hover:bg-secondary/80 transition-colors">Cancel</button>
                <button type="submit" disabled={create.isPending || update.isPending} className="px-6 py-2 text-sm font-bold text-primary-foreground bg-primary rounded-xl shadow-md hover:bg-primary/90 transition-colors disabled:opacity-50 flex items-center gap-2">
                  {(create.isPending || update.isPending) && <Loader2 className="w-4 h-4 animate-spin" />}
                  Save Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
