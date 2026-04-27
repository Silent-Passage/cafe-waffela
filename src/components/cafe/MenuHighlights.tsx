"use client";

import { motion } from "framer-motion";
import { MenuItem } from "@/lib/db/schema/menuItems";

interface MenuHighlightsProps {
  items: MenuItem[];
}

export function MenuHighlights({ items }: MenuHighlightsProps) {
  const availableItems = items.filter((item) => item.available);

  if (availableItems.length === 0) {
    return null;
  }

  return (
    <section id="menu" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold font-display text-foreground mb-4">
            Unsere Highlights
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Entdecken Sie unsere beliebtesten Kreationen – frisch, hausgemacht
            und unwiderstehlich
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {availableItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border border-border"
            >
              <div className="text-6xl mb-4 text-center">{item.emoji}</div>
              <h3 className="text-xl font-bold text-foreground mb-2 text-center">
                {item.title}
              </h3>
              <p className="text-muted-foreground text-center leading-relaxed">
                {item.description}
              </p>
              <div className="mt-4 text-center">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  {item.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
