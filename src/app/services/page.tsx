import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";
import { services } from "@/lib/data";

export const metadata: Metadata = {
  title: "Services | Kitchen, Bathroom, Basement & More — MHG Contracting",
  description:
    "Explore our residential contracting services: kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction in Central NJ.",
  alternates: { canonical: "https://mhgcon.com/services" },
  openGraph: {
    title: "Services | Kitchen, Bathroom, Basement & More",
    description:
      "Kitchen renovations, bathroom remodels, basement finishing, additions, and new construction in Central NJ.",
    url: "https://mhgcon.com/services",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHG Contracting Services",
      },
    ],
  },
};

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
      provider: {
        "@type": "LocalBusiness",
        "@id": "https://mhgcon.com/#localbusiness",
      },
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
    </>
  );
}
