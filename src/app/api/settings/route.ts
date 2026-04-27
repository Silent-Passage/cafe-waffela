import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { siteSettingsTable, insertSiteSettingsSchema } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

export async function GET() {
  const [settings] = await db.select().from(siteSettingsTable).limit(1);
  if (!settings) {
    const [created] = await db
      .insert(siteSettingsTable)
      .values({
        heroTagline: "Willkommen",
        address: "",
        phone: "",
        whatsappNumber: "",
        googleMapsUrl: "",
        foodoraUrl: "",
        lieferandoUrl: "",
        instagramHandle: "",
        googleReviewUrl: "",
      })
      .returning();
    return NextResponse.json(created);
  }
  return NextResponse.json(settings);
}

export async function PUT(req: NextRequest) {
  const body = await req.json();
  const parsed = insertSiteSettingsSchema.parse(body);
  const [existing] = await db.select().from(siteSettingsTable).limit(1);
  if (existing) {
    const [updated] = await db
      .update(siteSettingsTable)
      .set(parsed)
      .returning();
    revalidatePath("/");
    return NextResponse.json(updated);
  } else {
    const [created] = await db
      .insert(siteSettingsTable)
      .values(parsed)
      .returning();
    revalidatePath("/");
    return NextResponse.json(created);
  }
}
