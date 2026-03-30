"use client";

/**
 * CTABanner — Full-width call-to-action
 *
 * Navy #2D3380 background. LineReveal heading, subtext,
 * white outlined button → filled on hover. Links to /contact.
 */

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";

export default function CTABanner() {
  return (
    <section
      id="cta-banner"
      className="relative py-14 md:py-28 lg:py-32 px-6 lg:px-10 overflow-hidden"
      style={{ backgroundColor: "#2D3380" }}
    >
      {/* Subtle radial glow */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(74,80,165,0.4) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 max-w-[900px] mx-auto text-center">
        <LineReveal className="mb-6">
          <h2 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-white leading-[1.1]">
            Ready to Transform
            <br />
            Your Home?
          </h2>
        </LineReveal>

        <FadeIn delay={0.2}>
          <p className="font-body text-white/60 text-lg max-w-lg mx-auto mb-10 leading-relaxed">
            Let&apos;s talk about your vision. Schedule a free consultation and
            see how MHG can bring your dream renovation to life.
          </p>
        </FadeIn>

        <FadeIn delay={0.4}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 border-2 border-white text-white font-body font-semibold text-base px-10 py-4.5 rounded-lg hover:bg-white hover:text-[#1A1A2E] hover:scale-[1.02] transition-all duration-300"
          >
            Get Your Free Estimate
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </FadeIn>
      </div>
    </section>
  );
}
