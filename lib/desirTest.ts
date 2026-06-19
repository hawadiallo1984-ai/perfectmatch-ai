// Test gratuit "Quel est ton rapport au désir et à l'intimité ?" (18+).
// Aimant à trafic + capture email, sur le modèle du test des blessures.
// 9 questions -> 4 profils. Chaque option porte un profil (P1..P4). Le profil majoritaire = résultat.
// Tie-break : ordre de priorité ["pudeur-blocage","sous-pression","quete-connexion","desir-en-veille"].
// Upload dans lib/desirTest.ts.

export type DesirProfile = "desir-en-veille" | "sous-pression" | "pudeur-blocage" | "quete-connexion";

export const DESIR_QUESTIONS: { id: string; q: string; options: { label: string; profile: DesirProfile }[] }[] = [
  { id: "q1", q: "Quand tu penses à ta vie intime en ce moment, ce qui revient le plus :", options: [
    { label: "J'ai peu d'envie, je me sens un peu éteint·e", profile: "desir-en-veille" },
    { label: "J'ai peur de ne pas être à la hauteur", profile: "sous-pression" },
    { label: "J'ai du mal à me lâcher, une gêne, une pudeur", profile: "pudeur-blocage" },
    { label: "Un décalage avec mon/ma partenaire", profile: "quete-connexion" },
  ]},
  { id: "q2", q: "Ce qui freine le plus ton désir :", options: [
    { label: "Fatigue, charge mentale, stress", profile: "desir-en-veille" },
    { label: "La pression de « bien faire », de performer", profile: "sous-pression" },
    { label: "Une honte ou des tabous intériorisés", profile: "pudeur-blocage" },
    { label: "Le manque de complicité ou de communication", profile: "quete-connexion" },
  ]},
  { id: "q3", q: "Dans l'intimité, tu te dis souvent :", options: [
    { label: "« Je devrais avoir plus envie »", profile: "desir-en-veille" },
    { label: "« Et si je n'y arrivais pas, si je décevais »", profile: "sous-pression" },
    { label: "« Je n'ose pas dire ou montrer ce que j'aime »", profile: "pudeur-blocage" },
    { label: "« On ne se comprend plus vraiment »", profile: "quete-connexion" },
  ]},
  { id: "q4", q: "Ton corps, tes sensations :", options: [
    { label: "Comme déconnecté·e, peu de désir qui monte", profile: "desir-en-veille" },
    { label: "Sous tension, je m'observe / me surveille", profile: "sous-pression" },
    { label: "Difficiles à habiter sans gêne", profile: "pudeur-blocage" },
    { label: "Ça va pour moi, mais pas en phase avec l'autre", profile: "quete-connexion" },
  ]},
  { id: "q5", q: "Quand le sujet « intimité » arrive dans ta tête ou ton couple :", options: [
    { label: "Ça me semble loin, peu prioritaire", profile: "desir-en-veille" },
    { label: "Ça crée de l'anxiété", profile: "sous-pression" },
    { label: "Ça me met mal à l'aise, pudique", profile: "pudeur-blocage" },
    { label: "Ça révèle des désaccords", profile: "quete-connexion" },
  ]},
  { id: "q6", q: "Ce que tu aimerais le plus :", options: [
    { label: "Retrouver l'envie, la libido", profile: "desir-en-veille" },
    { label: "Me détendre, sortir de la pression", profile: "sous-pression" },
    { label: "M'autoriser, lever la honte et les blocages", profile: "pudeur-blocage" },
    { label: "Nous reconnecter, mieux communiquer", profile: "quete-connexion" },
  ]},
  { id: "q7", q: "Face à ton/ta partenaire (ou à l'idée d'une relation) :", options: [
    { label: "Je manque d'élan, d'envie", profile: "desir-en-veille" },
    { label: "Je crains le jugement ou la comparaison", profile: "sous-pression" },
    { label: "Je me retiens, je n'ose pas", profile: "pudeur-blocage" },
    { label: "On n'a pas les mêmes attentes ou rythmes", profile: "quete-connexion" },
  ]},
  { id: "q8", q: "Ce qui décrit le mieux ces derniers temps :", options: [
    { label: "« Mon désir s'est mis en pause »", profile: "desir-en-veille" },
    { label: "« Je vis l'intimité comme un examen »", profile: "sous-pression" },
    { label: "« Je n'arrive pas à lâcher prise »", profile: "pudeur-blocage" },
    { label: "« On n'est pas synchro »", profile: "quete-connexion" },
  ]},
  { id: "q9", q: "Si une seule chose pouvait changer :", options: [
    { label: "Que l'envie revienne", profile: "desir-en-veille" },
    { label: "Que la pression disparaisse", profile: "sous-pression" },
    { label: "Que je m'autorise pleinement", profile: "pudeur-blocage" },
    { label: "Qu'on se retrouve à deux", profile: "quete-connexion" },
  ]},
];

// Résultat + recommandations (guideIds et packId existants dans le catalogue).
export const DESIR_RESULTS: Record<DesirProfile, {
  title: string; emoji: string; message: string; guideIds: string[]; packId: string;
}> = {
  "desir-en-veille": {
    title: "Le désir en veille", emoji: "🌙",
    message: "Ton désir s'est mis en pause — souvent à cause de la fatigue, de la charge mentale ou de la routine. Rien n'est cassé : le désir se cultive, et il peut se réveiller en douceur.",
    guideIds: ["communiquer-desirs-limites", "raviver-le-desir", "se-reapproprier-son-plaisir", "retrouver-sa-libido-femme"],
    packId: "pack-intimite-sexualite",
  },
  "sous-pression": {
    title: "Sous pression", emoji: "🎯",
    message: "Tu vis l'intimité comme une évaluation : peur de décevoir, de ne pas être à la hauteur. Cette anxiété de performance est très fréquente, et surtout : elle se travaille. Moins de pression = plus de plaisir.",
    guideIds: ["communiquer-desirs-limites", "anxiete-performance-sexuelle-homme", "depasser-injonctions-virilite", "se-reapproprier-son-plaisir"],
    packId: "pack-intimite-sexualite",
  },
  "pudeur-blocage": {
    title: "Entre pudeur et blocage", emoji: "🔑",
    message: "Le désir est là, mais la honte, les tabous ou la difficulté à lâcher prise le freinent. Ces blocages sont surtout psychologiques — et tu as le droit de t'autoriser ton plaisir.",
    guideIds: ["communiquer-desirs-limites", "depasser-honte-blocages-sexuels", "parler-de-sexe-sans-tabou", "explorer-ses-fantasmes"],
    packId: "pack-intimite-sexualite",
  },
  "quete-connexion": {
    title: "En quête de connexion", emoji: "💞",
    message: "Ce qui pèse, c'est le décalage avec ton/ta partenaire : rythmes, attentes, communication. Se reconnecter et oser se parler change tout — souvent plus que la « technique ».",
    guideIds: ["communiquer-desirs-limites", "raviver-le-desir", "desirs-desaccordes", "parler-de-sexe-sans-tabou"],
    packId: "pack-intimite-sexualite",
  },
};
