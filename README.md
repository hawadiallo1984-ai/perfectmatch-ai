# PerfectMatch v2

Refonte complète de [PerfectMatch](https://perfectmatch-ai.vercel.app/) avec 3 offres :

- **Analyse Célibataire** · 47€ · psycho complet + astro
- **Analyse Psycho Complète** · 99€ · psycho + astro + grille clinique (mise en avant)
- **Analyse de Couple** · 67€ · synastrie à deux

Stack : Next.js 14 (App Router) · TypeScript · Anthropic Claude API · Stripe

---

## Structure du projet

```
perfectmatch/
├── app/
│   ├── page.tsx                    → Landing + 3 offres
│   ├── page.module.css
│   ├── questionnaire/page.tsx      → Parcours questions (étends QUESTIONS)
│   ├── apercu/page.tsx             → Teaser + paywall avec 3 choix
│   ├── rapport/page.tsx            → Rapport complet post-paiement
│   ├── luna/page.tsx               → Chat IA relationnelle
│   ├── globals.css                 → Design tokens CSS variables
│   ├── layout.tsx
│   └── api/
│       ├── checkout/route.ts       → Stripe session
│       ├── webhook/route.ts        → Stripe webhook
│       ├── generate-teaser/route.ts → Claude Haiku (gratuit, rapide)
│       ├── generate-report/route.ts → Claude Opus (payant, complet)
│       └── luna/route.ts           → Claude chat avec contexte
├── lib/
│   ├── offers.ts                   → Config centrale des 3 offres
│   ├── claude.ts                   → Wrapper Anthropic SDK
│   ├── stripe.ts                   → Wrapper Stripe SDK
│   └── prompts.ts                  → Prompts système (le cœur du produit)
├── .env.example
├── package.json
└── README.md
```

---

## Setup local

```bash
# 1. Installer
npm install

# 2. Configurer les variables d'environnement
cp .env.example .env.local
# Édite .env.local avec tes vraies clés

# 3. Lancer
npm run dev
```

Le site tourne sur http://localhost:3000

---

## Variables d'environnement requises

```
ANTHROPIC_API_KEY=sk-ant-...
STRIPE_SECRET_KEY=sk_live_... (ou sk_test_ en dev)
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
NEXT_PUBLIC_APP_URL=https://ton-domaine.vercel.app

# Optionnel mais recommandé : IDs Stripe des 3 prix
STRIPE_PRICE_CELIBATAIRE=price_...
STRIPE_PRICE_COUPLE=price_...
STRIPE_PRICE_COMPLETE=price_...
```

Si les `STRIPE_PRICE_*` ne sont pas définis, le code crée dynamiquement les prix à la volée (plus pratique pour démarrer).

---

## Configuration Stripe

### Option A — Prix dynamiques (rapide)
Ne configure rien dans Stripe. Le code crée les prix à chaque checkout. Suffisant pour démarrer.

### Option B — Prix fixes dans le dashboard (recommandé en prod)
1. Dans ton dashboard Stripe → **Produits**
2. Crée 3 produits : Analyse Célibataire (47€), Psycho Complète (99€), Couple (67€)
3. Copie chaque `price_id` (format `price_xxx`) dans ton `.env.local`

### Webhook
1. Dashboard Stripe → **Développeurs → Webhooks**
2. Endpoint URL : `https://ton-domaine.vercel.app/api/webhook`
3. Événements à écouter : `checkout.session.completed`
4. Copie le `whsec_...` dans `STRIPE_WEBHOOK_SECRET`

---

## Déploiement Vercel

```bash
# 1. Push sur GitHub
git init
git add .
git commit -m "PerfectMatch v2 — refonte 3 offres"
git branch -M main
git remote add origin https://github.com/TON_USER/perfectmatch.git
git push -u origin main

# 2. Sur vercel.com
# - Import ton repo GitHub
# - Ajoute toutes les variables d'environnement
# - Deploy
```

---

## Ce qui reste à faire après le déploiement initial

### Questionnaire (priorité haute)
Le fichier `app/questionnaire/page.tsx` ne contient que 6 questions exemple. Étends le tableau `QUESTIONS` avec tes 127 dimensions réelles. Chaque question a un `id`, une `category`, un `type` (`text` / `textarea` / `radio` / `scale`) et optionnellement des `options` ou une `helper`.

### Prompts Claude
`lib/prompts.ts` contient les 5 prompts système. Ils sont calibrés mais tu voudras les ajuster à ton ton exact. Les prompts attendent une réponse JSON structurée — si tu modifies la structure, modifie aussi les pages qui l'affichent.

### Coûts Claude API (estimation)
- **Teaser** (Haiku) : ~0.003€ par génération
- **Rapport Célibataire 47€** (Opus) : ~0.15€ par rapport → marge 46.85€
- **Rapport Complète 99€** (Opus) : ~0.25€ par rapport → marge 98.75€
- **Rapport Couple 67€** (Opus) : ~0.20€ par rapport → marge 66.80€
- **Luna** (Opus) : ~0.05€ par message

### Persistence des rapports
Le code actuel stocke le rapport en `sessionStorage` (côté client). Pour une vraie persistence :
- Ajoute Supabase ou Vercel Postgres
- Lie chaque rapport à l'email de l'utilisateur
- Permet le retour au rapport même après fermeture du navigateur

### PDF download
Pas encore implémenté. Recommandation : `@react-pdf/renderer` ou endpoint qui appelle Puppeteer/Playwright pour screenshoter la page.

---

## Design tokens

Tout est dans `app/globals.css` :
- `--ink` : fond nuit profonde
- `--gold` / `--gold-soft` : accents dorés
- `--violet` : accents Luna
- Typo : **Fraunces** (italique pour les accents) + **Inter Tight** (corps)

Pour adapter les couleurs, modifie uniquement ces variables — tout le reste suit.

---

## Licence
Privé. © 2026 PerfectMatch.
