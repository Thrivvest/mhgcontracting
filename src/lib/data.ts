/**
 * MHG Contracting - site data: portfolio projects, services, team.
 *
 * Facts about MHG come from the intake form (2026-03-28), GBP and
 * data/business.ts. Dollar figures only via data/costs.ts.
 */
import { BATH_BUDGET_QUESTION, CVV, CVV_CITE, HOUZZ, HOUZZ_ROOM_MEDIAN, HOUZZ_YEAR, HOUZZ_STUDY, NAHB, money } from "@/data/costs";
import { business } from "@/data/business";
import { HOUSING, PERMIT_OFFICES, townHousing, townOffices } from "@/data/sources";

// Hamilton facts for the hub pages' local sections (Census ACS, DCA roster).
const HAM_HOUSING = townHousing("hamilton-nj")!;
const HAM_OFFICE = townOffices("hamilton-nj")[0];

// ─── Types ──────────────────────────────────────────────

export type ServiceType =
  | "kitchen"
  | "bathroom"
  | "basement"
  | "full-renovation"
  | "addition"
  | "new-construction";

export interface PortfolioProject {
  id: string;
  title: string;
  slug: string;
  type: ServiceType;
  description: string;
  shortDescription: string;
  metaDescription: string;
  imagePath: string;
  galleryImages: string[];
  featured: boolean;
  gridFeatured: boolean;
}

export interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  icon: string;
  scopeItems: string[];
  faqs: FAQ[];
  seoTitle?: string;
  seoDescription?: string;
  costGuideSlug?: string;
  costGuideLabel?: string;
  /** Hero H1 when it should differ from `name` (keyword-led, e.g. "Bathroom Remodeling in NJ"). */
  h1?: string;
  /** Keyword headings for the template's overview, scope and FAQ sections. */
  headings?: { overview?: string; scope?: string; faqs?: string };
  /** Extra visible sections (HTML, internal links only), rendered after the scope list. */
  sections?: { heading: string; html: string }[];
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  projectType: ServiceType;
  quote: string;
  rating: number;
}

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  bio: string;
  imagePath: string;
}

// ─── Portfolio Projects ─────────────────────────────────

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "project-1",
    title: "Modern Farmhouse Kitchen",
    slug: "modern-farmhouse-kitchen",
    type: "kitchen",
    description:
      "A complete kitchen transformation featuring custom white shaker cabinetry, quartz countertops, a farmhouse sink, and a spacious center island. The open layout connects seamlessly to the dining area, creating the perfect space for family gatherings.",
    shortDescription: "Custom cabinetry, quartz counters, and a stunning center island.",
    metaDescription: "Modern farmhouse kitchen remodel by MHG Contracting. Custom white shaker cabinets, quartz counters, farmhouse sink, and a family-sized island.",
    imagePath: "/images/projects/kitchen-01.jpg",
    galleryImages: Array.from({ length: 8 }, (_, i) => `/images/projects/gallery/kitchen-01/${i + 1}.jpg`),
    featured: true,
    gridFeatured: false,
  },
  {
    id: "project-2",
    title: "Traditional Chef's Kitchen",
    slug: "traditional-chefs-kitchen",
    type: "kitchen",
    description:
      "This chef-inspired kitchen features professional-grade appliances, a custom range hood, and a waterfall edge quartz island. Warm wood beams and a spacious dining area make this the heart of the home.",
    shortDescription: "Professional-grade appliances with warm wood beams and a waterfall island.",
    metaDescription: "Chef-inspired kitchen renovation by MHG Contracting. Pro-grade appliances, custom range hood, waterfall quartz island, and warm wood beams.",
    imagePath: "/images/projects/kitchen-02.jpg",
    galleryImages: Array.from({ length: 8 }, (_, i) => `/images/projects/gallery/kitchen-02/${i + 1}.jpg`),
    featured: true,
    gridFeatured: true,
  },
  {
    id: "project-3",
    title: "Spa-Inspired Master Bath",
    slug: "spa-inspired-master-bath",
    type: "bathroom",
    description:
      "A luxurious master bathroom renovation featuring a freestanding soaking tub, frameless glass walk-in shower with custom tile work, and a double vanity with undermount sinks. Every detail was chosen to create a serene, spa-like retreat.",
    shortDescription: "Freestanding tub, walk-in shower and double vanity.",
    metaDescription: "Spa-inspired master bathroom remodel by MHG Contracting. Freestanding soaking tub, frameless walk-in shower, double vanity.",
    imagePath: "/images/projects/bath-01.jpg",
    galleryImages: Array.from({ length: 8 }, (_, i) => `/images/projects/gallery/bath-01/${i + 1}.jpg`),
    featured: true,
    gridFeatured: false,
  },
  {
    id: "project-4",
    title: "Contemporary Guest Bath",
    slug: "contemporary-guest-bath",
    type: "bathroom",
    description:
      "A compact yet elegant guest bathroom makeover with floor-to-ceiling subway tile, a floating vanity, and a frameless glass shower enclosure. Smart storage solutions maximize every inch of space.",
    shortDescription: "Floating vanity and floor-to-ceiling subway tile.",
    metaDescription: "Contemporary guest bath remodel by MHG Contracting. Floor-to-ceiling subway tile, floating vanity, and a frameless glass shower enclosure.",
    imagePath: "/images/projects/bath-02.jpg",
    galleryImages: Array.from({ length: 8 }, (_, i) => `/images/projects/gallery/bath-02/${i + 1}.jpg`),
    featured: false,
    gridFeatured: false,
  },
  {
    id: "project-5",
    title: "Entertainment Basement Suite",
    slug: "entertainment-basement-suite",
    type: "basement",
    description:
      "A full basement finishing project that transformed an unfinished space into a multi-zone entertainment area. Features include a home theater, a wet bar with custom cabinetry, a game area, and a guest bedroom with an en-suite bathroom.",
    shortDescription: "Home theater, wet bar, and guest suite in one stunning space.",
    metaDescription: "Finished basement by MHG Contracting. Multi-zone entertainment suite with home theater, custom wet bar, game area, and en-suite guest bedroom.",
    imagePath: "/images/projects/basement-01.jpg",
    galleryImages: Array.from({ length: 2 }, (_, i) => `/images/projects/gallery/basement-01/${i + 1}.jpg`),
    featured: true,
    gridFeatured: false,
  },
  {
    id: "project-6",
    title: "Whole-Home Transformation",
    slug: "whole-home-transformation",
    type: "full-renovation",
    description:
      "A comprehensive whole-home renovation of a colonial home. The project included opening up the main floor plan, renovating all three bathrooms, updating the kitchen, installing new hardwood floors throughout, and modernizing every system in the home.",
    shortDescription: "Complete colonial renovation from top to bottom.",
    metaDescription: "Whole-home renovation of a colonial by MHG Contracting. Opened floor plan, kitchen, 3 baths, hardwood floors, and full systems modernized.",
    imagePath: "/images/projects/fullreno-01.jpg",
    galleryImages: Array.from({ length: 8 }, (_, i) => `/images/projects/gallery/fullreno-01/${i + 1}.jpg`),
    featured: true,
    gridFeatured: false,
  },
  {
    id: "project-7",
    title: "Sunroom & Family Room Addition",
    slug: "sunroom-family-room-addition",
    type: "addition",
    description:
      "A sunroom and family room addition that expanded the living space with floor-to-ceiling windows, vaulted ceilings, and seamless indoor-outdoor flow. The addition includes built-in shelving.",
    shortDescription: "Bright sunroom addition with vaulted ceilings.",
    metaDescription: "Sunroom and family room addition by MHG Contracting. Floor-to-ceiling windows, vaulted ceilings, built-in shelving.",
    imagePath: "/images/projects/addition-01.jpg",
    galleryImages: Array.from({ length: 4 }, (_, i) => `/images/projects/gallery/addition-01/${i + 1}.jpg`),
    featured: false,
    gridFeatured: true,
  },
  {
    id: "project-8",
    title: "Custom Colonial New Build",
    slug: "custom-colonial-new-build",
    type: "new-construction",
    description:
      "A ground-up custom colonial home build with a large kitchen and a finished basement, blending traditional architecture with a modern interior.",
    shortDescription: "Custom colonial built from the ground up.",
    metaDescription: "Custom colonial new construction by MHG Contracting. Large kitchen, finished basement and traditional exterior.",
    imagePath: "/images/projects/newbuild-01.jpg",
    galleryImages: Array.from({ length: 6 }, (_, i) => `/images/projects/gallery/newbuild-01/${i + 1}.jpg`),
    featured: false,
    gridFeatured: true,
  },
  {
    id: "project-9",
    title: "Open Concept Kitchen & Living",
    slug: "open-concept-kitchen-living",
    type: "full-renovation",
    description:
      "A dramatic open-concept renovation that removed load-bearing walls (with proper engineering) to unite the kitchen, dining, and living areas. Features a large island, custom lighting, and wide-plank engineered hardwood.",
    shortDescription: "Load-bearing wall removal for dramatic open living.",
    metaDescription: "Open-concept kitchen and living renovation by MHG Contracting. Load-bearing wall removal, large island, custom lighting, wide-plank hardwood.",
    imagePath: "/images/projects/fullreno-02.jpg",
    galleryImages: Array.from({ length: 8 }, (_, i) => `/images/projects/gallery/fullreno-02/${i + 1}.jpg`),
    featured: false,
    gridFeatured: true,
  },
  {
    id: "project-10",
    title: "Luxury Primary Bath Retreat",
    slug: "luxury-primary-bath-retreat",
    type: "bathroom",
    description:
      "An expansive primary bathroom renovation featuring a custom-built walk-in shower with multiple shower heads, a soaking tub positioned beneath a picture window, and a spacious double vanity with premium fixtures throughout.",
    shortDescription: "Multi-head shower, soaking tub, and premium fixtures.",
    metaDescription: "Luxury primary bath remodel by MHG Contracting. Custom multi-head walk-in shower, soaking tub under a picture window, spacious double vanity.",
    imagePath: "/images/projects/bath-03.jpg",
    galleryImages: Array.from({ length: 2 }, (_, i) => `/images/projects/gallery/bath-03/${i + 1}.jpg`),
    featured: false,
    gridFeatured: false,
  },
];

// ─── Services ───────────────────────────────────────────

export const services: Service[] = [
  {
    id: "service-general-contracting",
    name: "General Contracting",
    slug: "general-contracting",
    description:
      "A general contractor owns the whole job: the plan, the permits, the trades, the schedule and the phone call when something turns up behind a wall. MHG Contracting is a family-owned contractor in Hamilton, NJ, registered with the New Jersey Division of Consumer Affairs (HIC #13VH13286900), with a crew of seven plus subcontractors. It runs kitchens, bathrooms, basements, additions, whole-home renovations and new construction within about 25 minutes of Hamilton. One contract, one team to call.",
    shortDescription:
      "One contract for the whole job, from a family-owned contractor in Hamilton, NJ.",
    seoTitle: "General Contractor in Central NJ | MHG Contracting",
    seoDescription:
      "Family-owned general contractor in Hamilton, NJ (HIC #13VH13286900). Kitchens, baths, basements, additions and new homes. Free estimates: (609) 712-2474.",
    icon: "home",
    scopeItems: [
      "Kitchen and bathroom remodeling",
      "Basement finishing",
      "Home additions",
      "Whole-home renovations",
      "New home construction",
      "Coordinating plumbing, electrical and HVAC subcontractors",
      "Structural changes, with an engineer where walls move",
      "Permit applications and inspection scheduling",
    ],
    faqs: [
      {
        question: "Is MHG Contracting registered in New Jersey?",
        answer:
          "Yes. MHG Contracting (Malik Holding Group LLC) is registered with the New Jersey Division of Consumer Affairs as a home improvement contractor, #13VH13286900. You can look it up in the state's License Verification System at newjersey.mylicense.com.",
      },
      {
        question: "What does a general contractor do?",
        answer:
          "It plans the job, applies for the permits, hires and schedules the licensed trades, books the inspections, and is the one party responsible to you under one contract. On a kitchen or bathroom that means one call instead of a separate plumber, electrician and tile setter.",
      },
      {
        question: "What towns do you work in?",
        answer:
          "MHG works within about 25 minutes of its Hamilton office: Hamilton, Princeton, West Windsor, Lawrenceville, Ewing, Hopewell, Pennington, Robbinsville and East Windsor in Mercer County, Plainsboro in Middlesex County, and Yardley, PA. Call (609) 712-2474 if you are not sure.",
      },
      {
        question: "How do you price a project?",
        answer:
          "Every project starts with a phone call and a free visit to your home, then a written estimate. You go through it together, settle the scope and finishes, and the plan, budget and schedule are set before work starts.",
      },
    ],
  },
  {
    id: "service-kitchen",
    name: "Kitchen Renovations",
    slug: "kitchen-renovations",
    description:
      "MHG Contracting remodels kitchens around Hamilton, NJ, from a refresh that keeps the layout to a full remodel that moves the sink, opens a wall or adds an island. Every kitchen starts with a free visit to your home and a written estimate, and the plan, budget and schedule are set before demolition. For what kitchen remodels cost, see the kitchen cost guide.",
    shortDescription:
      "Cabinets, countertops, islands and full layout changes.",
    seoTitle: "Kitchen Remodeling Central NJ | MHG Contracting",
    seoDescription:
      "Kitchen remodeling in Hamilton, Princeton and Central NJ from a family-owned contractor. Cabinets, counters, islands, layout changes. Free estimates.",
    icon: "kitchen",
    costGuideSlug: "kitchen-remodel-cost",
    costGuideLabel: "See what kitchen remodels cost in NJ",
    scopeItems: [
      "Cabinet design and installation",
      "Countertops (quartz, granite, marble)",
      "Kitchen islands",
      "Backsplash tile",
      "Plumbing and fixture upgrades",
      "Electrical and lighting",
      "Flooring",
      "Appliance installation",
      "Pantry and storage",
      "Wall removal for open layouts, with an engineer",
    ],
    faqs: [
      {
        question: "How much does a kitchen remodel cost in NJ?",
        answer:
          `Nationally, the median major kitchen remodel was ${money(HOUZZ.kitchenSmall.median)} for kitchens under 200 square feet and ${money(HOUZZ.kitchenLarge.median)} for larger ones in 2025, according to the 2026 U.S. Houzz & Home Study. The kitchen cost guide has the Middle Atlantic figures and what moves the price.`,
      },
      {
        question: "Do I need a permit for a kitchen remodel?",
        answer:
          "Not to replace cabinets or flooring, which is ordinary maintenance under N.J.A.C. 5:23-2.7. Moving the sink, running gas or adding circuits needs a construction permit.",
      },
      {
        question: "Can you work with my existing layout?",
        answer:
          "Yes. A kitchen can be refreshed in its current footprint or reworked completely. Both options come up at the free estimate.",
      },
      {
        question: "Do you remodel kitchens in my town?",
        answer:
          "MHG works within about 25 minutes of Hamilton: Hamilton, Princeton, West Windsor, Lawrenceville, Ewing, Hopewell, Pennington, Robbinsville and East Windsor in Mercer County, Plainsboro in Middlesex County, and Yardley, PA. Call (609) 712-2474.",
      },
    ],
  },
  {
    id: "service-bathroom",
    name: "Bathroom Renovations",
    slug: "bathroom-renovations",
    description:
      "MHG Contracting remodels bathrooms around Hamilton, NJ, from powder rooms to primary baths with walk-in showers, heated floors and double vanities. The parts you never see decide how long a bathroom lasts: the shower waterproofing, the slope to the drain and a fan that vents outside. Every bathroom starts with a free visit to your home and a written estimate. For what bathroom remodels cost, see the bathroom cost guide.",
    shortDescription:
      "From powder rooms to primary baths with walk-in showers, built by a family-owned contractor in Hamilton.",
    seoTitle: "Bathroom Remodeling NJ | Hamilton Bathroom Contractor | MHG",
    seoDescription:
      "Bathroom remodeling in NJ from a family-owned Hamilton contractor: walk-in showers, tile, vanities, heated floors. NJ HIC #13VH13286900. Free estimates.",
    h1: "Bathroom Remodeling in NJ",
    headings: {
      overview: "Bathroom remodeling from a Hamilton, NJ contractor",
      scope: "What a bathroom remodel with MHG covers",
      faqs: "Bathroom remodeling questions from NJ homeowners",
    },
    sections: [
      {
        heading: "Bathroom remodeling in Hamilton and nearby NJ towns",
        html: `<p>MHG Contracting works out of ${business.address.street} in Hamilton and remodels bathrooms within about ${business.radiusMinutes} minutes of the shop. Most of that area is older housing. In Hamilton Township the median home was built in ${HAM_HOUSING.medianYearBuilt}, and ${HAM_HOUSING.pctBuiltBefore1980}% of homes were built before 1980, according to the Census American Community Survey (${HOUSING.years}).</p><p>Age matters for a bathroom. In a house built before 1978, a remodel that disturbs painted surfaces beyond small repair areas falls under the EPA's lead paint rule (40 CFR 745), which sets lead-safe work practices. <a href="/answers/lead-paint-rules-renovation-nj">Read how the lead paint rules apply in NJ</a>, or see <a href="/services/bathroom-renovations/hamilton-nj">bathroom remodeling in Hamilton</a> for the local page.</p>`,
      },
      {
        heading: "What a bathroom remodel costs in NJ",
        html: `<p>It depends on the scope. Counting everything from a refresh to a full gut, the median spend on a primary bathroom was ${money(HOUZZ_ROOM_MEDIAN.primaryBath)} and on a guest bathroom ${money(HOUZZ_ROOM_MEDIAN.guestBath)} in ${HOUZZ_YEAR}, according to the ${HOUZZ_STUDY} (Houzz). For a major primary bath remodel, where at least the vanity, countertops and toilet are replaced, the medians were ${money(HOUZZ.bathSmall.median)} under 100 square feet and ${money(HOUZZ.bathLarge.median)} for larger rooms.</p><p>Closer to home, a midrange bathroom remodel costs about ${money(CVV.bath.jobCost)} in the Middle Atlantic region and recoups about ${CVV.bath.recouped}% of that at resale, ${CVV_CITE}. MHG prices every bathroom after a free visit to your home. The <a href="/blog/bathroom-remodel-cost">bathroom remodel cost guide</a> covers what moves the number, and <a href="/answers/remodel-resale-value-nj">this answer</a> compares resale payback across projects.</p>`,
      },
      {
        heading: "Walk-in showers, tubs and accessible layouts",
        html: `<p>The work runs from tile showers and tub surrounds to freestanding tubs, frameless glass enclosures and accessible layouts. Walk-in showers are the most common ask; <a href="/blog/walk-in-shower-installation-nj">walk-in shower installation in NJ</a> covers the options. Whatever the finish, the parts behind the tile decide how long it lasts: waterproofing under the shower, slope to the drain and a fan that vents outside.</p>`,
      },
      {
        heading: "Permits for a bathroom remodel in Hamilton Township",
        html: `<p>Swapping a vanity, toilet or faucet in the same spot is ordinary maintenance and needs no permit (N.J.A.C. 5:23-2.7). Moving a drain, adding a circuit or changing the layout needs a construction permit (N.J.A.C. 5:23-2.14). In Hamilton that goes to the ${HAM_OFFICE.municipality} construction office at ${HAM_OFFICE.street}, ${HAM_OFFICE.phone} (New Jersey DCA roster, as of ${PERMIT_OFFICES.asOf}). Once work starts, the town performs a requested inspection within three business days (N.J.A.C. 5:23-2.18). See <a href="/answers/building-permit-time-hamilton-nj">how long a permit takes in Hamilton</a>.</p>`,
      },
    ],
    icon: "bathroom",
    costGuideSlug: "bathroom-remodel-cost",
    costGuideLabel: "See what bathroom remodels cost in NJ",
    scopeItems: [
      "Tile showers and tub surrounds",
      "Vanities",
      "Freestanding and built-in tubs",
      "Frameless glass shower enclosures",
      "Heated floors",
      "Plumbing rough-in and fixtures",
      "Ventilation",
      "Lighting",
      "Accessible layouts",
      "Shower waterproofing",
    ],
    faqs: [
      {
        question: "How much does a bathroom remodel cost in NJ?",
        answer:
          `Nationally, the median major primary bath remodel was ${money(HOUZZ.bathSmall.median)} for rooms under 100 square feet and ${money(HOUZZ.bathLarge.median)} for larger ones in 2025, according to the 2026 U.S. Houzz & Home Study. The bathroom cost guide has the Middle Atlantic figure and what moves the price.`,
      },
      {
        question: "Do I need a permit for a bathroom remodel?",
        answer:
          "A like-for-like fixture swap is ordinary maintenance under N.J.A.C. 5:23-2.7. Moving a drain, adding circuits or changing the layout needs a construction permit.",
      },
      {
        question: `Is ${money(BATH_BUDGET_QUESTION)} enough to remodel a bathroom?`,
        answer:
          `It can cover a smaller job. The median spend on a guest bathroom was ${money(HOUZZ_ROOM_MEDIAN.guestBath)} in ${HOUZZ_YEAR}, while major primary bath remodels had a median of ${money(HOUZZ.bathSmall.median)} for rooms under 100 square feet, according to the ${HOUZZ_STUDY} (Houzz).`,
      },
      {
        question: "Can you add a bathroom where there isn't one?",
        answer:
          "Yes, in a basement, under stairs or in other space, as long as the plumbing can reach it. New plumbing needs a permit and a licensed plumber.",
      },
      {
        question: "Do you remodel bathrooms in my town?",
        answer:
          "MHG works within about 25 minutes of Hamilton: Hamilton, Princeton, West Windsor, Lawrenceville, Ewing, Hopewell, Pennington, Robbinsville and East Windsor in Mercer County, Plainsboro in Middlesex County, and Yardley, PA. Call (609) 712-2474.",
      },
    ],
  },
  {
    id: "service-basement",
    name: "Basement Finishing",
    slug: "basement-finishing",
    description:
      "MHG Contracting finishes basements around Hamilton, NJ: family rooms, home gyms, guest suites, bathrooms and wet bars. Moisture gets solved before a single stud goes up, because finishing over a damp wall traps it. A basement bedroom also needs an emergency escape opening under the New Jersey edition of the International Residential Code. Every basement starts with a free visit and a written estimate.",
    shortDescription:
      "Moisture solved first, then framing, finishes and code items like egress, from a family-owned contractor in Hamilton.",
    seoTitle: "Basement Finishing & Remodeling NJ | MHG, Hamilton",
    seoDescription:
      "Basement finishing and remodeling in NJ from a family-owned Hamilton contractor: moisture work first, egress windows, bathrooms, wet bars. Free estimates.",
    h1: "Basement Finishing in NJ",
    headings: {
      overview: "Basement finishing from a Hamilton, NJ contractor",
      scope: "What our basement finishing covers",
      faqs: "Basement finishing questions from NJ homeowners",
    },
    sections: [
      {
        heading: "Finishing basements in Hamilton and nearby NJ towns",
        html: `<p>MHG Contracting works out of ${business.address.street} in Hamilton and finishes basements within about ${business.radiusMinutes} minutes of the shop. The houses here are older than most people expect. In Hamilton Township the median home was built in ${HAM_HOUSING.medianYearBuilt}, and ${HAM_HOUSING.pctBuiltBefore1960}% were built before 1960, according to the Census American Community Survey (${HOUSING.years}). Whatever the age of the foundation, every basement starts with a moisture assessment, because finishing over a damp wall traps the water behind new drywall.</p><p>See <a href="/services/basement-finishing/hamilton-nj">basement finishing in Hamilton</a> for the local page, or pick your town from the list below.</p>`,
      },
      {
        heading: "What it costs to finish a basement in NJ",
        html: `<p>A basement remodel costs about ${money(CVV.basement.jobCost)} in the Middle Atlantic region, which includes New Jersey, and recoups about ${CVV.basement.recouped}% of that at resale, ${CVV_CITE}. Your number depends on what goes in: a bathroom, a wet bar, egress windows and any moisture work all add to it. MHG prices every basement after a free visit. The <a href="/blog/basement-finishing-cost">basement finishing cost guide</a> breaks it down, and <a href="/answers/remodel-resale-value-nj">this answer</a> compares resale payback across projects.</p>`,
      },
      {
        heading: "Bedrooms, ceiling height and egress windows",
        html: `<p>A basement bedroom needs an emergency escape and rescue opening, usually an egress window, under section R310 of the New Jersey edition of the International Residential Code. Habitable basement space needs a ceiling of at least 7 feet, and beams, ducts and pipes may hang down to 6 feet 4 inches (section R305). <a href="/answers/basement-bedroom-requirements-nj">What a basement bedroom needs in NJ</a> covers the full list.</p>`,
      },
      {
        heading: "Permits, inspections and property taxes in Hamilton",
        html: `<p>Framing, wiring and plumbing in a basement need a construction permit (N.J.A.C. 5:23-2.14). In Hamilton the application goes to the ${HAM_OFFICE.municipality} construction office at ${HAM_OFFICE.street}, ${HAM_OFFICE.phone} (New Jersey DCA roster, as of ${PERMIT_OFFICES.asOf}). The office has 20 business days to act on a complete application (N.J.A.C. 5:23-2.16), and inspections, such as rough wiring and plumbing before the walls close, happen within three business days of a request (N.J.A.C. 5:23-2.18). See <a href="/answers/building-permit-time-hamilton-nj">how long a permit takes in Hamilton</a>.</p><p>A finished basement adds living space, so it can raise your assessment. New Jersey's added assessment law (N.J.S.A. 54:4-63.3) lets the assessor bill a prorated added assessment from the first of the month after the work is done. <a href="/answers/renovation-property-taxes-nj">Will a renovation raise your property taxes</a> explains how it works.</p>`,
      },
    ],
    icon: "basement",
    costGuideSlug: "basement-finishing-cost",
    costGuideLabel: "See what basement finishing costs in NJ",
    scopeItems: [
      "Moisture assessment, drains and sump systems",
      "Vapor barriers",
      "Framing and insulation",
      "Drywall",
      "Flooring (LVP, carpet, tile)",
      "Basement bathrooms",
      "Wet bars and kitchenettes",
      "Home theater wiring",
      "Egress windows",
      "Built-ins and storage",
    ],
    faqs: [
      {
        question: "Is moisture work part of the job?",
        answer:
          "It is assessed first on every basement. If the space needs a drain, a sump or a vapor barrier, that goes into the scope before any finishing.",
      },
      {
        question: "Do I need an egress window?",
        answer:
          "If the basement will have a bedroom, yes. Section R310 of the New Jersey edition of the International Residential Code requires an emergency escape and rescue opening for basement sleeping rooms.",
      },
      {
        question: "How much does it cost to finish a basement in NJ?",
        answer:
          `A basement remodel costs about ${money(CVV.basement.jobCost)} in the Middle Atlantic region, which includes New Jersey, ${CVV_CITE}. MHG prices each basement after a free visit, since a bathroom, a wet bar or egress windows change the scope.`,
      },
      {
        question: "Does a finished basement increase property taxes in NJ?",
        answer:
          "It can, because it adds living space. Under N.J.S.A. 54:4-63.3 the tax assessor can bill a prorated added assessment from the first of the month after the work is completed. Your municipal assessor makes the call.",
      },
      {
        question: "Do I need a permit to finish a basement?",
        answer:
          "Yes. Framing, wiring and plumbing all need a construction permit under N.J.A.C. 5:23-2.14.",
      },
      {
        question: "Do you finish basements in my town?",
        answer:
          "MHG works within about 25 minutes of Hamilton: Hamilton, Princeton, West Windsor, Lawrenceville, Ewing, Hopewell, Pennington, Robbinsville and East Windsor in Mercer County, Plainsboro in Middlesex County, and Yardley, PA. Call (609) 712-2474.",
      },
    ],
  },
  {
    id: "service-full-renovation",
    name: "Full Home Renovations",
    slug: "full-home-renovations",
    description:
      "When one room isn't enough, MHG Contracting takes on the whole house: structural changes, heating and cooling, electrical and plumbing, and the finishes in every room. You have one contract and one team to call, and the licensed trades are coordinated in the right order. Every project starts with a free visit and a written estimate.",
    shortDescription:
      "Whole-house renovations under one contract.",
    seoTitle: "Full Home Renovations Central NJ | MHG Contracting",
    seoDescription:
      "Whole-home renovations in Hamilton, Princeton and Central NJ: structure, systems and finishes under one contract. Family-owned contractor. Free estimates.",
    icon: "home",
    scopeItems: [
      "Structural changes, with an engineer",
      "Interior demolition and rebuild",
      "Heating and cooling updates",
      "Electrical panel upgrades and rewiring",
      "Plumbing updates",
      "Flooring throughout",
      "Kitchens and bathrooms",
      "Interior and exterior painting",
      "Windows and doors",
    ],
    faqs: [
      {
        question: "Can I stay in my home during a full renovation?",
        answer:
          "It depends on the scope. A phased job can keep a working kitchen or bathroom available. A full gut usually means living somewhere else for part of the project.",
      },
      {
        question: "Who does the electrical and plumbing work?",
        answer:
          "Licensed trades. New Jersey requires a licensed electrical contractor for electrical work (N.J.S.A. 45:5A-9) and a licensed master plumber for plumbing (N.J.S.A. 45:14C-12.3). MHG coordinates them under your contract.",
      },
      {
        question: "What does a full renovation cost?",
        answer:
          "It depends on the house and the scope. The full home renovation cost guide builds the number room by room from published data. Your estimate is free.",
      },
    ],
  },
  {
    id: "service-addition",
    name: "Additions",
    slug: "additions",
    description:
      "MHG Contracting builds home additions around Hamilton, NJ: family rooms, sunrooms, primary suites and second stories. An addition means foundation, framing, a roof that ties into the old one, siding that matches, and heating, wiring and plumbing for the new space, plus the permit and any zoning approval. Every addition starts with a free visit and a written estimate.",
    shortDescription:
      "Additions built to tie into the house you have.",
    seoTitle: "Home Additions Central NJ | MHG Contracting",
    seoDescription:
      "Home additions in Hamilton, Princeton and Central NJ: family rooms, sunrooms, primary suites and second stories. Family-owned contractor. Free estimates.",
    icon: "addition",
    scopeItems: [
      "Plans with a licensed architect or engineer",
      "Foundation and framing",
      "Roof tie-in",
      "Siding and trim to match",
      "Interior finishing",
      "Heating and cooling for the new space",
      "Electrical and plumbing",
      "Permit applications",
      "Site work and grading",
    ],
    faqs: [
      {
        question: "Will an addition match my house?",
        answer:
          "That is the goal: rooflines, siding, trim and window styles chosen to match what is there. It gets planned before the permit drawings are final.",
      },
      {
        question: "Do I need zoning approval for an addition?",
        answer:
          "Only if the addition breaks the town's zoning rules, such as setbacks or lot coverage. Then the owner applies to the zoning board of adjustment for a variance under N.J.S.A. 40:55D-70, before the construction permit.",
      },
      {
        question: "What does an addition cost?",
        answer:
          "It depends on size, foundation and what goes in it. The home addition cost guide has the Middle Atlantic Cost vs. Value figure. Your estimate is free.",
      },
    ],
  },
  {
    id: "service-new-construction",
    name: "New Construction",
    slug: "new-construction",
    description:
      "MHG Contracting builds new homes around Hamilton, NJ, from site work and foundation through framing, systems and finishes. A new home also means zoning, permits and a certificate of occupancy before you move in. It starts the same way as any MHG project: a conversation, a site visit and a written estimate.",
    shortDescription:
      "New homes, from site work to finishes.",
    seoTitle: "New Home Construction Central NJ | MHG Contracting",
    seoDescription:
      "New home construction in Hamilton, Princeton and Central NJ from a family-owned contractor: site work, foundation, framing, systems and finishes.",
    icon: "construction",
    scopeItems: [
      "Site preparation and excavation",
      "Foundation",
      "Framing",
      "Roofing and exterior",
      "Heating and cooling, electrical and plumbing",
      "Insulation",
      "Interior finishes and trim",
      "Kitchens and bathrooms",
      "Final inspections and certificate of occupancy",
    ],
    faqs: [
      {
        question: "What does it cost to build a new home?",
        answer:
          `Nationally, builders reported an average construction cost of about ${money(NAHB.perSqft)} per square foot in 2024, before the lot, financing, overhead and profit, according to the NAHB. The new home cost guide explains what that leaves out.`,
      },
      {
        question: "Do you build on my lot?",
        answer:
          "Yes, on a lot you own. Setbacks, utilities and access get checked on the site visit before anything is drawn.",
      },
    ],
  },
];


// ─── Team Members ───────────────────────────────────────

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Shahzeb Malik",
    title: "Co-Owner",
    bio: "Co-owner of MHG Contracting and the first call for new projects and estimates.",
    imagePath: "/images/team/shahzeb.jpg",
  },
  {
    id: "team-2",
    name: "Shahmi Malik",
    title: "Co-Owner",
    bio: "Co-owner of MHG Contracting and Shahzeb's brother. Google reviewers mention him by name for managing their projects.",
    imagePath: "/images/team/shahmi.jpg",
  },
  {
    id: "team-3",
    name: "Bear",
    title: "Team Lead",
    bio: "Team lead on the MHG crew.",
    imagePath: "/images/team/bear.jpg",
  },
  {
    id: "team-4",
    name: "Pedro",
    title: "Team Lead",
    bio: "Team lead on the MHG crew.",
    imagePath: "/images/team/pedro.jpg",
  },
  {
    id: "team-5",
    name: "Juan",
    title: "Team Lead",
    bio: "Team lead on the MHG crew.",
    imagePath: "/images/team/juan.jpg",
  },
];

// ─── Process Steps ──────────────────────────────────────

export interface ProcessStep {
  id: string;
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    id: "step-1",
    number: "01",
    title: "Free Consultation",
    description:
      "It starts with a phone call to hear about your project and set up a visit. At your house we walk the space, and then you get a written preconstruction estimate. The estimate is free.",
  },
  {
    id: "step-2",
    number: "02",
    title: "Design & Planning",
    description:
      "You go through the estimate with us and settle the scope and finishes. After the deposit, the plan, budget and schedule are finalized before any work starts.",
  },
  {
    id: "step-3",
    number: "03",
    title: "Build & Craft",
    description:
      "MHG's crew and its licensed subcontractors build it, with week-by-week progress updates, and a final walkthrough with you before the last payment.",
  },
];

// ─── Helper: Get projects by type ───────────────────────

export function getProjectsByType(type: ServiceType): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.type === type);
}

export function getFeaturedProjects(): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.featured);
}

export function getGridProjects(): PortfolioProject[] {
  return portfolioProjects.filter((project) => project.gridFeatured);
}

export function getProjectBySlug(slug: string): PortfolioProject | undefined {
  return portfolioProjects.find((project) => project.slug === slug);
}

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}
