"use client";

import { motion } from "framer-motion";
import { SiteSettings } from "@/lib/db/schema/siteSettings";

interface OrderOnlineProps {
  settings: SiteSettings | null;
}

export function OrderOnline({ settings }: OrderOnlineProps) {
  return (
    <section id="order-online" className="py-24 bg-[#FFF9E5]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl font-bold font-display mb-4 text-[#2D1B0D]">
            Hunger? Wir liefern! 🛵
          </h2>
          <p className="text-xl text-[#2D1B0D]/80 mb-12">
            Bestelle jetzt bequem online über deine Lieblingsplattform
          </p>
        </motion.div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <motion.a
            href={
              settings?.foodoraUrl ||
              "https://www.foodora.at/restaurant/gc49/cafe-waffela"
            }
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-[#D70F64] text-white font-bold text-xl shadow-xl transition-shadow hover:shadow-2xl"
          >
            🍕 Bestellen auf foodora
          </motion.a>

          <motion.a
            href={
              settings?.lieferandoUrl ||
              "https://www.lieferando.at/en/menu/cafe-waffela"
            }
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-10 py-5 rounded-[2rem] bg-[#FF8000] text-white font-bold text-xl shadow-xl transition-shadow hover:shadow-2xl"
          >
            🛵 Bestellen auf Lieferando
          </motion.a>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-[#2D1B0D]/60 font-medium"
        >
          Abholung auch direkt bei uns möglich!
        </motion.p>
      </div>
    </section>
  );
}
