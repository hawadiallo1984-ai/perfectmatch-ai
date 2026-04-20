// api/save-profile.js
// Sauvegarde le profil utilisateur dans Supabase apres generation du rapport

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { email, answers, report, plan, consent_matching, consent_research } = req.body;

  if (!email || !answers || !report) {
    return res.status(400).json({ error: 'Donnees manquantes' });
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_KEY) {
    return res.status(500).json({ error: 'Supabase non configure' });
  }

  try {
    // Extraire les dimensions Big Five du rapport si disponibles
    const dims = report.dimensions || [];
    const getDim = (name) => {
      const d = dims.find(d => d.nom && d.nom.toLowerCase().includes(name));
      return d ? d.score : null;
    };

    const profile = {
      email,
      plan: plan || 'free',
      matching_active: consent_matching || false,
      prenom: answers.prenom || null,
      age: answers.age ? parseInt(answers.age) : null,
      genre: answers.genre || null,
      orientation: answers.orientation || null,
      ville: answers.ville || null,
      score: report.score || null,
      titre: report.titre || null,
      big5_ouverture: getDim('ouvert'),
      big5_conscience: getDim('conscien'),
      big5_extraversion: getDim('extraver'),
      big5_agreabilite: getDim('agreabi'),
      big5_stabilite: getDim('stabilit'),
      attachement: answers.attach || null,
      love_lang: answers.love_lang || null,
      valeurs: answers.valeurs || null,
      dealbreakers: answers.dealbreakers || null,
      reve: answers.reve || null,
      rapport_json: report,
      consent_matching: consent_matching || false,
      consent_research: consent_research || false,
    };

    // Upsert (insert or update) par email
    const response = await fetch(`${SUPABASE_URL}/rest/v1/profiles`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Prefer': 'resolution=merge-duplicates',
      },
      body: JSON.stringify(profile),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Supabase error:', err);
      return res.status(400).json({ error: 'Erreur sauvegarde profil' });
    }

    return res.status(200).json({ success: true });

  } catch (err) {
    console.error('Save profile error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
