import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { services, getServiceBySlug } from "@/lib/data";
import ServiceDetail from "./ServiceDetail";
import { buildBreadcrumbSchema } from "@/lib/seo-utils";

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const service = getServiceBySlug(slug);
    if (!service) return { title: "Service Not Found" };

    return {
      title: {
        absolute: `${service.name} in Central NJ | MHG Contracting`,
      },
      description: service.description,
      alternates: { canonical: `https://mhgcon.com/services/${slug}` },
      openGraph: {
        title: `${service.name} — MHG Contracting`,
        description: service.shortDescription,
        url: `https://mhgcon.com/services/${slug}`,
        images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: `${service.name} — MHG Contracting` }],
      },
    };
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceDetail service={service} />
    </>
  );
}
