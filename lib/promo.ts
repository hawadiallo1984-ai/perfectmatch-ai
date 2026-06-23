export const GUIDE_PROMO = { active: false, percentOff: 30 };

export function discountedCents(cents: number): number {
  return GUIDE_PROMO.active ? Math.round(cents * (100 - GUIDE_PROMO.percentOff) / 100) : cents;
}
// 1900 -> 1330 (13,30€)
