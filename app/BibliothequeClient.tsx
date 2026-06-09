'use client';

import { useEffect } from 'react';
import { INTL_GUIDES } from '@/lib/guidesIntl';
import { NEW_GUIDES } from '@/lib/newGuides';
import { PRO_GUIDES } from '@/lib/proGuides';
import { PRO_GUIDES_2 } from '@/lib/proGuides2';
import { PRO_GUIDES_3 } from '@/lib/proGuides3';
import { PRO_GUIDES_4 } from '@/lib/proGuides4';
import { PRO_GUIDES_5 } from '@/lib/proGuides5';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const SECTIONS = [
  {
    id: 'amour-relations',
    label: 'Amour & Relations',
    guides: [
      {
        id: 'styles-attachement',
        title: "Styles d'attachement",
        desc: 'Comprends ton schéma relationnel pour choisir et aimer autrement.',
        href: '/guides/styles-attachement',
      },
      {
        id: 'guerir-rupture',
        title: "Guérir d'une rupture",
        desc: 'Traverser le deuil amoureux et reconstruire sans se perdre.',
        href: '/guides/guerir-rupture',
      },
      {
        id: 'gestion-celibat',
        title: 'Bien vivre son célibat',
        desc: "Faire du célibat un espace de croissance, pas d'attente.",
        href: '/guides/gestion-celibat',
      },
      {
        id: 'reconnaitre-controle-coercitif',
        title: 'Reconnaître le contrôle coercitif',
        desc: 'Nommer l\'emprise pour t\'en libérer.',
        href: '/guides/reconnaitre-controle-coercitif',
      },
      {
        id: 'sortir-du-gaslighting',
        title: 'Sortir du gaslighting',
        desc: 'Te refaire confiance quand on te fait douter de tout.',
        href: '/guides/sortir-du-gaslighting',
      },
      {
        id: 'apprendre-a-dire-non',
        title: 'Apprendre à dire non',
        desc: 'Poser tes limites sans culpabiliser.',
        href: '/guides/apprendre-a-dire-non',
      },
      {
        id: 'communication-assertive',
        title: 'Communication assertive',
        desc: 'Te faire entendre, sans t\'écraser ni écraser.',
        href: '/guides/communication-assertive',
      },
      {
        id: 'habiletes-sociales',
        title: 'Habiletés sociales',
        desc: 'Créer du lien, ça s\'apprend.',
        href: '/guides/habiletes-sociales',
      },
      {
        id: 'couples-mixtes',
        title: 'Couples mixtes & interculturels',
        desc: 'Naviguer les différences culturelles pour construire ensemble.',
        href: '/guides/couples-mixtes',
      },
      {
        id: 'couple-noir',
        title: 'Couple noir face au monde',
        desc: 'Protéger et nourrir ton couple dans un environnement qui le questionne.',
        href: '/guides/couple-noir',
      },
    ],
  },
  {
    id: 'bien-etre-soi',
    label: 'Bien-être & Soi',
    guides: [
      {
        id: 'confiance-estime-de-soi',
        title: 'Confiance & estime de soi',
        desc: 'Reconstruire une image de toi solide, loin du regard des autres.',
        href: '/guides/confiance-estime-de-soi',
      },
      {
        id: 'anxiete-pensees-negatives',
        title: 'Anxiété & pensées négatives',
        desc: 'Des outils TCC pour désamorcer les spirales mentales.',
        href: '/guides/anxiete-pensees-negatives',
      },
      {
        id: 'gestion-solitude',
        title: 'Apprivoiser la solitude',
        desc: "Transformer la solitude en ressource plutôt qu'en souffrance.",
        href: '/guides/gestion-solitude',
      },
      {
        id: 'identite-metisse',
        title: 'Identité métisse',
        desc: 'Habiter pleinement une identité plurielle sans la choisir entre deux.',
        href: '/guides/identite-metisse',
      },
      {
        id: 'se-reconstruire-apres-relation-toxique',
        title: 'Se reconstruire après une relation toxique',
        desc: 'Retrouver qui tu es après l\'emprise.',
        href: '/guides/se-reconstruire-apres-relation-toxique',
      },
      {
        id: 'briser-isolement',
        title: 'Briser l\'isolement',
        desc: 'Sortir du repli, un petit pas à la fois.',
        href: '/guides/briser-isolement',
      },
      {
        id: 'gerer-ses-emotions',
        title: 'Gérer ses émotions',
        desc: 'Tes émotions ne sont pas tes ennemies.',
        href: '/guides/gerer-ses-emotions',
      },
      {
        id: 'gerer-le-stress',
        title: 'Gérer le stress',
        desc: 'Reprendre la main quand tout s\'accélère.',
        href: '/guides/gerer-le-stress',
      },
    ],
  },
  {
    id: 'sexualite',
    label: 'Sexualité',
    guides: [
      {
        id: 'se-reapproprier-sexualite',
        title: 'Se réapproprier sa sexualité',
        desc: 'Dénouer la honte et retrouver un rapport libre à ton corps.',
        href: '/guides/se-reapproprier-sexualite',
      },
      {
        id: 'desir-intimite',
        title: 'Désir & intimité',
        desc: "Raviver le lien et l'élan, sans pression ni performance.",
        href: '/guides/desir-intimite',
      },
      {
        id: 'sexualite-image-corps',
        title: 'Sexualité & image du corps',
        desc: 'Habiter ton corps sans le juger, ni le comparer.',
        href: '/guides/sexualite-image-corps',
      },
      {
        id: 'sexualite-black',
        title: 'Sexualité black',
        desc: 'Habiter ton désir, libre du regard racial et des tabous communautaires.',
        href: '/guides/sexualite-black',
      },
    ],
  },
  {
    id: 'resilience',
    label: 'Résilience',
    guides: [
      {
        id: 'misogynoir',
        title: 'Misogynoir',
        desc: 'Déconstruire et traverser la haine croisée du genre et de la race.',
        href: '/guides/misogynoir',
      },
      {
        id: 'charge-raciale',
        title: 'Charge raciale',
        desc: 'Alléger le poids mental du racisme chronique au quotidien.',
        href: '/guides/charge-raciale',
      },
      {
        id: 'racisme-au-quotidien',
        title: 'Racisme au quotidien',
        desc: "Des outils TCC pour répondre aux microagressions sans t'épuiser.",
        href: '/guides/racisme-au-quotidien',
      },
      {
        id: 'colorisme',
        title: 'Colorisme',
        desc: 'Guérir les blessures liées à la teinte de peau, dedans et dehors.',
        href: '/guides/colorisme',
      },
      {
        id: 'dating-femme-noire',
        title: 'Dating femme noire',
        desc: 'Naviguer le dating sans effacer qui tu es.',
        href: '/guides/dating-femme-noire',
      },
      {
        id: 'parentalite-noire',
        title: 'Parentalité noire',
        desc: 'Élever ses enfants avec fierté dans un monde qui les questionne.',
        href: '/guides/parentalite-noire',
      },
      {
        id: 'syndrome-imposteur',
        title: "Syndrome de l'imposteur",
        desc: 'Déconstruire la voix intérieure qui doute de ta légitimité.',
        href: '/guides/syndrome-imposteur',
      },
      {
        id: 'foi-identite-bien-etre',
        title: 'Foi, identité & bien-être',
        desc: 'Réconcilier spiritualité, culture et santé mentale.',
        href: '/guides/foi-identite-bien-etre',
      },
      {
        id: 'parent-toxique',
        title: 'Parent toxique',
        desc: 'Te protéger, guérir, reprendre ta place.',
        href: '/guides/parent-toxique',
      },
      {
        id: 'sortir-solitude-femmes-noires',
        title: 'Sortir de la solitude — pour les femmes noires',
        desc: 'Créer des liens où tu es vue, entière.',
        href: '/guides/sortir-solitude-femmes-noires',
      },
    ],
  },
  {
    id: 'argent',
    label: 'Argent',
    guides: [
      {
        id: 'black-tax',
        title: 'Black Tax',
        desc: 'Comprendre et poser des limites face au poids financier familial.',
        href: '/argent/black-tax',
      },
      {
        id: 'croyances-argent',
        title: "Croyances sur l'argent",
        desc: "Désamorcer les croyances limitantes qui bloquent ta relation à l'argent.",
        href: '/guides/croyances-argent',
      },
      {
        id: 'mentalite-abondance',
        title: "Mentalité d'abondance",
        desc: 'Apaiser la peur du manque et cultiver un rapport serein à la prospérité.',
        href: '/guides/mentalite-abondance',
      },
      {
        id: 'honte-de-classe',
        title: 'Honte de classe',
        desc: "T'aimer d'où que tu viennes et dépasser la honte sociale.",
        href: '/guides/honte-de-classe',
      },
      {
        id: 'oser-ta-valeur-tarifs',
        title: 'Oser ta valeur & tes tarifs',
        desc: 'Fixer un prix juste sans honte ni sous-estimer ce que tu vaux.',
        href: '/guides/oser-ta-valeur-tarifs',
      },
      {
        id: 'anxiete-financiere',
        title: 'Anxiété financière',
        desc: "Apaiser la peur de l'argent et agir pas à pas vers plus de sécurité.",
        href: '/guides/anxiete-financiere',
      },
      {
        id: 'argent-couple',
        title: "L'argent dans le couple",
        desc: 'Construire confiance et équité financière dans la relation.',
        href: '/guides/argent-couple',
      },
      {
        id: 'trauma-financier-familles-noires',
        title: 'Trauma financier — familles noires',
        desc: "Comprendre l'héritage, briser le cycle.",
        href: '/guides/trauma-financier-familles-noires',
      },
    ],
  },
  {
    id: 'travail',
    label: 'Travail',
    guides: [
      {
        id: 'confiance-au-travail',
        title: 'Confiance au travail',
        desc: 'Oser prendre ta place, transformer le doute, te rendre visible.',
        href: '/guides/confiance-au-travail',
      },
      {
        id: 'etre-la-seule-au-travail',
        title: 'Être « la seule » au travail',
        desc: 'Alléger la charge, te protéger, trouver des appuis.',
        href: '/guides/etre-la-seule-au-travail',
      },
      {
        id: 'etre-allie-au-travail',
        title: 'Être un·e allié·e au travail',
        desc: "Passer de l'intention à l'action d'allié·e utile.",
        href: '/guides/etre-allie-au-travail',
      },
      {
        id: 'negocier-son-salaire',
        title: 'Négocier son salaire',
        desc: 'Demander ce que tu vaux, sans trembler.',
        href: '/guides/negocier-son-salaire',
      },
      {
        id: 'prevenir-burnout',
        title: 'Prévenir & guérir du burnout',
        desc: 'Reconnaître les signaux, comprendre, et te relever.',
        href: '/guides/prevenir-burnout',
      },
      {
        id: 'le-code-switching',
        title: 'Le code-switching',
        desc: "Le coût caché de t'adapter en permanence — et comment reprendre du choix.",
        href: '/guides/le-code-switching',
      },
      {
        id: 'manager-equipe-inclusive',
        title: 'Manager une équipe inclusive',
        desc: 'Créer la sécurité psychologique et des pratiques concrètes.',
        href: '/guides/manager-equipe-inclusive',
      },
      {
        id: 'reussir-entretien-embauche',
        title: "Réussir un entretien d'embauche",
        desc: 'Transformer le trac en atout, préparer des réponses solides.',
        href: '/guides/reussir-entretien-embauche',
      },
      {
        id: 'quitter-job-toxique',
        title: 'Quitter un job toxique',
        desc: 'Partir sans culpabilité ni précipitation.',
        href: '/guides/quitter-job-toxique',
      },
      {
        id: 'misogynoir-au-travail',
        title: 'Misogynoir au travail',
        desc: 'Protéger ton estime et répondre avec stratégie.',
        href: '/guides/misogynoir-au-travail',
      },
      {
        id: 'recruter-sans-discriminer',
        title: 'Recruter sans discriminer',
        desc: 'Repérer tes biais et bâtir un process équitable.',
        href: '/guides/recruter-sans-discriminer',
      },
      {
        id: 'gerer-conflit-travail',
        title: 'Gérer un conflit au travail',
        desc: 'Désamorcer sans fuir ni exploser.',
        href: '/guides/gerer-conflit-travail',
      },
      {
        id: 'prendre-la-parole-en-public',
        title: 'Prendre la parole en public',
        desc: 'Parler en réunion ou présenter sans paniquer.',
        href: '/guides/prendre-la-parole-en-public',
      },
      {
        id: 'trouver-mentors-sponsors',
        title: 'Trouver mentors & sponsors',
        desc: "T'entourer pour avancer quand on part isolée.",
        href: '/guides/trouver-mentors-sponsors',
      },
      {
        id: 'creer-culture-inclusive',
        title: 'Créer une culture inclusive',
        desc: "Faire de l'inclusion une réalité, pas un slogan.",
        href: '/guides/creer-culture-inclusive',
      },
      {
        id: 'harcelement-moral-au-travail',
        title: 'Le harcèlement moral au travail',
        desc: 'Reconnaître, documenter, te protéger.',
        href: '/guides/harcelement-moral-au-travail',
      },
    ],
  },
];

const EN_CONFLICT_IDS = new Set(['black-tax', 'misogynoir']);
const EN_EXTRA = [
  { id: 'misogynoir-en', title: 'Misogynoir', blurb: 'Free yourself from the tropes, reclaim your full humanity.', theme: 'Identity & Resilience' },
  { id: 'black-tax-en', title: 'Black Tax', blurb: 'Supporting your people without losing yourself.', theme: 'Money' },
];
const EN_THEME_ORDER = ['Wellbeing', 'Relationships', 'Identity & Resilience', 'Sexuality', 'Money', 'Career'];
const EN_BY_THEME = EN_THEME_ORDER.map((theme) => ({
  theme,
  guides: [
    ...INTL_GUIDES.filter((g) => g.lang === 'en' && g.theme === theme && !EN_CONFLICT_IDS.has(g.id)),
    ...NEW_GUIDES.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_2.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_3.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_4.filter((g) => g.lang === 'en' && g.theme === theme),
    ...PRO_GUIDES_5.filter((g) => g.lang === 'en' && g.theme === theme),
    ...EN_EXTRA.filter((g) => g.theme === theme),
  ],
})).filter((t) => t.guides.length > 0);

export default function BibliothequeClient() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh' }}>

      <SiteNav />

      {/* Header */}
      <section className={styles.section} style={{ textAlign: 'center', paddingBottom: 0 }}>
        <div className={styles.offersHeader}>
          <div className={styles.sectionLabel} style={{ justifyContent: 'center' }}>
            Bibliothèque
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Tous les guides, <em>un seul endroit</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 40px', maxWidth: 560 }}>
            Amour, bien-être, sexualité, argent — chaque guide est un espace de travail concret,
            ancré dans la réalité des personnes noires et métisses, avec des outils TCC actionnables.
          </p>
        </div>
      </section>

      {/* Sections thématiques */}
      {SECTIONS.map((section) => (
        <section key={section.id} className={styles.section} style={{ paddingTop: 0 }}>
          <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
            <h2
              className={`${styles.sectionTitle} reveal`}
              style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: 32, letterSpacing: '0.02em' }}
            >
              {section.label}
            </h2>
            <div
              className={styles.offersGrid}
              style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
            >
              {section.guides.map((guide) => (
                <div key={guide.id} className={`${styles.offer} reveal`}>
                  <div className={styles.offerCategory}>Guide PDF · 19 €</div>
                  <h3 className={styles.offerName}>{guide.title}</h3>
                  <p className={styles.offerDesc}>{guide.desc}</p>
                  <div style={{ marginTop: 'auto' }}>
                    <a
                      href={guide.href}
                      className={styles.offerCta}
                      style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                    >
                      Découvrir →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* In English */}
      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px' }}>
          <h2
            className={`${styles.sectionTitle} reveal`}
            style={{ fontSize: 'clamp(18px, 3vw, 24px)', marginBottom: 12, letterSpacing: '0.02em' }}
          >
            In English
          </h2>
          <p className="reveal" style={{ fontSize: 14, opacity: 0.55, marginBottom: 48, lineHeight: 1.6 }}>
            All guides available in English — same CBT framework, same workbook format.
          </p>
          {EN_BY_THEME.map(({ theme, guides }) => (
            <div key={theme} style={{ marginBottom: 52 }}>
              <div style={{
                fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase',
                color: 'var(--gold)', opacity: 0.8, marginBottom: 20,
              }}>
                {theme}
              </div>
              <div
                className={styles.offersGrid}
                style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}
              >
                {guides.map((guide) => (
                  <div key={guide.id} className={`${styles.offer} reveal`}>
                    <div className={styles.offerCategory}>Guide PDF · 19 €</div>
                    <h3 className={styles.offerName}>{guide.title}</h3>
                    <p className={styles.offerDesc}>{guide.blurb}</p>
                    <div style={{ marginTop: 'auto' }}>
                      <a
                        href={`/guides/${guide.id}`}
                        className={styles.offerCta}
                        style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                      >
                        Discover →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.logo} style={{ justifyContent: 'center', marginBottom: 8 }}>
          <span className={styles.logoMark}></span>
          PerfectMatch
        </div>
        <p className={styles.footerByline}>par EvaTalk</p>
        <p className={styles.copyright}>© 2026 PerfectMatch · une création <strong>EvaTalk</strong></p>
      </footer>

    </div>
  );
}
