import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import {
  menuItemsTable,
  siteSettingsTable,
  openingHoursTable,
  notificationsTable,
} from "../src/lib/db/schema";

const client = postgres(process.env.DATABASE_URL!);
const db = drizzle(client);

async function main() {
  console.log("🌱 Seeding database...");

  await db.delete(notificationsTable);
  await db.delete(openingHoursTable);
  await db.delete(siteSettingsTable);
  await db.delete(menuItemsTable);

  await db.insert(menuItemsTable).values([
    {
      title: "Classic Waffel",
      description:
        "Our signature golden waffle, crispy on the outside, perfectly fluffy inside. Dusted with powdered sugar.",
      emoji: "🧇",
      category: "Süß",
      available: true,
      sortOrder: 1,
    },
    {
      title: "Bananensplit Traum",
      description:
        "Caramelized bananas, rich chocolate drizzle, and a mountain of fresh whipped cream.",
      emoji: "🍌",
      category: "Süß",
      available: true,
      sortOrder: 2,
    },
    {
      title: "Chicken Curry Bagel",
      description:
        "A fresh bagel loaded with our homemade chicken curry spread and crisp greens.",
      emoji: "🥯",
      category: "Herzhaft",
      available: true,
      sortOrder: 3,
    },
    {
      title: "Latte Macchiato",
      description:
        "Creamy, rich espresso layered with steamed milk. The perfect companion to any waffle.",
      emoji: "☕",
      category: "Getränke",
      available: true,
      sortOrder: 4,
    },
  ]);

  await db.insert(siteSettingsTable).values({
    heroTagline: "Hausgemachte Waffeln. Herz. Heimat.",
    address: "Maria-Theresien-Straße 12\n6890 Lustenau, Austria",
    phone: "+43 660 000 0000",
    whatsappNumber: "436603228658",
    googleMapsUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43141.52766026939!2d9.620025178652037!3d47.43389088691522!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x479b09bc5a3d02b5%3A0xc3247c706e2eec02!2s6890%20Lustenau%2C%20Austria!5e0!3m2!1sen!2sus!4v1709841234567!5m2!1sen!2sus",
    foodoraUrl: "https://www.foodora.at/restaurant/waffela",
    lieferandoUrl: "https://www.lieferando.at/speisekarte/cafe-waffela",
    instagramHandle: "@waffela_lustenau",
    googleReviewUrl: "https://g.page/r/CafeWaffela/review",
  });

  await db.insert(openingHoursTable).values([
    { day: "Monday", open: "09:00", close: "18:00", closed: false },
    { day: "Tuesday", open: "09:00", close: "18:00", closed: true },
    { day: "Wednesday", open: "09:00", close: "18:00", closed: false },
    { day: "Thursday", open: "09:00", close: "18:00", closed: false },
    { day: "Friday", open: "09:00", close: "18:00", closed: false },
    { day: "Saturday", open: "09:00", close: "18:00", closed: false },
    { day: "Sunday", open: "09:00", close: "18:00", closed: false },
  ]);

  await db.insert(notificationsTable).values([
    {
      type: "order",
      message: "🧇 Jemand hat gerade die Classic Waffel bestellt!",
    },
    {
      type: "order",
      message: "🍌 Jemand hat gerade den Bananensplit Traum bestellt!",
    },
    {
      type: "review",
      message: "⭐ Maria S. hat uns 5 Sterne gegeben – Danke!",
    },
    {
      type: "order",
      message: "🛵 Eine neue Bestellung ist gerade eingegangen!",
    },
    { type: "review", message: "❤️ Thomas K. schwärmt von unseren Waffeln!" },
    {
      type: "order",
      message: "☕ Jemand genießt gerade einen Latte Macchiato bei uns!",
    },
    {
      type: "review",
      message: "🌟 Anna B. nennt es 'Das beste Café in Lustenau'!",
    },
  ]);

  console.log("✅ Database seeded successfully!");
  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
