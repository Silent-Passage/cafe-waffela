import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notificationsTable } from "@/lib/db/schema";

export async function GET() {
  try {
    const rows = await db.select().from(notificationsTable).orderBy(notificationsTable.id);
    return NextResponse.json(rows);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
