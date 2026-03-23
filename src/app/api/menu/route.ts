import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { menuItemsTable, insertMenuItemSchema } from "@/lib/db/schema";
import { asc } from "drizzle-orm";

export async function GET() {
  const items = await db.select().from(menuItemsTable).orderBy(asc(menuItemsTable.sortOrder));
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = insertMenuItemSchema.parse(body);
  const [created] = await db.insert(menuItemsTable).values(parsed).returning();
  return NextResponse.json(created, { status: 201 });
}
