export const BASE_URL = "https://mhgcon.com";

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

export function robotsDirective(index = true, follow = true) {
  return {
    index,
    follow,
    googleBot: { index, follow },
  };
}

export const SERVICE_BLOG_MAP: Record<string, string[]> = {
  "kitchen-renovations": [
    "5-things-to-consider-before-kitchen-renovation",
    "kitchen-renovation-cost-breakdown",
  ],
  "bathroom-renovations": ["how-long-does-bathroom-remodel-take"],
  "basement-finishing": ["basement-finishing-guide-central-nj"],
  "full-home-renovations": ["choosing-the-right-contractor"],
  additions: ["choosing-the-right-contractor"],
  "new-construction": ["choosing-the-right-contractor"],
};

export const BLOG_SERVICE_MAP: Record<string, string> = {
  "5-things-to-consider-before-kitchen-renovation": "/services/kitchen-renovations",
  "kitchen-renovation-cost-breakdown": "/services/kitchen-renovations",
  "how-long-does-bathroom-remodel-take": "/services/bathroom-renovations",
  "basement-finishing-guide-central-nj": "/services/basement-finishing",
  "choosing-the-right-contractor": "/services",
  "why-we-love-what-we-do": "/services",
};
