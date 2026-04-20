// api/find-matches.js
// Trouve les meilleurs matchs pour un utilisateur et les envoie par email

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const { email } = req.body;
  if (!email) return res.status(400).json({ error: 'Email requis' });

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_ANON_KEY;

  try {
    // 1. Recuperer le profil de l'utilisateur
    const userRes = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?email=eq.${encodeURIComponent(email)}&select=*`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    const users = await userRes.json();
    if (!users.length) return res.status(404).json({ error: 'Profil introuvable' });
    const user = users[0];

    // 2. Recuperer tous les profils actifs pour matching (sauf l'utilisateur)
    const poolRes = await fetch(
      `${SUPABASE_URL}/rest/v1/profiles?email=neq.${encodeURIComponent(email)}&matching_active=eq.true&select=*`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    const pool = await poolRes.json();

    if (!pool.length) {
      return res.status(200).json({ matches: [], message: 'Pas encore assez de profils' });
    }

    // 3. Calculer le score de compatibilite psychologique
    function calcScore(a, b) {
      let score = 0;
      let factors = 0;

      // Compatibilite Big Five (proximite des scores)
      const b5fields = ['big5_ouverture','big5_conscience','big5_extraversion','big5_agreabilite','big5_stabilite'];
      b5fields.forEach(f => {
        if (a[f] && b[f]) {
          const diff = Math.abs(a[f] - b[f]);
          score += Math.max(0, 100 - diff);
          factors++;
        }
      });

      // Bonus meme style d'attachement securise
      if (a.attachement === 'secure' && b.attachement === 'secure') score += 20;
      else if (a.attachement === b.attachement) score += 10;
      factors++;

      // Compatibilite orientation
      if (a.orientation && b.orientation) {
        const compatible = (
          (a.orientation === 'hetero' && b.genre !== a.genre) ||
          (a.orientation === 'gay' && b.genre === a.genre) ||
          a.orientation === 'bi' || b.orientation === 'bi'
        );
        if (!compatible) return 0; // incompatible
        score += 30;
        factors++;
      }

      // Valeurs communes
      if (a.valeurs && b.valeurs) {
        const av = Array.isArray(a.valeurs) ? a.valeurs : Object.keys(a.valeurs || {});
        const bv = Array.isArray(b.valeurs) ? b.valeurs : Object.keys(b.valeurs || {});
        const common = av.filter(v => bv.includes(v)).length;
        score += common * 10;
        factors++;
      }

      return factors > 0 ? Math.round(score / factors) : 50;
    }

    // 4. Trier par score et prendre les 3 meilleurs
    const scored = pool
      .map(p => ({ profile: p, score: calcScore(user, p) }))
      .filter(m => m.score > 40)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // 5. Sauvegarder les matchs dans la DB
    for (const match of scored) {
      await fetch(`${SUPABASE_URL}/rest/v1/matches`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_KEY,
          'Authorization': `Bearer ${SUPABASE_KEY}`,
        },
        body: JSON.stringify({
          user1_id: user.id,
          user2_id: match.profile.id,
          score_compatibilite: match.score,
          statut: 'pending',
        }),
      });
    }

    return res.status(200).json({
      success: true,
      matches: scored.map(m => ({
        prenom: m.profile.prenom || 'Anonyme',
        score: m.score,
        titre: m.profile.titre,
        attachement: m.profile.attachement,
        age: m.profile.age,
      }))
    });

  } catch (err) {
    console.error('Find matches error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
