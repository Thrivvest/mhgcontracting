"use client";

import Link from "next/link";
import Image from "next/image";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import ScrollSlider from "@/components/animations/ScrollSlider";
import { company } from "@/lib/constants";

const SERVICE_SLIDES = [
  { slug: "kitchen-renovations",   image: "/images/projects/kitchen-02-2.jpg",                    label: "01", title: "Kitchen Renovations",   sub: "Custom cabinetry, countertops, and full layout redesigns." },
  { slug: "bathroom-renovations",  image: "/images/projects/bath-02-1.jpg",                       label: "02", title: "Bathroom Renovations",  sub: "From powder rooms to spa-like master bathrooms." },
  { slug: "basement-finishing",    image: "/images/projects/gallery/bath-03/1.jpg",               label: "03", title: "Basement Finishing",    sub: "Transform your basement into usable living space." },
  { slug: "full-home-renovations", image: "/images/projects/gallery/fullreno-01/4.jpg",           label: "04", title: "Full Home Renovations", sub: "Comprehensive whole-home transformations." },
  { slug: "additions",             image: "/images/projects/addition-01-2.jpg",                   label: "05", title: "Additions",             sub: "Seamless home additions that match your existing style." },
  { slug: "new-construction",      image: "/images/projects/newbuild-01-1.jpg",                   label: "06", title: "New Construction",      sub: "Custom homes built from the ground up." },
];

export default function ServicesContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/services/bathroom-hero.jpg" alt="Our services" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn><span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">Services</span></FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">Home Renovation Services in Central NJ</h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-xl mt-6 max-w-xl leading-relaxed">
              Kitchen renovations, bathroom remodels, basement finishing, home additions, full-home renovations, and new construction - serving Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, and Yardley, PA.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Services Slider */}
      <section>
        <ScrollSlider showDots={true}>
          {SERVICE_SLIDES.map((slide) => (
            <Link
              key={slide.slug}
              href={`/services/${slide.slug}`}
              className="block relative w-full h-screen flex items-end mobile-slide"
            >
              <div className="absolute inset-0">
                <Image src={slide.image} alt={slide.title} fill sizes="100vw" className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              <div className="relative z-10 p-8 md:p-14 lg:p-20 max-w-3xl">
                <span className="inline-block font-heading text-6xl md:text-7xl font-bold text-white/10 leading-none mb-4">
                  {slide.label}
                </span>
                <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-3 leading-[1.1]">
                  {slide.title}
                </h2>
                <p className="font-body text-white/60 text-lg mb-6">{slide.sub}</p>
                <span className="inline-flex items-center gap-2 text-white font-body font-medium text-sm group">
                  View Service
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </ScrollSlider>
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
