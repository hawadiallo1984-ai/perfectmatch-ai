// api/create-payment-intent.js
export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).end();

  const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
console.log("STRIPE_KEY:", !!process.env.STRIPE_SECRET_KEY);
  if (!STRIPE_SECRET) {
    return res.status(500).json({ error: 'Stripe non configure' });
  }

  const { amount, plan, email } = req.body;
  if (!amount || !plan) {
    return res.status(400).json({ error: 'Montant et plan requis' });
  }

  try {
    const response = await fetch('https://api.stripe.com/v1/payment_intents', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${STRIPE_SECRET}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amount: String(Math.round(amount * 100)),
        currency: 'eur',
        'metadata[plan]': plan,
        'metadata[email]': email || '',
        'automatic_payment_methods[enabled]': 'true',
      }).toString(),
    });

    const data = await response.json();
    if (data.error) {
      return res.status(400).json({ error: data.error.message });
    }

    return res.status(200).json({ clientSecret: data.client_secret });
  } catch (err) {
    console.error('Stripe error:', err.message);
    return res.status(500).json({ error: err.message });
  }
}
