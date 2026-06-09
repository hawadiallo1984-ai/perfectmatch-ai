'use client';

import { useEffect } from 'react';
import SiteNav from '@/components/SiteNav';
import styles from '@/app/page.module.css';

const GUIDES = [
  {
    id: 'confiance-au-travail',
    title: 'Confiance au travail',
    emphasis: '4 approches',
    desc: 'Oser prendre ta place, transformer le doute, te rendre visible.',
    href: '/guides/confiance-au-travail',
  },
  {
    id: 'etre-la-seule-au-travail',
    title: 'Être « la seule » au travail',
    emphasis: '4 approches',
    desc: 'Alléger la charge, te protéger, trouver des appuis.',
    href: '/guides/etre-la-seule-au-travail',
  },
  {
    id: 'etre-allie-au-travail',
    title: 'Être un·e allié·e au travail',
    emphasis: '4 approches',
    desc: 'Passer de l\'intention à l\'action d\'allié·e utile.',
    href: '/guides/etre-allie-au-travail',
  },
  {
    id: 'negocier-son-salaire',
    title: 'Négocier son salaire',
    emphasis: '4 approches',
    desc: 'Demander ce que tu vaux, sans trembler.',
    href: '/guides/negocier-son-salaire',
  },
  {
    id: 'prevenir-burnout',
    title: 'Prévenir & guérir du burnout',
    emphasis: '4 approches',
    desc: 'Reconnaître les signaux, comprendre, et te relever.',
    href: '/guides/prevenir-burnout',
  },
  {
    id: 'le-code-switching',
    title: 'Le code-switching',
    emphasis: '4 approches',
    desc: 'Le coût caché de t\'adapter en permanence — et comment reprendre du choix.',
    href: '/guides/le-code-switching',
  },
  {
    id: 'manager-equipe-inclusive',
    title: 'Manager une équipe inclusive',
    emphasis: '4 approches',
    desc: 'Créer la sécurité psychologique et des pratiques concrètes.',
    href: '/guides/manager-equipe-inclusive',
  },
  {
    id: 'reussir-entretien-embauche',
    title: "Réussir un entretien d'embauche",
    emphasis: '4 approches',
    desc: 'Transformer le trac en atout, préparer des réponses solides.',
    href: '/guides/reussir-entretien-embauche',
  },
  {
    id: 'quitter-job-toxique',
    title: 'Quitter un job toxique',
    emphasis: '4 approches',
    desc: 'Partir sans culpabilité ni précipitation.',
    href: '/guides/quitter-job-toxique',
  },
  {
    id: 'misogynoir-au-travail',
    title: 'Misogynoir au travail',
    emphasis: '4 approches',
    desc: 'Protéger ton estime et répondre avec stratégie.',
    href: '/guides/misogynoir-au-travail',
  },
  {
    id: 'recruter-sans-discriminer',
    title: 'Recruter sans discriminer',
    emphasis: '4 approches',
    desc: 'Repérer tes biais et bâtir un process équitable.',
    href: '/guides/recruter-sans-discriminer',
  },
  {
    id: 'gerer-conflit-travail',
    title: 'Gérer un conflit au travail',
    emphasis: '4 approches',
    desc: 'Désamorcer sans fuir ni exploser.',
    href: '/guides/gerer-conflit-travail',
  },
  {
    id: 'prendre-la-parole-en-public',
    title: 'Prendre la parole en public',
    emphasis: '4 approches',
    desc: 'Parler en réunion ou présenter sans paniquer.',
    href: '/guides/prendre-la-parole-en-public',
  },
  {
    id: 'trouver-mentors-sponsors',
    title: 'Trouver mentors & sponsors',
    emphasis: '4 approches',
    desc: 'T\'entourer pour avancer quand on part isolée.',
    href: '/guides/trouver-mentors-sponsors',
  },
  {
    id: 'creer-culture-inclusive',
    title: 'Créer une culture inclusive',
    emphasis: '4 approches',
    desc: 'Faire de l\'inclusion une réalité, pas un slogan.',
    href: '/guides/creer-culture-inclusive',
  },
  {
    id: 'harcelement-moral-au-travail',
    title: 'Le harcèlement moral au travail',
    emphasis: '4 approches',
    desc: 'Reconnaître, documenter, te protéger.',
    href: '/guides/harcelement-moral-au-travail',
  },
  {
    id: 'reussir-sa-recherche-emploi',
    title: "Réussir sa recherche d'emploi",
    emphasis: '4 approches',
    desc: 'Mener ta recherche avec méthode, confiance et réseau.',
    href: '/guides/reussir-sa-recherche-emploi',
  },
  {
    id: 'demander-une-promotion',
    title: 'Demander une promotion',
    emphasis: '4 approches',
    desc: 'Oser demander et argumenter ta valeur.',
    href: '/guides/demander-une-promotion',
  },
  {
    id: 'composer-avec-manager-difficile',
    title: 'Composer avec un manager difficile',
    emphasis: '4 approches',
    desc: "Te protéger et avancer sans t'épuiser.",
    href: '/guides/composer-avec-manager-difficile',
  },
  {
    id: 'leadership-femme-noire',
    title: 'Leadership en tant que femme noire',
    emphasis: '4 approches',
    desc: 'Diriger pleinement, à ta façon.',
    href: '/guides/leadership-femme-noire',
  },
  {
    id: 'reussir-sa-prise-de-poste',
    title: 'Réussir sa prise de poste',
    emphasis: '4 approches',
    desc: 'Bien démarrer, trouver ta place, piloter tes 30/60/90 premiers jours.',
    href: '/guides/reussir-sa-prise-de-poste',
  },
  {
    id: 'donner-recevoir-feedback',
    title: 'Donner et recevoir du feedback',
    emphasis: '4 approches',
    desc: 'Des retours qui font grandir, pas qui blessent.',
    href: '/guides/donner-recevoir-feedback',
  },
  {
    id: 'equilibre-pro-perso',
    title: 'Équilibre pro-perso & charge mentale',
    emphasis: '4 approches',
    desc: 'Poser des limites et alléger la charge mentale.',
    href: '/guides/equilibre-pro-perso',
  },
  {
    id: 'repondre-aux-microagressions',
    title: 'Répondre aux microagressions au travail',
    emphasis: '4 approches',
    desc: 'Réagir aux petites phrases qui blessent, à ta façon.',
    href: '/guides/repondre-aux-microagressions',
  },
  {
    id: 'soutenir-collaborateur-en-difficulte',
    title: 'Soutenir un·e collaborateur·rice en difficulté',
    emphasis: '4 approches',
    desc: 'La juste posture du manager — écouter, ajuster, orienter.',
    href: '/guides/soutenir-collaborateur-en-difficulte',
  },
  {
    id: 'entretiens-evaluation-equitables',
    title: "Mener des entretiens d'évaluation équitables",
    emphasis: '4 approches',
    desc: 'Évaluer juste, motiver, sans biais.',
    href: '/guides/entretiens-evaluation-equitables',
  },
  {
    id: 'manager-retour-apres-arret',
    title: "Manager le retour après un arrêt",
    emphasis: '4 approches',
    desc: 'Accueillir un retour en douceur et prévenir la rechute.',
    href: '/guides/manager-retour-apres-arret',
  },
  {
    id: 'prevenir-risques-psychosociaux',
    title: 'Prévenir les risques psychosociaux dans son équipe',
    emphasis: '4 approches',
    desc: 'Repérer les signaux et protéger la santé de ton équipe.',
    href: '/guides/prevenir-risques-psychosociaux',
  },
];

export default function TravailClient() {
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
            Travail &amp; monde pro
          </div>
          <h1 className={`${styles.sectionTitle} reveal`} style={{ textAlign: 'center', margin: '0 auto 28px' }}>
            Prends ta place au travail, <em>sans te perdre</em>
          </h1>
          <p className={`${styles.sectionLead} reveal`} style={{ textAlign: 'center', margin: '0 auto 16px', maxWidth: 580 }}>
            Le monde professionnel active des blessures d&apos;imposteur, de légitimité, de charge invisible.
            Ces guides t&apos;accompagnent avec des outils TCC concrets pour t&apos;affirmer, te protéger et agir — à ton rythme.
          </p>
        </div>
      </section>

      {/* Cartes guides */}
      <section className={`${styles.section} ${styles.offersSection}`}>
        <div
          className={styles.offersGrid}
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}
        >
          {GUIDES.map((guide) => (
            <div key={guide.id} className={`${styles.offer} reveal`}>
              <div className={styles.offerCategory}>Guide PDF · 19 €</div>
              <h3 className={styles.offerName}>
                {guide.title}{' '}<em>{guide.emphasis}</em>
              </h3>
              <p className={styles.offerDesc}>{guide.desc}</p>
              <div style={{ marginTop: 'auto' }}>
                <a
                  href={guide.href}
                  className={styles.offerCta}
                  style={{ display: 'block', textAlign: 'center', textDecoration: 'none' }}
                >
                  Découvrir ce guide →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Encadré cadrage */}
      <section style={{ maxWidth: 640, margin: '0 auto', padding: '0 24px clamp(40px, 8vw, 80px)' }}>
        <div style={{
          padding: '28px 32px',
          border: '1px solid rgba(142,122,181,0.3)',
          background: 'rgba(142,122,181,0.06)',
          textAlign: 'center',
        }}>
          <p style={{
            fontFamily: 'Fraunces, serif', fontStyle: 'italic',
            fontSize: 15, color: 'var(--violet-soft)', lineHeight: 1.7, margin: 0,
          }}>
            Ces guides sont des outils de psychoéducation et de coaching professionnel.
            Ils ne remplacent pas un suivi RH, juridique ou thérapeutique.
          </p>
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
