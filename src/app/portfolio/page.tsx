import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";
import { portfolioProjects } from "@/lib/data";

export const metadata: Metadata = {
  title: "Portfolio | Our Work — MHG Contracting",
  description:
    "Browse our portfolio of kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction projects across Central NJ.",
  alternates: { canonical: "https://mhgcon.com/portfolio" },
  openGraph: {
    title: "Portfolio | Our Work — MHG Contracting",
    description:
      "Browse our kitchen, bathroom, basement, and full home renovation projects across Central NJ.",
    url: "https://mhgcon.com/portfolio",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHG Contracting Portfolio",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MHG Contracting Portfolio",
  description:
    "Completed renovation projects by MHG Contracting across Central NJ — kitchens, bathrooms, basements, full home renovations, and additions.",
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
      locationCreated: {
        "@type": "Place",
        name: project.location,
      },
      creator: {
        "@type": "LocalBusiness",
        "@id": "https://mhgcon.com/#localbusiness",
      },
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
    </>
  );
}
