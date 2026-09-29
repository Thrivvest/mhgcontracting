import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { businessRef } from "@/data/business";
import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";
import { services } from "@/lib/data";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
]);

export const metadata: Metadata = buildSeoMetadata({
  path: "/services",
  title: "Home Renovation Services | MHG Contracting Central NJ",
  description:
    "Kitchen renovations, bathroom remodels, basement finishing, full-home renovations, additions, and new construction in Central NJ from MHG Contracting.",
  ogTitle: "Services | Kitchen, Bathroom, Basement & More",
  ogImageAlt: "MHG Contracting Services",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MHG Contracting Services",
  description:
    "Residential contracting services in Central NJ: kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction.",
  url: "https://mhgcon.com/services",
  numberOfItems: services.length,
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: service.name,
    url: `https://mhgcon.com/services/${service.slug}`,
    description: service.shortDescription,
    item: {
      "@type": "Service",
      name: service.name,
      description: service.description,
      provider: businessRef,
      url: `https://mhgcon.com/services/${service.slug}`,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
