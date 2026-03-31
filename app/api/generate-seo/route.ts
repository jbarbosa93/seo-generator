import { NextRequest, NextResponse } from "next/server";
import { generateSEOContent } from "@/lib/anthropic";
import { getSystemPrompt, getUserPrompt } from "@/lib/prompts";
import type { GenerateSEORequest, GenerateSEOResponse } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const body: GenerateSEORequest = await request.json();

    if (!body.keyword || !body.language || !body.contentType) {
      return NextResponse.json(
        { message: "Mot-clé, langue et type de contenu sont requis" },
        { status: 400 }
      );
    }

    const systemPrompt = getSystemPrompt(body.language);
    const userPrompt = getUserPrompt(
      body.keyword,
      body.contentType,
      body.tone,
      body.wordCount,
      body.url
    );

    const rawResponse = await generateSEOContent(systemPrompt, userPrompt);

    let result: GenerateSEOResponse;
    try {
      result = JSON.parse(rawResponse);
    } catch {
      return NextResponse.json(
        { message: "Erreur de parsing de la réponse IA" },
        { status: 500 }
      );
    }

    // TODO: Save to Supabase
    // TODO: Decrement user credits

    return NextResponse.json(result);
  } catch (error) {
    console.error("SEO generation error:", error);
    return NextResponse.json(
      { message: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
