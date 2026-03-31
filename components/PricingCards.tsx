"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { PLANS } from "@/lib/stripe";

export function PricingCards() {
  const plans = Object.values(PLANS);

  return (
    <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={
            "popular" in plan && plan.popular
              ? "border-primary shadow-lg scale-105"
              : ""
          }
        >
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>{plan.name}</CardTitle>
              {"popular" in plan && plan.popular && (
                <Badge>Populaire</Badge>
              )}
            </div>
            <CardDescription>
              <span className="text-3xl font-bold text-foreground">
                {plan.price}€
              </span>
              {plan.price > 0 && (
                <span className="text-muted-foreground"> /mois</span>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2 text-sm">
                  <Check className="h-4 w-4 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={
                "popular" in plan && plan.popular ? "default" : "outline"
              }
            >
              {plan.price === 0 ? "Commencer" : "S'abonner"}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
