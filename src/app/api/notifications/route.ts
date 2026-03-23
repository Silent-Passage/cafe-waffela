import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notificationsTable, insertNotificationSchema } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET() {
  const rows = await db.select().from(notificationsTable).orderBy(desc(notificationsTable.createdAt));
  return NextResponse.json(rows);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const parsed = insertNotificationSchema.parse(body);
  const [created] = await db.insert(notificationsTable).values(parsed).returning();
  return NextResponse.json(created, { status: 201 });
}
