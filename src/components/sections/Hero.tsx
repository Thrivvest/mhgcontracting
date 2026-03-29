"use client";

/**
 * Hero — Full-viewport homepage hero
 *
 * Uses a fixed-position full-screen approach to guarantee edge-to-edge coverage.
 * GSAP clip-path reveal on load, LineReveal headline, CTA button, scroll chevron.
 * Padding-top accounts for the fixed 72px header.
 */

import { useEffect, useRef } from "react";
import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { company } from "@/lib/constants";
import { gsap, registerGSAP } from "@/lib/animations";

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined" || !sectionRef.current) return;
    registerGSAP();

    const section = sectionRef.current;

    // Set initial clipped state
    gsap.set(section, { clipPath: "inset(100% 0 0 0)" });

    // Reveal animation after splash delay
    gsap.to(section, {
      clipPath: "inset(0% 0 0 0)",
      duration: 1,
      delay: 1.7,
      ease: "power3.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex items-center justify-center overflow-hidden"
      style={{
        width: "100vw",
        minHeight: "100vh",
        marginLeft: "calc(-50vw + 50%)",
      }}
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-black/50" />

      {/* Content — pt-20 clears the fixed header */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-20">
        <LineReveal trigger="load" delay={2.0} className="mb-6">
          <h1 className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-bold text-white leading-[1.05] tracking-tight">
            Building With Pride,
            <br />
            One Home at a Time
          </h1>
        </LineReveal>

        <FadeIn y={20} delay={2.6}>
          <p className="font-body text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
            Family-owned residential contracting serving Central New Jersey.
            Kitchen renovations, bathroom remodels, basement finishing, and
            more.
          </p>
        </FadeIn>

        <FadeIn y={15} delay={2.9}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-white text-[#1A1A2E] font-body font-semibold text-base px-10 py-4.5 rounded-lg hover:bg-white/90 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
          >
            {company.ctaPrimary}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="ml-1"
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
        </FadeIn>
      </div>

      {/* Scroll chevron */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="text-white/40"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </section>
  );
}
