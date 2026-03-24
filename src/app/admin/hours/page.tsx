"use client";

import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PageHeader } from "@/components/admin/PageHeader";
import { Loader2, Save } from "lucide-react";

interface OpeningHour {
  id?: number;
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

const DEFAULT_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function HoursPage() {
  const queryClient = useQueryClient();
  const { data: initial, isLoading } = useQuery<OpeningHour[]>({
    queryKey: ["hours"],
    queryFn: () => fetch("/api/hours").then((r) => r.json()),
  });

  const [hours, setHours] = useState<OpeningHour[]>([]);

  useEffect(() => {
    if (initial && initial.length > 0) {
      setHours(initial);
    } else {
      setHours(
        DEFAULT_DAYS.map((day) => ({
          day,
          open: "09:00",
          close: "18:00",
          closed: day === "Tuesday",
        })),
      );
    }
  }, [initial]);

  const save = useMutation({
    mutationFn: (data: OpeningHour[]) =>
      fetch("/api/hours", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["hours"] }),
  });

  const update = (index: number, field: keyof OpeningHour, value: unknown) => {
    const next = [...hours];
    next[index] = { ...next[index], [field]: value };
    setHours(next);
  };

  return (
    <div>
      <PageHeader
        title="Öffnungszeiten"
        description="Manage your store's open and close times."
      />

      {isLoading ? (
        <div className="flex justify-center p-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="bg-card rounded-2xl shadow-sm border border-border overflow-hidden max-w-3xl">
          {hours.map((item, i) => (
            <div
              key={item.day}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border-b border-border hover:bg-secondary/20 transition-colors gap-4 last:border-0"
            >
              <div className="w-32 font-bold text-foreground">{item.day}</div>
              <div className="flex items-center gap-4 flex-1">
                <div className="flex items-center gap-2">
                  <input
                    aria-label={`Öffnungszeit ${item.day}`}
                    type="time"
                    value={item.open}
                    disabled={item.closed}
                    onChange={(e) => update(i, "open", e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-40"
                  />
                  <span className="text-muted-foreground">–</span>
                  <input
                    aria-label={`Schließzeit ${item.day}`}
                    type="time"
                    value={item.close}
                    disabled={item.closed}
                    onChange={(e) => update(i, "close", e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-40"
                  />
                </div>
                <label className="flex items-center gap-2 ml-auto cursor-pointer">
                  <input
                    type="checkbox"
                    checked={item.closed}
                    onChange={(e) => update(i, "closed", e.target.checked)}
                    className="w-4 h-4 rounded"
                  />
                  <span
                    className={`text-sm font-medium ${item.closed ? "text-red-500" : "text-muted-foreground"}`}
                  >
                    Geschlossen
                  </span>
                </label>
              </div>
            </div>
          ))}
          <div className="p-6 bg-secondary/30 flex justify-end">
            <button
              onClick={() => save.mutate(hours)}
              disabled={save.isPending}
              className="px-8 py-3 text-sm font-bold text-primary-foreground bg-primary rounded-xl shadow-md hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:transform-none flex items-center gap-2"
            >
              {save.isPending ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Speichern
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
