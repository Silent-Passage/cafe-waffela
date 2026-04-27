"use client";

import { useState } from "react";
import { Instagram, Star, Utensils, Trash2, Camera, Info } from "lucide-react";

export function AdminWallOfFame() {
  const [type, setType] = useState<"instagram" | "google" | "foodora">(
    "google",
  );
  const [imageUrl, setImageUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [objectPosition, setObjectPosition] = useState("center");

  return (
    <div className="space-y-8">
      {/* Type Switcher */}
      <div className="flex gap-2 p-1 bg-muted rounded-2xl w-fit border border-border">
        {["google", "instagram", "foodora"].map((t) => (
          <button
            key={t}
            type="button"
            title={`Switch to ${t}`}
            onClick={() => setType(t as any)}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              type === t
                ? "bg-background shadow-md text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <form className="space-y-6 bg-card p-8 rounded-[2rem] border border-border shadow-sm">
          {/* Name & Handle */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="author"
                className="text-xs font-bold uppercase px-1"
              >
                Name
              </label>
              <input
                id="author"
                className="w-full p-3 rounded-xl bg-muted/50 border border-border outline-none focus:ring-2 ring-primary/20"
                placeholder="z.B. Maria S."
              />
            </div>
            {type !== "google" && (
              <div className="space-y-2">
                <label
                  htmlFor="handle"
                  className="text-xs font-bold uppercase px-1"
                >
                  Handle
                </label>
                <input
                  id="handle"
                  className="w-full p-3 rounded-xl bg-muted/50 border border-border outline-none focus:ring-2 ring-primary/20"
                  placeholder="@username"
                />
              </div>
            )}
          </div>
          {type !== "foodora" && (
            <div className="space-y-2">
              <label
                htmlFor="avatar"
                className="text-xs font-bold uppercase px-1"
              >
                Profilbild (Avatar) URL
              </label>
              <input
                id="avatar"
                className="w-full p-3 rounded-xl bg-muted/50 border border-border outline-none focus:ring-2 ring-primary/20"
                placeholder="https://..."
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
            </div>
          )}
          {type !== "foodora" && (
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="mainImg"
                  className="text-xs font-bold uppercase px-1"
                >
                  Beitragsbild URL
                </label>
                <input
                  id="mainImg"
                  className="w-full p-3 rounded-xl bg-muted/50 border border-border outline-none focus:ring-2 ring-primary/20"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>

              {imageUrl && (
                <div className="p-4 bg-muted/30 rounded-2xl border border-dashed border-border animate-in fade-in slide-in-from-top-2">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-bold uppercase flex items-center gap-1">
                      <Info size={12} /> Bildausschnitt (Focus)
                    </span>
                    <select
                      title="Set image focus"
                      className="text-xs p-1 rounded border bg-background"
                      value={objectPosition}
                      onChange={(e) => setObjectPosition(e.target.value)}
                    >
                      <option value="top">Oben</option>
                      <option value="center">Mitte</option>
                      <option value="bottom">Unten</option>
                    </select>
                  </div>
                  <div className="h-32 w-full overflow-hidden rounded-lg border border-border bg-black">
                    <img
                      src={imageUrl}
                      alt="Crop preview"
                      className="w-full h-full object-cover"
                      style={{ objectPosition }}
                    />
                  </div>
                </div>
              )}
            </div>
          )}
          {type === "foodora" && (
            <div className="space-y-2">
              <label
                htmlFor="ordered"
                className="text-xs font-bold uppercase px-1 text-pink-600"
              >
                Bestellte Produkte (Highlights)
              </label>
              <input
                id="ordered"
                className="w-full p-3 rounded-xl bg-muted/50 border border-border outline-none focus:ring-2 ring-pink-500/20"
                placeholder="z.B. Bueno Bowl, Lachs Bagel"
              />
            </div>
          )}
          <div className="space-y-2">
            <label
              htmlFor="reviewText"
              className="text-xs font-bold uppercase px-1 text-muted-foreground"
            >
              Bewertungstext
            </label>
            <textarea
              id="reviewText"
              className="w-full p-3 rounded-xl bg-muted/50 border border-border h-28 outline-none focus:ring-2 ring-primary/20"
            />
          </div>

          {type !== "instagram" && (
            <div className="space-y-2">
              <label
                htmlFor="stars"
                className="text-xs font-bold uppercase px-1"
              >
                Sterne
              </label>
              <select
                id="stars"
                title="Select stars"
                className="w-full p-3 rounded-xl bg-muted/50 border border-border"
              >
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>
                    {n} Sterne
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            className="w-full py-4 bg-foreground text-background rounded-2xl font-bold hover:bg-primary hover:text-foreground transition-all duration-300"
          >
            Eintrag hinzufügen
          </button>
        </form>

        <div className="sticky top-10 flex flex-col items-center">
          <p className="text-[10px] font-bold uppercase text-muted-foreground mb-4">
            Vorschau (Slider-Format)
          </p>
          <div
            className={`w-[380px] bg-background border border-border shadow-2xl rounded-[2.5rem] overflow-hidden transition-all duration-500 ${type === "foodora" ? "scale-105" : ""}`}
          >
            {type !== "foodora" && (
              <div className="h-64 bg-muted relative">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    style={{ objectPosition }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 text-primary/20">
                    <Camera size={48} />
                  </div>
                )}
              </div>
            )}
            <div className="p-8">
              {type === "foodora" && (
                <p className="text-pink-600 font-bold text-xs mb-3 flex items-center gap-1">
                  <Utensils size={14} /> foodora BESTELLUNG
                </p>
              )}
              <p className="text-lg italic text-foreground/80 leading-relaxed mb-6">
                "Dein Text wird hier im Slider markierte Keywords fett
                anzeigen..."
              </p>

              {type === "foodora" && (
                <div className="mb-6 flex gap-2 flex-wrap">
                  <span className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full text-[10px] font-bold border border-pink-100">
                    Bueno Bowl
                  </span>
                </div>
              )}

              <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                <div className="w-12 h-12 rounded-full bg-secondary overflow-hidden border border-border flex items-center justify-center font-bold">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    "M"
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm">Maria S.</h4>
                  <p className="text-[10px] uppercase tracking-tighter text-muted-foreground">
                    {type === "instagram" ? "@maria_wa" : `${type} rezension`}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
