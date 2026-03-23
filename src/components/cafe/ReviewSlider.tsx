"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const HIGHLIGHT_KEYWORDS = ["fluffy", "fluffig", "Bananensplit", "herzlich", "lecker", "super", "gemütlich", "sauber", "clean"];

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
    )
  );
}

const REVIEWS = [
  { id: "1", author: "Maria S.", rating: 5, text: "Die Waffeln sind absolut fluffy und so lecker! Die Bananensplit Waffel ist ein Traum. Das Personal ist herzlich und zuvorkommend. Definitiv ein Muss in Lustenau!", date: "2024-12-15", avatar: "M" },
  { id: "2", author: "Thomas K.", rating: 5, text: "Super gemütliches Café mit fantastischen Waffeln. Die Atmosphäre ist einladend und das Essen kommt frisch und warm. Die Chicken Curry Bagel ist eine tolle Überraschung! Herzlich empfohlen.", date: "2024-11-28", avatar: "T" },
  { id: "3", author: "Anna B.", rating: 5, text: "Wunderschönes kleines Café! Die Waffeln sind einfach herrlich fluffy und mit so viel Liebe gemacht. Super sauber und einladend. Wir kommen sicher wieder!", date: "2024-11-10", avatar: "A" },
  { id: "4", author: "Peter M.", rating: 5, text: "Ich habe selten so eine Bananensplit Waffel gegessen! Absolut lecker und die Portionen sind großzügig. Die Betreiber sind herzlich und man fühlt sich sofort wohl.", date: "2024-10-22", avatar: "P" },
  { id: "5", author: "Sabine R.", rating: 4, text: "Ein gemütliches Plätzchen für einen schönen Nachmittag. Die Waffeln sind fluffig und die Auswahl ist toll. Super freundliches Personal. Toiletten sind sauber. Empfehlenswert!", date: "2024-10-05", avatar: "S" },
  { id: "6", author: "Klaus W.", rating: 5, text: "Beste Waffeln in Vorarlberg! Einfach super lecker, immer frisch und die Bananensplit Waffel ist mein absoluter Favorit. Das Café ist herzlich und gemütlich – ein zweites Zuhause.", date: "2024-09-18", avatar: "K" },
  { id: "7", author: "Lisa H.", rating: 5, text: "Super nettes Team und wunderbare Waffeln! So fluffy wie ich sie mir immer gewünscht habe. Ein Muss für alle Waffelliebhaber in der Region!", date: "2024-09-02", avatar: "L" },
  { id: "8", author: "Johannes F.", rating: 4, text: "Tolles Café mit leckerem Essen. Die Atmosphäre ist super gemütlich und einladend. Ich komme immer wieder gerne hierher für meine Waffel-Auszeit.", date: "2024-08-14", avatar: "J" },
];

interface ReviewSliderProps {
  googleReviewUrl?: string | null;
}

export function ReviewSlider({ googleReviewUrl }: ReviewSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start" },
    [Autoplay({ delay: 5000, stopOnInteraction: true })]
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

  return (
    <section className="py-24 bg-card relative overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-primary/5 rounded-full blur-3xl opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-4 font-display">
            Wall of <span className="text-primary italic">Fame</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our wonderful community has to say.
          </p>
        </div>

        <div className="relative group">
          <div className="embla" ref={emblaRef}>
            <div className="embla__container gap-6 pl-4">
              {REVIEWS.map((review) => (
                <div key={review.id} className="embla__slide">
                  <div className="h-full p-8 rounded-3xl bg-background border border-border/50 shadow-lg hover:shadow-xl hover:border-primary/20 transition-all duration-300 flex flex-col group/card relative">
                    <Quote className="absolute top-6 right-6 w-12 h-12 text-muted/30 group-hover/card:text-primary/10 transition-colors" />
                    <div className="flex gap-1 mb-6">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${i < review.rating ? "fill-primary text-primary" : "fill-muted text-muted"}`}
                        />
                      ))}
                    </div>
                    <p className="text-lg text-foreground/80 flex-grow mb-8 leading-relaxed font-sans">
                      &ldquo;{highlightText(review.text)}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-foreground font-bold text-lg">
                        {review.avatar}
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground font-display">{review.author}</h4>
                        <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString("de-AT")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={scrollPrev}
            disabled={!prevEnabled}
            className="absolute left-0 top-1/2 -translate-y-12 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-border items-center justify-center text-foreground hover:text-primary hover:scale-110 disabled:opacity-50 disabled:scale-100 transition-all hidden md:flex"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={scrollNext}
            disabled={!nextEnabled}
            className="absolute right-0 top-1/2 -translate-y-12 translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-xl border border-border items-center justify-center text-foreground hover:text-primary hover:scale-110 disabled:opacity-50 disabled:scale-100 transition-all hidden md:flex"
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
            Loved your waffle? Leave us a 5-star hug on Google <Star className="w-5 h-5 fill-current" />
          </a>
        </div>
      </div>
    </section>
  );
}
