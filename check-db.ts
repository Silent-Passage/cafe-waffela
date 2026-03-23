import { db } from "./src/lib/db/index.js";
import { siteSettingsTable } from "./src/lib/db/schema/siteSettings.js";
import 'dotenv/config';

async function main() {
  const rows = await db.select().from(siteSettingsTable);
  console.log("ALL SETTINGS ROWS:", rows);
  process.exit(0);
}
main();
