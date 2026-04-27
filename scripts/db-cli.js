#!/usr/bin/env node
require("dotenv").config({ path: ".env" });

// Now run drizzle-kit
const { execSync } = require("child_process");
const args = process.argv.slice(2);
const command = `npx drizzle-kit ${args.join(" ")}`;

console.log(`Running: ${command}`);
console.log(`DATABASE_URL: ${process.env.DATABASE_URL?.substring(0, 50)}...`);

try {
  execSync(command, { stdio: "inherit", env: process.env });
  process.exit(0);
} catch (error) {
  process.exit(1);
}
