import { db } from "@/lib/db";
import {
  menuItemsTable,
  notificationsTable,
  siteSettingsTable,
  openingHoursTable,
} from "@/lib/db/schema";

export async function getCafeData() {
  const [menu, notifications, settings, hours] = await Promise.all([
    db.select().from(menuItemsTable),
    db.select().from(notificationsTable),
    db.select().from(siteSettingsTable).limit(1),
    db.select().from(openingHoursTable),
  ]);

  return {
    menu,
    notifications,
    settings: settings[0] || null,
    hours,
  };
}
