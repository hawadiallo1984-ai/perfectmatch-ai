// Contenu de la séquence de bienvenue (FR). Upload dans lib/welcomeEmails.ts.
// Utilisé par /api/subscribe (email jour 0) et /api/cron/drip (jours 2,4,6).
export const WELCOME_FROM = 'EvaTalk <bonjour@eva-talk-coach.com>';
export const WELCOME_REPLY_TO = 'hawa.diallo1984@gmail.com';
const SITE = 'https://perfectmatch-ai.vercel.app';

function shell(inner: string, email: string): string {
  const u = `${SITE}/api/unsubscribe?email=${encodeURIComponent(email)}`;
  return `<div style="font-family:Helvetica,Arial,sans-serif;color:#2B2622;font-size:15px;line-height:1.6;max-width:560px;margin:0 auto">
${inner}
<hr style="border:none;border-top:1px solid #eee;margin:28px 0"/>
<p style="font-size:12px;color:#999">EvaTalk · PerfectMatch — <a href="${u}" style="color:#999">Se désabonner</a></p>
</div>`;
}
const btn = (href: string, label: string) =>
  `<p style="margin:22px 0"><a href="${href}" style="background:#6B5B95;color:#fff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:bold;display:inline-block">${label}</a></p>`;

export type WelcomeEmail = { day: number; subject: string; html: (email: string) => string };

export const WELCOME_EMAILS: WelcomeEmail[] = [
  { day: 0, subject: "Ton mini-guide est là 💛", html: (email) => shell(`
<p>Bonjour,</p>
<p>Voici ton mini-guide offert, <b>« Ta blessure ne te définit pas »</b> — le premier pas pour t'en libérer :</p>
${btn(SITE + "/guides/mini-guide-gratuit-blessures.pdf", "Télécharger mon mini-guide")}
<p>Commence par l'exercice <b>« Sépare la blessure de ta valeur »</b> : c'est court, et ça change le regard.</p>
<p>Dans les prochains jours, je t'enverrai quelques messages pour t'aider à avancer — du concret, pas du blabla.</p>
<p>À très vite,<br/><b>Eva</b> · EvaTalk</p>`, email) },

  { day: 2, subject: "La phrase qui désamorce une blessure", html: (email) => shell(`
<p>Bonjour,</p>
<p>Un rappel utile : ce qui te fait le plus mal, souvent, ce n'est pas la situation — c'est <b>la pensée que ta blessure y ajoute</b>.</p>
<p>La prochaine fois qu'une émotion forte monte, essaie juste ça :</p>
<blockquote style="border-left:3px solid #B8923D;margin:0;padding:6px 16px;color:#6B5B95;font-style:italic">« C'est ma blessure qui parle, pas la réalité. »</blockquote>
<p>Cette phrase crée un espace entre toi et la douleur. Et dans cet espace, tu peux <b>choisir ta réponse</b>.</p>
<p>Essaie aujourd'hui, et observe.</p>
<p><b>Eva</b></p>`, email) },

  { day: 4, subject: "Pourquoi 4 regards, et pas un seul", html: (email) => shell(`
<p>Bonjour,</p>
<p>La plupart des contenus sur les blessures s'arrêtent à « voici ta blessure ». Ça me frustrait : <b>savoir, ce n'est pas guérir.</b></p>
<p>C'est pour ça que chaque guide EvaTalk éclaire ta blessure sous <b>4 regards de la psychologie</b> — avec des exercices concrets, un cahier et un plan sur 4 semaines.</p>
${btn(SITE + "/bibliotheque", "Voir la bibliothèque")}
<p>Choisis le guide qui parle à ce que tu vis en ce moment.</p>
<p><b>Eva</b></p>`, email) },

  { day: 6, subject: "Par où commencer (et un petit coup de pouce)", html: (email) => shell(`
<p>Bonjour,</p>
<p>Si tu hésites par où commencer, un repère simple :</p>
<ul>
<li>Blessure de <b>rejet / abandon</b> → guides <i>Amour & Relations</i> ou <i>Confiance en soi</i></li>
<li>Besoin de <b>souffler</b> → <i>Bien-être</i></li>
<li><b>Identité, regard des autres</b> → <i>Identité & Résilience</i></li>
</ul>
<p>Et pour t'aider à franchir le pas : <b>-15 %</b> sur ton premier guide ou pack avec le code <b>BIENVENUE15</b> (valable 7 jours).</p>
${btn(SITE + "/bibliotheque", "Découvrir la bibliothèque")}
<p>Quoi que tu choisisses, tu as déjà fait le plus dur : <b>commencer.</b></p>
<p><b>Eva</b> · EvaTalk</p>`, email) },
];
