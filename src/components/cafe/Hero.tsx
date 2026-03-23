"use client";

import { motion } from "framer-motion";

interface HeroProps {
  tagline?: string | null;
  googleMapsUrl?: string | null;
}

export function Hero({ tagline, googleMapsUrl }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 z-0"
        style={{ background: "linear-gradient(135deg, #2C1A0E 0%, #5C3317 30%, #8B4513 60%, #C8860A 100%)" }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="inline-block py-1 px-4 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-white font-medium tracking-wide text-sm mb-6 shadow-xl">
            Welcome to Lustenau&apos;s Sweetest Corner
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6 drop-shadow-lg">
            Cafe <span className="italic text-primary drop-shadow-none">Waffela</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide max-w-2xl mx-auto mb-10 drop-shadow-md">
            {tagline ?? "Hausgemachte Waffeln. Herz. Heimat."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-foreground font-bold text-lg shadow-[0_0_40px_-10px_rgba(245,166,35,0.8)] hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Explore Menu
            </button>

            <a
              href={googleMapsUrl ?? "https://maps.google.com/?q=Cafe+Waffela+Lustenau"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              Get Directions
            </a>

            <button
              onClick={() => document.getElementById("order-online")?.scrollIntoView({ behavior: "smooth" })}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center"
            >
              Online Bestellen 🛵
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px] fill-background"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.83,120.22,192.39,109.11,236.43,98.92,279.79,79.5,321.39,56.44Z" />
        </svg>
      </div>
    </section>
  );
}
