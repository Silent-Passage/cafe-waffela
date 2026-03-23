import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const siteSettingsTable = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  heroTagline: text("hero_tagline").notNull().default("Hausgemachte Waffeln. Herz. Heimat."),
  address: text("address").notNull().default("Lustenau, Vorarlberg, Austria"),
  phone: text("phone").notNull().default("+43 660 000 0000"),
  whatsappNumber: text("whatsapp_number").notNull().default("+436600000000"),
  googleMapsUrl: text("google_maps_url").notNull().default("https://maps.google.com/?q=Cafe+Waffela+Lustenau"),
  foodoraUrl: text("foodora_url").notNull().default("https://www.foodora.at/restaurant/waffela"),
  lieferandoUrl: text("lieferando_url").notNull().default("https://www.lieferando.at/speisekarte/cafe-waffela"),
  instagramHandle: text("instagram_handle").notNull().default("@waffela_lustenau"),
  googleReviewUrl: text("google_review_url").notNull().default("https://g.page/r/CafeWaffela/review"),
});

export const insertSiteSettingsSchema = createInsertSchema(siteSettingsTable).omit({ id: true });
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettingsTable.$inferSelect;
