"use client";

/**
 * Hero - Full-viewport homepage hero
 *
 * Uses a fixed-position full-screen approach to guarantee edge-to-edge coverage.
 * GSAP clip-path reveal on load, LineReveal headline, CTA button, scroll chevron.
 * Padding-top accounts for the fixed 72px header.
 *
 * NOTE: Uses Next.js <Image> with fill + priority so the hero is served as
 * optimised WebP at exactly the right size for every screen - avoids the
 * blurriness that occurs when a plain <img> is stretched across large viewports.
 */

import { useEffect, useRef } from "react";
import Image from "next/image";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import LeadForm from "@/components/sections/LeadForm";
import { company } from "@/lib/constants";
import { gsap, registerGSAP } from "@/lib/animations";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;

    const isMobile = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const section = sectionRef.current;

    if (isMobile) {
      section.style.opacity = "0";
      requestAnimationFrame(() => {
        section.style.transition = "opacity 0.3s ease-out";
        section.style.opacity = "1";
      });
      return;
    }

    registerGSAP();

    gsap.set(section, { clipPath: "inset(100% 0 0 0)" });
    gsap.to(section, {
      clipPath: "inset(0% 0 0 0)",
      duration: 0.9,
      delay: 0.1,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        width: "100vw",
        maxWidth: "100vw",
        minHeight: "100dvh",
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      {/* Background image - Next.js Image for WebP + responsive sizing */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/projects/kitchen-02-2.jpg"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/50" />

      {/* Content - two-column split: message left, estimate form right.
          pt-24 clears the fixed header; stacks to a single column on mobile. */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16 lg:py-24 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left: message + trust */}
        <div className="min-w-0 text-center lg:text-left">
          <LineReveal trigger="load" delay={0.3} className="mb-5">
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-[4.25rem] font-bold text-white leading-[1.05] tracking-tight">
              Building With Pride,
              <br />
              One Home at a Time
            </h1>
          </LineReveal>

          <FadeIn y={20} delay={0.6}>
            <p className="font-body text-lg text-white/70 max-w-xl mx-auto lg:mx-0 mb-6 leading-relaxed">
              Family-owned residential contracting serving Central New Jersey.
              Kitchen renovations, bathroom remodels, basement finishing, and
              more.
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 mb-6 font-body text-sm text-white/80">
              <span>Family-owned</span>
              <span className="text-white/30">|</span>
              <span className="inline-flex items-center gap-1">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="#F5B301" aria-hidden="true">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                4.9 on Google
              </span>
              <span className="text-white/30">|</span>
              <span>Licensed &amp; insured</span>
            </div>

            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-white hover:text-white/80 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Prefer to call? {company.phone}
            </a>
          </FadeIn>
        </div>

        {/* Right: estimate form (same /api/contact -> GHL + n8n path as every embed) */}
        <div className="min-w-0 w-full">
          <FadeIn y={20} delay={0.5}>
            <LeadForm
              source="mhgcon.com homepage hero"
              heading={company.ctaPrimary}
              subheading="Tell us about your project. We respond within 24 hours."
              theme="light"
            />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
