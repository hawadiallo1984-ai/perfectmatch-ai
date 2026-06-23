// Lot "Déconstruction & Alliance" : guides pour désapprendre ses propres biais (négrophobie, misogynoir, racisme).
// NOUVELLE rubrique/thème dédié. Upload dans lib/proGuides14.ts. PDF dans public/guides/.
// AFFICHAGE FR : NOUVELLE section SECTIONS -> clé "deconstruction-alliance". EN : nouveau thème "Deconstruction & Allyship".
export const PRO_GUIDES_14 = [
  // ---- FR : Déconstruction & Alliance ----
  { id: "deconstruire-sa-negrophobie", lang: "fr", theme: "Déconstruction & Alliance",
    title: "Déconstruire sa négrophobie",
    blurb: "Reconnaître et désapprendre le racisme anti-Noir·e en soi : comprendre l'origine des biais, les repérer, agir et réparer. 4 regards + pistes d'action.",
    pdf: "deconstruire-sa-negrophobie-4-approches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Comprendre l'origine des biais", "Les repérer sans se justifier", "Agir : impact > intention"] },
  { id: "deconstruire-sa-misogynoir", lang: "fr", theme: "Déconstruction & Alliance",
    title: "Déconstruire sa misogynoir",
    blurb: "Reconnaître et désapprendre les biais qui visent les femmes noires : voir le double standard, rendre leur pleine humanité, agir. 4 regards + pistes d'action.",
    pdf: "deconstruire-sa-misogynoir-4-approches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Voir le double standard", "Croire & écouter", "Amplifier, recréditer"] },
  { id: "deconstruire-son-racisme", lang: "fr", theme: "Déconstruction & Alliance",
    title: "Déconstruire son racisme",
    blurb: "Reconnaître ses biais et passer à l'antiracisme : du « non-raciste » passif à l'action concrète et continue. 4 regards + pistes d'action.",
    pdf: "deconstruire-son-racisme-4-approches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Non-raciste ≠ antiraciste", "Voir ses automatismes", "Agir dans la durée"] },
  // ---- EN : Deconstruction & Allyship ----
  { id: "unlearning-anti-black-racism", lang: "en", theme: "Deconstruction & Allyship",
    title: "Unlearning Anti-Black Racism",
    blurb: "Recognize and unlearn anti-Black bias in yourself: understand where biases come from, spot them, act and repair. 4 lenses + action steps.",
    pdf: "unlearning-anti-black-racism-4-approaches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Understand where bias comes from", "Spot it without justifying", "Act: impact > intent"] },
  { id: "unlearning-misogynoir", lang: "en", theme: "Deconstruction & Allyship",
    title: "Unlearning Misogynoir",
    blurb: "Recognize and unlearn bias against Black women: see the double standard, restore their full humanity, act. 4 lenses + action steps.",
    pdf: "unlearning-misogynoir-4-approaches.pdf", priceCents: 999, currency: "eur",
    bullets: ["See the double standard", "Believe & listen", "Amplify, re-credit"] },
  { id: "unlearning-racism-becoming-antiracist", lang: "en", theme: "Deconstruction & Allyship",
    title: "Unlearning Racism: Becoming Antiracist",
    blurb: "Recognize your biases and move to antiracism: from passive 'non-racist' to concrete, ongoing action. 4 lenses + action steps.",
    pdf: "unlearning-racism-becoming-antiracist-4-approaches.pdf", priceCents: 999, currency: "eur",
    bullets: ["Non-racist ≠ antiracist", "See your automatics", "Act over time"] },
] as const;
