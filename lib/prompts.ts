import type { ContentType } from "@/types";

export function getSystemPrompt(language: string): string {
  return `Tu es un expert SEO de classe mondiale. Tu génères du contenu optimisé pour le référencement naturel.
Tu dois toujours répondre en ${language}.
Tu fournis des résultats au format JSON strict, sans markdown, sans commentaires.

Le JSON doit avoir cette structure exacte :
{
  "title": "string (max 60 caractères)",
  "metaDescription": "string (max 160 caractères)",
  "headings": ["H2 heading 1", "H2 heading 2", ...],
  "keywords": ["keyword1", "keyword2", ...],
  "content": "string (contenu HTML structuré avec h2, p, ul, li)",
  "seoScore": number (0-100)
}`;
}

export function getUserPrompt(
  keyword: string,
  contentType: ContentType,
  tone: string = "professionnel",
  wordCount: number = 1500,
  url?: string
): string {
  const contentTypeLabels: Record<ContentType, string> = {
    blog_post: "article de blog",
    product_page: "page produit",
    landing_page: "landing page",
    category_page: "page catégorie",
    homepage: "page d'accueil",
  };

  let prompt = `Génère du contenu SEO optimisé pour le mot-clé principal : "${keyword}"

Type de contenu : ${contentTypeLabels[contentType]}
Ton : ${tone}
Nombre de mots cible : ${wordCount}`;

  if (url) {
    prompt += `\nURL de la page : ${url}`;
  }

  prompt += `

Exigences :
- Le titre doit contenir le mot-clé principal et faire max 60 caractères
- La meta description doit être engageante et faire max 160 caractères
- Inclus au moins 5 headings H2 pertinents
- Fournis 10-15 mots-clés secondaires liés
- Le contenu doit être unique, informatif et bien structuré en HTML
- Calcule un score SEO réaliste basé sur l'optimisation du contenu

Réponds UNIQUEMENT avec le JSON, rien d'autre.`;

  return prompt;
}
