"use client";

import { motion } from "framer-motion";

interface HeroProps {
  tagline?: string | null;
  googleMapsUrl?: string | null;
}

export function Hero({ tagline, googleMapsUrl }: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, #2C1A0E 0%, #5C3317 30%, #8B4513 60%, #C8860A 100%)",
        }}
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
            Welcome to Lustenau's Sweetest Corner
          </span>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-6 drop-shadow-lg">
            Cafe{" "}
            <span className="italic text-primary drop-shadow-none">
              Waffela
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-white/90 font-light tracking-wide max-w-2xl mx-auto mb-10 drop-shadow-md">
            {tagline ?? "Hausgemachte Waffeln. Herz. Heimat."}
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.4,
              duration: 0.8,
              ease: "easeOut",
              staggerChildren: 0.2,
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("menu")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-primary text-foreground font-bold text-lg shadow-[0_0_40px_-10px_rgba(245,166,35,0.8)] transition-all duration-300"
            >
              Explore Menu
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={
                googleMapsUrl ??
                "http://googleusercontent.com/maps.google.com/4"
              }
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              Get Directions
            </motion.a>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() =>
                document
                  .getElementById("order-online")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center"
            >
              Online Bestellen 🛵
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block w-[calc(100%+1.3px)] h-[50px] md:h-[100px] fill-background"
        >
          <path d="M0,95.8 C150,130 300,50 450,45 C600,40 750,90 900,90 C1050,90 1200,60 1200,60 V120 H0 V95.8 Z" />
        </svg>
      </div>
    </section>
  );
}
