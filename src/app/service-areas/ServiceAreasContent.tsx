"use client";

/**
 * ServiceAreasContent - Client component for the /service-areas page
 *
 * Displays all 6 service areas with links to each service × city page.
 */

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { company } from "@/lib/constants";
import { CITIES, AREA_PAGES } from "@/lib/area-pages-data";

const SERVICES = [
  { slug: "kitchen-renovations", name: "Kitchen Renovations" },
  { slug: "bathroom-renovations", name: "Bathroom Renovations" },
  { slug: "basement-finishing", name: "Basement Finishing" },
  { slug: "full-home-renovations", name: "Full Home Renovations" },
  { slug: "additions", name: "Additions" },
  { slug: "new-construction", name: "New Construction" },
];

export default function ServiceAreasContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/bathroom-hero.jpg"
            alt="MHG Contracting service areas"
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">
              Where We Work
            </span>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">
              Serving Princeton, Hamilton, West Windsor &amp; Central NJ
            </h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-xl mt-6 max-w-xl leading-relaxed">
              MHG Contracting provides kitchen renovations, bathroom remodels, basement finishing, home additions, and new construction throughout Central New Jersey and Bucks County, PA - within 25 minutes of our Hamilton headquarters.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Cities Grid */}
      <section className="py-20 md:py-28 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <FadeIn>
            <p className="font-body text-text-secondary text-lg max-w-2xl mb-16 leading-relaxed">
              We provide full-service residential contracting across six communities.
              Select a city below to learn about our services in your area, including
              local pricing, permitting details, and project examples.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CITIES.map((city, i) => (
              <FadeIn key={city.slug} delay={i * 0.08}>
                <div className="border border-border rounded-lg p-8 hover:border-primary/30 hover:shadow-lg transition-all duration-300 group">
                  <h2 className="font-heading text-2xl font-bold text-text-primary mb-1 group-hover:text-primary transition-colors duration-300">
                    {city.name}, {city.stateAbbr}
                  </h2>
                  <p className="font-body text-text-light text-sm mb-6">
                    {city.state}
                  </p>

                  <div className="space-y-2">
                    {SERVICES.map((service) => {
                      const page = AREA_PAGES.find(
                        (p) =>
                          p.serviceSlug === service.slug &&
                          p.citySlug === city.slug
                      );
                      if (!page) return null;
                      return (
                        <Link
                          key={service.slug}
                          href={`/services/${service.slug}/${city.slug}`}
                          className="flex items-center justify-between py-2 px-3 -mx-3 rounded-md text-sm font-body text-text-secondary hover:text-primary hover:bg-primary/5 transition-all duration-200"
                        >
                          <span>{service.name}</span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            fill="none"
                            className="opacity-0 group-hover:opacity-50 transition-opacity"
                          >
                            <path
                              d="M3 7h8M8 4l3 3-3 3"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="py-24 md:py-32 px-6 lg:px-10"
        style={{ backgroundColor: "#2D3380" }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <LineReveal className="mb-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
              Don&apos;t See Your Town?
            </h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-white/60 text-lg mb-10">
              We serve communities throughout Central New Jersey and Bucks
              County. If you&apos;re within 25 minutes of Hamilton, NJ, we&apos;d love to
              hear from you.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white font-body font-semibold text-sm px-10 py-4 rounded-md hover:bg-white hover:text-primary transition-all duration-300"
            >
              {company.ctaPrimary}
            </Link>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
