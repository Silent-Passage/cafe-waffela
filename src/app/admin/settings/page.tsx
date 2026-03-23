"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "@/components/admin/PageHeader";
import { Loader2, Save } from "lucide-react";

interface Settings {
  id: number;
  heroTagline: string;
  address: string;
  phone: string;
  whatsappNumber: string;
  googleMapsUrl: string;
  foodoraUrl: string;
  lieferandoUrl: string;
  instagramHandle: string;
  googleReviewUrl: string;
  facebookUrl?: string;
  tiktokUrl?: string;
  contactEmail?: string;
  googleMapsEmbedUrl?: string;
}

const fields: { name: keyof Settings; label: string; placeholder?: string; type?: string; hint?: string }[] = [
  { name: "heroTagline", label: "Hero Tagline", placeholder: "Hausgemachte Waffeln. Herz. Heimat." },
  { name: "instagramHandle", label: "Instagram Handle", placeholder: "@waffela_lustenau" },
  { name: "googleReviewUrl", label: "Google Review URL", type: "url", placeholder: "https://g.page/r/..." },
  { name: "address", label: "Physical Address", placeholder: "Maria-Theresien-Straße 12, 6890 Lustenau" },
  { name: "googleMapsUrl", label: "Google Maps Link", hint: "Link to Google Maps location" },
  { name: "googleMapsEmbedUrl", label: "Google Maps Embed URL", hint: "The src URL from a Google Maps embed iframe." },
  { name: "phone", label: "Phone Number", placeholder: "+43 660 000 0000" },
  { name: "whatsappNumber", label: "WhatsApp Number", placeholder: "+436600000000", hint: "International format without spaces." },
  { name: "contactEmail", label: "Contact Email", type: "email", placeholder: "info@cafewaffela.at" },
  { name: "facebookUrl", label: "Facebook URL", type: "url", placeholder: "https://facebook.com/..." },
  { name: "tiktokUrl", label: "TikTok URL", type: "url", placeholder: "https://tiktok.com/@..." },
  { name: "foodoraUrl", label: "Foodora URL", type: "url", placeholder: "https://foodora.at/..." },
  { name: "lieferandoUrl", label: "Lieferando URL", type: "url", placeholder: "https://lieferando.at/..." },
];

export default function SettingsPage() {
  const queryClient = useQueryClient();
  const { data: settings, isLoading } = useQuery<Settings>({
    queryKey: ["settings"],
    queryFn: () => fetch("/api/settings").then((r) => r.json()),
  });

  const [form, setForm] = useState<Partial<Settings>>({});

  useEffect(() => { if (settings) setForm(settings); }, [settings]);

  const save = useMutation({
    mutationFn: (data: Partial<Settings>) =>
      fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["settings"] }),
  });

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); save.mutate(form); };

  if (isLoading) return (
    <div>
      <PageHeader title="Website Einstellungen" />
      <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
    </div>
  );

  return (
    <div>
      <PageHeader title="Website Einstellungen" description="Global configuration for the public cafe website." />

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl pb-24">
        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-8">
          <h3 className="text-xl font-bold mb-6 border-b border-border pb-4">General Details</h3>
          <div className="space-y-5">
            {fields.slice(0, 3).map((f) => (
              <div key={String(f.name)}>
                <label className="block text-sm font-bold text-foreground mb-1.5">{f.label}</label>
                <input name={String(f.name)} type={f.type ?? "text"} value={(form[f.name] as string) ?? ""} placeholder={f.placeholder}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="w-full px-4 py-2.5 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all" />
                {f.hint && <p className="text-xs text-muted-foreground mt-1">{f.hint}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-card rounded-2xl shadow-sm border border-border p-6 sm:p-8">
          <h3 className="text-xl font-bold mb-6 border-b border-border pb-4">Contact & Location</h3>
          <div className="space-y-5">
            {fields.slice(3).map((f) => (
              <div key={String(f.name)}>
                <label className="block text-sm font-bold text-foreground mb-1.5">{f.label}</label>
                <input name={String(f.name)} type={f.type ?? "text"} value={(form[f.name] as string) ?? ""} placeholder={f.placeholder}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className={`w-full px-4 py-2.5 border-2 border-border rounded-xl bg-background focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all ${f.name === "googleMapsUrl" ? "font-mono text-sm" : ""}`} />
                {f.hint && <p className="text-xs text-muted-foreground mt-1">{f.hint}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 lg:left-64 p-4 bg-background/80 backdrop-blur-md border-t border-border flex justify-end z-20">
          <button type="submit" disabled={save.isPending}
            className="px-8 py-3 text-sm font-bold text-primary-foreground bg-primary rounded-xl shadow-lg hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex items-center gap-2">
            {save.isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
            Speichern
          </button>
        </div>
      </form>
    </div>
  );
}
