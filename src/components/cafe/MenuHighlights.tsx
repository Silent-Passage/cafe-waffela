"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MENU_ITEMS = [
  {
    id: 1,
    title: "Classic Waffel",
    description: "Our signature golden waffle, crispy on the outside, perfectly fluffy inside. Dusted with powdered snow.",
    gradient: "from-amber-100 to-amber-200",
    emoji: "🧇",
  },
  {
    id: 2,
    title: "Bananensplit Traum",
    description: "Caramelized bananas, rich chocolate drizzle, and a mountain of fresh whipped cream. Pure decadence.",
    gradient: "from-yellow-100 to-orange-200",
    emoji: "🍌",
  },
  {
    id: 3,
    title: "Chicken Curry Bagel",
    description: "Savory meets perfectly baked. A fresh bagel loaded with our homemade chicken curry spread and crisp greens.",
    gradient: "from-orange-50 to-amber-100",
    emoji: "🥯",
  },
];

export function MenuHighlights() {
  return (
    <section id="menu" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <span className="text-primary font-bold tracking-wider uppercase text-sm mb-2 block">
              Menu Highlights
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground font-display">
              Unsere <span className="italic text-primary">Stars</span>
            </h2>
          </div>
          <button className="group flex items-center gap-2 text-foreground font-semibold hover:text-primary transition-colors">
            View Full Menu
            <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MENU_ITEMS.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div
                className={`relative aspect-square rounded-3xl overflow-hidden mb-6 shadow-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
              >
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-500 z-10" />
                <span className="text-8xl transform group-hover:scale-110 transition-transform duration-500 z-20 drop-shadow-sm">
                  {item.emoji}
                </span>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3 font-display group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
