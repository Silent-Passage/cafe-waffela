"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "@/components/admin/PageHeader";
import { Loader2, Save, ExternalLink } from "lucide-react";

interface Settings {
  foodoraUrl: string;
  lieferandoUrl: string;
  [key: string]: string;
}

export default function DeliveryPage() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: () => fetch("/api/settings").then((r) => r.json()),
  });

  const [form, setForm] = useState({ foodoraUrl: "", lieferandoUrl: "" });

  useEffect(() => {
    if (settings) setForm({ foodoraUrl: settings.foodoraUrl, lieferandoUrl: settings.lieferandoUrl });
  }, [settings]);

  const save = useMutation({
    mutationFn: (data: Partial<Settings>) =>
      fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...settings, ...data }) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] }),
  });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); save.mutate(form); };

  return (
    <div>
      <PageHeader title="Lieferservice Links" description="Manage where customers are directed when they click 'Order Online'." />

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-card rounded-2xl shadow-sm border border-border p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="flex items-center text-sm font-bold text-foreground mb-2"><span className="text-xl mr-2">🍕</span> Foodora URL</label>
                <input type="url" value={form.foodoraUrl} onChange={(e) => setForm({ ...form, foodoraUrl: e.target.value })} placeholder="https://www.foodora.at/..."
                  className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" />
              </div>
              <div>
                <label className="flex items-center text-sm font-bold text-foreground mb-2"><span className="text-xl mr-2">🛵</span> Lieferando URL</label>
                <input type="url" value={form.lieferandoUrl} onChange={(e) => setForm({ ...form, lieferandoUrl: e.target.value })} placeholder="https://www.lieferando.at/..."
                  className="w-full px-4 py-3 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" />
              </div>
              <button type="submit" disabled={save.isPending} className="w-full py-4 text-sm font-bold text-primary-foreground bg-primary rounded-xl shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 flex justify-center items-center gap-2">
                {save.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                Links Speichern
              </button>
            </form>
          </div>

          <div className="bg-gradient-to-br from-amber-50 to-orange-100 rounded-2xl border border-amber-200 p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-display font-bold text-amber-900 mb-2">Live Preview</h3>
            <p className="text-amber-700/80 mb-8 max-w-sm">This is how the buttons appear on your public website.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <a href={form.foodoraUrl || "#"} target="_blank" rel="noreferrer"
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold shadow-lg hover:-translate-y-1 transition-transform ${!form.foodoraUrl ? "opacity-50 pointer-events-none" : ""}`}
                style={{ backgroundColor: "#D70F64" }}>
                🍕 Bestellen auf foodora <ExternalLink className="w-4 h-4 ml-1 opacity-50" />
              </a>
              <a href={form.lieferandoUrl || "#"} target="_blank" rel="noreferrer"
                className={`flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white font-bold shadow-lg hover:-translate-y-1 transition-transform ${!form.lieferandoUrl ? "opacity-50 pointer-events-none" : ""}`}
                style={{ backgroundColor: "#FF8000" }}>
                🛵 Bestellen auf Lieferando <ExternalLink className="w-4 h-4 ml-1 opacity-50" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
