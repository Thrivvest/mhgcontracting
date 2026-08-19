import type { Metadata } from "next";

export const BASE_URL = "https://mhgcon.com";
export const DEFAULT_OG_IMAGE = "/images/og-image.jpg";

export interface SeoMetadataInput {
  /** Path starting with "/" (e.g. "/services/kitchen-renovations"). */
  path: string;
  /** Full page title. Written verbatim into the <title>. Keep 50-60 chars. */
  title: string;
  /** Meta description. Keep 130-160 chars. */
  description: string;
  /** Optional OG title override (defaults to `title`). */
  ogTitle?: string;
  /** Optional OG description override (defaults to `description`). */
  ogDescription?: string;
  /** OG image path (absolute or /-relative). Defaults to brand OG image. */
  ogImage?: string;
  /** OG image alt text. */
  ogImageAlt?: string;
  /** OG type. Defaults to "website". Use "article" for blog posts. */
  ogType?: "website" | "article";
}

/**
 * Single source of truth for per-page Metadata.
 * Emits canonical, self-referencing hreflang (en-us + x-default),
 * full Open Graph, and Twitter Card tags.
 */
export function buildSeoMetadata(input: SeoMetadataInput): Metadata {
  const {
    path,
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage = DEFAULT_OG_IMAGE,
    ogImageAlt,
    ogType = "website",
  } = input;

  const url = `${BASE_URL}${path === "/" ? "" : path}`;
  const finalOgTitle = ogTitle ?? title;
  const finalOgDescription = ogDescription ?? description;
  const alt = ogImageAlt ?? title;

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: url,
      languages: {
        "en-us": url,
        "x-default": url,
      },
    },
    openGraph: {
      type: ogType,
      locale: "en_US",
      url,
      siteName: "MHG Contracting",
      title: finalOgTitle,
      description: finalOgDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: finalOgTitle,
      description: finalOgDescription,
      images: [ogImage],
    },
  };
}

export interface BreadcrumbItem {
  name: string;
  href: string;
}

export function buildBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${BASE_URL}${item.href}`,
    })),
  };
}

/**
 * Truncate to a max length without cutting a word in half. Falls back to a
 * hard clip only if there's no whitespace to break on. Used anywhere a meta
 * description is derived from a longer field (excerpt, body copy) so a
 * long source string never renders as a broken mid-word snippet in search
 * results.
 */
export function truncateAtWord(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  const clipped = text.slice(0, maxLength - 3);
  const lastSpace = clipped.lastIndexOf(" ");
  const base = lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped;
  return `${base.replace(/[,;:.\-]+$/, "")}...`;
}

export function robotsDirective(index = true, follow = true) {
  return {
    index,
    follow,
    googleBot: { index, follow },
  };
}

export const SERVICE_BLOG_MAP: Record<string, string[]> = {
  "kitchen-renovations": ["kitchen-remodel-cost", "kitchen-trends", "kitchen-timeline"],
  "bathroom-renovations": ["bathroom-remodel-cost", "bathroom-ideas"],
  "basement-finishing": ["basement-finishing-cost", "basement-ideas"],
  "full-home-renovations": ["choosing-a-contractor", "remodel-roi", "general-contractor-vs-handyman-hamilton-nj"],
  additions: ["home-additions-cost-mercer-county-nj", "permits-nj", "remodel-roi"],
  "new-construction": ["choosing-a-contractor", "permits-nj", "general-contractor-vs-handyman-hamilton-nj"],
};

export const BLOG_SERVICE_MAP: Record<string, string> = {
  "kitchen-remodel-cost": "/services/kitchen-renovations",
  "bathroom-remodel-cost": "/services/bathroom-renovations",
  "basement-finishing-cost": "/services/basement-finishing",
  "choosing-a-contractor": "/services",
  "kitchen-trends": "/services/kitchen-renovations",
  "bathroom-ideas": "/services/bathroom-renovations",
  "basement-ideas": "/services/basement-finishing",
  "kitchen-timeline": "/services/kitchen-renovations",
  "permits-nj": "/services/additions",
  "remodel-roi": "/services/full-home-renovations",
  "why-we-love-what-we-do": "/services",
  "home-additions-cost-mercer-county-nj": "/services/additions",
  "general-contractor-vs-handyman-hamilton-nj": "/services",
};
