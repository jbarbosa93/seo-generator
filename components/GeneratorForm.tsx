"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import type { ContentType, GenerateSEOResponse } from "@/types";

interface GeneratorFormProps {
  onResult: (result: GenerateSEOResponse) => void;
}

export function GeneratorForm({ onResult }: GeneratorFormProps) {
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [url, setUrl] = useState("");
  const [language, setLanguage] = useState("français");
  const [contentType, setContentType] = useState<ContentType>("blog_post");
  const [tone, setTone] = useState("professionnel");
  const [additionalNotes, setAdditionalNotes] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/generate-seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword,
          url: url || undefined,
          language,
          contentType,
          tone,
          additionalNotes: additionalNotes || undefined,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Erreur lors de la génération");
      }

      const data: GenerateSEOResponse = await res.json();
      onResult(data);
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : "Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Générateur SEO</CardTitle>
        <CardDescription>
          Remplissez les champs pour générer du contenu optimisé
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Mot-clé principal *
            </label>
            <Input
              placeholder="ex: meilleur logiciel CRM"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              URL de la page (optionnel)
            </label>
            <Input
              placeholder="https://example.com/page"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              type="url"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Langue</label>
              <Select value={language} onValueChange={(v) => v && setLanguage(v)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="français">Français</SelectItem>
                  <SelectItem value="anglais">Anglais</SelectItem>
                  <SelectItem value="espagnol">Espagnol</SelectItem>
                  <SelectItem value="allemand">Allemand</SelectItem>
                  <SelectItem value="portugais">Portugais</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-1 block">
                Type de contenu
              </label>
              <Select
                value={contentType}
                onValueChange={(v) => v && setContentType(v as ContentType)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blog_post">Article de blog</SelectItem>
                  <SelectItem value="product_page">Page produit</SelectItem>
                  <SelectItem value="landing_page">Landing page</SelectItem>
                  <SelectItem value="category_page">Page catégorie</SelectItem>
                  <SelectItem value="homepage">Page d&apos;accueil</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">Ton</label>
            <Select value={tone} onValueChange={(v) => v && setTone(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="professionnel">Professionnel</SelectItem>
                <SelectItem value="décontracté">Décontracté</SelectItem>
                <SelectItem value="expert">Expert / Technique</SelectItem>
                <SelectItem value="commercial">Commercial</SelectItem>
                <SelectItem value="éducatif">Éducatif</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium mb-1 block">
              Notes additionnelles (optionnel)
            </label>
            <Textarea
              placeholder="Instructions spécifiques, audience cible, etc."
              value={additionalNotes}
              onChange={(e) => setAdditionalNotes(e.target.value)}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Génération en cours...
              </>
            ) : (
              "Générer le contenu SEO"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
