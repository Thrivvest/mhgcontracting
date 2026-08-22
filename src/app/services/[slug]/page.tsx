import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/lib/data";
import ServiceDetail from "./ServiceDetail";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { generateServiceSeoContent } from "@/lib/seo-content-generator";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = getServiceBySlug(slug);
    if (!service) return { title: "Service Not Found" };

    const title = service.seoTitle ?? `${service.name} in Central NJ | MHG Contracting`;
    const description = service.seoDescription ?? service.description;

    return buildSeoMetadata({
      path: `/services/${slug}`,
      title,
      description,
      ogTitle: title,
      ogDescription: service.shortDescription,
      ogImageAlt: `${service.name} - MHG Contracting`,
    });
  });
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: service.name, href: `/services/${slug}` },
  ]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer.replace(/<[^>]+>/g, ""),
      },
    })),
  };

  const seoHtml = generateServiceSeoContent(service);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SeoPrerender>
        <div dangerouslySetInnerHTML={{ __html: seoHtml }} />
      </SeoPrerender>
      <ServiceDetail service={service} />
    </>
  );
}
