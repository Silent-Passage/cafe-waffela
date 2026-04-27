import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { wallOfFameTable } from "@/lib/db/schema/walloffame";
import { eq, desc } from "drizzle-orm";
import { del } from "@vercel/blob";

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(wallOfFameTable)
      .orderBy(desc(wallOfFameTable.id));
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "Fehler beim Laden" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const inserted = await db
      .insert(wallOfFameTable)
      .values({
        type: body.type,
        author: body.author,
        handle: body.handle,
        text: body.text,
        highlightedText: body.highlightedText, // Neu
        rating: body.rating,
        imageUrl: body.imageUrl,
        avatarUrl: body.avatarUrl,
        orderedItems: body.orderedItems,
        objectPosition: body.objectPosition,
      })
      .returning();
    return NextResponse.json(inserted[0]);
  } catch (error) {
    return NextResponse.json({ error: "DB Fehler" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, ...updateData } = body;
    const updated = await db
      .update(wallOfFameTable)
      .set(updateData)
      .where(eq(wallOfFameTable.id, parseInt(id)))
      .returning();
    return NextResponse.json(updated[0]);
  } catch (error) {
    return NextResponse.json({ error: "Update Fehler" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID fehlt" }, { status: 400 });
  try {
    const item = await db
      .select()
      .from(wallOfFameTable)
      .where(eq(wallOfFameTable.id, parseInt(id)))
      .then((res) => res[0]);
    if (item) {
      const blobs = [item.imageUrl, item.avatarUrl].filter((url) =>
        url?.includes("vercel-storage.com"),
      );
      await Promise.all(blobs.map((url) => del(url!)));
    }
    await db
      .delete(wallOfFameTable)
      .where(eq(wallOfFameTable.id, parseInt(id)));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete Fehler" }, { status: 500 });
  }
}
