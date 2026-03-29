"use client";

/**
 * AboutTeaser — Home page about preview
 *
 * Two-column layout (60/40 split). Left: heading, description,
 * CTA link. Right: placeholder image area. All FadeIn on scroll.
 */

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";

export default function AboutTeaser() {
  return (
    <section id="about-teaser" className="py-20 md:py-28 lg:py-32 px-6 lg:px-10 bg-background-alt">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Left column (60%) */}
          <div className="lg:col-span-3">
            <FadeIn>
              <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
                About MHG
              </span>
            </FadeIn>

            <LineReveal className="mb-6">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1]">
                Family-Owned.
                <br />
                Quality-Driven.
              </h2>
            </LineReveal>

            <FadeIn delay={0.2}>
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-4 max-w-xl">
                MHG Contracting is a family-owned residential contracting company based
                in Hamilton, NJ. We specialize in kitchen renovations, bathroom remodels,
                basement finishing, full home renovations, additions, and new construction.
              </p>
            </FadeIn>

            <FadeIn delay={0.3}>
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-8 max-w-xl">
                Founded by Shahzeb Malik, we take pride in every project — treating each
                home as if it were our own. Our hands-on approach means you work directly
                with the people building your space, ensuring quality you can see and
                service you can trust.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary hover:text-primary-dark transition-colors duration-200 group"
              >
                Learn More About Us
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
            </FadeIn>
          </div>

          {/* Right column (40%) — Image placeholder */}
          <div className="lg:col-span-2">
            <FadeIn delay={0.3}>
              <div className="aspect-[3/4] rounded-lg overflow-hidden relative">
                <img
                  src="/images/projects/fullreno-01.jpg"
                  alt="MHG Contracting — Luxury home renovation"
                  className="w-full h-full object-cover"
                />
                {/* Overlay with stat */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="block font-heading text-white/80 text-6xl font-bold leading-none mb-2">
                    10+
                  </span>
                  <span className="block font-body text-white/60 text-sm tracking-wide">
                    Years of Experience
                  </span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
