# Déploiement sur Vercel

## Prérequis

- Compte [Vercel](https://vercel.com)
- Repo GitHub connecté : `jbarbosa93/seo-generator`
- Projet Supabase configuré
- Compte Stripe avec produits créés
- Compte Resend avec domaine vérifié
- Clé API Anthropic

## 1. Importer le projet sur Vercel

1. Va sur [vercel.com/new](https://vercel.com/new)
2. Importe le repo `jbarbosa93/seo-generator`
3. Framework preset : **Next.js** (détecté automatiquement)
4. Ne modifie pas les commandes de build

## 2. Variables d'environnement

Dans **Settings → Environment Variables**, ajoute chaque variable :

| Variable | Valeur |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | URL de ton projet Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clé anon/public Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Clé service_role Supabase |
| `STRIPE_SECRET_KEY` | `sk_live_...` (ou `sk_test_...`) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` (ou `pk_test_...`) |
| `STRIPE_WEBHOOK_SECRET` | `whsec_...` (voir étape 3) |
| `STRIPE_PRICE_ID_PRO` | `price_...` du produit Pro |
| `STRIPE_PRICE_ID_BUSINESS` | `price_...` du produit Business |
| `ANTHROPIC_API_KEY` | `sk-ant-...` |
| `RESEND_API_KEY` | `re_...` |
| `RESEND_FROM_EMAIL` | `noreply@tondomaine.com` |
| `NEXT_PUBLIC_APP_URL` | `https://ton-app.vercel.app` |

## 3. Configurer le webhook Stripe

1. Va dans **Stripe Dashboard → Developers → Webhooks**
2. Crée un endpoint : `https://ton-app.vercel.app/api/webhooks/stripe`
3. Événements à écouter :
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
4. Copie le **Signing secret** (`whsec_...`) et ajoute-le dans les env vars Vercel

## 4. Configurer Supabase

### Redirect URLs

Dans **Supabase Dashboard → Authentication → URL Configuration** :
- Site URL : `https://ton-app.vercel.app`
- Redirect URLs : `https://ton-app.vercel.app/**`

### Table users (optionnel)

Si tu utilises une table `users` custom, crée-la via le SQL Editor :

```sql
CREATE TABLE public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  plan TEXT DEFAULT 'free' CHECK (plan IN ('free', 'pro', 'business')),
  credits_remaining INTEGER DEFAULT 5,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own data" ON public.users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);
```

## 5. Déployer

Clique **Deploy** sur Vercel. Les prochains push sur `main` déclencheront un redéploiement automatique.

## 6. Vérification post-déploiement

- [ ] La landing page s'affiche
- [ ] Inscription / connexion fonctionnent
- [ ] Redirection vers `/dashboard` après login
- [ ] Génération SEO fonctionne (`/generate`)
- [ ] Les webhooks Stripe sont reçus (vérifier dans Stripe Dashboard)
