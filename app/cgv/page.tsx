export default function CGVPage() {
  const today = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '6rem 1.5rem', fontFamily: 'DM Sans, sans-serif', color: '#1a1a2e' }}>
      <h1 style={{ textAlign: 'center', fontSize: '2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
        Conditions Générales de Vente
      </h1>
      <h2 style={{ textAlign: 'center', fontSize: '1.2rem', fontWeight: 400, color: '#7c3aed', marginBottom: '0.5rem' }}>
        & Politique de Confidentialité
      </h2>
      <p style={{ textAlign: 'center', color: '#888', fontSize: '0.85rem', marginBottom: '3rem' }}>
        Version du {today}
      </p>

      <hr style={{ borderColor: '#e8547a', marginBottom: '2rem' }} />

      {/* PARTIE 1 — CGV */}
      <h2 style={{ color: '#e8547a', textAlign: 'center', marginBottom: '2rem' }}>PARTIE 1 — CONDITIONS GÉNÉRALES DE VENTE</h2>

      <Section title="Article 1 — Éditeur du service">
        <p>PerfectMatch est édité par :</p>
        <p><strong>Nom :</strong> Hawa Diallo</p>
        <p><strong>Email :</strong> contact@perfectmatch-ai.com</p>
        <p><strong>Site web :</strong> https://perfectmatch-ai.com</p>
      </Section>

      <Section title="Article 2 — Objet">
        <p>Les présentes CGV régissent les ventes de services numériques proposés par PerfectMatch :</p>
        <ul>
          <li>Rapports psychologiques personnalisés générés par IA</li>
          <li>Analyses relationnelles et de couple</li>
          <li>Accès à Luna IA, assistant conversationnel spécialisé</li>
          <li>Service de matching psychologique</li>
        </ul>
      </Section>

      <Section title="Article 3 — Prix et paiement">
        <p>Offres disponibles :</p>
        <ul>
          <li><strong>Analyse Célibataire : 47€</strong> — rapport complet + astrologie + Luna IA</li>
          <li><strong>Analyse Psycho Complète : 99€</strong> — tout + grille clinique + Luna illimitée 3 mois</li>
          <li><strong>Analyse de Couple : 67€</strong> — rapport couple + synastrie astrologique</li>
          <li><strong>Plan Match : 67€/mois</strong> — matching psychologique hebdomadaire</li>
        </ul>
        <p>Paiement sécurisé via Stripe. Aucune donnée bancaire stockée par PerfectMatch.</p>
      </Section>

      <Section title="Article 4 — Livraison">
        <p>Les services numériques sont accessibles immédiatement après confirmation du paiement. En cas de problème technique, contactez : contact@perfectmatch-ai.com</p>
      </Section>

      <Section title="Article 5 — Droit de rétractation">
        <p>Conformément à l&apos;article L.221-28 du Code de la consommation, le droit de rétractation ne s&apos;applique pas aux contenus numériques dont l&apos;exécution a commencé avec l&apos;accord du consommateur.</p>
        <p>En accédant au rapport, vous renoncez expressément à votre droit de rétractation. Toute demande d&apos;insatisfaction sera étudiée au cas par cas.</p>
      </Section>

      <Section title="Article 6 — Limitation de responsabilité">
        <p>PerfectMatch est un outil psycho-éducatif. Les rapports :</p>
        <ul>
          <li>Ne constituent pas un diagnostic clinique ou médical</li>
          <li>Ne remplacent pas un suivi thérapeutique</li>
          <li>Sont générés par IA et peuvent contenir des imprécisions</li>
        </ul>
      </Section>

      <Section title="Article 7 — Propriété intellectuelle">
        <p>Tous les contenus du site sont protégés par le droit de la propriété intellectuelle. Les rapports générés sont à usage personnel exclusif.</p>
      </Section>

      <Section title="Article 8 — Droit applicable">
        <p>Les présentes CGV sont soumises au droit français. En cas de litige, une solution amiable sera recherchée en priorité.</p>
      </Section>

      <hr style={{ borderColor: '#e8547a', margin: '3rem 0 2rem' }} />

      {/* PARTIE 2 — RGPD */}
      <h2 style={{ color: '#e8547a', textAlign: 'center', marginBottom: '2rem' }}>PARTIE 2 — POLITIQUE DE CONFIDENTIALITÉ (RGPD)</h2>

      <Section title="Article 9 — Responsable du traitement">
        <p>Hawa Diallo — contact@perfectmatch-ai.com</p>
        <p>Conformément au Règlement (UE) 2016/679 (RGPD).</p>
      </Section>

      <Section title="Article 10 — Données collectées">
        <ul>
          <li>Adresse email (obligatoire)</li>
          <li>Prénom (optionnel)</li>
          <li>Réponses au questionnaire psychologique</li>
          <li>Données de paiement (traitées par Stripe uniquement)</li>
          <li>Données techniques (logs serveur standard)</li>
        </ul>
      </Section>

      <Section title="Article 11 — Finalités">
        <ul>
          <li>Générer et transmettre le rapport personnalisé</li>
          <li>Assurer le service client</li>
          <li>Envoyer des communications (avec consentement)</li>
          <li>Améliorer les algorithmes (données anonymisées, avec consentement)</li>
        </ul>
      </Section>

      <Section title="Article 12 — Durée de conservation">
        <ul>
          <li>Données de compte : 3 ans après dernier accès</li>
          <li>Données de paiement : 10 ans (obligation légale)</li>
          <li>Logs techniques : 12 mois</li>
        </ul>
      </Section>

      <Section title="Article 13 — Partage des données">
        <ul>
          <li>Anthropic (Claude AI) — génération du rapport</li>
          <li>Stripe — traitement du paiement</li>
          <li>Mailchimp — emails (avec consentement)</li>
          <li>Vercel — hébergement</li>
        </ul>
        <p><strong>Aucune donnée n&apos;est vendue à des tiers.</strong></p>
      </Section>

      <Section title="Article 14 — Vos droits">
        <p>Conformément au RGPD, vous pouvez exercer vos droits (accès, rectification, effacement, portabilité, opposition) en écrivant à : <strong>contact@perfectmatch-ai.com</strong></p>
        <p>Vous pouvez également introduire une réclamation auprès de la <strong>CNIL</strong> (www.cnil.fr).</p>
      </Section>

      <Section title="Article 15 — Sécurité">
        <ul>
          <li>Chiffrement TLS 256-bit</li>
          <li>Hébergement Vercel (SOC 2 certifié)</li>
          <li>Aucun stockage de données bancaires</li>
        </ul>
      </Section>

      <Section title="Article 16 — Cookies">
        <p>Uniquement des cookies techniques nécessaires au fonctionnement. Aucun cookie publicitaire ou de tracking.</p>
      </Section>

      <Section title="Article 17 — Contact">
        <p>contact@perfectmatch-ai.com</p>
        <p>https://perfectmatch-ai.com</p>
      </Section>

      <hr style={{ borderColor: '#7c3aed', margin: '3rem 0 2rem' }} />
      <p style={{ textAlign: 'center', color: '#7c3aed', fontStyle: 'italic', fontSize: '0.9rem' }}>
        ❤️ PerfectMatch — La santé mentale est un droit, pas un luxe.
      </p>
    </main>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: '2rem' }}>
      <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#7c3aed', borderBottom: '1px solid #e8e8f0', paddingBottom: '0.5rem', marginBottom: '1rem' }}>
        {title}
      </h3>
      <div style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#333' }}>
        {children}
      </div>
    </section>
  );
}
