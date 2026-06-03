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
  'couples-mixtes': {
    id: 'couples-mixtes',
    name: 'Guide Couples mixtes & interculturels — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/couples-mixtes-4-approches.pdf',
    blurb:
      'S\'aimer à travers la différence, c\'est beau — et parfois épuisant. Seul·e ou à deux, ce guide t\'accompagne à travers 4 regards TCC pour transformer ce qui divise en richesse partagée, et construire une relation interculturelle solide et apaisée.',
    bullets: [
      'Ce que chacun apporte sans le savoir — identifier les héritages culturels invisibles dans la relation',
      'Quand « différent » devient « menace » — déconstruire les réflexes de rejet et de surinterprétation',
      'Deux mondes, une rencontre — créer un espace commun sans effacer ce qu\'on est chacun',
      'Les deux familles dans le salon — naviguer les attentes, les regards et les pressions extérieures',
      'Cahier d\'exercices — exercices à faire seul·e ou à deux pour ancrer les prises de conscience',
    ],
  },
  'couple-noir': {
    id: 'couple-noir',
    name: 'Guide Couple noir face au monde — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/couple-noir-face-au-monde-4-approches.pdf',
    blurb:
      'Aimer et être aimé·e, c\'est déjà fort. Le faire dans un monde qui vous regarde de travers, c\'est un acte de résistance. Seul·e ou à deux, ce guide t\'accompagne à travers 4 regards TCC pour faire de votre amour un refuge face au racisme extérieur — et tenir ensemble.',
    bullets: [
      'Ce que le monde a déposé en vous — identifier les blessures raciales qui entrent dans la relation sans qu\'on les ait invitées',
      'Ne pas laisser le dehors entrer dedans — créer des pare-feux émotionnels pour protéger l\'espace du couple',
      'Être le refuge l\'un de l\'autre — construire une sécurité intérieure partagée face aux agressions extérieures',
      'Faire front ensemble — développer une stratégie commune face aux regards, commentaires et discriminations',
      'Cahier d\'exercices — exercices à faire seul·e ou à deux pour renforcer le lien et la résilience du couple',
    ],
  },
} as const;

export type GuideId = keyof typeof GUIDES;
