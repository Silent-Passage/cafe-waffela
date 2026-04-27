import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const wallOfFameTable = pgTable("wall_of_fame", {
  id: serial("id").primaryKey(),
  type: text("type").$type<"instagram" | "google" | "foodora">().notNull(),
  author: text("author").notNull(),
  handle: text("handle"),
  text: text("text").notNull(),
  rating: integer("rating"),
  imageUrl: text("image_url"),
  avatarUrl: text("avatar_url"),
  orderedItems: text("ordered_items"),
  objectPosition: text("object_position").default("center"),
  highlightedText: text("highlighted_text"),
});

export const insertWallOfFameSchema = createInsertSchema(wallOfFameTable)
  .extend({
    googleReviewUrl: z.string().optional(),
  })
  .omit({
    id: true,
  });

export type WallOfFameItem = typeof wallOfFameTable.$inferSelect & {
  googleReviewUrl?: string;
};
