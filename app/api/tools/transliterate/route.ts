import { NextResponse } from "next/server";
import { TeluguTransliterationService, TeluguDialect } from "@/lib/services/telugu-transliteration";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text, dialect = "standard" } = body;

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text string" }, { status: 400 });
    }

    const transliterated = TeluguTransliterationService.transliterate(text);
    const adapted = TeluguTransliterationService.adaptToDialect(transliterated, dialect as TeluguDialect);

    return NextResponse.json({
      original: text,
      transliterated,
      adapted,
      dialect,
    });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to transliterate" },
      { status: 500 }
    );
  }
}

