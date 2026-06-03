export const GUIDES = {
  'black-tax': {
    id: 'black-tax',
    name: 'Guide Black Tax — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/black-tax-4-approches.pdf',
    blurb:
      'La Black Tax, c\'est cet argent que tu donnes à la famille, cette charge invisible que tu portes seul·e. Ce guide te donne 4 approches TCC concrètes pour la nommer, la gérer, et te protéger — sans culpabilité.',
    bullets: [
      'Nommer sans honte — comprendre d\'où vient la Black Tax',
      'Restructuration cognitive — identifier et reformuler les croyances limitantes',
      'Communiquer clairement — scripts TCC pour parler d\'argent en famille',
      'Protéger ta stabilité — construire un cadre soutenable dans le temps',
      'Cahier d\'exercices — mises en situation et espaces de réflexion guidés',
    ],
  },
  'identite-metisse': {
    id: 'identite-metisse',
    name: 'Guide Identité métisse — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/identite-metisse-4-approches.pdf',
    blurb:
      'Vivre entre deux cultures, c\'est souvent se sentir trop de l\'une et pas assez de l\'autre. Ce guide t\'accompagne à travers 4 regards TCC pour sortir de l\'entre-deux, intégrer tes appartenances multiples et habiter une identité pleinement tienne — sans avoir à choisir.',
    bullets: [
      'Le regard intérieur — explorer les croyances héritées sur ton identité',
      'La restructuration culturelle — déconstruire les injonctions des deux côtés',
      'L\'ancrage pluriel — construire une identité intégrée et solide',
      'La parole affirmée — exprimer qui tu es sans justification ni excuse',
      'Cahier d\'exercices — exercices de mise en récit et d\'ancrage identitaire',
    ],
  },
} as const;

export type GuideId = keyof typeof GUIDES;
