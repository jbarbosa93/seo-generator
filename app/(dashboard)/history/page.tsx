"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import type { SEOGeneration } from "@/types";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [generations, setGenerations] = useState<SEOGeneration[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Fetch from Supabase
    setLoading(false);
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Historique</h1>
        <p className="text-muted-foreground">
          Retrouvez toutes vos générations SEO
        </p>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Chargement...</p>
      ) : generations.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              Aucune génération pour le moment. Commencez par en créer une !
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {generations.map((gen) => (
            <Card key={gen.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-lg">
                      {gen.input_keyword}
                    </CardTitle>
                    <CardDescription>
                      {new Date(gen.created_at).toLocaleDateString("fr-FR")} -{" "}
                      {gen.input_content_type.replace("_", " ")}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={gen.seo_score >= 80 ? "default" : "secondary"}
                    >
                      Score: {gen.seo_score}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {gen.output_title}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
