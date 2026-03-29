import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { portfolioProjects, getProjectBySlug } from "@/lib/data";
import ProjectDetail from "./ProjectDetail";

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
      title: `${project.title} | MHG Contracting Portfolio`,
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
  return <ProjectDetail project={project} />;
}
