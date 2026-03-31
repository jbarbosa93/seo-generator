import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Wand2, FileText, TrendingUp, CreditCard } from "lucide-react";

export default function DashboardPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bienvenue sur votre espace SEO Generator
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          {
            title: "Crédits restants",
            value: "5",
            icon: CreditCard,
            desc: "Plan Free",
          },
          {
            title: "Générations ce mois",
            value: "0",
            icon: FileText,
            desc: "Sur 5 max",
          },
          {
            title: "Score SEO moyen",
            value: "--",
            icon: TrendingUp,
            desc: "Aucune génération",
          },
          {
            title: "Total générations",
            value: "0",
            icon: Wand2,
            desc: "Depuis l'inscription",
          },
        ].map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Commencer</CardTitle>
          <CardDescription>
            Générez votre premier contenu SEO optimisé
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/generate">
            <Button>
              <Wand2 className="mr-2 h-4 w-4" />
              Nouvelle génération
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
