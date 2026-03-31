import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
});

export async function generateSEOContent(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const message = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    messages: [{ role: "user", content: userPrompt }],
    system: systemPrompt,
  });

  const block = message.content[0];
  if (block.type === "text") {
    return block.text;
  }

  throw new Error("Unexpected response format from Claude");
}
