"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createBrowserSupabaseClient } from "@/lib/supabase";
import { Navbar } from "@/components/Navbar";
import { PricingCards } from "@/components/PricingCards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Zap, BarChart3, Globe } from "lucide-react";

export default function LandingPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserSupabaseClient();
    async function checkAuth() {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.replace("/dashboard");
      } else {
        setLoading(false);
      }
    }
    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="container mx-auto px-4 pt-32 pb-20 text-center">
        <Badge variant="secondary" className="mb-4">
          Propulsé par Claude AI
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
          Générez du contenu SEO
          <br />
          <span className="text-primary">en quelques secondes</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Titres, meta descriptions, structure de contenu et mots-clés optimisés
          grâce à l&apos;intelligence artificielle. Boostez votre référencement
          sans effort.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg">Commencer gratuitement</Button>
          </Link>
          <Link href="#pricing">
            <Button size="lg" variant="outline">
              Voir les prix
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-12">
          Tout ce qu&apos;il faut pour dominer les SERPs
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Sparkles,
              title: "Contenu IA",
              desc: "Générez des articles complets optimisés SEO en un clic",
            },
            {
              icon: Zap,
              title: "Ultra rapide",
              desc: "Obtenez vos résultats en moins de 30 secondes",
            },
            {
              icon: BarChart3,
              title: "Score SEO",
              desc: "Évaluez la qualité SEO de chaque génération",
            },
            {
              icon: Globe,
              title: "Multilingue",
              desc: "Générez du contenu en français, anglais, espagnol et plus",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="border rounded-lg p-6 text-center hover:shadow-md transition-shadow"
            >
              <feature.icon className="h-10 w-10 mx-auto mb-4 text-primary" />
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Tarifs</h2>
        <p className="text-center text-muted-foreground mb-12">
          Choisissez le plan adapté à vos besoins
        </p>
        <PricingCards />
      </section>

      {/* Footer */}
      <footer className="border-t py-8 text-center text-sm text-muted-foreground">
        <p>
          &copy; {new Date().getFullYear()} SEO Generator. Tous droits
          réservés.
        </p>
      </footer>
    </div>
  );
}
