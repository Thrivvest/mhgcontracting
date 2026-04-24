/**
 * MHG Contracting - Brand Constants
 *
 * Single source of truth for all design tokens, breakpoints,
 * animation timings, and configuration values.
 */

// ─── Brand Colors ────────────────────────────────────────

export const colors = {
  primary: "#2D3380",
  primaryDark: "#1A1A2E",
  primaryLight: "#4A50A5",
  background: "#FFFFFF",
  backgroundAlt: "#F5F5F5",
  textPrimary: "#333333",
  textSecondary: "#666666",
  textLight: "#999999",
  accentWhite: "#FFFFFF",
  splashBg: "#111118",
  border: "#E5E5E5",
} as const;

export type BrandColor = keyof typeof colors;

// ─── Breakpoints (px) ────────────────────────────────────

export const breakpoints = {
  xs: 479,
  sm: 767,
  md: 991,
  lg: 1200,
} as const;

export type Breakpoint = keyof typeof breakpoints;

// ─── Animation Durations (seconds) ──────────────────────

export const durations = {
  /** Line reveal per-line animation */
  lineReveal: 1.3,
  /** Stagger between lines */
  lineStagger: 0.06,
  /** Clip-path section reveal */
  clipReveal: 1.0,
  /** Fade-in animation */
  fadeIn: 0.6,
  /** Page transition out */
  pageTransitionOut: 0.2,
  /** Page transition in */
  pageTransitionIn: 0.3,
  /** Lenis smooth scroll duration */
  smoothScroll: 1.1,
  /** Splash screen total time */
  splashDuration: 5,
  /** Splash video transition start (seconds into video) */
  splashTransitionStart: 4,
} as const;

export type Duration = keyof typeof durations;

// ─── GSAP Easing Values ─────────────────────────────────

export const easings = {
  /** Default easing for most animations */
  default: "power2.out",
  /** Line reveal easing */
  lineReveal: "power2.out",
  /** Clip reveal easing */
  clipReveal: "power2.inOut",
  /** Fade in easing */
  fadeIn: "power2.out",
  /** Directional hover cubic bezier */
  directionalHover: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** Lenis smooth scroll easing function */
  lenisEasing: (t: number): number => 1 - Math.pow(2, -10 * t),
} as const;

// ─── ScrollTrigger Defaults ─────────────────────────────

export const scrollTrigger = {
  /** Default start position */
  start: "top 85%",
  /** Default end position */
  end: "bottom top",
  /** Toggle actions for reveal animations */
  toggleActions: "play none none none",
  /** Scrub value for parallax */
  scrub: 1,
} as const;

// ─── Lenis Configuration ────────────────────────────────

export const lenisConfig = {
  duration: durations.smoothScroll,
  easing: easings.lenisEasing,
  direction: "vertical" as const,
  touchMultiplier: 1.5,
  smoothTouch: false,
} as const;

// ─── Company Info ───────────────────────────────────────

export const company = {
  name: "MHG Contracting",
  legalName: "Malik Holding Group LLC DBA MHG Contracting",
  owner: "Shahzeb Malik",
  ownerTitle: "Co-Owner",
  phone: "(609) 712-2474",
  phoneHref: "tel:+16097122474",
  email: "shahzeb@mhgcon.com",
  emailHref: "mailto:shahzeb@mhgcon.com",
  domain: "mhgcon.com",
  location: "Hamilton, NJ",
  tagline: "Building With Pride, One Home at a Time",
  taglineAlt: "Quality You Can See. Service You Can Trust.",
  descriptor: "family-owned residential contracting",
  ctaPrimary: "Get Your Free Estimate",
  ctaSecondary: "Contact Us Today",
  social: {
    instagram: "https://instagram.com/mhgcontracting",
    facebook: "https://facebook.com/mhgcontracting",
    google: "https://www.google.com/search?q=MHG+Contracting",
    houzz: "https://www.houzz.com/professionals/general-contractors/mhg-contracting-pfvwus-pf~566670827",
  },
} as const;

// ─── Navigation Links ───────────────────────────────────

export interface NavLink {
  label: string;
  href: string;
  children?: NavLink[];
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    children: [
      { label: "Our Story", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Service Areas", href: "/service-areas" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Process", href: "/process" },
  { label: "Contact", href: "/contact" },
];

// ─── Service Areas ──────────────────────────────────────

export const serviceAreas = {
  primary: ["Princeton", "Hamilton", "West Windsor"],
  active: ["Lawrenceville", "Plainsboro", "Yardley, PA"],
  radius: "Within 25 minutes of Hamilton, NJ",
} as const;
