"use client";

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { services } from "@/lib/data";
import { company } from "@/lib/constants";

const SERVICE_IMAGE_MAP: Record<string, string> = {
  "kitchen-renovations": "/images/services/kitchen-hero.jpg",
  "bathroom-renovations": "/images/services/bathroom-hero.jpg",
  "basement-finishing": "/images/services/basement-hero.jpg",
  "full-home-renovations": "/images/services/full-renovation-hero.jpg",
  "additions": "/images/services/addition-hero.jpg",
  "new-construction": "/images/services/new-construction-hero.jpg",
};

export default function ServicesContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/services/bathroom-hero.jpg" alt="Our services" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn><span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">Services</span></FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">What We Do</h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-xl mt-6 max-w-xl leading-relaxed">
              From single-room renovations to ground-up builds, we bring craftsmanship and care to every project.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Service Cards — stacked full-width */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto space-y-6">
          {services.map((service, index) => (
            <FadeIn key={service.id} delay={Math.min(index * 0.08, 0.4)}>
              <Link href={`/services/${service.slug}`} className="block group">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow duration-300 ${index % 2 === 1 ? "lg:grid-flow-col-dense" : ""}`}>
                  {/* Image placeholder */}
                  <div className={`aspect-[16/10] lg:aspect-auto lg:min-h-[320px] overflow-hidden ${index % 2 === 1 ? "lg:col-start-2" : ""}`}>
                    <img src={SERVICE_IMAGE_MAP[service.slug] || "/images/services/kitchen-hero.jpg"} alt={service.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>

                  {/* Content */}
                  <div className={`p-8 md:p-12 flex flex-col justify-center bg-white ${index % 2 === 1 ? "lg:col-start-1" : ""}`}>
                    <span className="font-heading text-5xl font-bold text-primary/10 block mb-3 leading-none">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-3 group-hover:text-primary transition-colors">
                      {service.name}
                    </h2>
                    <p className="font-body text-text-secondary text-base leading-relaxed mb-6 max-w-lg">
                      {service.shortDescription}
                    </p>
                    <span className="inline-flex items-center gap-2 font-body text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-200">
                      Learn More
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-10" style={{ backgroundColor: "#2D3380" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <LineReveal className="mb-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">Not Sure Where to Start?</h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-white/60 text-lg mb-10">We&apos;ll help you figure out the right approach for your home. Start with a free conversation.</p>
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
