import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle(sql, { schema });

export async function getSiteSettings() {
  const result = await db.select().from(schema.siteSettingsTable).limit(1);
  return result[0] || null;
}

export async function getMenuItems() {
  return await db
    .select()
    .from(schema.menuItemsTable)
    .orderBy(schema.menuItemsTable.sortOrder);
}

export async function getOpeningHours() {
  return await db.select().from(schema.openingHoursTable);
}
