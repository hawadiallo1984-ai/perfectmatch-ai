// Lot "Déconstruction & guérison" : 3 guides racisme (Identité & Résilience) + 1 survivant·es abus (Bien-être).
// Upload dans lib/proGuides13.ts. PDF dans public/guides/.
// AFFICHAGE FR : section codée en dur SECTIONS. AFFICHAGE EN : thèmes "Identity & Resilience" / "Wellbeing".
export const PRO_GUIDES_13 = [
  // ---- FR : Identité & Résilience ----
  { id: "se-reconstruire-face-negrophobie", lang: "fr", theme: "Identité & Résilience",
    title: "Se reconstruire face à la négrophobie",
    blurb: "Guérir ce que le racisme anti-Noir·e a abîmé : reconnaître les blessures, déconstruire l'intériorisé, te reconstruire avec fierté. 4 approches + ressources.",
    pdf: "se-reconstruire-face-negrophobie-4-approches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Ça vient du dehors, pas de toi", "Déconstruis l'intériorisé", "Réapproprie-toi ta fierté"] },
  { id: "se-liberer-misogynoir", lang: "fr", theme: "Identité & Résilience",
    title: "Se libérer de la misogynoir",
    blurb: "Quand racisme et sexisme se cumulent sur les femmes noires : nommer le poids, t'en déprendre, te réautoriser à être pleinement toi. 4 approches + ressources.",
    pdf: "se-liberer-misogynoir-4-approches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Nomme le double poids", "Sors des cases", "Sororité & soutien"] },
  { id: "preserver-sante-mentale-racisme", lang: "fr", theme: "Identité & Résilience",
    title: "Préserver sa santé mentale face au racisme",
    blurb: "Reconnaître le trauma racial et t'en protéger : repérer les signaux, te traiter avec douceur, te protéger et guérir. 4 approches + ressources.",
    pdf: "preserver-sante-mentale-racisme-4-approches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Le trauma racial est réel", "Protège ton énergie", "Joie & repos = résistance"] },
  // ---- FR : Bien-être ----
  { id: "se-reconstruire-apres-abus-sexuels", lang: "fr", theme: "Bien-être",
    title: "Se reconstruire après l'inceste et les abus sexuels",
    blurb: "Un chemin de guérison, avec les bons soutiens : comprendre le trauma (rien n'est ta faute), te réapproprier ta valeur, trouver de l'aide spécialisée et des outils d'ancrage sûrs. Soutien & psychoéducation — pas une thérapie.",
    pdf: "se-reconstruire-apres-abus-sexuels-4-approches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Rien n'est ta faute", "Te réapproprier ta valeur", "Le bon accompagnement + ancrage sûr"] },
  // ---- EN : Identity & Resilience ----
  { id: "healing-from-anti-black-racism", lang: "en", theme: "Identity & Resilience",
    title: "Healing From Anti-Black Racism",
    blurb: "Heal what racism damaged: recognize the wounds, deconstruct the internalized, rebuild with pride. 4 approaches + resources.",
    pdf: "healing-from-anti-black-racism-4-approaches.pdf", priceCents: 999, currency: "eur",
    bullets: ["It comes from outside, not you", "Deconstruct the internalized", "Reclaim your pride"] },
  { id: "freeing-yourself-from-misogynoir", lang: "en", theme: "Identity & Resilience",
    title: "Freeing Yourself From Misogynoir",
    blurb: "When racism and sexism stack on Black women: name the weight, free yourself, allow yourself to be fully you. 4 approaches + resources.",
    pdf: "freeing-yourself-from-misogynoir-4-approaches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Name the double weight", "Beyond the boxes", "Sisterhood & support"] },
  { id: "protecting-your-mental-health-from-racism", lang: "en", theme: "Identity & Resilience",
    title: "Protecting Your Mental Health From Racism",
    blurb: "Recognize racial trauma and protect yourself: spot the signals, treat yourself gently, protect and heal. 4 approaches + resources.",
    pdf: "protecting-your-mental-health-from-racism-4-approaches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Racial trauma is real", "Protect your energy", "Joy & rest = resistance"] },
  // ---- EN : Wellbeing ----
  { id: "healing-after-incest-and-sexual-abuse", lang: "en", theme: "Wellbeing",
    title: "Healing After Incest and Sexual Abuse",
    blurb: "A path to healing, with the right support: understand the trauma (nothing is your fault), reclaim your worth, find specialized help and safe grounding tools. Support & psychoeducation — not therapy.",
    pdf: "healing-after-incest-and-sexual-abuse-4-approaches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Nothing is your fault", "Reclaim your worth", "The right support + safe grounding"] },
] as const;
