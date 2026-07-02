/**
 * /services/[slug]/[city-slug] - Geo-targeted service area page
 *
 * Dynamic route for 36 service × city landing pages.
 * Each page has unique content, FAQs, and JSON-LD.
 */

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAreaPage, getAllAreaParams } from "@/lib/area-pages-data";
import AreaPageContent from "./AreaPageContent";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { generateAreaSeoContent } from "@/lib/seo-content-generator";

type Params = { slug: string; "city-slug": string };

export function generateStaticParams() {
  return getAllAreaParams();
}

export function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  return params.then(({ slug, "city-slug": citySlug }) => {
    const page = getAreaPage(slug, citySlug);
    if (!page) return { title: "Page Not Found" };

    return buildSeoMetadata({
      path: `/services/${slug}/${citySlug}`,
      title: page.title,
      description: page.metaDescription,
      ogImageAlt: page.title,
    });
  });
}

export default async function AreaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug, "city-slug": citySlug } = await params;
  const page = getAreaPage(slug, citySlug);
  if (!page) notFound();

  // JSON-LD: Service + FAQPage schema
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: `${page.serviceName} in ${page.cityName}, ${page.state}`,
      description: page.metaDescription,
      provider: {
        "@type": "LocalBusiness",
        name: "MHG Contracting",
        telephone: "(609) 712-2474",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Hamilton",
          addressRegion: "NJ",
          addressCountry: "US",
        },
      },
      areaServed: {
        "@type": "City",
        name: page.cityName,
        containedInPlace: {
          "@type": "State",
          name: page.state === "NJ" ? "New Jersey" : "Pennsylvania",
        },
      },
      url: `https://mhgcon.com/services/${slug}/${citySlug}`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: page.serviceName, href: `/services/${slug}` },
    { name: `${page.cityName}, ${page.state}`, href: `/services/${slug}/${citySlug}` },
  ]);

  const seoHtml = generateAreaSeoContent(page);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SeoPrerender>
        <div dangerouslySetInnerHTML={{ __html: seoHtml }} />
      </SeoPrerender>
      <AreaPageContent page={page} />
    </>
  );
}
