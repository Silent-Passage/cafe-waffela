"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Utensils } from "lucide-react";

interface Notification {
  id: number;
  type: string;
  message: string;
}

export function SocialProofToast() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    fetch("/api/social-notifications")
      .then((r) => r.json())
      .then((data) => setNotifications(data))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!notifications || notifications.length === 0) return;

    const show = () => {
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((prev) => (prev + 1) % notifications.length);
        }, 500);
      }, 5000);
    };

    const initial = setTimeout(show, 3000);
    const cycle = setInterval(show, 12000);
    return () => { clearTimeout(initial); clearInterval(cycle); };
  }, [notifications]);

  if (!notifications || notifications.length === 0) return null;
  const current = notifications[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto flex max-w-sm items-start gap-4 rounded-2xl bg-white/90 p-4 shadow-2xl backdrop-blur-md border border-white/50"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
              {current.type === "review" ? (
                <Star className="h-5 w-5 fill-primary" />
              ) : (
                <Utensils className="h-5 w-5" />
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-foreground leading-snug">{current.message}</p>
              <p className="mt-1 text-xs text-muted-foreground">Just now • Lustenau</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
