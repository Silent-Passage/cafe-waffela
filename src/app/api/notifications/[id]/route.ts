import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { notificationsTable } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(notificationsTable).where(eq(notificationsTable.id, Number(id)));
  return new NextResponse(null, { status: 204 });
}
