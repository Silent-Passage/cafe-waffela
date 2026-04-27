import { pgTable, serial, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const siteSettingsTable = pgTable("site_settings", {
  id: serial("id").primaryKey(),
  heroTagline: text("hero_tagline").notNull(),
  address: text("address").notNull(),
  phone: text("phone").notNull(),
  whatsappNumber: text("whatsapp_number").notNull(),
  googleMapsUrl: text("google_maps_url").notNull(),
  foodoraUrl: text("foodora_url").notNull(),
  lieferandoUrl: text("lieferando_url").notNull(),
  instagramHandle: text("instagram_handle").notNull(),
  googleReviewUrl: text("google_review_url").notNull(),

  facebookUrl: text("facebook_url"),
  tiktokUrl: text("tiktok_url"),
  contactEmail: text("contact_email"),
  googleMapsEmbedUrl: text("google_maps_embed_url"),
});

export const insertSiteSettingsSchema = createInsertSchema(
  siteSettingsTable,
).omit({ id: true });
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type SiteSettings = typeof siteSettingsTable.$inferSelect;
