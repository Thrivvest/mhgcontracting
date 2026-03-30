"use client";

/**
 * FeaturedProjects — 2×2 grid with DirectionalHover tiles
 *
 * "Our Recent Work" heading + 4 project tiles with directional
 * hover overlay revealing "View Project" link.
 */

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import DirectionalHover from "@/components/ui/DirectionalHover";
import { getGridProjects } from "@/lib/data";

const SERVICE_TYPE_LABELS: Record<string, string> = {
  kitchen: "Kitchen",
  bathroom: "Bathroom",
  basement: "Basement",
  "full-renovation": "Full Renovation",
  addition: "Addition",
  "new-construction": "New Construction",
};

export default function FeaturedProjects() {
  const projects = getGridProjects().slice(0, 4);

  return (
    <section id="featured-projects" className="py-14 md:py-28 lg:py-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-8 md:mb-20">
          <FadeIn>
            <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
              Portfolio
            </span>
          </FadeIn>
          <LineReveal className="mb-4">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1]">
              Our Recent Work
            </h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-text-secondary text-lg max-w-xl leading-relaxed">
              Every project reflects our commitment to quality craftsmanship and
              meticulous attention to detail.
            </p>
          </FadeIn>
        </div>

        {/* 2×2 grid */}
        <div className="grid grid-cols-2 md:grid-cols-2 gap-2 md:gap-5">
          {projects.map((project, index) => (
            <FadeIn key={project.id} delay={index * 0.1}>
              <Link href={`/portfolio/${project.slug}`} className="block">
                <DirectionalHover
                  className="aspect-square md:aspect-[4/3] rounded-lg cursor-pointer"
                  overlayClassName="bg-primary/85 backdrop-blur-sm"
                  overlay={
                    <div className="text-center px-6">
                      <span className="block font-body text-white/70 text-xs uppercase tracking-[0.15em] mb-2">
                        {SERVICE_TYPE_LABELS[project.type]}
                      </span>
                      <span className="block font-heading text-white text-xl font-semibold mb-3">
                        {project.title}
                      </span>
                      <span className="inline-flex items-center gap-1.5 text-white font-body text-sm font-medium">
                        View Project
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  }
                >
                  {/* Project card */}
                  <div className="relative w-full h-full">
                    {/* Real project image */}
                    <img
                      src={project.imagePath}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover"
                      loading="lazy"
                    />
                    {/* Bottom gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    {/* Bottom-left info */}
                    <div className="absolute bottom-0 left-0 p-3 md:p-8 z-10">
                      <span className="hidden md:block font-body text-white/70 text-xs uppercase tracking-[0.12em] mb-1">
                        {SERVICE_TYPE_LABELS[project.type]}
                      </span>
                      <h3 className="font-heading text-white text-sm md:text-xl font-bold">
                        {project.title}
                      </h3>
                      {/* Mobile-only CTA since DirectionalHover requires mouse */}
                      <span className="hidden items-center gap-1.5 text-white/80 font-body text-sm font-medium mt-2">
                        View Project
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </DirectionalHover>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* View all link */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/portfolio"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200 group"
            >
              View All Projects
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transform group-hover:translate-x-1 transition-transform duration-200"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

