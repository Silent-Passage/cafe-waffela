import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { openingHoursTable, insertOpeningHourSchema } from "@/lib/db/schema";
import { asc } from "drizzle-orm";
import { z } from "zod";

export async function GET() {
  const rows = await db.select().from(openingHoursTable).orderBy(asc(openingHoursTable.id));
  return NextResponse.json(rows);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const schema = z.array(insertOpeningHourSchema.extend({ id: z.number().optional() }));
  const rows = schema.parse(body);

  await db.delete(openingHoursTable);
  const inserted = await db.insert(openingHoursTable).values(rows.map(({ id: _, ...r }) => r)).returning();
  return NextResponse.json(inserted);
}
