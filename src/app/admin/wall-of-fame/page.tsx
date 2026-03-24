"use client";

import { useState, useEffect } from "react";
import {
  Star,
  Instagram,
  Trash2,
  Plus,
  Loader2,
  Globe,
  Image as ImageIcon,
} from "lucide-react";

export default function WallOfFameAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // Formular State
  const [type, setType] = useState<"google" | "instagram">("google");
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch("/api/wall-of-fame");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Fehler beim Laden:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const newItem = {
      type,
      author,
      text,
      rating: type === "google" ? rating : 5,
      imageUrl: type === "instagram" ? imageUrl : null,
      avatar: author.charAt(0).toUpperCase(),
      date: new Date().toISOString().split("T")[0],
    };

    try {
      const res = await fetch("/api/wall-of-fame", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (res.ok) {
        setAuthor("");
        setText("");
        setImageUrl("");
        fetchItems();
      }
    } catch (err) {
      console.error("Fehler beim Speichern:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Diesen Eintrag wirklich löschen?")) return;
    try {
      await fetch(`/api/wall-of-fame?id=${id}`, { method: "DELETE" });
      fetchItems();
    } catch (err) {
      console.error("Fehler beim Löschen:", err);
    }
  };

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-6xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">
          Wall of <span className="text-primary italic">Fame</span>
        </h1>
        <p className="text-muted-foreground mt-2">
          Verwalte hier deine Google Rezensionen und Instagram-Spotlights.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Links: Formular */}
        <div className="lg:col-span-1">
          <form
            onSubmit={handleAdd}
            className="bg-card p-6 rounded-3xl border border-border shadow-sm space-y-5 sticky top-24"
          >
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Plus size={20} className="text-primary" /> Neu hinzufügen
            </h2>

            <div className="flex p-1 bg-muted rounded-xl w-full">
              <button
                type="button"
                onClick={() => setType("google")}
                className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${type === "google" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
              >
                Google
              </button>
              <button
                type="button"
                onClick={() => setType("instagram")}
                className={`flex-1 py-2 rounded-lg font-bold text-xs transition-all ${type === "instagram" ? "bg-background shadow-sm text-primary" : "text-muted-foreground"}`}
              >
                Instagram
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Name / Handle
                </label>
                <input
                  className="w-full mt-1 p-3 rounded-xl bg-muted/50 border border-border outline-none focus:ring-2 ring-primary/20 transition-all"
                  placeholder={
                    type === "google" ? "z.B. Maria S." : "z.B. @waffela_fan"
                  }
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                />
              </div>

              {type === "google" ? (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Bewertung
                  </label>
                  <select
                    aria-label="Sterne Bewertung auswählen"
                    className="w-full mt-1 p-3 rounded-xl bg-muted/50 border border-border outline-none"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} Sterne
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                    Bild URL
                  </label>
                  <input
                    className="w-full mt-1 p-3 rounded-xl bg-muted/50 border border-border outline-none"
                    placeholder="https://images.unsplash.com/..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  Text / Caption
                </label>
                <textarea
                  className="w-full mt-1 p-3 rounded-xl bg-muted/50 border border-border min-h-[100px] outline-none"
                  placeholder="Inhalt der Bewertung..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              disabled={loading}
              className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/20"
            >
              {loading ? <Loader2 className="animate-spin" /> : "Speichern"}
            </button>
          </form>
        </div>

        {/* Rechts: Liste */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Star size={20} className="text-primary" /> Aktuelle Einträge (
            {items.length})
          </h2>

          {fetching ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary" />
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border text-muted-foreground">
              Noch keine Einträge vorhanden
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="p-5 bg-card rounded-2xl border border-border flex gap-5 items-center group hover:border-primary/50 transition-all"
                >
                  <div className="relative flex-shrink-0">
                    {item.type === "instagram" ? (
                      <img
                        src={item.imageUrl}
                        className="w-20 h-20 rounded-xl object-cover border border-border"
                        alt=""
                      />
                    ) : (
                      <div className="w-20 h-20 rounded-xl bg-secondary flex items-center justify-center font-bold text-2xl text-secondary-foreground border border-border">
                        {item.avatar}
                      </div>
                    )}
                    <div className="absolute -top-2 -right-2 p-1.5 rounded-full bg-background border border-border shadow-sm">
                      {item.type === "instagram" ? (
                        <Instagram size={12} className="text-pink-500" />
                      ) : (
                        <Globe size={12} className="text-blue-500" />
                      )}
                    </div>
                  </div>

                  <div className="flex-grow min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold truncate">{item.author}</span>
                      {item.type === "google" && (
                        <div className="flex gap-0.5 ml-2">
                          {[...Array(item.rating)].map((_, i) => (
                            <Star
                              key={i}
                              size={10}
                              className="fill-primary text-primary"
                            />
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2 italic">
                      "{item.text}"
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(item.id)}
                    title="Eintrag löschen"
                    aria-label="Eintrag löschen"
                    className="p-3 text-destructive hover:bg-destructive/10 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
