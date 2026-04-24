"use client";

import Link from "next/link";
import Image from "next/image";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { type PortfolioProject, portfolioProjects } from "@/lib/data";
import { company } from "@/lib/constants";

const SERVICE_TYPE_LABELS: Record<string, string> = {
  kitchen: "Kitchen Renovation",
  bathroom: "Bathroom Renovation",
  basement: "Basement Finishing",
  "full-renovation": "Full Home Renovation",
  addition: "Addition",
  "new-construction": "New Construction",
};

interface ProjectDetailProps {
  project: PortfolioProject;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  // Get 3 related projects (same type, excluding current)
  const related = portfolioProjects
    .filter((p) => p.type === project.type && p.id !== project.id)
    .slice(0, 3);

  // If not enough same-type projects, fill with others
  const relatedProjects = related.length < 3
    ? [...related, ...portfolioProjects.filter((p) => p.id !== project.id && !related.includes(p))].slice(0, 3)
    : related;

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src={project.imagePath} alt={project.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn>
            <Link href="/portfolio" className="inline-flex items-center gap-2 font-body text-white/40 text-sm hover:text-white/70 transition-colors mb-8 block">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back to Portfolio
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">
              {SERVICE_TYPE_LABELS[project.type]}
            </span>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">{project.title}</h1>
          </LineReveal>
        </div>
      </section>

      {/* Info Bar */}
      <section className="border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-6">
          <FadeIn>
            <div className="flex flex-wrap gap-8 md:gap-16">
              <div>
                <span className="font-body text-xs text-text-light uppercase tracking-[0.1em] block mb-1">Type</span>
                <span className="font-body text-sm font-medium text-text-primary">{SERVICE_TYPE_LABELS[project.type]}</span>
              </div>
              <div>
                <span className="font-body text-xs text-text-light uppercase tracking-[0.1em] block mb-1">Location</span>
                <span className="font-body text-sm font-medium text-text-primary">{project.location}</span>
              </div>
              <div>
                <span className="font-body text-xs text-text-light uppercase tracking-[0.1em] block mb-1">Year</span>
                <span className="font-body text-sm font-medium text-text-primary">{project.year}</span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Main image */}
          <FadeIn>
            <div className="aspect-[16/9] rounded-lg overflow-hidden mb-5 relative">
              <Image src={project.imagePath} alt={project.title} fill sizes="(max-width: 1200px) 100vw, 1400px" className="object-cover" />
            </div>
          </FadeIn>

          {/* Gallery grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.galleryImages.map((img, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="aspect-[4/3] rounded-lg overflow-hidden relative">
                  <Image src={img} alt={`${project.title} - Photo ${i + 1}`} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="pb-24 md:pb-32 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto">
          <FadeIn>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6">About This Project</h2>
            <p className="font-body text-text-secondary text-lg leading-relaxed">{project.description}</p>
          </FadeIn>
        </div>
      </section>

      {/* Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-24 md:py-32 px-6 lg:px-10 bg-background-alt">
          <div className="max-w-[1400px] mx-auto">
            <LineReveal className="mb-12">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Related Projects</h2>
            </LineReveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rp, i) => (
                <FadeIn key={rp.id} delay={i * 0.1}>
                  <Link href={`/portfolio/${rp.slug}`} className="block group">
                    <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4 relative">
                      <Image src={rp.imagePath} alt={rp.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <span className="absolute bottom-5 left-5 font-body text-white/70 text-xs uppercase tracking-[0.1em]">{rp.type.replace("-", " ")}</span>
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">{rp.title}</h3>
                    <p className="font-body text-text-secondary text-sm mt-1">{rp.location}</p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-10" style={{ backgroundColor: "#2D3380" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <LineReveal className="mb-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">Have a Similar Project?</h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-white/60 text-lg mb-10">Let&apos;s discuss how we can bring your vision to life.</p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link href="/contact" className="inline-flex items-center gap-2 border-2 border-white text-white font-body font-semibold text-sm px-10 py-4 rounded-md hover:bg-white hover:text-primary transition-all duration-300">
              {company.ctaPrimary}
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
