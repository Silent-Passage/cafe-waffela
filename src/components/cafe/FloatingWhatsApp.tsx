"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

interface FloatingWhatsAppProps {
  whatsappNumber?: string | null;
}

export function FloatingWhatsApp({ whatsappNumber }: FloatingWhatsAppProps) {
  const number = (whatsappNumber ?? "436600000000").replace(/[^0-9]/g, "");
  const message = encodeURIComponent("Hallo! Ich hätte eine Frage...");
  const url = `https://wa.me/${number}?text=${message}`;

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full text-white shadow-xl"
      style={{ backgroundColor: "#25D366" }}
      aria-label="Chat on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 200, damping: 20 }}
      whileHover={{ y: -5, backgroundColor: "#1ebe5d" }}
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute right-0 top-0 flex h-4 w-4">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-4 w-4 rounded-full bg-white border-2 border-[#25D366]" />
      </span>
    </motion.a>
  );
}
