"use client";

/**
 * ServicesGrid — 6-card service overview
 *
 * "What We Do" heading + 3-col grid (2-col tablet, 1-col mobile).
 * Each card: service image thumbnail, icon area, service name, short description, subtle hover lift.
 * FadeIn stagger 0.1s.
 */

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { services } from "@/lib/data";

const SERVICE_ICONS: Record<string, React.ReactNode> = {
  kitchen: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9h18M9 21V9M15 21V9M3 9l3-6h12l3 6M3 9v12h18V9" />
    </svg>
  ),
  bathroom: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 12h16a1 1 0 011 1v3a4 4 0 01-4 4H7a4 4 0 01-4-4v-3a1 1 0 011-1zM6 12V5a2 2 0 012-2h1" />
      <path d="M7 20v2M17 20v2" />
    </svg>
  ),
  basement: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18M12 3v18" />
    </svg>
  ),
  home: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12l9-9 9 9" />
      <path d="M5 10v10a1 1 0 001 1h12a1 1 0 001-1V10" />
    </svg>
  ),
  addition: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  construction: (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 20h20M4 20V10l8-6 8 6v10" />
      <path d="M9 20v-5h6v5" />
    </svg>
  ),
};

// Representative project image for each service type
const SERVICE_IMAGES: Record<string, string> = {
  kitchen: "/images/projects/kitchen-02.jpg",
  bathroom: "/images/projects/bath-01.jpg",
  basement: "/images/projects/basement-01.jpg",
  home: "/images/projects/fullreno-01.jpg",
  addition: "/images/projects/addition-01.jpg",
  construction: "/images/projects/newbuild-01.jpg",
};

export default function ServicesGrid() {
  return (
    <section id="services-grid" className="py-14 md:py-28 lg:py-32 px-6 lg:px-10">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="text-center mb-8 md:mb-20">
          <FadeIn>
            <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
              Our Services
            </span>
          </FadeIn>
          <LineReveal className="mb-4">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1]">
              What We Do
            </h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-text-secondary text-lg max-w-xl mx-auto leading-relaxed">
              From single-room renovations to full home builds, we bring expertise
              and pride to every project.
            </p>
          </FadeIn>
        </div>

        {/* 3-col grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={index * 0.1}>
              <Link href={`/services/${service.slug}`} className="block group">
                <div className="rounded-lg border border-border bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                  {/* Service image thumbnail */}
                  <div className="aspect-[16/9] overflow-hidden relative">
                    <img
                      src={SERVICE_IMAGES[service.icon] || SERVICE_IMAGES.home}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  {/* Card content */}
                  <div className="p-5 md:p-7">
                    {/* Icon + Name row */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-md bg-primary/5 flex items-center justify-center text-primary flex-shrink-0 group-hover:bg-primary/10 transition-colors duration-300">
                        {SERVICE_ICONS[service.icon] || SERVICE_ICONS.home}
                      </div>
                      <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                        {service.name}
                      </h3>
                    </div>

                    <p className="font-body text-text-secondary text-sm leading-relaxed mb-4">
                      {service.shortDescription}
                    </p>

                    {/* Arrow */}
                    <span className="inline-flex items-center gap-1.5 text-primary font-body text-sm font-medium opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
                      Learn More
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
