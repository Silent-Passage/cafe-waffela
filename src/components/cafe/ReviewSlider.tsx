"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import {
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Instagram,
} from "lucide-react";

const HIGHLIGHT_KEYWORDS = [
  "fluffy",
  "fluffig",
  "Bananensplit",
  "herzlich",
  "lecker",
  "super",
  "gemütlich",
  "sauber",
  "clean",
];

function highlightText(text: string) {
  const regex = new RegExp(`(${HIGHLIGHT_KEYWORDS.join("|")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, i) =>
    HIGHLIGHT_KEYWORDS.some((w) => w.toLowerCase() === part.toLowerCase()) ? (
      <strong key={i} className="text-primary font-semibold">
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

interface WallOfFameItem {
  id: number;
  type: string;
  author: string;
  text: string;
  rating: number;
  imageUrl?: string | null;
  avatar?: string | null;
  date: string;
}

interface ReviewSliderProps {
  googleReviewUrl?: string | null;
  items: WallOfFameItem[];
}

export function ReviewSlider({ googleReviewUrl, items }: ReviewSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })],
  );
  const [prevEnabled, setPrevEnabled] = useState(false);
  const [nextEnabled, setNextEnabled] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevEnabled(emblaApi.canScrollPrev());
    setNextEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  if (!items || items.length === 0) return null;

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display italic">
            Wall of{" "}
            <span className="text-primary not-italic underline decoration-wavy decoration-secondary/30">
              Fame
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Von süßen Momenten auf Instagram bis zu euren Liebessprüchen auf
            Google – unsere Community ist die Beste!
          </p>
        </div>

        <div className="relative group">
          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_85%] md:flex-[0_0_380px] min-w-0"
                >
                  <div className="h-[500px] flex flex-col rounded-3xl bg-background border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300 relative overflow-hidden group/card">
                    {item.type === "instagram" && item.imageUrl && (
                      <div className="relative h-48 w-full overflow-hidden">
                        <img
                          src={item.imageUrl}
                          alt="Instagram Spotlight"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-105"
                        />
                        <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md p-2 rounded-full text-white">
                          <Instagram size={16} />
                        </div>
                      </div>
                    )}

                    <div className="p-8 flex flex-col flex-grow">
                      {item.type === "google" && (
                        <Quote className="absolute top-6 right-6 w-10 h-10 text-muted/20" />
                      )}

                      {item.type === "google" && (
                        <div className="flex gap-1 mb-6">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < item.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                            />
                          ))}
                        </div>
                      )}

                      <p
                        className={`text-lg text-foreground/80 flex-grow mb-8 leading-relaxed font-sans italic`}
                      >
                        &ldquo;{highlightText(item.text)}&rdquo;
                      </p>

                      <div className="flex items-center gap-4 mt-auto pt-6 border-t border-border/40">
                        {item.type === "google" ? (
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-sm">
                            {item.avatar || item.author.charAt(0)}
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px]">
                            <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[10px] font-bold">
                              @
                            </div>
                          </div>
                        )}
                        <div>
                          <h4 className="font-bold text-foreground font-display text-sm">
                            {item.type === "instagram"
                              ? `@${item.author.replace("@", "")}`
                              : item.author}
                          </h4>
                          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            {item.type === "google"
                              ? "Google Rezension"
                              : "Instagram Spotlight"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            aria-label="Vorherige Rezension"
            type="button"
            onClick={scrollPrev}
            disabled={!prevEnabled}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-border items-center justify-center text-foreground hover:text-primary hover:scale-110 disabled:opacity-0 transition-all hidden md:flex z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            aria-label="Nächste Rezension"
            type="button"
            onClick={scrollNext}
            disabled={!nextEnabled}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-border items-center justify-center text-foreground hover:text-primary hover:scale-110 disabled:opacity-0 transition-all hidden md:flex z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href={googleReviewUrl ?? "https://g.page/r/CafeWaffela/review"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-foreground hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            Waffel-Liebe teilen? Ab zu Google{" "}
            <Star className="w-5 h-5 fill-current" />
          </a>
        </div>
      </div>
    </section>
  );
}
