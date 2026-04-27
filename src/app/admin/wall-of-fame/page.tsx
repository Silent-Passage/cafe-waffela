"use client";

import { useState, useEffect, useRef } from "react";
import {
  Star,
  Trash2,
  Plus,
  Loader2,
  Camera,
  Edit2,
  X,
  Upload,
  CheckCircle2,
  Type,
} from "lucide-react";

export default function WallOfFameAdminPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [type, setType] = useState<"google" | "instagram" | "foodora">(
    "google",
  );
  const [author, setAuthor] = useState("");
  const [handle, setHandle] = useState("");
  const [text, setText] = useState("");
  const [highlightedText, setHighlightedText] = useState("");
  const [rating, setRating] = useState(5);
  const [imageUrl, setImageUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [orderedItems, setOrderedItems] = useState("");
  const [focusY, setFocusY] = useState(50);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMenu();
    fetchItems();
  }, []);

  const fetchMenu = async () => {
    try {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenuItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchItems = async () => {
    setFetching(true);
    try {
      const res = await fetch("/api/wall-of-fame");
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } finally {
      setFetching(false);
    }
  };

  const handleBlobUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    target: "image" | "avatar",
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/upload?filename=${file.name}`, {
        method: "POST",
        body: file,
      });
      const newBlob = await response.json();
      if (target === "image") setImageUrl(newBlob.url);
      else setAvatarUrl(newBlob.url);
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Upload fehlgeschlagen!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: any) => {
    setEditingId(item.id);
    setType(item.type);
    setAuthor(item.author || "");
    setHandle(item.handle || "");
    setText(item.text || "");
    setHighlightedText(item.highlightedText || "");
    setRating(item.rating || 5);
    setImageUrl(item.imageUrl || "");
    setAvatarUrl(item.avatarUrl || "");
    setOrderedItems(item.orderedItems || "");

    if (item.objectPosition?.includes("%")) {
      const match = item.objectPosition.match(/\d+/);
      if (match) setFocusY(parseInt(match[0]));
    } else {
      setFocusY(50);
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setAuthor("");
    setHandle("");
    setText("");
    setHighlightedText("");
    setImageUrl("");
    setAvatarUrl("");
    setOrderedItems("");
    setFocusY(50);
    setRating(5);
  };

  const addHighlight = (newWord: string) => {
    const trimmed = newWord.trim();
    if (!trimmed) return;
    const currentList = highlightedText
      ? highlightedText.split(",").map((s) => s.trim())
      : [];
    if (!currentList.includes(trimmed)) {
      setHighlightedText([...currentList, trimmed].join(", "));
    }
  };

  const removeHighlight = (wordToRemove: string) => {
    const newList = highlightedText
      .split(",")
      .map((s) => s.trim())
      .filter((w) => w !== wordToRemove)
      .join(", ");
    setHighlightedText(newList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: editingId,
      type,
      author: type === "instagram" ? handle : author,
      handle: type !== "google" ? handle : null,
      text,
      highlightedText,
      rating: type !== "instagram" ? rating : 5,
      imageUrl: type !== "foodora" ? imageUrl : null,
      avatarUrl: type !== "foodora" ? avatarUrl : null,
      orderedItems: type === "foodora" ? orderedItems : null,
      objectPosition: `center ${focusY}%`,
    };

    try {
      const method = editingId ? "PUT" : "POST";
      const res = await fetch("/api/wall-of-fame", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        resetForm();
        fetchItems();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Eintrag permanent löschen?")) return;
    await fetch(`/api/wall-of-fame?id=${id}`, { method: "DELETE" });
    fetchItems();
  };

  return (
    <div className="p-6 lg:p-12 space-y-12 max-w-[1400px] mx-auto bg-background min-h-screen text-foreground">
      <header className="space-y-2">
        <h1 className="text-4xl font-black font-display tracking-tight italic">
          Wall of <span className="text-primary not-italic">Fame</span>{" "}
          <span className="text-muted-foreground/40">Admin</span>
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-[2.5rem] p-8 shadow-2xl shadow-black/5 space-y-8 sticky top-12 transition-all"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold flex items-center gap-3">
                {editingId ? (
                  <Edit2 className="text-blue-500" />
                ) : (
                  <Plus className="text-primary" />
                )}
                {editingId ? "Eintrag editieren" : "Neuer Post"}
              </h2>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-muted hover:bg-muted/80 text-[10px] uppercase tracking-widest font-bold px-4 py-2 rounded-full flex items-center gap-2"
                >
                  <X size={14} /> Abbrechen
                </button>
              )}
            </div>

            <div className="flex p-1.5 bg-muted/50 rounded-2xl border border-border/50">
              {["google", "instagram", "foodora"].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setType(t as any);
                    resetForm();
                  }}
                  className={`flex-1 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all ${
                    type === t
                      ? "bg-background shadow-lg text-primary scale-[1.02]"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase text-amber-600 px-1 flex items-center gap-2">
                  <Type size={12} /> Highlights zum Hervorheben
                </label>
                <div className="flex flex-wrap gap-2 min-h-[44px] p-3 bg-amber-50/30 border border-amber-100 rounded-2xl">
                  {highlightedText
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                    .map((word, i) => (
                      <span
                        key={i}
                        className="bg-amber-500 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1"
                      >
                        {word}
                        <button
                          type="button"
                          onClick={() => removeHighlight(word)}
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  <input
                    placeholder="Wort tippen & Enter..."
                    className="flex-1 bg-transparent outline-none text-sm min-w-[120px]"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addHighlight(e.currentTarget.value);
                        e.currentTarget.value = "";
                      }
                    }}
                  />
                </div>
              </div>

              {(type === "instagram" || type === "google") && (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-muted-foreground px-1">
                      Profilbild
                    </label>
                    <div
                      onClick={() => avatarInputRef.current?.click()}
                      className="aspect-square rounded-full border-2 border-dashed border-border flex items-center justify-center cursor-pointer overflow-hidden bg-muted/20 relative group transition-all hover:border-primary/50"
                    >
                      {avatarUrl ? (
                        <img
                          src={avatarUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Upload className="text-muted-foreground" />
                      )}
                      {loading && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <Loader2 className="animate-spin text-white" />
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={avatarInputRef}
                      hidden
                      accept="image/*"
                      onChange={(e) => handleBlobUpload(e, "avatar")}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase text-muted-foreground px-1">
                      Post Bild
                    </label>
                    <div
                      onClick={() => imageInputRef.current?.click()}
                      className="aspect-square rounded-[2rem] border-2 border-dashed border-border flex items-center justify-center cursor-pointer overflow-hidden bg-muted/20 relative group transition-all hover:border-primary/50"
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Camera className="text-muted-foreground" />
                      )}
                    </div>
                    <input
                      type="file"
                      ref={imageInputRef}
                      hidden
                      accept="image/*"
                      onChange={(e) => handleBlobUpload(e, "image")}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-muted-foreground px-1">
                  {type === "instagram"
                    ? "Instagram Handle"
                    : "Name des Gastes"}
                </label>
                <input
                  placeholder={
                    type === "instagram" ? "@waffela_gast" : "Max Mustermann"
                  }
                  className="w-full p-4 rounded-2xl bg-muted/30 border border-border outline-none font-bold"
                  value={type === "instagram" ? handle : author}
                  onChange={(e) =>
                    type === "instagram"
                      ? setHandle(e.target.value)
                      : setAuthor(e.target.value)
                  }
                />
              </div>

              {imageUrl && (
                <div className="p-5 bg-primary/5 rounded-[2rem] border border-primary/10 space-y-4">
                  <div className="flex justify-between items-center text-[11px] font-black uppercase text-primary">
                    <span>Bild-Fokus: {focusY}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={focusY}
                    onChange={(e) => setFocusY(parseInt(e.target.value))}
                    className="w-full h-1.5 accent-primary bg-primary/20 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="h-44 rounded-2xl overflow-hidden border bg-black">
                    <img
                      src={imageUrl}
                      className="w-full h-full object-cover"
                      style={{ objectPosition: `center ${focusY}%` }}
                    />
                  </div>
                </div>
              )}

              {type === "foodora" && (
                <div className="space-y-3">
                  <label className="text-[11px] font-black uppercase text-pink-600 px-1 italic">
                    Bestellte Artikel
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 bg-pink-50/50 rounded-xl border border-pink-100 min-h-[40px]">
                    {orderedItems
                      .split(", ")
                      .filter(Boolean)
                      .map((item) => (
                        <span
                          key={item}
                          className="bg-pink-600 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1"
                        >
                          {item}{" "}
                          <button
                            type="button"
                            onClick={() =>
                              setOrderedItems(
                                orderedItems
                                  .split(", ")
                                  .filter((i) => i !== item)
                                  .join(", "),
                              )
                            }
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto p-2">
                    {menuItems.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() =>
                          !orderedItems.includes(m.title) &&
                          setOrderedItems(
                            orderedItems
                              ? `${orderedItems}, ${m.title}`
                              : m.title,
                          )
                        }
                        className="text-left text-[10px] p-2.5 rounded-xl border border-border bg-background truncate hover:bg-pink-50 transition-colors"
                      >
                        + {m.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {type !== "instagram" && (
                <div className="space-y-2">
                  <label className="text-[11px] font-black uppercase text-muted-foreground px-1">
                    Bewertung
                  </label>
                  <div className="flex gap-2 bg-muted/20 p-3 rounded-2xl w-fit border border-border">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={24}
                        onClick={() => setRating(s)}
                        className={`cursor-pointer transition-all ${s <= rating ? "text-primary fill-primary scale-110" : "text-muted-foreground/30"}`}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Review Text */}
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase text-muted-foreground px-1">
                  Rezension
                </label>
                <textarea
                  placeholder="Was wurde geschrieben?"
                  className="w-full p-4 rounded-2xl bg-muted/30 border border-border outline-none min-h-[120px] text-sm"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onMouseUp={() => {
                    const sel = window.getSelection()?.toString();
                    if (sel && sel.trim().length > 0) addHighlight(sel);
                  }}
                  required
                />
              </div>

              <button
                disabled={loading}
                className="w-full py-5 bg-foreground text-background font-black rounded-[1.5rem] hover:bg-primary transition-all flex items-center justify-center gap-3 shadow-xl disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <>
                    {editingId
                      ? "ÄNDERUNGEN SPEICHERN"
                      : "JETZT VERÖFFENTLICHEN"}{" "}
                    <CheckCircle2 size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Live Feed Bereich */}
        <div className="lg:col-span-7 space-y-8">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <h2 className="text-2xl font-black flex items-center gap-3">
              <Star className="text-primary fill-primary" /> LIVE FEED{" "}
              <span className="text-muted-foreground font-normal text-sm">
                ({items.length})
              </span>
            </h2>
          </div>

          {fetching ? (
            <div className="flex justify-center py-20">
              <Loader2 className="animate-spin text-primary size-10" />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="group bg-card p-5 rounded-[2rem] border border-border flex gap-6 items-center hover:border-primary/50 transition-all relative overflow-hidden"
                >
                  <div className="relative flex-shrink-0">
                    <div className="w-24 h-24 rounded-[1.5rem] overflow-hidden border bg-muted">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          className="w-full h-full object-cover"
                          style={{ objectPosition: item.objectPosition }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-black text-2xl text-muted-foreground/20">
                          {item.author?.[0]}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex-grow min-w-0 space-y-1">
                    <span className="font-black text-lg truncate tracking-tight">
                      {item.type === "instagram"
                        ? `@${item.handle}`
                        : item.author}
                    </span>
                    <p className="text-sm text-muted-foreground line-clamp-2 italic">
                      "{item.text}"
                    </p>
                    {item.highlightedText && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {item.highlightedText
                          .split(",")
                          .map((h: string, i: number) => (
                            <span
                              key={i}
                              className="text-[8px] px-2 py-0.5 bg-amber-100 text-amber-700 rounded-full font-bold uppercase tracking-tighter"
                            >
                              {h.trim()}
                            </span>
                          ))}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-3 bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="p-3 bg-red-50 text-red-600 rounded-2xl hover:bg-red-600 hover:text-white transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
