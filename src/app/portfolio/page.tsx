import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { businessRef } from "@/data/business";
import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";
import { portfolioProjects } from "@/lib/data";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
]);

export const metadata: Metadata = buildSeoMetadata({
  path: "/portfolio",
  title: "Renovation Portfolio | MHG Contracting Central NJ",
  description:
    "Kitchen, bath, basement, addition, whole-home and new construction projects by MHG Contracting, a family-owned contractor in Hamilton, NJ.",
  ogTitle: "Portfolio | Our Work - MHG Contracting",
  ogImageAlt: "MHG Contracting Portfolio",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MHG Contracting Portfolio",
  description:
    "Completed projects by MHG Contracting: kitchens, bathrooms, basements, whole-home renovations and additions.",
  url: "https://mhgcon.com/portfolio",
  numberOfItems: portfolioProjects.length,
  itemListElement: portfolioProjects.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: project.title,
    url: `https://mhgcon.com/portfolio/${project.slug}`,
    description: project.shortDescription,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: `https://mhgcon.com/portfolio/${project.slug}`,
      creator: businessRef,
    },
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PortfolioContent />
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
