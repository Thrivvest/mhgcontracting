"use client";

/**
 * FadeIn — Scroll-triggered fade animation
 *
 * Elements fade in with an optional upward Y offset when they
 * enter the viewport. Clean and simple — the workhorse animation
 * used for most content blocks across the site.
 *
 * Specs from mhg-rules.md:
 * - opacity: 0 → 1
 * - Duration: 0.6s
 * - Easing: power2.out
 * - ScrollTrigger start: "top 85%"
 * - Optional Y offset (default 20px)
 */

import { useEffect, useRef } from "react";
import {
  gsap,
  registerGSAP,
  ANIMATION,
  EASING,
  SCROLL_TRIGGER,
} from "@/lib/animations";

interface FadeInProps {
  children: React.ReactNode;
  /** Vertical offset in pixels (default 20) */
  y?: number;
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Stagger between child elements (seconds) — use with data-fade-item on children */
  stagger?: number;
  /** Duration override */
  duration?: number;
  /** Additional CSS classes */
  className?: string;
}

export default function FadeIn({
  children,
  y = 20,
  delay = 0,
  stagger = 0,
  duration = ANIMATION.FADE_IN_DURATION,
  className = "",
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!ref.current) return;

    registerGSAP();

    const el = ref.current;

    ctxRef.current = gsap.context(() => {
      // Determine targets: if stagger is set, animate children individually
      let finalTargets: gsap.DOMTarget = el;

      if (stagger > 0) {
        const items = el.querySelectorAll("[data-fade-item]");
        if (items.length > 0) {
          finalTargets = items;
        }
      }

      gsap.set(finalTargets, { opacity: 0, y });

      gsap.to(finalTargets, {
        opacity: 1,
        y: 0,
        duration,
        ease: EASING.FADE_IN,
        delay,
        stagger: stagger > 0 ? stagger : undefined,
        scrollTrigger: {
          trigger: el,
          start: SCROLL_TRIGGER.START,
          toggleActions: SCROLL_TRIGGER.TOGGLE_ACTIONS,
        },
      });
    }, el);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [y, delay, stagger, duration]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
