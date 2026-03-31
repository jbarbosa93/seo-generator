"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function SettingsPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">Gérez votre compte et abonnement</p>
      </div>

      <div className="space-y-6 max-w-2xl">
        {/* Profile */}
        <Card>
          <CardHeader>
            <CardTitle>Profil</CardTitle>
            <CardDescription>
              Modifiez vos informations personnelles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">
                Nom complet
              </label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                disabled
              />
            </div>
            <Button>Sauvegarder</Button>
          </CardContent>
        </Card>

        {/* Subscription */}
        <Card>
          <CardHeader>
            <CardTitle>Abonnement</CardTitle>
            <CardDescription>Gérez votre plan et facturation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Plan actuel</p>
                <p className="text-sm text-muted-foreground">
                  5 générations / mois
                </p>
              </div>
              <Badge>Free</Badge>
            </div>
            <Button variant="outline">Passer au plan Pro</Button>
          </CardContent>
        </Card>

        {/* Danger zone */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-red-600">Zone de danger</CardTitle>
            <CardDescription>Actions irréversibles</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="destructive">Supprimer mon compte</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
