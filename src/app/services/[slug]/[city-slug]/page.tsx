import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { serviceNode } from "@/lib/schema";
import { townFaqs, townMeta } from "@/lib/town-page";
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
      description: townMeta(page),
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
    serviceNode({
      name: `${page.serviceName} in ${page.cityName}, ${page.state}`,
      path: `/services/${slug}/${citySlug}`,
      description: townMeta(page),
      town: { name: page.cityName, state: page.state },
    }),
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: townFaqs(page).faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ];

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: page.serviceName, href: `/services/${slug}` },
    { name: `${page.cityName}, ${page.state}`, href: `/services/${slug}/${citySlug}` },
  ]);


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AreaPageContent page={page} />
      <Breadcrumbs schema={breadcrumbSchema} />
    </>
  );
}
