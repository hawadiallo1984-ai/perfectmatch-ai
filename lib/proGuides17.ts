// Lot "Infidélité + Psychologie de la santé au travail".
// Upload dans lib/proGuides17.ts. PDF dans public/guides/.
// AFFICHAGE FR : sections codées en dur "amour-relations" (2) et "travail" (2).
// EN : thèmes "Love & Relationships" et "Career".
export const PRO_GUIDES_17 = [
  // ---- FR : Amour & Relations ----
  { id: "se-reconstruire-apres-infidelite", lang: "fr", theme: "Amour & Relations",
    title: "Se reconstruire après une infidélité",
    blurb: "Surmonter la trahison quand on a été trompé·e : comprendre le choc, recadrer la culpabilité (ce n'est pas ta faute), te retrouver, et décider rester/partir en conscience. 4 approches.",
    pdf: "se-reconstruire-apres-infidelite-4-approches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["Le choc de la trahison", "Ce n'est pas ta faute", "Décider en conscience"] },
  { id: "apres-avoir-ete-infidele", lang: "fr", theme: "Amour & Relations",
    title: "Après avoir été infidèle",
    blurb: "Comprendre (sans excuser), distinguer culpabilité saine et honte toxique, assumer dans l'honnêteté, et choisir : réparer dans la vérité ou clore avec respect. Pas « comment cacher ». 4 approches.",
    pdf: "apres-avoir-ete-infidele-4-approches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["Comprendre sans excuser", "Assumer dans l'honnêteté", "Réparer ou clore"] },
  // ---- FR : Travail ----
  { id: "psychologie-sante-travail-theories", lang: "fr", theme: "Travail",
    title: "Psychologie de la santé au travail",
    blurb: "Comprendre le stress et le bien-être au travail avec les grands modèles : Karasek (demande-contrôle-soutien), Siegrist (efforts-récompenses), JD-R (demandes-ressources), Maslach/Selye (burnout & stress). 4 modèles.",
    pdf: "psychologie-sante-travail-theories-4-approches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["Karasek & Siegrist", "Demandes-ressources (JD-R)", "Burnout (Maslach)"] },
  { id: "gerer-stress-travail-tcc", lang: "fr", theme: "Travail",
    title: "Gérer le stress au travail avec la TCC",
    blurb: "Des outils cognitifs et comportementaux : repérer et recadrer tes pensées automatiques (perfectionnisme, catastrophisme), poser des limites, réguler ton stress et prévenir le burnout. 4 approches.",
    pdf: "gerer-stress-travail-tcc-4-approches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["Recadrer ses pensées", "Poser des limites", "Réguler & prévenir"] },
  // ---- EN : Love & Relationships ----
  { id: "healing-after-being-cheated-on", lang: "en", theme: "Love & Relationships",
    title: "Healing After Being Cheated On",
    blurb: "Overcome betrayal when you've been cheated on: understand the shock, reframe the guilt (it's not your fault), find yourself again, and decide stay/leave consciously. 4 approaches.",
    pdf: "healing-after-being-cheated-on-4-approaches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["The shock of betrayal", "It's not your fault", "Decide consciously"] },
  { id: "moving-forward-after-cheating", lang: "en", theme: "Love & Relationships",
    title: "Moving Forward After Cheating",
    blurb: "Understand (without excusing), tell healthy guilt from toxic shame, own it honestly, and choose: repair in truth or close with respect. Not 'how to hide'. 4 approaches.",
    pdf: "moving-forward-after-cheating-4-approaches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["Understand without excusing", "Own it honestly", "Repair or close"] },
  // ---- EN : Career ----
  { id: "workplace-health-psychology-theories", lang: "en", theme: "Career",
    title: "Occupational Health Psychology",
    blurb: "Understand work stress and wellbeing through the major models: Karasek (demand-control-support), Siegrist (effort-reward), JD-R (demands-resources), Maslach/Selye (burnout & stress). 4 models.",
    pdf: "workplace-health-psychology-theories-4-approaches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["Karasek & Siegrist", "Demands-resources (JD-R)", "Burnout (Maslach)"] },
  { id: "managing-work-stress-with-cbt", lang: "en", theme: "Career",
    title: "Managing Work Stress With CBT",
    blurb: "Cognitive and behavioral tools: spot and reframe automatic thoughts (perfectionism, catastrophizing), set limits, regulate your stress and prevent burnout. 4 approaches.",
    pdf: "managing-work-stress-with-cbt-4-approaches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["Reframe your thoughts", "Set limits", "Regulate & prevent"] },
] as const;
