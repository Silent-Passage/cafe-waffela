import { pgTable, serial, text, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const openingHoursTable = pgTable("opening_hours", {
  id: serial("id").primaryKey(),
  day: text("day").notNull(),
  open: text("open").notNull().default("09:00"),
  close: text("close").notNull().default("18:00"),
  closed: boolean("closed").notNull().default(false),
});

export const insertOpeningHourSchema = createInsertSchema(openingHoursTable).omit({ id: true });
export type InsertOpeningHour = z.infer<typeof insertOpeningHourSchema>;
export type OpeningHour = typeof openingHoursTable.$inferSelect;
