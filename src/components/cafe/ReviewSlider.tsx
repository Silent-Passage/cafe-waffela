"use client";

import React, { useState, useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Instagram,
  Globe,
  Utensils,
  Heart,
  MessageCircle,
  Send,
  Bookmark,
  X,
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

interface WallOfFameItem {
  id: number;
  type: "google" | "instagram" | "foodora";
  author: string;
  handle?: string | null;
  text: string;
  highlightedText?: string | null;
  rating: number | null;
  imageUrl?: string | null;
  avatarUrl?: string | null;
  orderedItems?: string | null;
  objectPosition?: string | null;
}

interface ReviewSliderProps {
  items: WallOfFameItem[];
  googleReviewUrl?: string;
}

export default function ReviewSlider({
  items,
  googleReviewUrl,
}: ReviewSliderProps) {
  const autoplay = Autoplay({
    delay: 4000,
    stopOnInteraction: false,
    stopOnMouseEnter: true,
    playOnInit: true,
  });

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      loop: true,
      dragFree: true,
      containScroll: false,
    },
    [autoplay],
  );

  const [selectedReview, setSelectedReview] = useState<WallOfFameItem | null>(
    null,
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (selectedReview) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [selectedReview]);

  const renderText = (text: string, highlightSource?: string | null) => {
    if (!text) return null;

    const keywords = highlightSource
      ? highlightSource
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0)
      : [];

    const emojiRegex =
      /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F|\p{Emoji_Modifier_Base})/gu;

    if (keywords.length === 0) {
      const parts = text.split(emojiRegex);
      return (
        <>
          "
          {parts.map((part, i) =>
            emojiRegex.test(part) ? (
              <span key={i} className="not-italic inline-block mx-0.5">
                {part}
              </span>
            ) : (
              part
            ),
          )}
          "
        </>
      );
    }

    const pattern = keywords
      .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("|");
    const highlightParts = text.split(new RegExp(`(${pattern})`, "gi"));

    return (
      <>
        "
        {highlightParts.map((part, i) => {
          const isHighlight = keywords.some(
            (k) => k.toLowerCase() === part.toLowerCase(),
          );

          const subParts = part.split(emojiRegex);
          const content = subParts.map((sub, j) =>
            emojiRegex.test(sub) ? (
              <span key={j} className="not-italic inline-block mx-0.5">
                {sub}
              </span>
            ) : (
              sub
            ),
          );

          return isHighlight ? (
            <span key={i} className="text-amber-500 font-bold">
              {content}
            </span>
          ) : (
            <React.Fragment key={i}>{content}</React.Fragment>
          );
        })}
        "
      </>
    );
  };

  const renderOrderedItems = (
    itemsString: string | null | undefined,
    isModal = false,
  ) => {
    if (!itemsString) return null;
    const itemList = itemsString.split(",").map((item) => item.trim());

    return (
      <div
        className={`${isModal ? "mt-8" : "absolute bottom-0 left-0 right-0"}`}
      >
        <p className="text-[10px] uppercase tracking-widest font-black text-zinc-400 mb-2 flex items-center gap-1.5">
          <ShoppingBag size={12} className="text-pink-500" />
          Hat bestellt:
        </p>
        <div className="flex flex-wrap gap-1.5">
          {itemList.map((item, idx) => (
            <span
              key={idx}
              className="px-3 py-1 bg-pink-50 text-pink-600 rounded-full text-[11px] font-bold border border-pink-100/50"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-24 bg-[#FDFCF9] overflow-hidden group relative">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-16 relative">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-amber-100/50 rounded-full blur-3xl" />
          <h2 className="text-6xl md:text-7xl font-black italic tracking-tighter text-zinc-900 uppercase relative inline-block">
            Wall
            <span className="absolute -bottom-2 md:-bottom-3 left-0 right-0 h-1.5 bg-amber-400 rounded-full" />
          </h2>
          <span className="block text-4xl md:text-5xl font-extrabold text-amber-500 italic tracking-tight mt-1 p-3">
            of Fame
          </span>
          <p className="mt-6 text-xl text-zinc-600 max-w-2xl mx-auto leading-relaxed">
            Das sagen unsere Gäste über Café Waffela. Überzeug dich selbst!
          </p>
        </div>

        <button
          onClick={scrollPrev}
          className="absolute left-4 md:-left-16 top-[60%] -translate-y-1/2 z-30 p-4 rounded-full bg-white border border-zinc-100 shadow-xl text-zinc-400 hover:text-amber-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-4 md:-right-16 top-[60%] -translate-y-1/2 z-30 p-4 rounded-full bg-white border border-zinc-100 shadow-xl text-zinc-400 hover:text-amber-500 hover:scale-110 transition-all opacity-0 group-hover:opacity-100 hidden md:flex items-center justify-center"
        >
          <ChevronRight size={32} />
        </button>

        <div
          ref={emblaRef}
          className="embla overflow-visible pb-12 -mb-12 cursor-grab active:cursor-grabbing"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
            maskImage:
              "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
          }}
        >
          <div className="flex">
            {items.map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_31%] px-4"
              >
                <div className="flex flex-col h-[600px] rounded-[3rem] bg-white border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1">
                  <div className="aspect-square w-full relative overflow-hidden bg-[#FDFCF9]">
                    {item.imageUrl ? (
                      <img
                        src={item.imageUrl}
                        alt={item.author}
                        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        style={{
                          objectPosition: item.objectPosition || "center 50%",
                        }}
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-50 border-b border-zinc-100 px-8 text-center">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-sm mb-4 overflow-hidden border-2 border-zinc-100">
                          <img
                            src="https://bq4duwnybfphnwpe.public.blob.vercel-storage.com/382973711_215203098057102_832114998054713157_n.jpg"
                            alt="Waffela Logo"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-zinc-300 font-black italic tracking-tighter text-3xl uppercase opacity-50">
                          Waffela
                        </span>
                      </div>
                    )}
                    <div className="absolute top-6 right-6 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm z-20">
                      {item.type === "instagram" ? (
                        <Instagram size={18} className="text-pink-600" />
                      ) : item.type === "google" ? (
                        <Globe size={18} className="text-blue-600" />
                      ) : (
                        <Utensils size={18} className="text-pink-500" />
                      )}
                    </div>
                  </div>

                  <div className="p-9 flex flex-col flex-grow relative">
                    <div className="h-6 mb-5 flex items-center w-full">
                      {item.type === "instagram" ? (
                        <div className="flex items-center justify-between w-full opacity-30 text-zinc-900">
                          <div className="flex gap-3">
                            <Heart size={18} />
                            <MessageCircle size={18} />
                            <Send size={18} />
                          </div>
                          <Bookmark size={18} />
                        </div>
                      ) : (
                        item.rating && (
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={14}
                                className={
                                  i < (item.rating || 0)
                                    ? "fill-amber-400 text-amber-400"
                                    : "text-zinc-200"
                                }
                              />
                            ))}
                          </div>
                        )
                      )}
                    </div>

                    <div className="flex-grow text-zinc-700 leading-relaxed italic text-[17px] relative">
                      <div className="min-h-[10rem]">
                        <p className="line-clamp-4">
                          {renderText(item.text, item.highlightedText)}
                        </p>
                        {item.text.length > 100 && (
                          <button
                            onClick={() => setSelectedReview(item)}
                            className="mt-3 text-amber-500 font-bold text-sm hover:underline block"
                          >
                            mehr anzeigen
                          </button>
                        )}
                      </div>
                      {item.type === "foodora" && (
                        <div className="absolute bottom-[-1rem] left-0 right-0">
                          {renderOrderedItems(item.orderedItems)}
                        </div>
                      )}
                    </div>

                    <div className="mt-8 pt-6 border-t border-zinc-100 flex items-center gap-4">
                      {item.avatarUrl ? (
                        <img
                          src={item.avatarUrl}
                          alt={item.author}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-400 uppercase text-sm">
                          {item.author?.[0] || "?"}
                        </div>
                      )}
                      <div className="min-w-0">
                        <p className="font-bold text-zinc-900 leading-none mb-1.5 truncate">
                          {item.type === "instagram" && item.handle
                            ? `@${item.handle}`
                            : item.author}
                        </p>
                        <p className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                          {item.type === "google" ? "Google Review" : item.type}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedReview && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReview(null)}
              className="absolute inset-0 bg-zinc-900/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-white rounded-[3rem] shadow-2xl overflow-hidden p-10 md:p-14"
            >
              <button
                onClick={() => setSelectedReview(null)}
                className="absolute top-8 right-8 p-2 rounded-full hover:bg-zinc-50 transition-colors"
              >
                <X size={24} className="text-zinc-400" />
              </button>
              <div className="mb-8">
                {selectedReview.type !== "instagram" &&
                  selectedReview.rating && (
                    <div className="flex gap-1.5 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={20}
                          className={
                            i < (selectedReview.rating || 0)
                              ? "fill-amber-400 text-amber-400"
                              : "text-zinc-200"
                          }
                        />
                      ))}
                    </div>
                  )}
                <div className="max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
                  <p className="text-zinc-700 leading-relaxed italic text-xl md:text-2xl mb-6">
                    {renderText(
                      selectedReview.text,
                      selectedReview.highlightedText,
                    )}
                  </p>
                  {selectedReview.type === "foodora" &&
                    renderOrderedItems(selectedReview.orderedItems, true)}
                </div>
              </div>
              <div className="flex items-center gap-5 pt-8 border-t border-zinc-100">
                {selectedReview.avatarUrl ? (
                  <img
                    src={selectedReview.avatarUrl}
                    alt={selectedReview.author}
                    className="w-16 h-16 rounded-full object-cover shadow-md"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-zinc-100 flex items-center justify-center font-bold text-zinc-400 uppercase text-xl">
                    {selectedReview.author?.[0] || "?"}
                  </div>
                )}
                <div>
                  <p className="font-bold text-zinc-900 text-xl mb-1">
                    {selectedReview.type === "instagram" &&
                    selectedReview.handle
                      ? `@${selectedReview.handle}`
                      : selectedReview.author}
                  </p>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
                    {selectedReview.type === "google"
                      ? "Google Review"
                      : selectedReview.type}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e4e4e7;
          border-radius: 10px;
        }
      `}</style>
    </section>
  );
}
