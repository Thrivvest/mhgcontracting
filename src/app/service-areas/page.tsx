/**
 * /service-areas — Service Areas Index Page
 *
 * Lists all 6 cities with links to each service in that city.
 * SEO-optimized with metadata and JSON-LD.
 */

import type { Metadata } from "next";
import ServiceAreasContent from "./ServiceAreasContent";
import { CITIES, SERVICE_SLUGS, AREA_PAGES } from "@/lib/area-pages-data";

export const metadata: Metadata = {
  title: "Service Areas | MHG Contracting",
  description:
    "MHG Contracting serves Princeton, Hamilton, West Windsor, Lawrenceville, Plainsboro, and Yardley PA with expert kitchen and bathroom renovations, basement finishing, home additions, full-home renovations, and new construction.",
  alternates: {
    canonical: "https://mhgcon.com/service-areas",
  },
  openGraph: {
    title: "Service Areas | MHG Contracting",
    description:
      "Serving Central New Jersey and Bucks County PA — Princeton, Hamilton, West Windsor, Lawrenceville, Plainsboro, and Yardley.",
    url: "https://mhgcon.com/service-areas",
    siteName: "MHG Contracting",
    type: "website",
  },
};

export default function ServiceAreasPage() {
  // Build JSON-LD for the service areas page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "MHG Contracting Service Areas",
    description: metadata.description,
    url: "https://mhgcon.com/service-areas",
    mainEntity: {
      "@type": "LocalBusiness",
      name: "MHG Contracting",
      areaServed: CITIES.map((city) => ({
        "@type": "City",
        name: city.name,
        containedInPlace: {
          "@type": "State",
          name: city.state,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceAreasContent />
    </>
  );
}
