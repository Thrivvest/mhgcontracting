/**
 * MHG Contracting - Service Area Pages Data
 *
 * Which service × town pages exist, with their title and H1. The body copy
 * and FAQs are generated from sourced data in lib/town-page.ts (2026-09-28):
 * the old hand-written copy made local claims nobody could source.
 */

// ─── Types ──────────────────────────────────────────────

export interface AreaPage {
  serviceSlug: string;
  serviceName: string;
  citySlug: string;
  cityName: string;
  state: string;
  title: string;
  h1: string;
  relatedPortfolioSlugs: string[];
  relatedBlogSlugs: string[];
}

// ─── City Data ──────────────────────────────────────────

export interface CityInfo {
  slug: string;
  name: string;
  state: string;
  stateAbbr: string;
}

export const CITIES: CityInfo[] = [
  { slug: "princeton-nj", name: "Princeton", state: "New Jersey", stateAbbr: "NJ" },
  { slug: "hamilton-nj", name: "Hamilton", state: "New Jersey", stateAbbr: "NJ" },
  { slug: "west-windsor-nj", name: "West Windsor", state: "New Jersey", stateAbbr: "NJ" },
  { slug: "lawrenceville-nj", name: "Lawrenceville", state: "New Jersey", stateAbbr: "NJ" },
  { slug: "plainsboro-nj", name: "Plainsboro", state: "New Jersey", stateAbbr: "NJ" },
  { slug: "yardley-pa", name: "Yardley", state: "Pennsylvania", stateAbbr: "PA" },
  { slug: "robbinsville-nj", name: "Robbinsville", state: "New Jersey", stateAbbr: "NJ" },
  { slug: "east-windsor-nj", name: "East Windsor", state: "New Jersey", stateAbbr: "NJ" },
  { slug: "hopewell-nj", name: "Hopewell", state: "New Jersey", stateAbbr: "NJ" },
  { slug: "pennington-nj", name: "Pennington", state: "New Jersey", stateAbbr: "NJ" },
  { slug: "ewing-nj", name: "Ewing", state: "New Jersey", stateAbbr: "NJ" },
];

// ─── Service Slugs for cross-ref ────────────────────────

export const SERVICE_SLUGS = [
  "kitchen-renovations",
  "bathroom-renovations",
  "basement-finishing",
  "full-home-renovations",
  "additions",
  "new-construction",
] as const;

// ─── Area Pages ─────────────────────────────────────────

export const AREA_PAGES: AreaPage[] = [
  // ═══════════════════════════════════════════════════════
  // KITCHEN RENOVATIONS
  // ═══════════════════════════════════════════════════════
  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "princeton-nj",
    cityName: "Princeton",
    state: "NJ",
    title: "Kitchen Renovations in Princeton, NJ | MHG Contracting",
    h1: "Kitchen Renovations in Princeton, NJ",
    relatedPortfolioSlugs: ["modern-farmhouse-kitchen", "traditional-chefs-kitchen"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "kitchen-renovation-timeline-nj"],
  },
  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "hamilton-nj",
    cityName: "Hamilton",
    state: "NJ",
    title: "Kitchen Renovations in Hamilton, NJ | MHG Contracting",
    h1: "Kitchen Renovations in Hamilton, NJ",
    relatedPortfolioSlugs: ["open-concept-kitchen-living", "modern-farmhouse-kitchen"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "kitchen-renovation-timeline-nj"],
  },
  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "lawrenceville-nj",
    cityName: "Lawrenceville",
    state: "NJ",
    title: "Kitchen Remodel in Lawrenceville, NJ | MHG Contracting",
    h1: "Kitchen Renovations in Lawrenceville, NJ",
    relatedPortfolioSlugs: ["contemporary-guest-bath", "modern-farmhouse-kitchen"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "choosing-a-contractor"],
  },
  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "plainsboro-nj",
    cityName: "Plainsboro",
    state: "NJ",
    title: "Kitchen Renovations in Plainsboro, NJ | MHG Contracting",
    h1: "Kitchen Renovations in Plainsboro, NJ",
    relatedPortfolioSlugs: ["custom-colonial-new-build", "traditional-chefs-kitchen"],
    relatedBlogSlugs: ["kitchen-renovation-timeline-nj", "kitchen-remodel-cost"],
  },
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "princeton-nj",
    cityName: "Princeton",
    state: "NJ",
    title: "Bathroom Renovations in Princeton, NJ | MHG Contracting",
    h1: "Bathroom Renovations in Princeton, NJ",
    relatedPortfolioSlugs: ["spa-inspired-master-bath", "luxury-primary-bath-retreat"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "choosing-a-contractor"],
  },
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "hamilton-nj",
    cityName: "Hamilton",
    state: "NJ",
    title: "Bathroom Remodel in Hamilton, NJ | MHG Contracting",
    h1: "Bathroom Renovations in Hamilton, NJ",
    relatedPortfolioSlugs: ["spa-inspired-master-bath", "luxury-primary-bath-retreat"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "choosing-a-contractor"],
  },
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "lawrenceville-nj",
    cityName: "Lawrenceville",
    state: "NJ",
    title: "Bathroom Renovations in Lawrenceville, NJ | MHG Contracting",
    h1: "Bathroom Renovations in Lawrenceville, NJ",
    relatedPortfolioSlugs: ["contemporary-guest-bath", "spa-inspired-master-bath"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "choosing-a-contractor"],
  },
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "plainsboro-nj",
    cityName: "Plainsboro",
    state: "NJ",
    title: "Bathroom Renovations in Plainsboro, NJ | MHG Contracting",
    h1: "Bathroom Renovations in Plainsboro, NJ",
    relatedPortfolioSlugs: ["luxury-primary-bath-retreat", "contemporary-guest-bath"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "choosing-a-contractor"],
  },
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "yardley-pa",
    cityName: "Yardley",
    state: "PA",
    title: "Bathroom Renovations in Yardley, PA | MHG Contracting",
    h1: "Bathroom Renovations in Yardley, PA",
    relatedPortfolioSlugs: ["spa-inspired-master-bath", "contemporary-guest-bath"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "choosing-a-contractor"],
  },
  // ═══════════════════════════════════════════════════════
  // BASEMENT FINISHING
  // ═══════════════════════════════════════════════════════
  {
    serviceSlug: "basement-finishing",
    serviceName: "Basement Finishing",
    citySlug: "princeton-nj",
    cityName: "Princeton",
    state: "NJ",
    title: "Basement Finishing & Remodeling in Princeton, NJ | MHG",
    h1: "Basement Finishing & Remodeling in Princeton, NJ",
    relatedPortfolioSlugs: ["entertainment-basement-suite"],
    relatedBlogSlugs: ["basement-finishing-cost", "choosing-a-contractor"],
  },
  {
    serviceSlug: "basement-finishing",
    serviceName: "Basement Finishing",
    citySlug: "west-windsor-nj",
    cityName: "West Windsor",
    state: "NJ",
    title: "Basement Finishing in West Windsor, NJ | MHG Contracting",
    h1: "Basement Finishing in West Windsor, NJ",
    relatedPortfolioSlugs: ["entertainment-basement-suite"],
    relatedBlogSlugs: ["basement-finishing-cost", "choosing-a-contractor"],
  },
  {
    serviceSlug: "basement-finishing",
    serviceName: "Basement Finishing",
    citySlug: "lawrenceville-nj",
    cityName: "Lawrenceville",
    state: "NJ",
    title: "Basement Finishing in Lawrenceville, NJ | MHG Contracting",
    h1: "Basement Finishing in Lawrenceville, NJ",
    relatedPortfolioSlugs: ["entertainment-basement-suite"],
    relatedBlogSlugs: ["basement-finishing-cost", "choosing-a-contractor"],
  },
  {
    serviceSlug: "basement-finishing",
    serviceName: "Basement Finishing",
    citySlug: "plainsboro-nj",
    cityName: "Plainsboro",
    state: "NJ",
    title: "Basement Finishing in Plainsboro, NJ | MHG Contracting",
    h1: "Basement Finishing in Plainsboro, NJ",
    relatedPortfolioSlugs: ["entertainment-basement-suite", "custom-colonial-new-build"],
    relatedBlogSlugs: ["basement-finishing-cost", "choosing-a-contractor"],
  },
  {
    serviceSlug: "basement-finishing",
    serviceName: "Basement Finishing",
    citySlug: "yardley-pa",
    cityName: "Yardley",
    state: "PA",
    title: "Basement Finishing & Remodeling in Yardley, PA | MHG",
    h1: "Basement Finishing & Remodeling in Yardley, PA",
    relatedPortfolioSlugs: ["entertainment-basement-suite", "open-concept-kitchen-living"],
    relatedBlogSlugs: ["basement-finishing-cost", "choosing-a-contractor"],
  },
  // ═══════════════════════════════════════════════════════
  // FULL HOME RENOVATIONS
  // ═══════════════════════════════════════════════════════
  {
    serviceSlug: "full-home-renovations",
    serviceName: "Full Home Renovations",
    citySlug: "west-windsor-nj",
    cityName: "West Windsor",
    state: "NJ",
    title: "Full Home Renovations in West Windsor, NJ | MHG Contracting",
    h1: "Full Home Renovations in West Windsor, NJ",
    relatedPortfolioSlugs: ["whole-home-transformation", "open-concept-kitchen-living"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-renovation-timeline-nj"],
  },
  {
    serviceSlug: "full-home-renovations",
    serviceName: "Full Home Renovations",
    citySlug: "lawrenceville-nj",
    cityName: "Lawrenceville",
    state: "NJ",
    title: "Full Home Renovations in Lawrenceville, NJ | MHG Contracting",
    h1: "Full Home Renovations in Lawrenceville, NJ",
    relatedPortfolioSlugs: ["whole-home-transformation"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-remodel-cost"],
  },
  {
    serviceSlug: "full-home-renovations",
    serviceName: "Full Home Renovations",
    citySlug: "plainsboro-nj",
    cityName: "Plainsboro",
    state: "NJ",
    title: "Full Home Renovations in Plainsboro, NJ | MHG Contracting",
    h1: "Full Home Renovations in Plainsboro, NJ",
    relatedPortfolioSlugs: ["whole-home-transformation", "custom-colonial-new-build"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-renovation-timeline-nj"],
  },
  {
    serviceSlug: "full-home-renovations",
    serviceName: "Full Home Renovations",
    citySlug: "yardley-pa",
    cityName: "Yardley",
    state: "PA",
    title: "Full Home Renovations in Yardley, PA | MHG Contracting",
    h1: "Full Home Renovations in Yardley, PA",
    relatedPortfolioSlugs: ["open-concept-kitchen-living", "whole-home-transformation"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-renovation-timeline-nj"],
  },  {
    serviceSlug: "full-home-renovations",
    serviceName: "Full Home Renovations",
    citySlug: "princeton-nj",
    cityName: "Princeton",
    state: "NJ",
    title: "Full Home Renovations in Princeton, NJ | MHG Contracting",
    h1: "Full Home Renovations in Princeton, NJ",
    relatedPortfolioSlugs: ["whole-home-transformation", "open-concept-kitchen-living"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-timeline"],
  },  {
    serviceSlug: "full-home-renovations",
    serviceName: "Full Home Renovations",
    citySlug: "hamilton-nj",
    cityName: "Hamilton",
    state: "NJ",
    title: "Full Home Renovations in Hamilton, NJ | MHG Contracting",
    h1: "Full Home Renovations in Hamilton, NJ",
    relatedPortfolioSlugs: ["whole-home-transformation", "open-concept-kitchen-living"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-remodel-cost"],
  },
  // ═══════════════════════════════════════════════════════
  // ADDITIONS
  // ═══════════════════════════════════════════════════════
  {
    serviceSlug: "additions",
    serviceName: "Additions",
    citySlug: "princeton-nj",
    cityName: "Princeton",
    state: "NJ",
    title: "Home Additions in Princeton, NJ | MHG Contracting",
    h1: "Home Additions in Princeton, NJ",
    relatedPortfolioSlugs: ["sunroom-family-room-addition"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-remodel-cost"],
  },
  {
    serviceSlug: "additions",
    serviceName: "Additions",
    citySlug: "hamilton-nj",
    cityName: "Hamilton",
    state: "NJ",
    title: "Home Additions in Hamilton, NJ | MHG Contracting",
    h1: "Home Additions in Hamilton, NJ",
    relatedPortfolioSlugs: ["sunroom-family-room-addition"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-remodel-cost"],
  },
  {
    serviceSlug: "additions",
    serviceName: "Additions",
    citySlug: "west-windsor-nj",
    cityName: "West Windsor",
    state: "NJ",
    title: "Home Additions in West Windsor, NJ | MHG Contracting",
    h1: "Home Additions in West Windsor, NJ",
    relatedPortfolioSlugs: ["sunroom-family-room-addition"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-renovation-timeline-nj"],
  },
  {
    serviceSlug: "additions",
    serviceName: "Additions",
    citySlug: "lawrenceville-nj",
    cityName: "Lawrenceville",
    state: "NJ",
    title: "Home Additions in Lawrenceville, NJ | MHG Contracting",
    h1: "Home Additions in Lawrenceville, NJ",
    relatedPortfolioSlugs: ["sunroom-family-room-addition"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-remodel-cost"],
  },
  {
    serviceSlug: "additions",
    serviceName: "Additions",
    citySlug: "plainsboro-nj",
    cityName: "Plainsboro",
    state: "NJ",
    title: "Home Additions in Plainsboro, NJ | MHG Contracting",
    h1: "Home Additions in Plainsboro, NJ",
    relatedPortfolioSlugs: ["sunroom-family-room-addition", "custom-colonial-new-build"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-renovation-timeline-nj"],
  },
  {
    serviceSlug: "additions",
    serviceName: "Additions",
    citySlug: "yardley-pa",
    cityName: "Yardley",
    state: "PA",
    title: "Home Additions in Yardley, PA | MHG Contracting",
    h1: "Home Additions in Yardley, PA",
    relatedPortfolioSlugs: ["sunroom-family-room-addition", "open-concept-kitchen-living"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-remodel-cost"],
  },
  // ═══════════════════════════════════════════════════════
  // NEW CONSTRUCTION
  // ═══════════════════════════════════════════════════════
  {
    serviceSlug: "new-construction",
    serviceName: "New Construction",
    citySlug: "princeton-nj",
    cityName: "Princeton",
    state: "NJ",
    title: "New Home Construction in Princeton, NJ | MHG Contracting",
    h1: "New Home Construction in Princeton, NJ",
    relatedPortfolioSlugs: ["custom-colonial-new-build"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-renovation-timeline-nj"],
  },
  {
    serviceSlug: "new-construction",
    serviceName: "New Construction",
    citySlug: "hamilton-nj",
    cityName: "Hamilton",
    state: "NJ",
    title: "New Home Construction in Hamilton, NJ | MHG Contracting",
    h1: "New Home Construction in Hamilton, NJ",
    relatedPortfolioSlugs: ["custom-colonial-new-build"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-remodel-cost"],
  },
  {
    serviceSlug: "new-construction",
    serviceName: "New Construction",
    citySlug: "lawrenceville-nj",
    cityName: "Lawrenceville",
    state: "NJ",
    title: "New Home Construction in Lawrenceville, NJ | MHG Contracting",
    h1: "New Home Construction in Lawrenceville, NJ",
    relatedPortfolioSlugs: ["custom-colonial-new-build"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-remodel-cost"],
  },
  {
    serviceSlug: "new-construction",
    serviceName: "New Construction",
    citySlug: "plainsboro-nj",
    cityName: "Plainsboro",
    state: "NJ",
    title: "New Home Construction in Plainsboro, NJ | MHG Contracting",
    h1: "New Home Construction in Plainsboro, NJ",
    relatedPortfolioSlugs: ["custom-colonial-new-build"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-renovation-timeline-nj"],
  },
  {
    serviceSlug: "new-construction",
    serviceName: "New Construction",
    citySlug: "yardley-pa",
    cityName: "Yardley",
    state: "PA",
    title: "New Home Construction in Yardley, PA | MHG Contracting",
    h1: "New Home Construction in Yardley, PA",
    relatedPortfolioSlugs: ["custom-colonial-new-build"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-renovation-timeline-nj"],
  },  {
    serviceSlug: "new-construction",
    serviceName: "New Construction",
    citySlug: "west-windsor-nj",
    cityName: "West Windsor",
    state: "NJ",
    title: "Custom Home Builder in West Windsor, NJ | MHG",
    h1: "New Home Construction in West Windsor, NJ",
    relatedPortfolioSlugs: ["custom-colonial-new-build"],
    relatedBlogSlugs: ["choosing-a-contractor", "kitchen-timeline"],
  },

  // ═══════════════════════════════════════════════════════
  // TIER 4-7 EXPANSION: ROBBINSVILLE, EAST WINDSOR, HOPEWELL, PENNINGTON, EWING
  // ═══════════════════════════════════════════════════════

  // ─── Kitchen: Robbinsville ──────────────────────────────
  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "robbinsville-nj",
    cityName: "Robbinsville",
    state: "NJ",
    title: "Kitchen Remodeling in Robbinsville, NJ | MHG Contracting",
    h1: "Kitchen Remodeling in Robbinsville, NJ",
    relatedPortfolioSlugs: ["open-concept-kitchen-living", "modern-farmhouse-kitchen"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "kitchen-renovation-timeline-nj"],
  },

  // ─── Kitchen: East Windsor ──────────────────────────────
  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "east-windsor-nj",
    cityName: "East Windsor",
    state: "NJ",
    title: "Kitchen Remodeling in East Windsor, NJ | MHG Contracting",
    h1: "Kitchen Remodeling in East Windsor, NJ",
    relatedPortfolioSlugs: ["modern-farmhouse-kitchen", "open-concept-kitchen-living"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "kitchen-renovation-timeline-nj"],
  },

  // ─── Kitchen: Hopewell ──────────────────────────────────
  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "hopewell-nj",
    cityName: "Hopewell",
    state: "NJ",
    title: "Kitchen Remodeling in Hopewell, NJ | MHG Contracting",
    h1: "Kitchen Remodeling in Hopewell, NJ",
    relatedPortfolioSlugs: ["modern-farmhouse-kitchen", "traditional-chefs-kitchen"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "permits-nj"],
  },

  // ─── Kitchen: Pennington ────────────────────────────────
  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "pennington-nj",
    cityName: "Pennington",
    state: "NJ",
    title: "Kitchen Remodeling in Pennington, NJ | MHG Contracting",
    h1: "Kitchen Remodeling in Pennington, NJ",
    relatedPortfolioSlugs: ["traditional-chefs-kitchen", "modern-farmhouse-kitchen"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "kitchen-renovation-timeline-nj"],
  },

  // ─── Kitchen: Ewing ─────────────────────────────────────
  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "ewing-nj",
    cityName: "Ewing",
    state: "NJ",
    title: "Kitchen Remodeling in Ewing, NJ | MHG Contracting",
    h1: "Kitchen Remodeling in Ewing, NJ",
    relatedPortfolioSlugs: ["open-concept-kitchen-living", "modern-farmhouse-kitchen"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "kitchen-renovation-timeline-nj"],
  },  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "west-windsor-nj",
    cityName: "West Windsor",
    state: "NJ",
    title: "Kitchen Renovations in West Windsor, NJ | MHG Contracting",
    h1: "Kitchen Renovations in West Windsor, NJ",
    relatedPortfolioSlugs: ["traditional-chefs-kitchen", "modern-farmhouse-kitchen"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "kitchen-timeline"],
  },  {
    serviceSlug: "kitchen-renovations",
    serviceName: "Kitchen Renovations",
    citySlug: "yardley-pa",
    cityName: "Yardley",
    state: "PA",
    title: "Kitchen Renovations in Yardley, PA | MHG Contracting",
    h1: "Kitchen Renovations in Yardley, PA",
    relatedPortfolioSlugs: ["open-concept-kitchen-living", "modern-farmhouse-kitchen"],
    relatedBlogSlugs: ["kitchen-remodel-cost", "choosing-a-contractor"],
  },

  // ─── Bathroom: Robbinsville ─────────────────────────────
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "robbinsville-nj",
    cityName: "Robbinsville",
    state: "NJ",
    title: "Bathroom Remodeling in Robbinsville, NJ | MHG Contracting",
    h1: "Bathroom Remodeling in Robbinsville, NJ",
    relatedPortfolioSlugs: ["luxury-primary-bath-retreat", "spa-inspired-master-bath"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "bathroom-ideas"],
  },

  // ─── Bathroom: East Windsor ─────────────────────────────
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "east-windsor-nj",
    cityName: "East Windsor",
    state: "NJ",
    title: "Bathroom Remodeling in East Windsor, NJ | MHG Contracting",
    h1: "Bathroom Remodeling in East Windsor, NJ",
    relatedPortfolioSlugs: ["contemporary-guest-bath", "spa-inspired-master-bath"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "bathroom-ideas"],
  },

  // ─── Bathroom: Hopewell ─────────────────────────────────
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "hopewell-nj",
    cityName: "Hopewell",
    state: "NJ",
    title: "Bathroom Remodeling in Hopewell, NJ | MHG Contracting",
    h1: "Bathroom Remodeling in Hopewell, NJ",
    relatedPortfolioSlugs: ["luxury-primary-bath-retreat", "contemporary-guest-bath"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "permits-nj"],
  },

  // ─── Bathroom: Pennington ───────────────────────────────
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "pennington-nj",
    cityName: "Pennington",
    state: "NJ",
    title: "Bathroom Remodeling in Pennington, NJ | MHG Contracting",
    h1: "Bathroom Remodeling in Pennington, NJ",
    relatedPortfolioSlugs: ["luxury-primary-bath-retreat", "spa-inspired-master-bath"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "bathroom-ideas"],
  },

  // ─── Bathroom: Ewing ────────────────────────────────────
  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "ewing-nj",
    cityName: "Ewing",
    state: "NJ",
    title: "Bathroom Remodeling in Ewing, NJ | MHG Contracting",
    h1: "Bathroom Remodeling in Ewing, NJ",
    relatedPortfolioSlugs: ["contemporary-guest-bath", "luxury-primary-bath-retreat"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "bathroom-ideas"],
  },  {
    serviceSlug: "bathroom-renovations",
    serviceName: "Bathroom Renovations",
    citySlug: "west-windsor-nj",
    cityName: "West Windsor",
    state: "NJ",
    title: "Bathroom Renovations in West Windsor, NJ | MHG Contracting",
    h1: "Bathroom Renovations in West Windsor, NJ",
    relatedPortfolioSlugs: ["contemporary-guest-bath", "spa-inspired-master-bath"],
    relatedBlogSlugs: ["bathroom-remodel-cost", "choosing-a-contractor"],
  },

  // ─── Basement: Robbinsville ─────────────────────────────
  {
    serviceSlug: "basement-finishing",
    serviceName: "Basement Finishing",
    citySlug: "robbinsville-nj",
    cityName: "Robbinsville",
    state: "NJ",
    title: "Basement Finishing in Robbinsville, NJ | MHG Contracting",
    h1: "Basement Finishing in Robbinsville, NJ",
    relatedPortfolioSlugs: ["entertainment-basement-suite"],
    relatedBlogSlugs: ["basement-finishing-cost", "basement-finishing-ideas"],
  },

  // ─── Basement: East Windsor ─────────────────────────────
  {
    serviceSlug: "basement-finishing",
    serviceName: "Basement Finishing",
    citySlug: "east-windsor-nj",
    cityName: "East Windsor",
    state: "NJ",
    title: "Basement Finishing in East Windsor, NJ | MHG Contracting",
    h1: "Basement Finishing in East Windsor, NJ",
    relatedPortfolioSlugs: ["entertainment-basement-suite"],
    relatedBlogSlugs: ["basement-finishing-cost", "basement-finishing-ideas"],
  },  {
    serviceSlug: "basement-finishing",
    serviceName: "Basement Finishing",
    citySlug: "hamilton-nj",
    cityName: "Hamilton",
    state: "NJ",
    title: "Basement Finishing in Hamilton, NJ | MHG Contracting",
    h1: "Basement Finishing in Hamilton, NJ",
    relatedPortfolioSlugs: ["entertainment-basement-suite"],
    relatedBlogSlugs: ["basement-finishing-cost", "choosing-a-contractor"],
  },

];

// ─── Helpers ────────────────────────────────────────────

export function getAreaPage(serviceSlug: string, citySlug: string): AreaPage | undefined {
  return AREA_PAGES.find((p) => p.serviceSlug === serviceSlug && p.citySlug === citySlug);
}

export function getAreaPagesByService(serviceSlug: string): AreaPage[] {
  return AREA_PAGES.filter((p) => p.serviceSlug === serviceSlug);
}

export function getAreaPagesByCity(citySlug: string): AreaPage[] {
  return AREA_PAGES.filter((p) => p.citySlug === citySlug);
}

export function getAllAreaParams(): { slug: string; "city-slug": string }[] {
  return AREA_PAGES.map((p) => ({
    slug: p.serviceSlug,
    "city-slug": p.citySlug,
  }));
}
