"use client";

import Link from "next/link";
import Image from "next/image";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { FAQ_CATEGORIES } from "@/lib/faq-data";
import { company } from "@/lib/constants";

export default function FAQContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/projects/gallery/kitchen-01/2.jpg"
            alt="MHG Contracting FAQ"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">
              FAQ
            </span>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
              Renovation Questions, Answered
            </h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-xl mt-6 max-w-xl leading-relaxed">
              The questions we get most often from homeowners planning a kitchen, bathroom, basement, or addition project in Central NJ.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* FAQ categories */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[900px] mx-auto">
          {FAQ_CATEGORIES.map((category, catIndex) => (
            <div key={category.title} className={catIndex > 0 ? "mt-16 md:mt-20" : ""}>
              <LineReveal className="mb-8">
                <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-[1.1]">
                  {category.title}
                </h2>
              </LineReveal>
              {category.intro && (
                <FadeIn>
                  <p className="font-body text-text-secondary text-lg leading-relaxed mb-8">
                    {category.intro}
                  </p>
                </FadeIn>
              )}
              <FadeIn>
                <div className="divide-y divide-border border-y border-border">
                  {category.items.map((item) => (
                    <details key={item.question} className="group py-5">
                      <summary className="flex items-center justify-between cursor-pointer list-none gap-4">
                        <span className="font-heading text-base md:text-lg font-semibold text-text-primary group-hover:text-primary transition-colors">
                          {item.question}
                        </span>
                        <svg
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          className="flex-shrink-0 transition-transform duration-300 group-open:rotate-45 text-text-secondary"
                        >
                          <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      </summary>
                      <p className="font-body text-text-secondary text-base md:text-lg leading-relaxed mt-4 pr-8">
                        {item.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </FadeIn>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 md:py-32 px-6 lg:px-10" style={{ backgroundColor: "#2D3380" }}>
        <div className="max-w-[900px] mx-auto text-center">
          <LineReveal className="mb-6">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-[1.1]">
              Still Have Questions?
            </h2>
          </LineReveal>
          <FadeIn delay={0.2}>
            <p className="font-body text-white/60 text-lg mb-10 leading-relaxed">
              The fastest way to get specific answers about your project is a free in-home consultation. Call {company.phone} or request an estimate.
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
