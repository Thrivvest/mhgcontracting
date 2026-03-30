"use client";

/**
 * ReviewsSlider — Auto-playing Google Reviews carousel
 *
 * Displays real Google reviews in a smooth, auto-advancing slideshow
 * with GSAP-powered transitions. Shows 1 review on mobile, 3 on desktop.
 * Matches the site's premium design language with the navy/white palette.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { GOOGLE_REVIEWS } from "@/lib/reviews-data";

/* ── Google "G" logo (inline SVG) ── */
function GoogleLogo({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" width="20" height="20">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

/* ── Star rating ── */
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#FBBC05">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const totalReviews = GOOGLE_REVIEWS.length;
  // Show 3 cards at a time on desktop, 1 on mobile
  const cardsPerView = typeof window !== "undefined" && window.innerWidth >= 768 ? 3 : 1;
  const maxIndex = totalReviews - cardsPerView;

  const goTo = useCallback((index: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
      setIsTransitioning(false);
    }, 300);
  }, [maxIndex]);

  const next = useCallback(() => {
    goTo(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  }, [currentIndex, maxIndex, goTo]);

  const prev = useCallback(() => {
    goTo(currentIndex <= 0 ? maxIndex : currentIndex - 1);
  }, [currentIndex, maxIndex, goTo]);

  // Auto-advance every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    intervalRef.current = setInterval(next, 5000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next, isPaused]);

  return (
    <section
      className="py-20 md:py-28 lg:py-32 px-6 lg:px-10 overflow-hidden"
      style={{ backgroundColor: "#0d0d1a" }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14 md:mb-20">
          <div>
            <FadeIn>
              <div className="flex items-center gap-2.5 mb-4">
                <GoogleLogo />
                <span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em]">
                  Google Reviews
                </span>
              </div>
            </FadeIn>
            <LineReveal className="mb-3">
              <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">
                What Our Clients Say
              </h2>
            </LineReveal>
            <FadeIn delay={0.3}>
              <p className="font-body text-white/40 text-lg max-w-lg">
                Real reviews from real homeowners across Central New Jersey.
              </p>
            </FadeIn>
          </div>

          {/* Navigation arrows */}
          <FadeIn delay={0.4}>
            <div className="flex items-center gap-3 mt-8 md:mt-0">
              <button
                onClick={prev}
                aria-label="Previous reviews"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={next}
                aria-label="Next reviews"
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/50 transition-all duration-300"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </FadeIn>
        </div>

        {/* Reviews carousel */}
        <div className="relative">
          <div
            className="flex gap-6 transition-transform duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)]"
            style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView + (6 * (cardsPerView - 1)) / cardsPerView)}%)` }}
          >
            {GOOGLE_REVIEWS.map((review, index) => (
              <div
                key={review.id}
                className={`flex-shrink-0 w-full md:w-[calc(33.333%-16px)] transition-opacity duration-500 ${
                  isTransitioning ? "opacity-0" : "opacity-100"
                }`}
              >
                <div className="h-full rounded-xl p-8 md:p-9 flex flex-col border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] transition-colors duration-300">
                  {/* Stars + Google */}
                  <div className="flex items-center justify-between mb-6">
                    <Stars />
                    <GoogleLogo className="opacity-40" />
                  </div>

                  {/* Quote */}
                  <blockquote className="font-body text-white/80 text-[15px] leading-relaxed mb-8 flex-1">
                    &ldquo;{review.text}&rdquo;
                  </blockquote>

                  {/* Attribution */}
                  <div className="pt-6 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      {/* Avatar circle with initials */}
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-heading text-sm font-bold text-primary-light">
                          {review.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-heading text-sm font-semibold text-white">
                          {review.name}
                        </p>
                        <p className="font-body text-xs text-white/40">
                          {review.projectType} · {review.timeAgo}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Progress dots */}
        <div className="flex items-center justify-center gap-2 mt-10">
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Go to review set ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === currentIndex
                  ? "w-8 bg-primary"
                  : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>

        {/* Overall rating badge */}
        <FadeIn delay={0.5}>
          <div className="flex items-center justify-center gap-4 mt-10 pt-10 border-t border-white/10">
            <div className="flex items-center gap-2">
              <GoogleLogo />
              <span className="font-heading text-2xl font-bold text-white">5.0</span>
            </div>
            <Stars />
            <span className="font-body text-sm text-white/40">
              {totalReviews}+ reviews on Google
            </span>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
