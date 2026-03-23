"use client";

import { motion } from "framer-motion";

interface OrderOnlineProps {
  foodoraUrl?: string | null;
  lieferandoUrl?: string | null;
}

export function OrderOnline({ foodoraUrl, lieferandoUrl }: OrderOnlineProps) {
  return (
    <section id="order-online" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-100 via-orange-100 to-amber-200 z-0" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-display mb-4">
            Hunger? Wir liefern! 🛵
          </h2>
          <p className="text-lg md:text-xl text-foreground/80 mb-10 max-w-2xl mx-auto">
            Bestelle jetzt bequem online über deine Lieblingsplattform
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <a
              href={foodoraUrl ?? "https://www.foodora.at"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 rounded-2xl text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
              style={{ backgroundColor: "#D70F64", boxShadow: "0 20px 40px -10px rgba(215,15,100,0.4)" }}
            >
              <span className="text-2xl">🍕</span>
              Bestellen auf foodora
            </a>

            <a
              href={lieferandoUrl ?? "https://www.lieferando.at"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-5 rounded-2xl text-white font-bold text-lg hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl flex items-center justify-center gap-3"
              style={{ backgroundColor: "#FF8000", boxShadow: "0 20px 40px -10px rgba(255,128,0,0.4)" }}
            >
              <span className="text-2xl">🛵</span>
              Bestellen auf Lieferando
            </a>
          </div>

          <p className="text-foreground/70 font-medium">Abholung auch direkt bei uns möglich!</p>
        </motion.div>
      </div>
    </section>
  );
}
