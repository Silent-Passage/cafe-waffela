import { put } from "@vercel/blob";
import { NextResponse } from "next/server";
import { auth } from "../../../auth";

export async function POST(request: Request): Promise<NextResponse> {
  // 1. Session prüfen
  const session = await auth();

  if (!session) {
    return NextResponse.json({ error: "Nicht autorisiert" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const filename = searchParams.get("filename");

  if (!filename || !request.body) {
    return NextResponse.json({ error: "No file or filename" }, { status: 400 });
  }
  try {
    const blob = await put(filename, request.body, {
      access: "public",
      addRandomSuffix: true,
    });

    return NextResponse.json(blob);
  } catch (error) {
    return NextResponse.json(
      { error: "Upload fehlgeschlagen" },
      { status: 500 },
    );
  }
}
