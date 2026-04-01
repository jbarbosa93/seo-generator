export const PLANS = {
  free: {
    name: "Free",
    price: 0,
    credits: 5,
    features: [
      "5 générations SEO / mois",
      "Mots-clés basiques",
      "Export texte",
    ],
  },
  pro: {
    name: "Pro",
    price: 19,
    credits: 100,
    features: [
      "100 générations SEO / mois",
      "Analyse de mots-clés avancée",
      "Score SEO détaillé",
      "Export HTML & Markdown",
      "Historique illimité",
    ],
    popular: true,
  },
  business: {
    name: "Business",
    price: 49,
    credits: 500,
    features: [
      "500 générations SEO / mois",
      "Tout du plan Pro",
      "API access",
      "Support prioritaire",
      "Générations en masse",
    ],
  },
} as const;
