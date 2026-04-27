#!/usr/bin/env node
require("dotenv").config({ path: ".env.local" });
require("dotenv").config();

const postgres = require("postgres");
const fs = require("fs");
const path = require("path");

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error("ERROR: DATABASE_URL not set");
  process.exit(1);
}

console.log("Connecting to database...");
const isNeon = DATABASE_URL.includes("neon.tech");
const sql = postgres(DATABASE_URL, {
  connect_timeout: 30,
  idle_timeout: 60,
  max_lifetime: 120,
  ...(isNeon && { ssl: "require" }),
});

async function runMigrations() {
  try {
    // Test connection first
    console.log("Testing database connection...");
    await sql`SELECT 1`;
    console.log("✓ Connected successfully!\n");
    const migrationsDir = path.join(__dirname, "../drizzle");
    const files = fs
      .readdirSync(migrationsDir)
      .filter((f) => f.endsWith(".sql"))
      .sort();

    console.log(`Found ${files.length} migration files`);

    for (const file of files) {
      const filePath = path.join(migrationsDir, file);
      const sqlContent = fs.readFileSync(filePath, "utf-8");

      console.log(`\nExecuting migration: ${file}`);

      // Split by statement-breakpoint
      const statements = sqlContent
        .split("--> statement-breakpoint")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      for (const statement of statements) {
        try {
          await sql.unsafe(statement);
          console.log("  ✓ Statement executed");
        } catch (err) {
          // Ignore errors about already existing tables
          if (!err.message.includes("already exists")) {
            throw err;
          }
          console.log("  ✓ Table already exists (skipped)");
        }
      }
    }

    console.log("\n✓ All migrations completed successfully!");
  } catch (error) {
    console.error("ERROR during migration:", error.message);
    console.error("Full error:", error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

runMigrations();
