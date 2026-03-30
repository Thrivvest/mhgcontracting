"use client";

/**
 * ScrollSlider — Portfolio scroll slider (most complex animation)
 *
 * A pinned, scroll-driven portfolio slider. On desktop (≥992px), the container
 * is pinned and slides wipe over each other using clip-path expansion.
 * On mobile (<992px), falls back to a simple stacked card layout.
 *
 * Specs from mhg-rules.md:
 * - Container pinned via ScrollTrigger
 * - Slides stacked, each wipes over previous using clip-path
 * - Content parallax: yPercent 5 → 0 inside each slide
 * - scrub: 1 with snap to discrete states
 * - DISABLED below 991px — show stacked layout
 * - Navigation indicators update at state thresholds
 */

import { useEffect, useRef, useState, useCallback } from "react";
import {
  gsap,
  ScrollTrigger,
  registerGSAP,
  EASING,
  MOBILE_BREAKPOINT,
} from "@/lib/animations";

interface ScrollSliderProps {
  children: React.ReactNode[];
  /** Additional CSS classes for the outer wrapper */
  className?: string;
  /** Whether to show navigation dots */
  showDots?: boolean;
}

export default function ScrollSlider({
  children,
  className = "",
  showDots = true,
}: ScrollSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  const slideCount = children.length;

  // Check if mobile
  const checkMobile = useCallback(() => {
    if (typeof window === "undefined") return;
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  }, []);

  useEffect(() => {
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [checkMobile]);

  // Desktop: pinned scroll slider with clip-path wipes
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile) return;
    if (!containerRef.current || !sliderRef.current) return;
    if (slideCount < 2) return;

    registerGSAP();

    const container = containerRef.current;
    const slider = sliderRef.current;
    const slides = slider.querySelectorAll<HTMLElement>("[data-slide]");
    const contents = slider.querySelectorAll<HTMLElement>("[data-slide-content]");

    if (slides.length === 0) return;

    ctxRef.current = gsap.context(() => {
      // Stack all slides on top of each other
      gsap.set(slides, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      });

      // All slides except the first start clipped (hidden)
      slides.forEach((slide, i) => {
        if (i > 0) {
          gsap.set(slide, { clipPath: "inset(100% 0 0 0)", zIndex: i + 1 });
        } else {
          gsap.set(slide, { clipPath: "inset(0% 0 0 0)", zIndex: 1 });
        }
      });

      // Set initial parallax offset on content
      contents.forEach((content, i) => {
        if (i > 0) {
          gsap.set(content, { yPercent: 5 });
        }
      });

      // Build main timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: () => `+=${slideCount * 100}vh`,
          pin: true,
          scrub: 1,
          snap: {
            snapTo: 1 / (slideCount - 1),
            duration: { min: 0.2, max: 0.5 },
            ease: EASING.DEFAULT,
          },
          onUpdate: (self) => {
            // Update active dot
            const progress = self.progress;
            const newIndex = Math.round(progress * (slideCount - 1));
            setActiveIndex(newIndex);
          },
        },
      });

      // Animate each slide transition
      slides.forEach((slide, i) => {
        if (i === 0) return; // First slide is already visible

        const content = contents[i];
        const position = (i - 1) / (slideCount - 1);

        // Reveal next slide via clip-path expansion
        tl.to(
          slide,
          {
            clipPath: "inset(0% 0 0 0)",
            duration: 1 / (slideCount - 1),
            ease: "none",
          },
          position
        );

        // Content parallax within the revealing slide
        if (content) {
          tl.to(
            content,
            {
              yPercent: 0,
              duration: 1 / (slideCount - 1),
              ease: "none",
            },
            position
          );
        }
      });
    }, container);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [isMobile, slideCount]);

  // ─── Mobile: Stacked cards layout ─────────────────────

  if (isMobile) {
    return (
      <div className={`scroll-slider-mobile ${className}`}>
        <div className="flex flex-col">
          {children.map((child, i) => (
            <div key={i} className="w-full [&_.mobile-slide]:h-[75vh] [&_.mobile-slide]:min-h-[420px]">
              {child}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ─── Desktop: Pinned scroll slider ────────────────────

  return (
    <div ref={containerRef} className={`scroll-slider-container ${className}`}>
      <div
        ref={sliderRef}
        className="relative w-full h-screen overflow-hidden"
      >
        {children.map((child, i) => (
          <div key={i} data-slide className="absolute inset-0">
            <div data-slide-content className="w-full h-full">
              {child}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation dots */}
      {showDots && slideCount > 1 && (
        <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
          {children.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === activeIndex
                  ? "bg-white scale-125"
                  : "bg-white/40 hover:bg-white/70"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
