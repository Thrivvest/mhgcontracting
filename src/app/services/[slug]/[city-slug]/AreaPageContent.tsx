"use client";

/**
 * AreaPageContent — Client component for geo-targeted area pages
 *
 * Renders the full area page with hero, content, FAQs, and CTAs.
 * Follows the ServiceDetail component pattern.
 */

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { type AreaPage, getAreaPagesByCity, getAreaPagesByService } from "@/lib/area-pages-data";
import { company } from "@/lib/constants";

const SERVICE_HERO_MAP: Record<string, string> = {
  "kitchen-renovations": "kitchen",
  "bathroom-renovations": "bathroom",
  "basement-finishing": "basement",
  "full-home-renovations": "full-renovation",
  "additions": "addition",
  "new-construction": "new-construction",
};

interface AreaPageContentProps {
  page: AreaPage;
}

export default function AreaPageContent({ page }: AreaPageContentProps) {
  const heroType = SERVICE_HERO_MAP[page.serviceSlug] || "kitchen";

  // Other services in the same city (for cross-linking)
  const otherServicesInCity = getAreaPagesByCity(page.citySlug).filter(
    (p) => p.serviceSlug !== page.serviceSlug
  );

  // Same service in other cities (for cross-linking)
  const sameServiceOtherCities = getAreaPagesByService(page.serviceSlug).filter(
    (p) => p.citySlug !== page.citySlug
  );

  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={`/images/services/${heroType}-hero.jpg`}
            alt={page.h1}
            className="w-full h-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn>
            <Link
              href={`/services/${page.serviceSlug}`}
              className="inline-flex items-center gap-2 font-body text-white/40 text-sm hover:text-white/70 transition-colors mb-8 block"
            >
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M13 8H3M7 4L3 8l4 4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {page.serviceName}
            </Link>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.05]">
              {page.h1}
            </h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-lg mt-6 max-w-xl leading-relaxed">
              Expert {page.serviceName.toLowerCase()} from MHG Contracting,
              serving {page.cityName}, {page.state} and surrounding areas.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 md:py-28 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          <FadeIn>
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-heading prose-headings:text-text-primary prose-headings:font-bold
                prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-p:font-body prose-p:text-text-secondary prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-ul:text-text-secondary prose-li:font-body"
              dangerouslySetInnerHTML={{ __html: page.content }}
            />
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 md:py-28 px-6 lg:px-10 bg-background-alt">
        <div className="max-w-[900px] mx-auto">
          <LineReveal className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
              Frequently Asked Questions
            </h2>
          </LineReveal>

          <div className="space-y-6">
            {page.faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="bg-white rounded-lg p-6 md:p-8 border border-border">
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">
                    {faq.question}
                  </h3>
                  <p className="font-body text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-linking: Other services in same city */}
      {otherServicesInCity.length > 0 && (
        <section className="py-20 md:py-28 px-6 lg:px-10">
          <div className="max-w-[1200px] mx-auto">
            <LineReveal className="mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
                More Services in {page.cityName}
              </h2>
            </LineReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherServicesInCity.map((p, i) => (
                <FadeIn key={p.serviceSlug} delay={i * 0.06}>
                  <Link
                    href={`/services/${p.serviceSlug}/${p.citySlug}`}
                    className="block p-6 border border-border rounded-lg hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                      {p.serviceName}
                    </h3>
                    <p className="font-body text-text-light text-sm mt-1">
                      {p.cityName}, {p.state}
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cross-linking: Same service in other cities */}
      {sameServiceOtherCities.length > 0 && (
        <section className="py-20 md:py-28 px-6 lg:px-10 bg-background-alt">
          <div className="max-w-[1200px] mx-auto">
            <LineReveal className="mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">
                {page.serviceName} in Other Areas
              </h2>
            </LineReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sameServiceOtherCities.map((p, i) => (
                <FadeIn key={p.citySlug} delay={i * 0.06}>
                  <Link
                    href={`/services/${p.serviceSlug}/${p.citySlug}`}
                    className="block p-6 border border-border rounded-lg hover:border-primary/30 hover:shadow-md transition-all duration-300 group"
                  >
                    <h3 className="font-heading text-lg font-semibold text-text-primary group-hover:text-primary transition-colors duration-200">
                      {p.cityName}, {p.state}
                    </h3>
                    <p className="font-body text-text-light text-sm mt-1">
                      {p.serviceName}
                    </p>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section
        className="py-24 md:py-32 px-6 lg:px-10"
        style={{ backgroundColor: "#2D3380" }}
      >
        <div className="max-w-[900px] mx-auto text-center">
          <LineReveal className="mb-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
              Ready to Start Your {page.cityName} Project?
            </h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-white/60 text-lg mb-10">
              Get a free estimate for your {page.serviceName.toLowerCase()} in{" "}
              {page.cityName}, {page.state}. We&apos;re just a call away.
            </p>
          </FadeIn>
          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border-2 border-white text-white font-body font-semibold text-sm px-10 py-4 rounded-md hover:bg-white hover:text-primary transition-all duration-300"
              >
                {company.ctaPrimary}
              </Link>
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2 text-white/70 font-body font-medium text-sm hover:text-white transition-colors duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                {company.phone}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
