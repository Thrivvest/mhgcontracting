/**
 * /service-areas - Service Areas Index Page
 *
 * Lists all 6 cities with links to each service in that city.
 * SEO-optimized with metadata and JSON-LD.
 */

import type { Metadata } from "next";
import ServiceAreasContent from "./ServiceAreasContent";
import { CITIES, SERVICE_SLUGS, AREA_PAGES } from "@/lib/area-pages-data";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Service Areas", href: "/service-areas" },
]);

export const metadata: Metadata = buildSeoMetadata({
  path: "/service-areas",
  title: "Service Areas | MHG Contracting Central NJ & Bucks County PA",
  description:
    "MHG Contracting serves Princeton, Hamilton, West Windsor, Lawrenceville, Plainsboro, and Yardley PA with kitchen, bath, basement, addition, and new construction work.",
  ogTitle: "Service Areas | MHG Contracting",
  ogDescription:
    "Serving Central NJ and Bucks County PA: Princeton, Hamilton, West Windsor, Lawrenceville, Plainsboro, and Yardley.",
  ogImageAlt: "MHG Contracting service areas",
});

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SeoPrerender>
        <h2>Service Areas - Kitchen, Bath &amp; Home Renovations in Central NJ &amp; Bucks County, PA</h2>

        <h2>Hamilton, NJ - Home Renovations &amp; Contracting</h2>
        <p>MHG Contracting is proudly based in Hamilton, New Jersey. As our home community, Hamilton homeowners receive the full range of our residential contracting services including kitchen renovations, bathroom remodels, basement finishing, home additions, full-home renovations, and new construction. We know Hamilton&apos;s neighborhoods, building codes, and architectural styles, ensuring a smooth renovation experience from permit to final walkthrough.</p>

        <h2>Princeton, NJ - Kitchen &amp; Bathroom Renovations</h2>
        <p>MHG Contracting serves Princeton, NJ with expert kitchen renovations, bathroom remodels, and full-home renovations. Princeton&apos;s historic homes and upscale properties demand a contractor who understands quality craftsmanship and attention to detail. From period-appropriate renovations in the Borough to modern kitchen remodels in Princeton&apos;s newer developments, MHG Contracting delivers results that match the character and standards of the community.</p>

        <h2>West Windsor, NJ - Basement Finishing &amp; Additions</h2>
        <p>Homeowners in West Windsor Township trust MHG Contracting for basement finishing, home additions, kitchen renovations, and bathroom remodels. West Windsor&apos;s family-oriented communities benefit from our finished basement living spaces, seamless second-story additions, and complete home renovations. We handle every detail including design, permits, construction, and final inspection for West Windsor homeowners.</p>

        <h2>Lawrenceville, NJ - Full-Home Renovations</h2>
        <p>MHG Contracting provides Lawrenceville, NJ homeowners with comprehensive renovation services including kitchen remodels, bathroom renovations, basement finishing, and full-home transformations. Lawrenceville&apos;s mix of colonial, ranch, and contemporary homes gives us the opportunity to showcase our versatility in residential contracting. From gut renovations to cosmetic refreshes, we deliver quality craftsmanship in Lawrenceville.</p>

        <h2>Plainsboro, NJ - Kitchen Remodels &amp; New Construction</h2>
        <p>Plainsboro homeowners choose MHG Contracting for kitchen renovations, bathroom remodels, basement finishing, additions, and new construction. Whether you live in Plainsboro&apos;s established neighborhoods or are building a custom home from the ground up, our team brings expert craftsmanship and personal service to every project in the Plainsboro area.</p>

        <h2>Yardley, PA - Renovations in Bucks County</h2>
        <p>MHG Contracting extends our residential renovation services across the Delaware River to Yardley and Bucks County, Pennsylvania. Yardley homeowners trust us for kitchen renovations, bathroom remodels, basement finishing, home additions, and full-home renovations. Our experience working in both New Jersey and Pennsylvania ensures smooth permitting and construction regardless of which side of the river your home is on.</p>

        <h2>Why Choose a Local Central NJ Contractor</h2>
        <p>Choosing a locally owned contractor like MHG Contracting means your renovation is handled by people who live and work in your community. Owner Shahzeb Malik personally oversees every project in our service area. We are not a franchise - we are your neighbors. Our local knowledge of Central New Jersey and Bucks County building codes, inspection requirements, and material suppliers ensures efficient, high-quality renovations every time.</p>

        <p>Call MHG Contracting at <a href="tel:+16097122474">(609) 712-2474</a> for a free renovation estimate in Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, Yardley, or anywhere in Central NJ.</p>
      </SeoPrerender>
      <ServiceAreasContent />
    </>
  );
}
