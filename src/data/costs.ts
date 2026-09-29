/**
 * THE cost data file (website SEO standard 5.1). Every dollar figure on the
 * site comes from here, and every figure here comes from a named, published
 * source. The build fails on a dollar amount typed anywhere else
 * (scripts/quality-gate.mjs, "hard-coded price" check).
 *
 * 2026-09-28: replaced the site's first-person price ranges ("the average
 * bathroom we build in Hamilton...") with third-party data, same sources and
 * figures as Kubat (Connor: the Kubat way). MHG quotes every project after a
 * free in-home estimate; these figures show what the market pays.
 * Sources verified 2026-09-26 (Kubat research, pricing-page-sources) and
 * 2026-09-28 (NAHB).
 */

export const money = (n: number) => `$${n.toLocaleString('en-US')}`;
export const k = (n: number) => `$${Math.round(n / 1000)}k`;

/**
 * 2026 U.S. Houzz & Home Study (renovations done in 2025), U.S. homeowners,
 * projects done DIY and with professional help, not adjusted for inflation.
 * Median and 90th percentile ("top 10% spent"). Pages 17 and 18. Cite as
 * Houzz. Updated 2026-09-26 from the 2025 edition: bath medians rose.
 */
export const HOUZZ_STUDY = '2026 U.S. Houzz & Home Study';
export const HOUZZ_YEAR = 2025;
export const HOUZZ = {
  kitchenSmall: { median: 35000, p90: 93000, label: 'Major kitchen remodel, under 200 sq ft', scope: 'At least all cabinets and appliances replaced' },
  kitchenLarge: { median: 55000, p90: 150000, label: 'Major kitchen remodel, 200 sq ft or more', scope: 'At least all cabinets and appliances replaced' },
  bathSmall: { median: 18000, p90: 44000, label: 'Major primary bath remodel, under 100 sq ft', scope: 'At least the vanity, countertops and toilet replaced' },
  bathLarge: { median: 30000, p90: 75000, label: 'Major primary bath remodel, 100 sq ft or more', scope: 'At least the vanity, countertops and toilet replaced' },
} as const;
export type HouzzKey = keyof typeof HOUZZ;

/**
 * 2026 Houzz & Home Study, national renovation spend per renovating household
 * in 2025, all projects combined (page 5). 54% of homeowners renovated.
 */
export const HOUZZ_HOUSEHOLD = { median: 20000, p90: 150000, year: 2025, shareRenovating: 54 } as const;

/**
 * 2026 Houzz & Home Study (page 16): median spend on renovating each room in
 * 2025, any scope (a refresh counts as well as a full remodel), which is why
 * these sit below the major-remodel medians in HOUZZ.
 */
export const HOUZZ_ROOM_MEDIAN = { kitchen: 24000, primaryBath: 15000, guestBath: 7000 } as const;

/**
 * New Jersey legal thresholds, kept here because the build allows dollar
 * figures only in this file. N.J.S.A. 56:8-151(a): contracts over this amount,
 * and every change to them, must be in writing. N.J.S.A. 56:8-142(a): minimum
 * commercial general liability per occurrence for a registered contractor.
 */
export const NJ_WRITTEN_CONTRACT_OVER = 500;

/** 2026 U.S. Houzz Kitchen Trends Study: its high-budget bracket ("$50,000 or more"). */
export const HOUZZ_KITCHEN_HIGH_BUDGET = 50000;
export const NJ_HIC_MIN_LIABILITY = 500000;

/**
 * NAHB, Cost of Constructing a Home 2024 (January 2025), national survey of
 * builders: average single-family home 2,647 sq ft, average construction cost
 * $428,215 (about $162 per sq ft), average sales price $665,298. Construction
 * cost excludes the lot, financing, overhead and profit.
 */
export const NAHB = {
  sqft: 2647, constructionCost: 428215, perSqft: 162, salesPrice: 665298, year: 2024,
  /** Shares of the average sales price (NAHB blog, Eye on Housing, 2025-01). */
  pctConstruction: 64.4, pctLot: 13.7,
} as const;

/** 2026 Houzz & Home Study (page 14): average project length in 2025, U.S., in months. */
export const HOUZZ_TIME = {
  kitchen: { plan: 9.5, build: 5.8, label: 'Kitchen' },
  primaryBath: { plan: 8.4, build: 4.8, label: 'Primary bathroom' },
} as const;

/**
 * Remodeling 2025 Cost vs. Value Report, Middle Atlantic region (NJ, NY, PA),
 * job cost and cost recouped at resale. LICENSE (checked 2026-09-26): quote in
 * sentences only, never as a table or chart; no more than FIVE projects across
 * the whole site; cite "Remodeling 2025 Cost vs. Value Report" with
 * www.costvsvalue.com and carry the copyright line. All five slots are used
 * below. Do not add a sixth.
 */
export const CVV = {
  minorKitchen: { project: 'midrange minor kitchen remodel', jobCost: 31212, recouped: 107.2 },
  majorKitchen: { project: 'midrange major kitchen remodel', jobCost: 89679, recouped: 49 },
  bath: { project: 'midrange bathroom remodel', jobCost: 30158, recouped: 79.9 },
  basement: { project: 'basement remodel', jobCost: 60644, recouped: 63.4 },
  primarySuite: { project: 'midrange primary suite addition', jobCost: 195129, recouped: 27.1 },
} as const;
export type CvvKey = keyof typeof CVV;

export const CVV_CITE = 'according to the Remodeling 2025 Cost vs. Value Report (www.costvsvalue.com)';
export const CVV_COPYRIGHT =
  '© 2025 Zonda Media, a Delaware Corporation. Complete data from the Remodeling 2025 Cost vs. Value Report can be downloaded free at www.costvsvalue.com.';

/** Plain-text summaries used in FAQ answers and descriptions. */
export const KITCHEN_MEDIANS = `${money(HOUZZ.kitchenSmall.median)} for kitchens under 200 square feet and ${money(HOUZZ.kitchenLarge.median)} for larger ones`;
export const BATH_MEDIANS = `${money(HOUZZ.bathSmall.median)} for primary baths under 100 square feet and ${money(HOUZZ.bathLarge.median)} for larger ones`;

/** Last time the figures above were checked against their sources. */
export const COSTS_CHECKED = '2026-09-28';

/**
 * Tokens for plain-text data that cannot call helpers (titles, descriptions):
 * "{kitchenMedian}" -> "$35k to $55k". Houzz only: Cost vs. Value figures need
 * an in-sentence citation, so they never go in titles or meta descriptions.
 */
export const PRICE_TOKENS: Record<string, string> = {
  '{kitchenMedian}': `${k(HOUZZ.kitchenSmall.median)} to ${k(HOUZZ.kitchenLarge.median)}`,
  '{bathMedian}': `${k(HOUZZ.bathSmall.median)} to ${k(HOUZZ.bathLarge.median)}`,
};
export const fillPrices = (text: string) => text.replace(/\{[a-zA-Z]+\}/g, (t) => PRICE_TOKENS[t] ?? t);
