// Témoignages affichés sur le site.
// RÈGLE : uniquement de VRAIS témoignages (de vraies personnes, avec leur accord).
// Les faux avis sont interdits (droit conso FR/UE/CH) et détruisent la confiance.
// La section n'affiche QUE les entrées published: true. Les emplacements ci-dessous
// sont VIDES et published: false — remplace par de vrais retours, puis passe à true.
export type Testimonial = {
  id: string;
  name: string;        // prénom (+ initiale) ou "Anonyme"
  context?: string;    // ex. "Guide Confiance en soi", "Accompagnement coaching", ville
  text: string;        // le témoignage réel, mot pour mot
  rating?: number;     // optionnel, 1–5
  lang: "fr" | "en";
  published: boolean;  // true = affiché. Ne mets true que pour de VRAIS témoignages.
};

export const TESTIMONIALS: Testimonial[] = [
  // ---------- À REMPLIR AVEC DE VRAIS TÉMOIGNAGES ----------
  { id: "t1", name: "À remplacer (prénom)", context: "Guide / accompagnement concerné", text: "Colle ici le vrai témoignage, mot pour mot.", rating: 5, lang: "fr", published: false },
  { id: "t2", name: "À remplacer (prénom)", context: "Guide / accompagnement concerné", text: "Colle ici le vrai témoignage, mot pour mot.", rating: 5, lang: "fr", published: false },
  { id: "t3", name: "À remplacer (prénom)", context: "Guide / accompagnement concerné", text: "Colle ici le vrai témoignage, mot pour mot.", rating: 5, lang: "fr", published: false },
  { id: "t4", name: "Replace (first name)", context: "Relevant guide / coaching", text: "Paste the real testimonial here, word for word.", rating: 5, lang: "en", published: false },
];

export const publishedTestimonials = (lang: "fr" | "en") =>
  TESTIMONIALS.filter((t) => t.published && t.lang === lang);
