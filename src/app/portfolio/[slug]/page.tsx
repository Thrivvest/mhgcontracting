import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolioProjects, getProjectBySlug } from "@/lib/data";
import ProjectDetail from "./ProjectDetail";
import { buildBreadcrumbSchema } from "@/lib/seo-utils";

// Generate static routes for all projects
export function generateStaticParams() {
  return portfolioProjects.map((project) => ({
    slug: project.slug,
  }));
}

// Dynamic metadata per project
export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Project Not Found" };

    return {
      title: {
        absolute: `${project.title} | MHG Contracting Portfolio`,
      },
      description: project.description,
      alternates: { canonical: `https://mhgcon.com/portfolio/${slug}` },
      openGraph: {
        title: `${project.title} — MHG Contracting`,
        description: project.description,
        url: `https://mhgcon.com/portfolio/${slug}`,
        images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: project.title }],
      },
    };
  });
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    image: `https://mhgcon.com${project.imagePath}`,
    creator: {
      "@type": "Organization",
      "@id": "https://mhgcon.com/#organization",
      name: "MHG Contracting",
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
    dateCreated: project.year,
  };

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: project.title, href: `/portfolio/${slug}` },
  ]);

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
      <ProjectDetail project={project} />
    </>
  );
}
