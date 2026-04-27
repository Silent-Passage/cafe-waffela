import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { menuItemsTable, insertMenuItemSchema } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  const parsed = insertMenuItemSchema.parse(body);
  const [updated] = await db.update(menuItemsTable).set(parsed).where(eq(menuItemsTable.id, Number(id))).returning();
  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(updated);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await db.delete(menuItemsTable).where(eq(menuItemsTable.id, Number(id)));
  return new NextResponse(null, { status: 204 });
}
