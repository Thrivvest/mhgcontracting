"use client";

/**
 * PortfolioSlider — Scroll-driven portfolio showcase
 *
 * Uses the ScrollSlider animation component with featured projects.
 * Each slide is a full-viewport card with project info overlay.
 * Desktop: pinned scroll wipe. Mobile: stacked cards.
 */

import Link from "next/link";
import { getFeaturedProjects } from "@/lib/data";
import ScrollSlider from "@/components/animations/ScrollSlider";

const SERVICE_TYPE_LABELS: Record<string, string> = {
  kitchen: "Kitchen Renovation",
  bathroom: "Bathroom Renovation",
  basement: "Basement Finishing",
  "full-renovation": "Full Home Renovation",
  addition: "Addition",
  "new-construction": "New Construction",
};

export default function PortfolioSlider() {
  const featured = getFeaturedProjects().slice(0, 4);

  const slides = featured.map((project) => (
    <div
      key={project.id}
      className="relative w-full h-screen flex items-end"
    >
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={project.imagePath}
          alt={project.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Project info */}
      <div className="relative z-10 p-8 md:p-14 lg:p-20 max-w-3xl">
        <span className="inline-block font-body text-xs font-medium text-white/60 uppercase tracking-[0.15em] mb-3">
          {SERVICE_TYPE_LABELS[project.type] || project.type}
        </span>
        <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-[1.1]">
          {project.title}
        </h2>
        <p className="font-body text-white/70 text-base md:text-lg mb-6 max-w-xl leading-relaxed">
          {project.shortDescription}
        </p>
        <Link
          href={`/portfolio/${project.slug}`}
          className="inline-flex items-center gap-2 text-white font-body font-medium text-sm hover:text-white/80 transition-colors duration-200 group"
        >
          View Project
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transform group-hover:translate-x-1 transition-transform duration-200"
          >
            <path
              d="M3 8h10M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      </div>

      {/* Project location pill */}
      <div className="absolute top-8 right-8 md:top-14 md:right-14 z-10">
        <span className="font-body text-xs text-white/50 tracking-wide">
          {project.location}
        </span>
      </div>
    </div>
  ));

  return (
    <section id="portfolio-slider">
      <ScrollSlider showDots={true}>
        {slides}
      </ScrollSlider>
    </section>
  );
}

