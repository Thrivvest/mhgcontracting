/**
 * MHG Contracting - site data: portfolio projects, services, team.
 *
 * Facts about MHG come from the intake form (2026-03-28), GBP and
 * data/business.ts. Dollar figures only via data/costs.ts.
 */
import { HOUZZ, NAHB, money } from "@/data/costs";

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
      "From powder rooms to primary baths with walk-in showers.",
    seoTitle: "Bathroom Remodeling Central NJ | MHG Contracting",
    seoDescription:
      "Bathroom remodeling in Hamilton, Princeton and Central NJ from a family-owned contractor. Walk-in showers, tile, vanities, heated floors. Free estimates.",
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
      "Moisture solved first, then framing, finishes and code items like egress.",
    seoTitle: "Basement Finishing Central NJ | MHG Contracting",
    seoDescription:
      "Basement finishing in Hamilton, Princeton and Central NJ: moisture work, egress windows, bathrooms, family rooms. Family-owned contractor. Free estimates.",
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
