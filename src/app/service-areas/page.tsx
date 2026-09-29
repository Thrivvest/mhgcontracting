import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { pageNode } from "@/lib/schema";
/**
 * /service-areas - Service Areas Index Page
 *
 * Lists all 6 cities with links to each service in that city.
 * SEO-optimized with metadata and JSON-LD.
 */

import type { Metadata } from "next";
import ServiceAreasContent from "./ServiceAreasContent";
import { CITIES, SERVICE_SLUGS, AREA_PAGES } from "@/lib/area-pages-data";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Service Areas", href: "/service-areas" },
]);

export const metadata: Metadata = buildSeoMetadata({
  path: "/service-areas",
  title: "Service Areas | MHG Contracting Central NJ & Bucks County PA",
  description:
    "MHG Contracting serves Princeton, Hamilton, West Windsor, Lawrenceville, and Yardley PA with kitchen, bath, basement, addition, and new construction work.",
  ogTitle: "Service Areas | MHG Contracting",
  ogDescription:
    "Serving Central NJ and Bucks County PA: Princeton, Hamilton, West Windsor, Lawrenceville, Plainsboro, and Yardley.",
  ogImageAlt: "MHG Contracting service areas",
});

export default function ServiceAreasPage() {
  // Build JSON-LD for the service areas page
  const jsonLd = pageNode("WebPage", {
    name: "MHG Contracting service areas",
    path: "/service-areas",
    description: String(metadata.description ?? ""),
  });


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServiceAreasContent />
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
