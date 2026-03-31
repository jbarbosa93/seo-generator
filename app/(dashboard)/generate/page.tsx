"use client";

import { useState } from "react";
import { GeneratorForm } from "@/components/GeneratorForm";
import { OutputPanel } from "@/components/OutputPanel";
import type { GenerateSEOResponse } from "@/types";

export default function GeneratePage() {
  const [result, setResult] = useState<GenerateSEOResponse | null>(null);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Générer du contenu SEO</h1>
        <p className="text-muted-foreground">
          Remplissez le formulaire pour obtenir du contenu optimisé
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <GeneratorForm onResult={setResult} />
        <OutputPanel result={result} />
      </div>
    </div>
  );
}
