// Recommandations affichées à la fin du test des blessures intérieures.
export const BLESSURE_RECO = {
  rejet: {
    primaryGuideId: "guerir-blessure-rejet",
    label: "Rejet",
    title: "Avancer avec la blessure de rejet",
    message: "La peur de ne pas être à sa place peut te pousser à te retirer ou à te suradapter. Ces ressources t'aident à reconstruire une estime solide et à oser prendre ta place.",
    guideIds: ["confiance-estime-de-soi", "syndrome-imposteur", "briser-isolement"],
    packId: "pack-blessures-interieures",
  },
  abandon: {
    primaryGuideId: "guerir-blessure-abandon",
    label: "Abandon",
    title: "Apaiser la blessure d'abandon",
    message: "La peur d'être quitté·e peut nourrir dépendance affective et jalousie. Ces ressources t'aident à aimer sans te perdre et à te sentir en sécurité, à l'intérieur.",
    guideIds: ["sortir-dependance-affective", "gerer-la-jalousie", "surmonter-une-rupture"],
    packId: "pack-blessures-interieures",
  },
  humiliation: {
    primaryGuideId: "guerir-blessure-humiliation",
    label: "Humiliation",
    title: "Te libérer de la blessure d'humiliation",
    message: "La honte et la peur du jugement peuvent te faire douter de ta valeur et de ton corps. Ces ressources t'aident à te réconcilier avec toi et à t'affirmer sans te rabaisser.",
    guideIds: ["confiance-estime-de-soi", "honte-de-classe", "gerer-ses-emotions"],
    packId: "pack-blessures-interieures",
  },
  trahison: {
    primaryGuideId: "guerir-blessure-trahison",
    label: "Trahison",
    title: "Te reconstruire après la blessure de trahison",
    message: "La difficulté à faire confiance vient souvent d'une confiance abîmée. Ces ressources t'aident à reconnaître l'emprise, te refaire confiance et te reconstruire.",
    guideIds: ["reconnaitre-controle-coercitif", "sortir-du-gaslighting", "se-reconstruire-apres-relation-toxique"],
    packId: "pack-blessures-interieures",
  },
  injustice: {
    primaryGuideId: "guerir-blessure-injustice",
    label: "Injustice",
    title: "Adoucir la blessure d'injustice",
    message: "L'exigence et le contrôle peuvent t'épuiser et te couper de tes émotions. Ces ressources t'aident à relâcher la pression et à retrouver de la souplesse.",
    guideIds: ["gerer-ses-emotions", "anxiete-de-performance", "equilibre-pro-perso"],
    packId: "pack-blessures-interieures",
  },
} as const;
