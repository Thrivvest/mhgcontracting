"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import DirectionalHover from "@/components/ui/DirectionalHover";
import { portfolioProjects, type ServiceType } from "@/lib/data";

const FILTERS: { label: string; value: ServiceType | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Kitchen", value: "kitchen" },
  { label: "Bathroom", value: "bathroom" },
  { label: "Basement", value: "basement" },
  { label: "Full Renovation", value: "full-renovation" },
  { label: "Addition", value: "addition" },
  { label: "New Construction", value: "new-construction" },
];


export default function PortfolioContent() {
  const [activeFilter, setActiveFilter] = useState<ServiceType | "all">("all");

  const filtered = activeFilter === "all"
    ? portfolioProjects
    : portfolioProjects.filter((p) => p.type === activeFilter);

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/projects/gallery/kitchen-02/1.jpg" alt="Our portfolio" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn><span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">Portfolio</span></FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">Renovation Portfolio - Kitchen, Bath &amp; Basement Projects</h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-xl mt-6 max-w-xl leading-relaxed">
              Completed kitchen renovations, bathroom remodels, basement finishing, home additions, and new construction projects across Central New Jersey.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Filter Bar + Grid */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          {/* Filter bar */}
          <FadeIn>
            <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
              {FILTERS.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-5 py-2.5 rounded-md font-body text-sm font-medium transition-all duration-200 ${
                    activeFilter === filter.value
                      ? "bg-primary text-white"
                      : "bg-background-alt text-text-secondary hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {filter.label}
                </button>
              ))}
            </div>
          </FadeIn>

          {/* Project grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map((project, index) => (
              <FadeIn key={project.id} delay={Math.min(index * 0.08, 0.4)}>
                <Link href={`/portfolio/${project.slug}`} className="block">
                  <DirectionalHover
                    className="aspect-[4/3] rounded-lg cursor-pointer"
                    overlayClassName="bg-primary/85 backdrop-blur-sm"
                    overlay={
                      <div className="text-center px-6">
                        <span className="block font-body text-white/70 text-xs uppercase tracking-[0.15em] mb-2">
                          {project.type.replace("-", " ")}
                        </span>
                        <span className="block font-heading text-white text-lg font-semibold mb-2">{project.title}</span>
                        <span className="block font-body text-white/60 text-sm mb-3">{project.location}</span>
                        <span className="inline-flex items-center gap-1.5 text-white font-body text-sm font-medium">
                          View Project
                          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </span>
                      </div>
                    }
                  >
                    <div className="w-full h-full relative">
                      <Image src={project.imagePath} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <span className="block font-body text-white/50 text-xs uppercase tracking-[0.12em] mb-1">
                          {project.type.replace("-", " ")}
                        </span>
                        <h3 className="font-heading text-white text-lg font-semibold">{project.title}</h3>
                      </div>
                    </div>
                  </DirectionalHover>
                </Link>
              </FadeIn>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="font-body text-text-secondary text-lg">No projects found for this category.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
