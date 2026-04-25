// ============================================================
// QUESTIONNAIRES PerfectMatch - 3 parcours differencies
// Importe ce fichier dans app/questionnaire/page.tsx
// ============================================================

export type QuestionType = 'text' | 'textarea' | 'radio' | 'scale' | 'date' | 'multi';

export interface Question {
  id: string;
  category: string;
  label: string;
  helper?: string;
  type: QuestionType;
  options?: string[];
  scaleLabels?: { min: string; max: string };
  optional?: boolean;
  placeholder?: string;
}

// ============================================================
// PARCOURS 1 - CELIBATAIRE (47 EUR) - 32 questions, ~9 min
// ============================================================

export const QUESTIONS_CELIBATAIRE: Question[] = [
  // --- IDENTITE (5) ---
  { id: 'name', category: 'Identite', label: "Comment t'appelles-tu ?", type: 'text', placeholder: 'Ton prenom' },
  { id: 'age', category: 'Identite', label: 'Quel age as-tu ?', type: 'text', placeholder: '32' },
  { id: 'birth_date', category: 'Astrologie', label: 'Date de naissance complete', helper: "Necessaire pour ton theme natal. Format : 14 novembre 1994", type: 'text', placeholder: '14 novembre 1994' },
  { id: 'birth_time', category: 'Astrologie', label: 'Heure de naissance', helper: 'Affine fortement les maisons astrologiques. Mets "inconnue" si tu ne sais pas.', type: 'text', placeholder: '22:15 ou inconnue' },
  { id: 'birth_city', category: 'Astrologie', label: 'Ville de naissance', type: 'text', placeholder: 'Casablanca, Maroc' },

  // --- ORIENTATION & SITUATION (3) ---
  { id: 'orientation', category: 'Identite', label: 'Qui cherches-tu a aimer ?', type: 'radio',
    options: ['Un homme', 'Une femme', 'Ouvert·e aux deux', 'Prefere ne pas preciser'] },
  { id: 'relationship_status', category: 'Situation', label: 'Quelle est ta situation actuelle ?', type: 'radio',
    options: ['Celibataire depuis longtemps', 'Recemment celibataire', 'En train de quitter une relation', 'Compliquee, pas claire'] },
  { id: 'last_relationship_duration', category: 'Situation', label: 'Combien de temps a dure ta derniere relation serieuse ?', type: 'radio',
    options: ['Jamais eu', 'Moins de 6 mois', '6 mois a 2 ans', '2 a 5 ans', 'Plus de 5 ans'] },

  // --- BIG FIVE (10 - 2 par dimension) ---
  { id: 'bf_ouverture_1', category: 'Personnalite', label: "Tu t'ennuies vite avec ce qui est convenu et previsible.", type: 'scale',
    scaleLabels: { min: 'Pas du tout', max: 'Totalement' } },
  { id: 'bf_ouverture_2', category: 'Personnalite', label: 'Tu cherches activement de nouvelles experiences intellectuelles, artistiques ou spirituelles.', type: 'scale',
    scaleLabels: { min: 'Rarement', max: 'Constamment' } },
  { id: 'bf_conscience_1', category: 'Personnalite', label: 'Tu tiens tes engagements meme quand ca te coute.', type: 'scale',
    scaleLabels: { min: 'Pas vraiment', max: 'Toujours' } },
  { id: 'bf_conscience_2', category: 'Personnalite', label: 'Le desordre dans ta vie te stresse rapidement.', type: 'scale',
    scaleLabels: { min: 'Pas du tout', max: 'Enormement' } },
  { id: 'bf_extra_1', category: 'Personnalite', label: 'Tu te ressources mieux seul·e qu&apos;entoure·e.', type: 'scale',
    scaleLabels: { min: 'Faux', max: 'Tres vrai' } },
  { id: 'bf_extra_2', category: 'Personnalite', label: 'Tu prends spontanement la parole en groupe.', type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Toujours' } },
  { id: 'bf_agreabilite_1', category: 'Personnalite', label: 'Tu mets souvent les besoins des autres avant les tiens.', type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Toujours' } },
  { id: 'bf_agreabilite_2', category: 'Personnalite', label: 'Tu as du mal a dire non, meme quand tu devrais.', type: 'scale',
    scaleLabels: { min: 'Pas du tout', max: 'Tres souvent' } },
  { id: 'bf_stabilite_1', category: 'Personnalite', label: 'Tes emotions changent rapidement et intensement.', type: 'scale',
    scaleLabels: { min: 'Stable', max: 'Tres mouvant' } },
  { id: 'bf_stabilite_2', category: 'Personnalite', label: 'Tu rumines longtemps apres un conflit ou une critique.', type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Des heures' } },

  // --- ATTACHEMENT (5) ---
  { id: 'att_silence', category: 'Attachement', label: "Quand quelqu'un que tu aimes ne repond pas pendant 24h, tu ressens :", type: 'scale',
    scaleLabels: { min: 'Aucun stress', max: 'Une angoisse forte' } },
  { id: 'att_close', category: 'Attachement', label: 'Quand un partenaire devient tres present et engage, tu ressens :', type: 'scale',
    scaleLabels: { min: 'Du soulagement', max: "Une envie de fuir" } },
  { id: 'att_conflict', category: 'Attachement', label: 'Pendant un conflit amoureux, ta tendance est de :', type: 'radio',
    options: ['Insister jusqu&apos;a ce qu&apos;on en parle', 'Me fermer, me retirer', 'Exploser puis culpabiliser', 'Negocier rationnellement', 'Eviter le sujet'] },
  { id: 'att_ex', category: 'Attachement', label: 'Ton dernier partenaire etait plutot :', type: 'radio',
    options: ['Tres engage·e, parfois etouffant·e', 'Distant·e, evitant·e, mysterieux', 'Equilibre·e mais ennuyeux·se', 'Chaotique mais passionne·e', 'Je n&apos;arrive pas a le definir'] },
  { id: 'att_pattern', category: 'Attachement', label: 'Decris en quelques phrases la dynamique qui revient le plus souvent dans tes relations.', type: 'textarea',
    helper: 'Exemple : "je tombe pour des hommes peu disponibles", "je me lasse rapidement", "je donne trop puis je m&apos;effondre"...' },

  // --- BIAIS & PATTERNS (4) ---
  { id: 'bias_attraction', category: 'Patterns', label: "Qu'est-ce qui t'attire en premier chez quelqu&apos;un ?", type: 'radio',
    options: ['Son intelligence', 'Son intensite emotionnelle', 'Sa stabilite et fiabilite', 'Son charisme/ambition', 'Son cote mysterieux'] },
  { id: 'bias_redflag', category: 'Patterns', label: 'Quel red flag as-tu deja ignore par le passe ?', type: 'textarea', optional: true,
    helper: 'Sans jugement. Plus tu es honnete, plus le rapport voit clair.' },
  { id: 'bias_culture', category: 'Patterns', label: "Tes proches/famille ont-ils des attentes precises sur ton/ta partenaire ?", type: 'radio',
    options: ['Oui, fortes (origine, religion, classe...)', 'Oui, mais negociables', 'Plus vraiment', 'Aucune pression'] },
  { id: 'bias_fears', category: 'Patterns', label: 'Quelle est ta plus grande peur en relation ?', type: 'radio',
    options: ['Etre abandonne·e', "M'etouffer dans la fusion", 'Ne jamais trouver', 'Choisir la mauvaise personne', 'Reproduire le schema de mes parents'] },

  // --- VALEURS & FUTUR (3) ---
  { id: 'values_priorities', category: 'Valeurs', label: "Classe ce qui compte le plus pour toi en couple :", type: 'radio',
    options: ['La passion intellectuelle', 'La securite emotionnelle', "L'aventure et la liberte", 'La construction familiale', "L'eveil spirituel"] },
  { id: 'values_dealbreakers', category: 'Valeurs', label: 'Cite 2 ou 3 dealbreakers absolus chez un partenaire.', type: 'textarea',
    helper: 'Exemple : "infidelite, manque d&apos;ambition, racisme"' },
  { id: 'future_kids', category: 'Valeurs', label: 'Et les enfants ?', type: 'radio',
    options: ['Indispensables', 'Ouverture mais pas obligatoire', 'Plutot non', 'Certain·e que non', 'Trop tot pour savoir'] },

  // --- BLESSURE INTIME (2) ---
  { id: 'wound_main', category: 'Intime', label: "Quelle blessure amoureuse t'a le plus marque ?", type: 'textarea',
    helper: 'Texte efface apres generation du rapport. Personne ne le lit.', optional: true },
  { id: 'wish', category: 'Intime', label: "Si l'amour ideal existait pour toi, comment se sentirait-il, concretement, dans ton corps et dans ta vie ?", type: 'textarea',
    helper: "Ferme les yeux 10 secondes avant de repondre.", optional: true },
];

// ============================================================
// PARCOURS 2 - COUPLE (67 EUR) - 22 questions par personne
// Chaque partenaire a son propre lien, on fusionne ensuite
// ============================================================

export const QUESTIONS_COUPLE: Question[] = [
  // --- IDENTITE (4) ---
  { id: 'name', category: 'Identite', label: "Comment t'appelles-tu ?", type: 'text', placeholder: 'Ton prenom' },
  { id: 'partner_name', category: 'Identite', label: 'Et le prenom de ton/ta partenaire ?', type: 'text' },
  { id: 'birth_date', category: 'Astrologie', label: 'Ta date de naissance complete', type: 'text', placeholder: '14 novembre 1994' },
  { id: 'birth_city', category: 'Astrologie', label: 'Ta ville de naissance', type: 'text' },

  // --- HISTOIRE DU COUPLE (3) ---
  { id: 'duration', category: 'Couple', label: 'Depuis combien de temps etes-vous ensemble ?', type: 'radio',
    options: ['Moins de 6 mois', '6 mois a 2 ans', '2 a 5 ans', '5 a 10 ans', 'Plus de 10 ans'] },
  { id: 'living', category: 'Couple', label: 'Vivez-vous ensemble ?', type: 'radio',
    options: ['Oui, depuis longtemps', 'Oui, recemment', 'Non, mais on y pense', 'Non, et on n&apos;en a pas envie pour l&apos;instant'] },
  { id: 'phase', category: 'Couple', label: 'A quelle phase est votre couple aujourd&apos;hui ?', type: 'radio',
    options: ['Lune de miel', 'Construction stable', "Crise ou tension", 'Reparation apres crise', 'Routine confortable', 'Routine etouffante'] },

  // --- COMMUNICATION (4) ---
  { id: 'comm_quality', category: 'Communication', label: 'Vous arrivez a parler de tout ensemble.', type: 'scale',
    scaleLabels: { min: 'Beaucoup de zones taboues', max: 'Tout est dit' } },
  { id: 'comm_listening', category: 'Communication', label: "Tu te sens vraiment ecoute·e quand tu lui parles.", type: 'scale',
    scaleLabels: { min: 'Rarement', max: 'Toujours' } },
  { id: 'comm_disagreement', category: 'Communication', label: 'Pendant un desaccord, votre dynamique est plutot :', type: 'radio',
    options: ['On parle calmement', 'Ca monte vite mais on revient', 'L&apos;un attaque, l&apos;autre se ferme', 'Silence prolonge', 'On evite le sujet'] },
  { id: 'comm_taboo', category: 'Communication', label: 'Y a-t-il un sujet qu&apos;on n&apos;arrive pas a aborder ?', type: 'textarea', optional: true },

  // --- INTIMITE & DESIR (3) ---
  { id: 'intimacy_quality', category: 'Intimite', label: "L'intimite physique entre vous est :", type: 'scale',
    scaleLabels: { min: 'Eteinte', max: 'Vivante' } },
  { id: 'intimacy_emotional', category: 'Intimite', label: "Tu te sens emotionnellement proche de ton/ta partenaire.", type: 'scale',
    scaleLabels: { min: 'Distance', max: 'Tres connecte·e' } },
  { id: 'intimacy_initiative', category: 'Intimite', label: "Quand il y a un probleme intime, qui en parle en premier ?", type: 'radio',
    options: ['Moi, presque toujours', 'Lui/elle', 'On en parle ensemble', 'Personne, on evite'] },

  // --- GOTTMAN - 4 CAVALIERS (4) ---
  { id: 'gottman_critique', category: 'Dynamique', label: 'Pendant un conflit, vous attaquez la personne (pas le comportement).', type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Souvent' } },
  { id: 'gottman_mepris', category: 'Dynamique', label: "Il y a parfois du sarcasme, du mepris, des yeux leves au ciel.", type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Souvent' } },
  { id: 'gottman_defense', category: 'Dynamique', label: "Quand on te reproche quelque chose, tu te defends/justifies au lieu d'ecouter.", type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Toujours' } },
  { id: 'gottman_mur', category: 'Dynamique', label: "L'un de vous se ferme et arrete de parler pendant les conflits.", type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Tres souvent' } },

  // --- FORCES & FRAGILITES (3) ---
  { id: 'strength', category: 'Bilan', label: 'Quelle est la plus grande force de votre couple ?', type: 'textarea' },
  { id: 'weakness', category: 'Bilan', label: 'Quelle est la fragilite que tu identifies le plus ?', type: 'textarea' },
  { id: 'future_together', category: 'Bilan', label: 'Te projettes-tu encore avec cette personne dans 5 ans ?', type: 'radio',
    options: ['Oui, sans hesiter', 'Oui, j&apos;espere', 'Je ne sais plus', 'Probablement non', 'Definitivement non'] },

  // --- INTIME (1) ---
  { id: 'wish_couple', category: 'Intime', label: "Si vous pouviez changer UNE chose dans votre dynamique, ce serait quoi ?", type: 'textarea',
    helper: 'Sois concret·e. Texte efface apres generation du rapport.' },
];

// ============================================================
// PARCOURS 3 - PSYCHO COMPLETE (99 EUR) - 48 questions
// Hybride structure : narratif/intime puis clinique structurel
// ============================================================

export const QUESTIONS_COMPLETE: Question[] = [
  // ============= PHASE 1 : DOUCEUR NARRATIVE =============

  // --- IDENTITE & ASTRO (5) ---
  { id: 'name', category: 'Identite', label: "Comment t'appelles-tu ?", type: 'text', placeholder: 'Ton prenom' },
  { id: 'age', category: 'Identite', label: 'Quel age as-tu ?', type: 'text' },
  { id: 'birth_date', category: 'Astrologie', label: 'Ta date de naissance complete', type: 'text', placeholder: '14 novembre 1994' },
  { id: 'birth_time', category: 'Astrologie', label: 'Heure de naissance precise', helper: 'Mets "inconnue" si tu ne sais pas.', type: 'text', placeholder: '22:15' },
  { id: 'birth_city', category: 'Astrologie', label: 'Ville et pays de naissance', type: 'text' },

  // --- ENFANCE NARRATIVE (6) ---
  { id: 'childhood_word', category: 'Enfance', label: "En un mot, comment decrirais-tu ton enfance ?", type: 'text',
    helper: 'Le premier mot qui te vient. Ne cherche pas.' },
  { id: 'childhood_safe', category: 'Enfance', label: 'Te sentais-tu en securite emotionnellement enfant ?', type: 'scale',
    scaleLabels: { min: 'Pas du tout', max: 'Totalement' } },
  { id: 'mother_relation', category: 'Enfance', label: "Decris ta relation a ta mere (ou figure maternelle) en quelques phrases.", type: 'textarea',
    helper: 'Sans filtre. Telle qu&apos;elle etait, telle qu&apos;elle est.' },
  { id: 'father_relation', category: 'Enfance', label: 'Et ta relation a ton pere (ou figure paternelle) ?', type: 'textarea' },
  { id: 'childhood_role', category: 'Enfance', label: 'Quel role jouais-tu dans ta famille ?', type: 'radio',
    options: ["L'enfant parfait·e", 'Le/la rebelle', "L'invisible", "Le/la confident·e d'un parent", "Le/la mediateur·trice", "L'enfant a problemes"] },
  { id: 'childhood_wound', category: 'Enfance', label: "Y a-t-il un evenement marquant de ton enfance qui te suit encore ?", type: 'textarea',
    helper: 'Ce que tu choisis de partager. Texte efface apres analyse.', optional: true },

  // --- LIENS PRIMAIRES (4) ---
  { id: 'family_dynamic', category: 'Famille', label: "Y avait-il des conflits ouverts a la maison ?", type: 'radio',
    options: ['Tres souvent, violents', 'Frequents mais contenus', 'Rares mais intenses', 'Une atmosphere froide/silencieuse', 'Une famille calme et chaleureuse'] },
  { id: 'family_secrets', category: 'Famille', label: "Y a-t-il un sujet tabou ou un secret de famille qui pese encore ?", type: 'textarea', optional: true },
  { id: 'siblings', category: 'Famille', label: "Place dans la fratrie", type: 'radio',
    options: ['Aine·e', 'Cadet·te', 'Du milieu', 'Enfant unique', 'Autre (recompose)'] },
  { id: 'transgenerational', category: 'Famille', label: 'Est-ce qu&apos;un schema familial se repete sur plusieurs generations ?', type: 'textarea',
    helper: 'Ex : divorces, addictions, depression, abandon, secrets...', optional: true },

  // ============= PHASE 2 : VIE AMOUREUSE =============

  // --- HISTOIRE AMOUREUSE (5) ---
  { id: 'orientation', category: 'Amour', label: 'Qui cherches-tu a aimer ?', type: 'radio',
    options: ['Un homme', 'Une femme', 'Ouvert·e aux deux', 'Prefere ne pas preciser'] },
  { id: 'first_love', category: 'Amour', label: 'A quel age as-tu vecu ta premiere relation serieuse ?', type: 'radio',
    options: ['Adolescence', 'Vingtaine', 'Trentaine', 'Plus tard', 'Jamais vraiment'] },
  { id: 'longest_relation', category: 'Amour', label: 'Combien de temps a dure ta plus longue relation ?', type: 'radio',
    options: ['Moins de 1 an', '1 a 3 ans', '3 a 7 ans', '7 a 15 ans', 'Plus de 15 ans', 'Jamais eu de longue relation'] },
  { id: 'relations_pattern', category: 'Amour', label: 'Decris le type de personne que tu attires ou choisis souvent.', type: 'textarea',
    helper: 'Sois precis·e. Plus tu vois clair, plus le rapport voit clair.' },
  { id: 'breakup_main', category: 'Amour', label: 'Qui rompt en general ?', type: 'radio',
    options: ['Toujours moi', "Toujours l'autre", 'Variable', 'Mes relations s&apos;eteignent sans rupture franche'] },

  // --- BIG FIVE COMPLET (10) ---
  { id: 'bf_ouverture_1', category: 'Personnalite', label: "Tu t'ennuies vite avec le convenu et previsible.", type: 'scale',
    scaleLabels: { min: 'Pas du tout', max: 'Totalement' } },
  { id: 'bf_ouverture_2', category: 'Personnalite', label: 'Tu es attire·e par les idees abstraites, l&apos;art, la philosophie.', type: 'scale',
    scaleLabels: { min: 'Peu', max: 'Enormement' } },
  { id: 'bf_conscience_1', category: 'Personnalite', label: 'Tu tiens tes engagements meme quand ca te coute.', type: 'scale',
    scaleLabels: { min: 'Pas vraiment', max: 'Toujours' } },
  { id: 'bf_conscience_2', category: 'Personnalite', label: 'Tu planifies a l&apos;avance plutot que d&apos;improviser.', type: 'scale',
    scaleLabels: { min: 'Improvisation', max: 'Tout planifie' } },
  { id: 'bf_extra_1', category: 'Personnalite', label: 'Tu te ressources mieux seul·e qu&apos;entoure·e.', type: 'scale',
    scaleLabels: { min: 'Faux', max: 'Tres vrai' } },
  { id: 'bf_extra_2', category: 'Personnalite', label: 'Tu prends spontanement la parole dans un groupe.', type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Toujours' } },
  { id: 'bf_agreabilite_1', category: 'Personnalite', label: 'Tu fais souvent passer les besoins des autres avant les tiens.', type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Toujours' } },
  { id: 'bf_agreabilite_2', category: 'Personnalite', label: 'Tu fais confiance facilement aux nouvelles personnes.', type: 'scale',
    scaleLabels: { min: 'Mefiant·e', max: 'Confiant·e' } },
  { id: 'bf_stabilite_1', category: 'Personnalite', label: 'Tes emotions changent rapidement et intensement.', type: 'scale',
    scaleLabels: { min: 'Stable', max: 'Tres mouvant' } },
  { id: 'bf_stabilite_2', category: 'Personnalite', label: 'Tu rumines longtemps apres un conflit ou une critique.', type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Des heures/jours' } },

  // --- ATTACHEMENT APPROFONDI (4) ---
  { id: 'att_silence', category: 'Attachement', label: "Quand quelqu'un que tu aimes ne repond pas pendant 24h :", type: 'scale',
    scaleLabels: { min: 'Aucun stress', max: 'Angoisse forte' } },
  { id: 'att_close', category: 'Attachement', label: "Quand un partenaire devient tres engage, tu ressens :", type: 'scale',
    scaleLabels: { min: 'Soulagement', max: 'Envie de fuir' } },
  { id: 'att_alone', category: 'Attachement', label: "Etre seul·e pendant longtemps, ca te fait :", type: 'radio',
    options: ['Du bien, j&apos;adore', 'Ca me convient un temps', 'Ca devient pesant', 'Ca devient angoissant', 'C&apos;est invivable'] },
  { id: 'att_self_worth', category: 'Attachement', label: 'Sans relation amoureuse, tu te sens entier·e :', type: 'scale',
    scaleLabels: { min: 'Incomplet·e', max: 'Pleinement entier·e' } },

  // ============= PHASE 3 : CLINIQUE STRUCTUREL =============

  // --- TRIADE NOIRE - DEPISTAGE (4) ---
  { id: 'dark_manip', category: 'Clinique', label: 'Tu as deja manipule consciemment quelqu&apos;un pour obtenir ce que tu voulais.', type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Plusieurs fois' } },
  { id: 'dark_special', category: 'Clinique', label: "Tu te sens souvent superieur·e ou plus complexe que les autres.", type: 'scale',
    scaleLabels: { min: 'Jamais', max: 'Souvent' } },
  { id: 'dark_remorse', category: 'Clinique', label: "Quand tu blesses quelqu'un, tu ressens du remords meme s&apos;il ne le sait pas.", type: 'scale',
    scaleLabels: { min: 'Toujours', max: 'Rarement' } },
  { id: 'dark_used', category: 'Clinique', label: "T'es-tu deja senti·e victime de manipulation, gaslighting ou emprise ?", type: 'radio',
    options: ['Plusieurs fois, intensement', 'Une fois, marquant', 'Quelques fois, leger', 'Jamais', 'Je ne suis pas sur·e'] },

  // --- SCHEMAS & THERAPIE (4) ---
  { id: 'therapy_history', category: 'Clinique', label: 'As-tu deja fait une therapie ?', type: 'radio',
    options: ['Oui, en cours', 'Oui, par le passe', 'Non, mais j&apos;y pense', 'Non, ca ne m&apos;interesse pas'] },
  { id: 'mental_health_family', category: 'Clinique', label: 'Antecedents psychiatriques dans la famille ?', type: 'multi',
    options: ['Depression', 'Anxiete severe', 'Bipolarite', 'Addictions', 'Suicide ou tentative', 'Aucun', 'Je ne sais pas'] },
  { id: 'self_diagnose', category: 'Clinique', label: "Y a-t-il un trouble que tu suspectes chez toi ?", type: 'radio',
    options: ['Anxiete', 'Depression', 'Hypersensibilite/HPI', 'TDAH', 'Trauma complexe', 'Borderline', 'Aucun', 'Je prefere ne pas dire'] },
  { id: 'addictions', category: 'Clinique', label: 'As-tu une relation problematique avec quelque chose ?', type: 'multi', optional: true,
    options: ['Alcool', 'Drogues', 'Nourriture', 'Sexe/dating apps', 'Travail', 'Sport extreme', 'Reseaux sociaux', 'Aucune'] },

  // --- VALEURS & FUTUR (3) ---
  { id: 'values_priority', category: 'Valeurs', label: "Ce qui compte le plus pour toi aujourd&apos;hui :", type: 'radio',
    options: ["L'epanouissement personnel", 'La securite materielle', 'Une relation profonde', "L'impact sur le monde", 'La paix interieure', 'La famille'] },
  { id: 'kids', category: 'Valeurs', label: 'Et les enfants ?', type: 'radio',
    options: ['Indispensables', 'Ouverture', 'Plutot non', 'Certain·e que non', 'J&apos;en ai deja'] },
  { id: 'spiritual', category: 'Valeurs', label: 'As-tu une pratique spirituelle, religieuse ou contemplative ?', type: 'textarea', optional: true },

  // --- PROFIL OMBRE & INTIME (3) ---
  { id: 'shadow_self', category: 'Intime', label: "Decris la version de toi que tu n'aimes pas ou que tu caches.", type: 'textarea',
    helper: 'Approche jungienne. Texte efface apres analyse. Personne ne le lit.', optional: true },
  { id: 'wound_main', category: 'Intime', label: "Quelle est la blessure centrale de ta vie, celle qui colore tout ?", type: 'textarea', optional: true },
  { id: 'wish_deep', category: 'Intime', label: "Si tu pouvais te liberer d'UNE chose en toi, ce serait quoi ?", type: 'textarea',
    helper: "Ferme les yeux 10 secondes avant de repondre.", optional: true },
];

// ============================================================
// HELPER : selectionner le bon questionnaire
// ============================================================

export function getQuestionnaireForOffer(offerId: string | null): Question[] {
  switch (offerId) {
    case 'complete':
      return QUESTIONS_COMPLETE;
    case 'couple':
      return QUESTIONS_COUPLE;
    case 'celibataire':
    default:
      return QUESTIONS_CELIBATAIRE;
  }
}

export function getEstimatedTime(offerId: string | null): string {
  switch (offerId) {
    case 'complete':
      return '~15 minutes';
    case 'couple':
      return '~6 minutes';
    case 'celibataire':
    default:
      return '~9 minutes';
  }
}
