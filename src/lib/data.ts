/**
 * MHG Contracting - Placeholder Data
 *
 * Typed placeholder content for all site sections.
 * Replace image paths and descriptions with real content when available.
 */

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
  location: string;
  year: string;
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
    location: "Princeton, NJ",
    year: "2024",
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
    location: "West Windsor, NJ",
    year: "2024",
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
      "A luxurious master bathroom renovation featuring a freestanding soaking tub, frameless glass walk-in shower with custom tile work, heated floors, and a double vanity with undermount sinks. Every detail was chosen to create a serene, spa-like retreat.",
    shortDescription: "Freestanding tub, walk-in shower, and heated floors.",
    location: "Hamilton, NJ",
    year: "2024",
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
    location: "Lawrenceville, NJ",
    year: "2023",
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
    location: "Princeton, NJ",
    year: "2024",
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
      "A comprehensive whole-home renovation of a 1970s colonial. The project included opening up the main floor plan, renovating all three bathrooms, updating the kitchen, installing new hardwood floors throughout, and modernizing every system in the home.",
    shortDescription: "Complete colonial renovation from top to bottom.",
    location: "Hamilton, NJ",
    year: "2023",
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
      "A 400-square-foot sunroom and family room addition that expanded the living space with floor-to-ceiling windows, vaulted ceilings, and seamless indoor-outdoor flow. The addition includes radiant floor heating and built-in shelving.",
    shortDescription: "Bright sunroom addition with vaulted ceilings and radiant heat.",
    location: "West Windsor, NJ",
    year: "2023",
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
      "A ground-up custom colonial home build featuring 4 bedrooms, 3.5 bathrooms, a gourmet kitchen, and a finished basement. The home blends traditional architecture with modern amenities including a smart home system and energy-efficient construction.",
    shortDescription: "4BR custom colonial with smart home technology.",
    location: "Plainsboro, NJ",
    year: "2024",
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
      "A dramatic open-concept renovation that removed load-bearing walls (with proper engineering) to unite the kitchen, dining, and living areas. Features a dramatic 16-foot island, custom lighting, and wide-plank engineered hardwood.",
    shortDescription: "Load-bearing wall removal for dramatic open living.",
    location: "Yardley, PA",
    year: "2024",
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
    location: "Hamilton, NJ",
    year: "2024",
    imagePath: "/images/projects/bath-03.jpg",
    galleryImages: Array.from({ length: 2 }, (_, i) => `/images/projects/gallery/bath-03/${i + 1}.jpg`),
    featured: false,
    gridFeatured: false,
  },
];

// ─── Services ───────────────────────────────────────────

export const services: Service[] = [
  {
    id: "service-kitchen",
    name: "Kitchen Renovations",
    slug: "kitchen-renovations",
    description:
      "Your kitchen is the heart of your home, and we treat it that way. From custom cabinetry and stone countertops to full layout redesigns, our kitchen renovations blend beauty, function, and quality craftsmanship. Whether you want a modern open concept or a timeless classic look, we bring your vision to life.",
    shortDescription:
      "Custom cabinetry, countertops, and full layout redesigns.",
    seoTitle: "Kitchen Remodeling in Central NJ | Free Estimate | MHG Contracting",
    seoDescription:
      "Family-owned kitchen remodeling contractor serving Hamilton, Princeton, Lawrenceville, and Central NJ. Custom cabinetry, quartz counters, full layouts. Free estimate: (609) 712-2474.",
    icon: "kitchen",
    scopeItems: [
      "Custom cabinetry design and installation",
      "Countertop fabrication (quartz, granite, marble)",
      "Kitchen island construction",
      "Backsplash tile installation",
      "Plumbing and fixture upgrades",
      "Electrical updates and lighting design",
      "Flooring replacement",
      "Appliance integration",
      "Pantry and storage solutions",
      "Open concept wall removal (with structural engineering)",
    ],
    faqs: [
      {
        question: "How long does a kitchen renovation take?",
        answer:
          "A typical kitchen renovation takes 6-10 weeks depending on scope. Custom cabinetry can add 4-6 weeks to the timeline for fabrication. We provide a detailed schedule before work begins.",
      },
      {
        question: "Can you work with my existing layout?",
        answer:
          "Absolutely. We can refresh your kitchen within the existing footprint or completely reimagine the layout. We'll discuss all options during your free estimate.",
      },
      {
        question: "Do you handle permits?",
        answer:
          "Yes, we handle all necessary permits for plumbing, electrical, and structural work. Permit requirements vary by municipality, and we know the local codes in Hamilton, Princeton, and the surrounding areas.",
      },
    ],
  },
  {
    id: "service-bathroom",
    name: "Bathroom Renovations",
    slug: "bathroom-renovations",
    description:
      "Transform your bathroom into a personal retreat. From powder room refreshes to full master bathroom overhauls, we handle every detail - tile work, fixtures, vanities, lighting, and more. Our attention to waterproofing and proper ventilation ensures your renovation lasts for years to come.",
    shortDescription:
      "From powder rooms to spa-like master bathrooms.",
    seoTitle: "Bathroom Remodeling in Central NJ | Free Estimate | MHG Contracting",
    seoDescription:
      "Family-owned bathroom remodeling contractor serving Hamilton, Princeton, Lawrenceville, and Central NJ. Walk-in showers, custom tile, vanities. Free estimate: (609) 712-2474.",
    icon: "bathroom",
    scopeItems: [
      "Custom tile showers and tub surrounds",
      "Vanity design and installation",
      "Freestanding and built-in tub installation",
      "Frameless glass shower enclosures",
      "Heated floor systems",
      "Plumbing rough-in and fixture installation",
      "Ventilation and moisture control",
      "Lighting design and installation",
      "Accessible/ADA-compliant designs",
      "Waterproofing and substrate preparation",
    ],
    faqs: [
      {
        question: "How long does a bathroom renovation take?",
        answer:
          "Most bathroom renovations are completed in 3-6 weeks. Smaller powder rooms may take 2-3 weeks, while master bathrooms with custom tile work typically require 4-6 weeks.",
      },
      {
        question: "Can you add a bathroom where one doesn't exist?",
        answer:
          "Yes, we can add bathrooms in basements, under stairs, or other areas of your home. This involves running plumbing lines, which we handle from start to finish.",
      },
      {
        question: "What about heated floors?",
        answer:
          "Heated floors are one of our most popular upgrades. We install electric radiant heating under tile, which is energy efficient and adds significant comfort, especially during New Jersey winters.",
      },
    ],
  },
  {
    id: "service-basement",
    name: "Basement Finishing",
    slug: "basement-finishing",
    description:
      "Unlock the potential of your unfinished basement. We transform dark, unused spaces into beautiful living areas - home theaters, guest suites, home offices, gyms, and entertainment lounges. Our basements include proper insulation, moisture management, and quality finishes.",
    shortDescription:
      "Transform your basement into usable living space.",
    seoTitle: "Basement Finishing in Central NJ | Free Estimate | MHG Contracting",
    seoDescription:
      "Family-owned basement finishing contractor serving Hamilton, Princeton, Lawrenceville, and Central NJ. Home theaters, in-law suites, gyms. Free estimates: (609) 712-2474.",
    icon: "basement",
    scopeItems: [
      "Framing and insulation",
      "Drywall installation and finishing",
      "Flooring (LVP, carpet, tile)",
      "Bathroom rough-in and build-out",
      "Wet bar and kitchenette construction",
      "Home theater pre-wiring and installation",
      "Egress window installation",
      "Moisture management and waterproofing",
      "Custom built-ins and storage",
      "Lighting and electrical design",
    ],
    faqs: [
      {
        question: "Is waterproofing included?",
        answer:
          "We assess moisture conditions before starting every basement project. If your basement needs waterproofing or a sump pump, we include it in the scope. A dry basement is the foundation of a quality finish.",
      },
      {
        question: "Do I need an egress window?",
        answer:
          "If your basement will have a bedroom, building code requires an egress window or door for emergency exit. We handle the permitting and installation as part of the project.",
      },
      {
        question: "Can I add a bathroom in my basement?",
        answer:
          "Yes! We can add a full or half bathroom. If your home doesn't have a below-grade rough-in, we can break the concrete and run new plumbing lines.",
      },
    ],
  },
  {
    id: "service-full-renovation",
    name: "Full Home Renovations",
    slug: "full-home-renovations",
    description:
      "When one room isn't enough, we take on whole-home transformations. Our full renovation service covers everything - structural changes, system upgrades (HVAC, electrical, plumbing), interior finishes, and everything in between. We manage the entire project so you have one team and one point of contact.",
    shortDescription:
      "Comprehensive whole-home transformations.",
    icon: "home",
    scopeItems: [
      "Structural modifications and engineering",
      "Full interior demolition and rebuild",
      "HVAC system upgrades",
      "Electrical panel upgrades and re-wiring",
      "Plumbing system updates",
      "Flooring throughout",
      "Kitchen and bathroom renovation (included)",
      "Interior and exterior painting",
      "Window and door replacement",
      "Energy efficiency improvements",
    ],
    faqs: [
      {
        question: "Can I stay in my home during a full renovation?",
        answer:
          "It depends on the scope. For major renovations involving plumbing or HVAC shutdowns, we recommend arranging temporary housing. For phased projects, we can work room by room so you stay comfortable.",
      },
      {
        question: "How do you handle subcontractors?",
        answer:
          "We manage all subcontractors - plumbers, electricians, HVAC techs - directly. You deal with us and only us. All subs are licensed, insured, and vetted by our team.",
      },
      {
        question: "What does a full renovation cost?",
        answer:
          "Full renovation costs vary widely based on home size and scope. We provide detailed, transparent estimates broken down by trade. Schedule a free estimate and we'll walk through your home together.",
      },
    ],
  },
  {
    id: "service-addition",
    name: "Additions",
    slug: "additions",
    description:
      "Need more space? We design and build home additions that blend seamlessly with your existing architecture. From family rooms and sunrooms to second-story additions, we handle the entire process - architectural planning, engineering, permitting, and construction.",
    shortDescription:
      "Seamless home additions that match your existing style.",
    icon: "addition",
    scopeItems: [
      "Architectural design and planning",
      "Structural engineering",
      "Foundation and framing",
      "Roofing integration",
      "Exterior siding matching",
      "Interior finishing",
      "HVAC extension",
      "Electrical and plumbing for new space",
      "Permit management",
      "Site work and grading",
    ],
    faqs: [
      {
        question: "Will an addition match my existing home?",
        answer:
          "That is our goal with every addition. We carefully match rooflines, siding, trim, and architectural details so the addition looks like it was always part of the home.",
      },
      {
        question: "How long does an addition take?",
        answer:
          "Most additions take 3-6 months from groundbreaking to completion. Timeline depends on size, complexity, and permitting. We provide a realistic schedule upfront.",
      },
      {
        question: "Do you handle the architectural drawings?",
        answer:
          "Yes, we work with licensed architects to create plans that meet your needs and local building codes. Architectural fees are included in our project estimate.",
      },
    ],
  },
  {
    id: "service-new-construction",
    name: "New Construction",
    slug: "new-construction",
    description:
      "Build the home you have always envisioned. Our new construction service takes you from an empty lot to a finished, move-in ready home. We partner with top architects and handle every phase - site prep, foundation, framing, systems, finishes, and landscaping.",
    shortDescription:
      "Custom homes built from the ground up.",
    icon: "construction",
    scopeItems: [
      "Site preparation and excavation",
      "Foundation construction",
      "Structural framing",
      "Roofing and exterior envelope",
      "HVAC, electrical, and plumbing systems",
      "Insulation and energy efficiency",
      "Interior finishing and trim",
      "Kitchen and bathroom build-out",
      "Landscaping and hardscaping",
      "Final inspections and certificate of occupancy",
    ],
    faqs: [
      {
        question: "How long does it take to build a new home?",
        answer:
          "A typical custom home build takes 10-14 months from breaking ground. This does not include the pre-construction phase (design, permitting) which can take an additional 2-4 months.",
      },
      {
        question: "Do you build on my lot?",
        answer:
          "Yes, we build on lots you already own or can help you evaluate lots you are considering. We assess soil conditions, setbacks, and utility access before you commit.",
      },
      {
        question: "What is included in your new construction service?",
        answer:
          "Everything. From the foundation to the final coat of paint, including all mechanical systems, fixtures, finishes, and landscaping. We deliver a fully finished, move-in ready home.",
      },
    ],
  },
];

// ─── Testimonials ───────────────────────────────────────

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Sarah & Michael R.",
    location: "Princeton, NJ",
    projectType: "kitchen",
    quote:
      "The MHG team completely transformed our kitchen. From the initial design meeting to the completed project, they were professional, communicative, and meticulous. The quality of the craftsmanship is outstanding - our neighbors keep asking for their number.",
    rating: 5,
  },
  {
    id: "testimonial-2",
    name: "David & Jennifer L.",
    location: "Hamilton, NJ",
    projectType: "basement",
    quote:
      "We wanted to turn our unfinished basement into a space our family could actually use. MHG delivered beyond our expectations. The home theater is incredible, and the wet bar is now our favorite spot for entertaining. They treated our home like it was their own.",
    rating: 5,
  },
  {
    id: "testimonial-3",
    name: "The Patel Family",
    location: "West Windsor, NJ",
    projectType: "full-renovation",
    quote:
      "Our whole-home renovation was a huge undertaking, but MHG made it manageable. The team was on-site almost every day, and they kept us updated throughout the entire process. The finished result is stunning - it feels like a brand new home.",
    rating: 5,
  },
];

// ─── Team Members ───────────────────────────────────────

export const teamMembers: TeamMember[] = [
  {
    id: "team-1",
    name: "Shahzeb Malik",
    title: "Co-Owner & Founder",
    bio: "With a hands-on approach and deep knowledge of residential construction, Shahzeb oversees every project to ensure it meets MHG's standards. His commitment to quality craftsmanship and personal service is at the core of everything we build.",
    imagePath: "/images/team/shahzeb.jpg",
  },
  {
    id: "team-2",
    name: "Shahmi Malik",
    title: "Co-Owner & Founder",
    bio: "Shahmi brings a sharp eye for design and an unwavering focus on client satisfaction to every project. Together with Shahzeb, he ensures that MHG's family-owned values are present in every home we touch.",
    imagePath: "/images/team/shahmi.jpg",
  },
  {
    id: "team-3",
    name: "Bear",
    title: "Team Lead",
    bio: "A trusted member of the MHG crew, Bear leads job site operations with precision and pride. Clients know they're in good hands when Bear is on-site.",
    imagePath: "/images/team/bear.jpg",
  },
  {
    id: "team-4",
    name: "Pedro",
    title: "Team Lead",
    bio: "Pedro's attention to detail and years of hands-on experience make him an invaluable part of every build. He takes ownership of each project from start to finish.",
    imagePath: "/images/team/pedro.jpg",
  },
  {
    id: "team-5",
    name: "Juan",
    title: "Team Lead",
    bio: "Juan brings skill and dedication to every job site. His craftsmanship speaks for itself - and his clients know they can count on him to get it done right.",
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
      "It starts with a phone call to hear about your project, followed by an in-person visit to assess your space and provide an honest estimate. No pressure, no obligations - just a real conversation about what's possible.",
  },
  {
    id: "step-2",
    number: "02",
    title: "Design & Planning",
    description:
      "We invest 2-3 weeks in detailed design work - drawings, renderings, and material selections - so you can visualize the finished result before we break ground. For larger projects, you receive a week-by-week schedule so there are never any surprises.",
  },
  {
    id: "step-3",
    number: "03",
    title: "Build & Craft",
    description:
      "Our skilled team brings the plan to life. We keep you informed with regular updates and maintain a clean, respectful worksite throughout the entire build process.",
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
