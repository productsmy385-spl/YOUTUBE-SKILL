import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { characters, characterReferences } from "@/lib/db/schema";
import { desc } from "drizzle-orm";

export async function GET(req: NextRequest) {
  try {
    const db = getDb();
    if (!db) {
      return NextResponse.json({ characters: [] });
    }

    const rows = await db
      .select()
      .from(characters)
      .orderBy(desc(characters.createdAt))
      .limit(50);

    return NextResponse.json({ characters: rows || [] });
  } catch (err: unknown) {
    console.warn("Characters query failed:", err);
    return NextResponse.json({ characters: [] });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      gender = "Male",
      ageRange = "25-30 years",
      ethnicityStyle = "Telugu / South Asian",
      clothingDescription = "",
      facialFeatures = "",
      isConsentVerified = true,
      role = "Lead Character",
      voice = "Male Natural Conversational (te-IN)",
    } = body;

    if (!name) {
      return NextResponse.json({ error: "Character name is required" }, { status: 400 });
    }

    const defaultWorkspaceId = "00000000-0000-0000-0000-000000000001";
    const db = getDb();

    if (db) {
      try {
        const [inserted] = await db
          .insert(characters)
          .values({
            workspaceId: defaultWorkspaceId,
            name,
            gender,
            ageRange,
            ethnicityStyle,
            clothingDescription,
            facialFeatures,
            isConsentVerified,
          })
          .returning();

        return NextResponse.json({ success: true, character: inserted });
      } catch (dbErr) {
        console.warn("DB character insert fell back:", dbErr);
      }
    }

    const localChar = {
      id: "char-" + Math.random().toString(36).substring(2, 9),
      name,
      role,
      age: ageRange,
      appearance: facialFeatures || ethnicityStyle,
      clothing: clothingDescription,
      voice,
      scenesCount: 0,
      consentVerified: isConsentVerified,
    };

    return NextResponse.json({ success: true, character: localChar });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create character";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
