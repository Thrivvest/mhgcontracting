/**
 * Structured data (website SEO standard 2). The layout declares the one
 * business entity; every page node points at it with businessRef. No page
 * declares its own LocalBusiness or Organization, and there is no
 * AggregateRating or Review markup for MHG (Google shows no stars for
 * self-served ratings and hardcoded numbers go stale).
 */
import { business, businessRef, BUSINESS_ID, SITE_URL, WEBSITE_ID } from "@/data/business";
import { SERVICE_AREA_TOWNS } from "@/data/service-area";

export const SERVICE_OFFERINGS = [
  { name: "General Contracting", slug: "general-contracting" },
  { name: "Kitchen Renovations", slug: "kitchen-renovations" },
  { name: "Bathroom Renovations", slug: "bathroom-renovations" },
  { name: "Basement Finishing", slug: "basement-finishing" },
  { name: "Full Home Renovations", slug: "full-home-renovations" },
  { name: "Home Additions", slug: "additions" },
  { name: "New Construction", slug: "new-construction" },
];

const town = (t: { name: string; state: string }) => ({
  "@type": "City",
  name: `${t.name}, ${t.state}`,
});

export const siteGraph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: SITE_URL,
      name: business.name,
      publisher: businessRef,
      inLanguage: "en-US",
    },
    {
      "@type": "GeneralContractor",
      "@id": BUSINESS_ID,
      name: business.name,
      legalName: business.legalName,
      url: SITE_URL,
      logo: `${SITE_URL}/images/logo/mhg-logo-web.png`,
      image: `${SITE_URL}/images/og-image.jpg`,
      telephone: business.phone,
      email: business.email,
      foundingDate: business.opened,
      address: {
        "@type": "PostalAddress",
        streetAddress: business.address.street,
        addressLocality: business.address.city,
        addressRegion: business.address.state,
        postalCode: business.address.zip,
        addressCountry: "US",
      },
      geo: { "@type": "GeoCoordinates", ...business.geo },
      hasMap: business.mapsUrl,
      openingHoursSpecification: business.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
      areaServed: SERVICE_AREA_TOWNS.map(town),
      founder: business.owners.map((name) => ({ "@type": "Person", name })),
      numberOfEmployees: { "@type": "QuantitativeValue", value: business.teamSize },
      hasCredential: {
        "@type": "EducationalOccupationalCredential",
        credentialCategory: "New Jersey Home Improvement Contractor registration",
        identifier: business.hic,
        recognizedBy: { "@type": "GovernmentOrganization", name: "New Jersey Division of Consumer Affairs" },
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "MHG Contracting services",
        itemListElement: SERVICE_OFFERINGS.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, url: `${SITE_URL}/services/${s.slug}` },
        })),
      },
      sameAs: [business.mapsUrl, business.social.instagram, business.social.facebook, business.social.houzz],
    },
  ],
};

/** A service page, or a service in one town (areaServed, never a LocalBusiness). */
export function serviceNode(opts: { name: string; path: string; description: string; town?: { name: string; state: string } }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${SITE_URL}${opts.path}#service`,
    name: opts.name,
    url: `${SITE_URL}${opts.path}`,
    description: opts.description,
    provider: businessRef,
    areaServed: opts.town ? town(opts.town) : SERVICE_AREA_TOWNS.map(town),
  };
}

/** Generic WebPage node for about, contact, process and similar pages. */
export function pageNode(type: string, opts: { name: string; path: string; description: string }) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${SITE_URL}${opts.path}#webpage`,
    url: `${SITE_URL}${opts.path}`,
    name: opts.name,
    description: opts.description,
    isPartOf: { "@id": WEBSITE_ID },
    about: businessRef,
  };
}
