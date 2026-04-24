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
  "kitchen-renovations": ["kitchen-remodel-cost", "kitchen-trends", "kitchen-timeline"],
  "bathroom-renovations": ["bathroom-remodel-cost", "bathroom-ideas"],
  "basement-finishing": ["basement-finishing-cost", "basement-ideas"],
  "full-home-renovations": ["choosing-a-contractor", "remodel-roi"],
  additions: ["permits-nj", "remodel-roi"],
  "new-construction": ["choosing-a-contractor", "permits-nj"],
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
};
