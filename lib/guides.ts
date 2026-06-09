import { INTL_GUIDES } from './guidesIntl';
import { NEW_GUIDES } from './newGuides';
import { PRO_GUIDES } from './proGuides';
import { PRO_GUIDES_2 } from './proGuides2';
import { PRO_GUIDES_3 } from './proGuides3';
import { PRO_GUIDES_4 } from './proGuides4';
import { PRO_GUIDES_5 } from './proGuides5';
import { PRO_GUIDES_6 } from './proGuides6';
import { PRO_GUIDES_7 } from './proGuides7';
import { PRO_GUIDES_8 } from './proGuides8';
import { PRO_GUIDES_11 } from './proGuides11';
import { PRO_GUIDES_12 } from './proGuides12';

type GuideMeta = {
  id: string;
  name: string;
  priceCents: number;
  currency: 'eur';
  pdf: string;
  blurb: string;
  bullets: readonly string[];
  lang?: 'en' | 'fr';
};

const _base = {
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
  'se-reapproprier-sexualite': {
    id: 'se-reapproprier-sexualite',
    name: 'Guide Se réapproprier sa sexualité — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/se-reapproprier-sa-sexualite-4-approches.pdf',
    blurb:
      'Ta sexualité t\'appartient — mais des années de messages, de silences ou de blessures ont parfois brouillé ce lien. Ce guide t\'accompagne à travers 4 regards TCC pour renouer avec ton désir, ton corps et ton plaisir, à ton propre rythme, sans honte.',
    bullets: [
      'Comprendre ce qui a été mis de côté — identifier les messages reçus qui ont façonné ta relation à ta sexualité',
      'Déconstruire la honte — restructuration cognitive des croyances limitantes sur le désir et le plaisir',
      'Reconnecter avec ton corps — exercices d\'ancrage et de pleine conscience pour retrouver le lien corporel',
      'Reprendre la main — poser des limites, exprimer ses besoins et habiter sa sexualité avec confiance',
      'Cahier d\'exercices — espaces de réflexion guidés pour avancer à ton propre rythme',
    ],
  },
  'desir-intimite': {
    id: 'desir-intimite',
    name: 'Guide Désir & intimité — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/desir-et-intimite-4-approches.pdf',
    blurb:
      'Le désir n\'est pas un interrupteur. Il fluctue, se transforme, parfois disparaît — et c\'est normal. Ce guide t\'aide à comprendre tes cycles du désir, lever les freins à l\'intimité et cultiver une connexion authentique, seul·e ou à deux.',
    bullets: [
      'Comprendre les cycles du désir — différencier désir spontané et réactif, normaliser les variations',
      'Ce qui bloque l\'intimité — identifier les freins émotionnels, cognitifs et relationnels au désir',
      'Communiquer sur le désir — scripts TCC pour parler d\'intimité sans honte ni crainte du rejet',
      'Cultiver la connexion — exercices pour nourrir l\'intimité émotionnelle et physique au quotidien',
      'Cahier d\'exercices — mises en situation et espaces de réflexion pour avancer seul·e ou à deux',
    ],
  },
  'sexualite-image-corps': {
    id: 'sexualite-image-corps',
    name: 'Guide Sexualité & image du corps — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/sexualite-et-image-du-corps-4-approches.pdf',
    blurb:
      'Ce que tu penses de ton corps s\'invite dans ton lit avant toi. Ce guide t\'accompagne à travers 4 regards TCC pour déconstruire la honte corporelle, habiter ton corps avec douceur et retrouver une présence apaisée dans l\'intimité.',
    bullets: [
      'Ce que tu penses de ton corps dans l\'intimité — identifier les pensées automatiques négatives',
      'D\'où vient la honte du corps — déconstruire les standards imposés et leurs effets sur le désir',
      'Habiter son corps avec douceur — exercices de pleine conscience corporelle et de décentration',
      'Se montrer, se donner, se recevoir — reconstruire une présence apaisée dans l\'intimité',
      'Cahier d\'exercices — exercices d\'ancrage corporel et de restructuration cognitive guidés',
    ],
  },
  'sexualite-black': {
    id: 'sexualite-black',
    name: 'Guide Sexualité black — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/sexualite-black-4-approches.pdf',
    blurb:
      'Entre hypersexualisation, tabous communautaires et regard racial, ta sexualité a grandi dans un terrain chargé. Ce guide t\'accompagne à travers 4 regards TCC pour distinguer ce qui vient de toi et ce que le monde a déposé — et habiter ton désir en terrain propre.',
    bullets: [
      'L\'hypersexualisation et ses effets — comprendre comment le regard extérieur s\'est infiltré dans ton rapport à toi-même',
      'Les tabous internes — déconstruire les silences et injonctions sur la sexualité dans les communautés noires',
      'Désirer et être désiré·e — différencier désir authentique et performance imposée par le regard racial',
      'Habiter sa sexualité en terrain propre — construire une relation à soi libre du regard racial',
      'Cahier d\'exercices — espaces de réflexion et exercices d\'affirmation identitaire',
    ],
  },
  'anxiete-pensees-negatives': {
    id: 'anxiete-pensees-negatives',
    name: 'Guide Anxiété & pensées négatives — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/anxiete-et-pensees-negatives-4-approches.pdf',
    blurb:
      'Le mental s\'emballe, les ruminations tournent en boucle, les pensées négatives s\'installent. Ce guide t\'accompagne à travers 4 regards TCC concrets pour apaiser le mental, défaire les spirales de pensées et reprendre la main — en auto-aide, à ton rythme.',
    bullets: [
      'D\'où vient ta petite voix — comprendre l\'origine de tes pensées automatiques et de tes ruminations',
      'Repérer et nuancer tes pensées — identifier les distorsions cognitives et les reformuler avec justesse',
      'T\'accueillir sans te juger — cultiver l\'auto-compassion pour sortir des spirales d\'autocritique',
      'Ton environnement et tes boucles — identifier les déclencheurs externes qui alimentent l\'anxiété',
      'Carnet de pensées — espaces guidés pour observer, noter et transformer tes schémas de pensée',
    ],
  },
  'gestion-solitude': {
    id: 'gestion-solitude',
    name: 'Guide Apprivoiser la solitude — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/gestion-solitude-4-approches.pdf',
    blurb:
      'La solitude peut faire mal, ou devenir une ressource. Ce guide t\'accompagne à travers 4 regards TCC pour traverser la solitude autrement — en te reliant d\'abord à toi-même, puis aux autres, à ton propre rythme.',
    bullets: [
      'Ce que la solitude réveille — identifier les émotions et les besoins que la solitude met à nu',
      'Les pensées qui isolent — repérer les distorsions cognitives qui renforcent le sentiment de solitude',
      'La relation à soi — construire une présence intérieure apaisée pour ne plus fuir le silence',
      'Tisser du lien — créer des connexions authentiques sans se perdre dans le besoin d\'être accepté·e',
      'Cahier d\'exercices — espaces de réflexion guidés pour avancer vers une solitude choisie',
    ],
  },
  'gestion-celibat': {
    id: 'gestion-celibat',
    name: 'Guide Bien vivre son célibat — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/gestion-celibat-4-approches.pdf',
    blurb:
      'Le célibat n\'est pas une salle d\'attente. Ce guide t\'accompagne à travers 4 regards TCC pour t\'épanouir pleinement — en couple ou non — et habiter ta valeur hors de tout statut relationnel.',
    bullets: [
      'Ce que le célibat te raconte — décrypter les croyances et les histoires que tu te racontes sur toi-même',
      'Le piège du « il me manque quelqu\'un » — défaire la pensée du manque et de l\'incomplétude',
      'Une vie pleine maintenant — construire désir, projet et joie sans attendre une relation pour commencer',
      'Pressions et regards — naviguer les injonctions sociales et familiales sans en faire une honte',
      'Cahier d\'exercices — espaces guidés pour clarifier ce que tu veux vraiment et avancer librement',
    ],
  },
  'confiance-estime-de-soi': {
    id: 'confiance-estime-de-soi',
    name: 'Guide Confiance & estime de soi — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/confiance-estime-de-soi-4-approches.pdf',
    blurb:
      "L'estime de soi ne se décrète pas — elle se construit, un regard intérieur à la fois. Ce guide t'accompagne à travers 4 approches TCC pour identifier les racines de tes pensées dévalorisantes et bâtir une valeur inconditionnelle.",
    bullets: [
      'Les racines de ton estime — d\'où viennent les croyances sur ta valeur et comment elles se sont formées',
      'Repérer tes pensées dévalorisantes — identifier et nommer les distorsions cognitives qui t\'effacent',
      'Une valeur inconditionnelle — construire une estime stable qui ne dépend pas des performances ou du regard des autres',
      'Ton environnement et tes comparaisons — sortir des dynamiques qui érodent ta confiance au quotidien',
      'Cahier d\'exercices — espaces guidés pour ancrer de nouvelles croyances sur toi-même',
    ],
  },
  'styles-attachement': {
    id: 'styles-attachement',
    name: "Guide Styles d'attachement — 4 approches",
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/styles-attachement-4-approches.pdf',
    blurb:
      "Ton style d'attachement s'est formé bien avant tes premières relations amoureuses. Ce guide t'aide à comprendre d'où il vient, ce qu'il active en toi — et comment évoluer vers une base sécure, seul·e ou à deux.",
    bullets: [
      "D'où vient ton style — comprendre la formation de l'attachement et ses traces dans tes relations actuelles",
      "Les pensées de l'anxieux et de l'évitant — identifier les schémas cognitifs propres à chaque style",
      'Vers une base sécure — exercices TCC pour moduler les réponses automatiques d\'anxiété ou de retrait',
      'La danse anxieux-évitant — comprendre et sortir des dynamiques de couple les plus courantes',
      'Cahier d\'exercices — mises en situation pour répondre autrement à la peur du rejet ou de la proximité',
    ],
  },
  'guerir-rupture': {
    id: 'guerir-rupture',
    name: "Guide Guérir d'une rupture — 4 approches",
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/guerir-rupture-4-approches.pdf',
    blurb:
      "Une rupture ne fait pas que perdre quelqu'un — elle remet en question qui on est. Ce guide t'accompagne à travers 4 approches TCC pour traverser la douleur, sortir de la rumination et te retrouver.",
    bullets: [
      'Pourquoi ça fait si mal — comprendre ce que la rupture active vraiment sur le plan psychologique',
      'Sortir de la rumination — identifier les pensées qui entretiennent la souffrance et les interrompre',
      'Te retrouver — reconnecter avec ton identité propre, en dehors de la relation perdue',
      'Reconstruire ton monde — réinvestir ta vie, tes liens et ton avenir sans te fermer à la suite',
      'Cahier d\'exercices — espaces de deuil guidés et exercices de reconstruction pas à pas',
    ],
  },
  'foi-identite-bien-etre': {
    id: 'foi-identite-bien-etre',
    name: 'Guide Foi, identité & bien-être — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/foi-identite-bien-etre-4-approches.pdf',
    blurb: "Ta foi a façonné qui tu es — ce guide t'accompagne à travers 4 regards TCC pour distinguer ce qui vient de toi, gérer la culpabilité religieuse et habiter une spiritualité qui te ressemble vraiment.",
    bullets: [
      "Ce que la foi a déposé en toi — explorer les messages, valeurs et injonctions issus de ta pratique religieuse",
      "La culpabilité et les pensées rigides — identifier les distorsions cognitives d'origine religieuse et les restructurer",
      "Ta foi, ton chemin — distinguer ce qui vient de toi de ce qui t'a été imposé",
      "Foi, famille & modernité — naviguer les tensions entre tes croyances, tes proches et ta vie actuelle",
      "Cahier d'exercices — espaces guidés pour clarifier ta spiritualité et avancer à ton rythme",
    ],
  },
  'misogynoir': {
    id: 'misogynoir',
    name: 'Guide Misogynoir — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/misogynoir-4-approches.pdf',
    blurb: "La misogynoir — cette violence croisée du racisme et du sexisme — laisse des traces profondes ; ce guide t'accompagne à travers 4 regards TCC pour les nommer, les déconstruire et affirmer ton droit d'être pleinement toi.",
    bullets: [
      "Ce que la misogynoir a déposé en toi — comprendre comment le racisme genré a façonné ton image de toi-même",
      "Quand les stéréotypes parlent à ta place — identifier les pensées automatiques issues de la misogynoir et les déconstruire",
      "Ton droit d'être pleinement toi — affirmer ton identité au-delà des projections racistes et sexistes",
      "Te protéger & t'entourer — construire des espaces de sécurité et un entourage qui te reconnaît vraiment",
      "Cahier d'exercices — espaces de réflexion et d'affirmation identitaire guidés",
    ],
  },
  'charge-raciale': {
    id: 'charge-raciale',
    name: 'Guide La charge raciale — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/charge-raciale-4-approches.pdf',
    blurb: "Porter la charge raciale au quotidien épuise sans qu'on le nomme ; ce guide t'accompagne à travers 4 regards TCC pour reconnaître le poids invisible, te reposer sans culpabilité et alléger ce que tu portes seul·e.",
    bullets: [
      "Le poids invisible — nommer la charge raciale et comprendre comment elle s'accumule au fil des interactions",
      "La vigilance et l'épuisement — identifier les effets de l'hypervigilance raciale sur le corps et le mental",
      "Ton droit au repos — te permettre de poser la charge sans culpabilité ni sentiment de trahison",
      "Alléger la charge & t'entourer — trouver des stratégies concrètes et un cercle de soutien adapté",
      "Cahier d'exercices — espaces guidés pour nommer, déposer et reprendre autrement",
    ],
  },
  'racisme-au-quotidien': {
    id: 'racisme-au-quotidien',
    name: 'Guide Racisme au quotidien — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/racisme-au-quotidien-4-approches.pdf',
    blurb: "Le racisme ordinaire s'accumule en silence et laisse des traces que tu ne vois pas toujours ; ce guide t'accompagne à travers 4 regards TCC pour gérer l'après, préserver ta joie et te protéger.",
    bullets: [
      "Ce que le racisme répété laisse — comprendre les effets cumulatifs des microagressions sur le psychisme",
      "Gérer les pensées après une agression — des outils TCC pour apaiser le mental et interrompre la rumination",
      "Préserver ta dignité et ta joie — maintenir ton intégrité et ton bien-être dans un contexte hostile",
      "Te protéger & t'entourer — identifier tes stratégies de protection et construire un environnement sûr",
      "Cahier d'exercices — espaces de traitement émotionnel et de reconstruction après les incidents",
    ],
  },
  'colorisme': {
    id: 'colorisme',
    name: 'Guide Colorisme — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/colorisme-4-approches.pdf',
    blurb: "Les hiérarchies de teintes ont façonné ton rapport à ta peau sans que tu l'aies choisi ; ce guide t'accompagne à travers 4 regards TCC pour déconstruire ces messages et habiter ta beauté sans hiérarchie.",
    bullets: [
      "Les messages sur ta peau — comprendre d'où viennent les hiérarchies de teintes et comment elles ont façonné ton regard sur toi",
      "Les pensées sur ta valeur — identifier et restructurer les croyances limitantes liées à la couleur de peau",
      "Ta beauté sans hiérarchie — construire un rapport à ta peau et à ton apparence libre du colorisme",
      "Sortir de la hiérarchie coloriste — naviguer les dynamiques coloristes dans ta famille, ta communauté et la société",
      "Cahier d'exercices — exercices d'affirmation corporelle et de restructuration cognitive guidés",
    ],
  },
  'dating-femme-noire': {
    id: 'dating-femme-noire',
    name: 'Guide Dating en tant que femme noire — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/dating-femme-noire-4-approches.pdf',
    blurb: "Le dating en tant que femme noire réveille des blessures d'identité et de désirabilité ; ce guide t'accompagne à travers 4 regards TCC pour te choisir d'abord, gérer les pensées saboteuses et protéger ton cœur.",
    bullets: [
      "Ce que le dating réveille — comprendre pourquoi rencontrer réactive des blessures d'identité et de désirabilité racialisée",
      "Les pensées qui sabotent — identifier les distorsions cognitives qui t'empêchent de te montrer pleinement",
      "Te choisir d'abord — construire une base interne solide pour entrer dans les relations depuis la force",
      "Protéger ton cœur — poser des limites saines et gérer la fatigue émotionnelle du dating",
      "Cahier d'exercices — espaces guidés pour clarifier ce que tu cherches et avancer en confiance",
    ],
  },
  'parentalite-noire': {
    id: 'parentalite-noire',
    name: 'Guide Parentalité noire — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/parentalite-noire-4-approches.pdf',
    blurb: "Être parent noir·e, c'est transmettre une fierté et préparer sans transmettre la peur ; ce guide t'accompagne à travers 4 regards TCC pour nourrir l'identité de ton enfant et construire un village autour de lui.",
    bullets: [
      "Ce que tu transmets — prendre conscience des héritages émotionnels et culturels que tu passes à ton enfant",
      "Préparer sans transmettre la peur — équiper ton enfant face au racisme sans l'alourdir de ton anxiété",
      "Nourrir sa fierté — construire une identité noire positive, solide et joyeuse chez ton enfant",
      "Construire un village — créer un environnement communautaire qui soutient ton enfant et toi dans la durée",
      "Cahier d'exercices — espaces de réflexion pour avancer dans ta parentalité avec conscience et douceur",
    ],
  },
  'syndrome-imposteur': {
    id: 'syndrome-imposteur',
    name: "Guide Syndrome de l'imposteur — 4 approches",
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/syndrome-imposteur-4-approches.pdf',
    blurb: "Le syndrome de l'imposteur touche particulièrement celles et ceux qui évoluent dans des espaces où ils ne se reconnaissent pas ; ce guide t'accompagne à travers 4 regards TCC pour démonter les pensées d'imposteur et t'autoriser ta place.",
    bullets: [
      "D'où vient ton sentiment — comprendre les racines du syndrome de l'imposteur et ses liens avec la race, le genre et la classe",
      "Démonter les pensées d'imposteur — identifier les distorsions cognitives et les restructurer avec des preuves concrètes",
      "T'autoriser ta légitimité — construire une relation à ta compétence basée sur les faits, pas sur les peurs",
      "Le système et ta place — comprendre comment les biais systémiques alimentent le syndrome de l'imposteur",
      "Cahier d'exercices — mises en situation et exercices d'ancrage de la légitimité",
    ],
  },
  'croyances-argent': {
    id: 'croyances-argent',
    name: "Guide Croyances sur l'argent — 4 approches",
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/croyances-argent-4-approches.pdf',
    blurb: "Tes croyances sur l'argent ont été formées bien avant tes premiers euros ; ce guide t'accompagne à travers 4 regards TCC pour identifier les héritages limitants, les restructurer et construire un rapport sain à l'argent.",
    bullets: [
      "Tes croyances héritées — identifier les messages reçus sur l'argent dans ta famille, ta culture et ta communauté",
      "Les pensées qui te limitent — repérer les distorsions cognitives qui sabotent ta relation à l'argent",
      "Ton rapport sain à l'argent — construire une relation à l'argent qui reflète tes valeurs, pas tes peurs héritées",
      "Argent, famille & milieu — naviguer les tensions entre ton évolution financière et tes origines",
      "Cahier d'exercices — espaces guidés pour transformer ta relation à l'argent pas à pas",
    ],
  },
  'mentalite-abondance': {
    id: 'mentalite-abondance',
    name: "Guide Mentalité d'abondance — 4 approches",
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/mentalite-abondance-4-approches.pdf',
    blurb: "La mentalité de rareté s'apprend — et peut se défaire ; ce guide t'accompagne à travers 4 regards TCC pour comprendre les racines du manque, cultiver l'abondance intérieure et modifier ton environnement.",
    bullets: [
      "Les racines de la rareté — comprendre d'où vient la mentalité de manque et comment elle s'est installée",
      "Sortir des pensées de manque — identifier les croyances limitantes de rareté et les restructurer vers l'abondance",
      "Cultiver l'abondance intérieure — développer un rapport à la vie basé sur la gratitude et la confiance",
      "Ton environnement et l'abondance — repérer et modifier les dynamiques extérieures qui alimentent la rareté",
      "Cahier d'exercices — pratiques quotidiennes pour ancrer une nouvelle relation à l'abondance",
    ],
  },
  'honte-de-classe': {
    id: 'honte-de-classe',
    name: 'Guide Honte de classe — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/honte-de-classe-4-approches.pdf',
    blurb: "La honte de ses origines sociales se loge profondément et silencieusement ; ce guide t'accompagne à travers 4 regards TCC pour la nommer, déconstruire les pensées dévalorisantes et naviguer entre les milieux sans te trahir.",
    bullets: [
      "La honte de tes origines — nommer la honte de classe et comprendre d'où elle vient",
      "Les pensées qui te rabaissent — identifier les distorsions cognitives liées à l'origine sociale et les restructurer",
      "Ta valeur quelle que soit l'origine — construire une estime de soi stable et inconditionnelle",
      "Naviguer entre les milieux — gérer l'inconfort d'évoluer entre des mondes sociaux différents sans te renier",
      "Cahier d'exercices — espaces de réflexion guidés pour réconcilier tes origines et ta trajectoire",
    ],
  },
  'oser-ta-valeur-tarifs': {
    id: 'oser-ta-valeur-tarifs',
    name: 'Guide Oser ta valeur & tes tarifs — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/oser-ta-valeur-tarifs-4-approches.pdf',
    blurb: "Te sous-évaluer n'est pas de la modestie — c'est souvent de la peur héritée ; ce guide t'accompagne à travers 4 regards TCC pour comprendre pourquoi, restructurer tes croyances et oser un prix juste pour ce que tu apportes.",
    bullets: [
      "Pourquoi tu te sous-évalues — comprendre les racines psychologiques, culturelles et sociales de la dévaluation de soi",
      "Les pensées qui plombent tes prix — identifier et restructurer les croyances limitantes sur ta valeur marchande",
      "Ta valeur a un prix juste — construire une relation à tes tarifs basée sur ta compétence réelle",
      "Le marché & oser — comprendre les dynamiques de marché et s'affirmer dans les négociations",
      "Cahier d'exercices — mises en situation pour pratiquer l'affirmation de ta valeur",
    ],
  },
  'anxiete-financiere': {
    id: 'anxiete-financiere',
    name: 'Guide Anxiété financière — 4 approches',
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/anxiete-financiere-4-approches.pdf',
    blurb: "L'anxiété financière paralyse et épuise en silence ; ce guide t'accompagne à travers 4 regards TCC pour apaiser le mental d'argent, dissocier ta valeur de ton compte et reprendre pied concrètement.",
    bullets: [
      "Ce que la peur de manquer réveille — comprendre les origines de l'anxiété financière et ce qu'elle active",
      "Calmer le mental d'argent — des outils TCC pour apaiser les spirales de pensées liées à l'argent",
      "Ta valeur n'est pas ton compte — dissocier ton estime de soi de ton état financier",
      "Reprendre du concret & t'entourer — des actions tangibles pour sortir de la paralysie et un soutien adapté",
      "Cahier d'exercices — espaces guidés pour reprendre le contrôle pas à pas",
    ],
  },
  'argent-couple': {
    id: 'argent-couple',
    name: "Guide L'argent dans le couple — 4 approches",
    priceCents: 1900,
    currency: 'eur' as const,
    pdf: '/guides/argent-couple-4-approches.pdf',
    blurb: "L'argent est l'un des premiers terrains de conflit dans les couples car chacun arrive avec ses héritages ; ce guide t'accompagne à travers 4 regards TCC pour comprendre vos histoires respectives et construire un système équitable.",
    bullets: [
      "Vos histoires d'argent — comprendre les héritages financiers de chaque partenaire et leur impact invisible sur le couple",
      "Désamorcer les conflits — des outils TCC pour gérer les tensions autour de l'argent et sortir des impasses",
      "Parler d'argent en confiance — construire une communication ouverte et bienveillante sur les finances communes",
      "Un système équitable — créer une organisation financière qui reflète vos valeurs et votre dynamique de couple",
      "Cahier d'exercices — exercices à faire seul·e ou à deux pour aligner vos visions et avancer ensemble",
    ],
  },
} as const;

const _mapped = Object.fromEntries(
  INTL_GUIDES
    .filter(g => !(g.id in _base))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: g.pdf,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _extra: Record<string, GuideMeta> = {
  'misogynoir-en': {
    id: 'misogynoir-en',
    name: 'Misogynoir',
    priceCents: 1900,
    currency: 'eur',
    pdf: '/guides/misogynoir-4-approaches.pdf',
    blurb: 'Free yourself from the tropes, reclaim your full humanity.',
    bullets: [
      'Four psychology lenses: psychodynamic, CBT, humanistic, systemic',
      'Psychoeducation + guided written exercises',
      '11-page printable workbook-guide (instant PDF)',
    ],
    lang: 'en',
  },
  'black-tax-en': {
    id: 'black-tax-en',
    name: 'Black Tax',
    priceCents: 1900,
    currency: 'eur',
    pdf: '/guides/black-tax-4-approaches.pdf',
    blurb: 'Supporting your people without losing yourself.',
    bullets: [
      'Four psychology lenses: psychodynamic, CBT, humanistic, systemic',
      'Psychoeducation + guided written exercises',
      '11-page printable workbook-guide (instant PDF)',
    ],
    lang: 'en',
  },
};

const _new_mapped = Object.fromEntries(
  NEW_GUIDES
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro_mapped = Object.fromEntries(
  PRO_GUIDES
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro2_mapped = Object.fromEntries(
  PRO_GUIDES_2
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped) && !(g.id in _pro_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro3_mapped = Object.fromEntries(
  PRO_GUIDES_3
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped) && !(g.id in _pro_mapped) && !(g.id in _pro2_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro4_mapped = Object.fromEntries(
  PRO_GUIDES_4
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped) && !(g.id in _pro_mapped) && !(g.id in _pro2_mapped) && !(g.id in _pro3_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro5_mapped = Object.fromEntries(
  PRO_GUIDES_5
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped) && !(g.id in _pro_mapped) && !(g.id in _pro2_mapped) && !(g.id in _pro3_mapped) && !(g.id in _pro4_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro6_mapped = Object.fromEntries(
  PRO_GUIDES_6
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped) && !(g.id in _pro_mapped) && !(g.id in _pro2_mapped) && !(g.id in _pro3_mapped) && !(g.id in _pro4_mapped) && !(g.id in _pro5_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro7_mapped = Object.fromEntries(
  PRO_GUIDES_7
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped) && !(g.id in _pro_mapped) && !(g.id in _pro2_mapped) && !(g.id in _pro3_mapped) && !(g.id in _pro4_mapped) && !(g.id in _pro5_mapped) && !(g.id in _pro6_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro8_mapped = Object.fromEntries(
  PRO_GUIDES_8
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped) && !(g.id in _pro_mapped) && !(g.id in _pro2_mapped) && !(g.id in _pro3_mapped) && !(g.id in _pro4_mapped) && !(g.id in _pro5_mapped) && !(g.id in _pro6_mapped) && !(g.id in _pro7_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro11_mapped = Object.fromEntries(
  PRO_GUIDES_11
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped) && !(g.id in _pro_mapped) && !(g.id in _pro2_mapped) && !(g.id in _pro3_mapped) && !(g.id in _pro4_mapped) && !(g.id in _pro5_mapped) && !(g.id in _pro6_mapped) && !(g.id in _pro7_mapped) && !(g.id in _pro8_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

const _pro12_mapped = Object.fromEntries(
  PRO_GUIDES_12
    .filter(g => !(g.id in _base) && !(g.id in _mapped) && !(g.id in _extra) && !(g.id in _new_mapped) && !(g.id in _pro_mapped) && !(g.id in _pro2_mapped) && !(g.id in _pro3_mapped) && !(g.id in _pro4_mapped) && !(g.id in _pro5_mapped) && !(g.id in _pro6_mapped) && !(g.id in _pro7_mapped) && !(g.id in _pro8_mapped) && !(g.id in _pro11_mapped))
    .map(g => [g.id, {
      id: g.id,
      name: g.title,
      priceCents: g.priceCents,
      currency: 'eur' as const,
      pdf: `/guides/${g.pdf}`,
      blurb: g.blurb,
      bullets: g.bullets,
      lang: g.lang,
    }])
) as Record<string, GuideMeta>;

export const GUIDES: Record<string, GuideMeta> = { ..._base, ..._mapped, ..._extra, ..._new_mapped, ..._pro_mapped, ..._pro2_mapped, ..._pro3_mapped, ..._pro4_mapped, ..._pro5_mapped, ..._pro6_mapped, ..._pro7_mapped, ..._pro8_mapped, ..._pro11_mapped, ..._pro12_mapped };
export type GuideId = string;
