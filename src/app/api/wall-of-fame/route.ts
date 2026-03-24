import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { wallOfFameTable } from "@/lib/db/schema/walloffame";
import { eq, desc } from "drizzle-orm";

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
    const inserted = await db.insert(wallOfFameTable).values(body).returning();
    return NextResponse.json(inserted[0]);
  } catch (error) {
    return NextResponse.json(
      { error: "Fehler beim Speichern" },
      { status: 500 },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id)
    return NextResponse.json({ error: "Keine ID angegeben" }, { status: 400 });

  await db.delete(wallOfFameTable).where(eq(wallOfFameTable.id, parseInt(id)));
  return NextResponse.json({ success: true });
}
