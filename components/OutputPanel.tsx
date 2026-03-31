"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SEOScore } from "@/components/SEOScore";
import { Copy, Download } from "lucide-react";
import type { GenerateSEOResponse } from "@/types";

interface OutputPanelProps {
  result: GenerateSEOResponse | null;
}

export function OutputPanel({ result }: OutputPanelProps) {
  if (!result) {
    return (
      <Card className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground">
          Les résultats apparaîtront ici après génération
        </p>
      </Card>
    );
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  function downloadAsHTML() {
    if (!result) return;
    const html = `<!DOCTYPE html>
<html>
<head>
  <title>${result.title}</title>
  <meta name="description" content="${result.metaDescription}">
  <meta name="keywords" content="${result.keywords.join(", ")}">
</head>
<body>
${result.content}
</body>
</html>`;
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "seo-content.html";
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Résultat</CardTitle>
            <CardDescription>Contenu SEO généré</CardDescription>
          </div>
          <SEOScore score={result.seoScore} />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Aperçu</TabsTrigger>
            <TabsTrigger value="content">Contenu</TabsTrigger>
            <TabsTrigger value="keywords">Mots-clés</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Title tag</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(result.title)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="p-3 bg-muted rounded-md text-sm">{result.title}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {result.title.length}/60 caractères
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium">Meta description</label>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(result.metaDescription)}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
              <p className="p-3 bg-muted rounded-md text-sm">
                {result.metaDescription}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {result.metaDescription.length}/160 caractères
              </p>
            </div>

            <div>
              <label className="text-sm font-medium block mb-2">
                Structure (Headings H2)
              </label>
              <ul className="space-y-1">
                {result.headings.map((heading, i) => (
                  <li key={i} className="text-sm p-2 bg-muted rounded-md">
                    H2: {heading}
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>

          <TabsContent value="content">
            <div className="flex justify-end gap-2 mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyToClipboard(result.content)}
              >
                <Copy className="h-3 w-3 mr-1" /> Copier
              </Button>
              <Button variant="outline" size="sm" onClick={downloadAsHTML}>
                <Download className="h-3 w-3 mr-1" /> HTML
              </Button>
            </div>
            <div
              className="prose prose-sm max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: result.content }}
            />
          </TabsContent>

          <TabsContent value="keywords">
            <div className="flex flex-wrap gap-2">
              {result.keywords.map((kw) => (
                <Badge key={kw} variant="secondary">
                  {kw}
                </Badge>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
