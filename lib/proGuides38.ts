// Collection "Héritage & Transmission" — AJOUT (esclavage/colonisation + pauvreté). Upload dans lib/proGuides38.ts. PDF dans public/guides/.
export const PRO_GUIDES_38 = [
  // ---- FR ----
  { id: "trauma-esclavage-colonisation", lang: "fr", theme: "Héritage & Transmission", collection: "transmission",
    title: "Le trauma de l'esclavage et de la colonisation",
    blurb: "Un héritage collectif : une blessure réelle qu'un présent inégalitaire maintient vive (jamais une faute individuelle), recadrer les messages intériorisés, honorer la force et la fierté héritées, guérison collective et nommer le systémique. 4 approches.",
    pdf: "trauma-esclavage-colonisation-4-approches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["Une blessure collective réelle", "Honorer la force héritée", "Guérison collective"] },
  { id: "cycle-de-pauvrete-transgenerationnel", lang: "fr", theme: "Héritage & Transmission", collection: "transmission",
    title: "Briser le cycle transgénérationnel de pauvreté",
    blurb: "Quand le manque se transmet : le structurel d'abord (pas ta faute), recadrer les croyances de pénurie, t'autoriser à la sécurité et à plus, passer du mode survie à la construction (quotidien & business). 4 approches.",
    pdf: "cycle-de-pauvrete-transgenerationnel-4-approches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["Le structurel d'abord", "Sortir des croyances de pénurie", "De la survie à la construction"] },
  // ---- EN ----
  { id: "slavery-and-colonial-trauma", lang: "en", theme: "Legacy & Transmission", collection: "transmission",
    title: "The Trauma of Slavery and Colonization",
    blurb: "A collective inheritance: a real wound kept alive by an unequal present (never an individual fault), reframe the internalized messages, honor the inherited strength and pride, collective healing and naming the systemic. 4 approaches.",
    pdf: "slavery-and-colonial-trauma-4-approaches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["A real collective wound", "Honor the inherited strength", "Collective healing"] },
  { id: "breaking-the-poverty-cycle", lang: "en", theme: "Legacy & Transmission", collection: "transmission",
    title: "Breaking the Transgenerational Poverty Cycle",
    blurb: "When scarcity is passed down: the structural first (not your fault), reframe scarcity beliefs, allow yourself security and more, move from survival to building (daily & business). 4 approaches.",
    pdf: "breaking-the-poverty-cycle-4-approaches.pdf", priceCents: 1900, currency: "eur",
    bullets: ["The structural first", "Beyond scarcity beliefs", "From survival to building"] },
] as const;
