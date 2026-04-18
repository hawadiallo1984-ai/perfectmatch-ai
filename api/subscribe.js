// api/subscribe.js
// Vercel Serverless Function — ajoute un email a la liste Mailchimp PerfectMatch

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, consent, plan } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email invalide' });
  }

  const API_KEY = process.env.MAILCHIMP_API_KEY;
  const LIST_ID = process.env.MAILCHIMP_LIST_ID;
  const SERVER  = process.env.MAILCHIMP_SERVER;

  if (!API_KEY || !LIST_ID || !SERVER) {
    console.error('Mailchimp env vars missing');
    return res.status(500).json({ error: 'Configuration manquante' });
  }

  try {
    const response = await fetch(
      `https://${SERVER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + Buffer.from('anystring:' + API_KEY).toString('base64'),
        },
        body: JSON.stringify({
          email_address: email,
          status: consent ? 'subscribed' : 'pending',
          tags: ['perfectmatch', plan || 'free'],
          merge_fields: {
            PLAN: plan || 'free',
            SOURCE: 'perfectmatch-ai.com',
          },
        }),
      }
    );

    const data = await response.json();

    // "Member Exists" = deja inscrit, pas une erreur bloquante
    if (!response.ok && data.title !== 'Member Exists') {
      console.error('Mailchimp error:', data);
      return res.status(400).json({ error: data.detail || 'Erreur Mailchimp' });
    }

    return res.status(200).json({ success: true, status: data.status || 'exists' });

  } catch (err) {
    console.error('Subscribe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
