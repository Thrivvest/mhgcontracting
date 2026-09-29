import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { businessRef } from "@/data/business";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolioProjects, getProjectBySlug } from "@/lib/data";
import ProjectDetail from "./ProjectDetail";
import { buildBreadcrumbSchema, buildSeoMetadata, truncateAtWord } from "@/lib/seo-utils";

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

    const desc = project.metaDescription || truncateAtWord(project.description || project.shortDescription || "", 160);
    return buildSeoMetadata({
      path: `/portfolio/${slug}`,
      title: `${project.title} | MHG Contracting Portfolio`,
      description: desc,
      ogTitle: `${project.title} - MHG Contracting`,
      ogDescription: desc,
      ogImage: project.imagePath ?? undefined,
      ogImageAlt: project.title,
    });
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
    creator: businessRef,
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
      <ProjectDetail project={project} />
      <Breadcrumbs schema={breadcrumbSchema} />
    </>
  );
}
