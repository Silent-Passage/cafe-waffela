import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const wallOfFameTable = pgTable("wall_of_fame", {
  id: serial("id").primaryKey(),
  type: text("type").notNull().default("google"),
  author: text("author").notNull(),
  text: text("text").notNull(),
  rating: integer("rating").notNull().default(5),
  imageUrl: text("image_url"),
  avatar: text("avatar").default("G"),
  date: text("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertWallOfFameSchema = createInsertSchema(wallOfFameTable).omit({
  id: true,
  createdAt: true,
});
export type WallOfFameItem = typeof wallOfFameTable.$inferSelect;
export type InsertWallOfFame = z.infer<typeof insertWallOfFameSchema>;
