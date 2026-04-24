"use client";

/**
 * LineReveal - Text line-by-line reveal animation
 *
 * Uses GSAP SplitText to split children text into lines, then reveals
 * each line with a clip-path + yPercent animation for a premium
 * architectural text entrance feel.
 *
 * Specs from mhg-rules.md:
 * - SplitText splits into lines
 * - Each line: clip-path: inset(100% 0 0 0) → inset(0% 0 0 0)
 * - yPercent: 110 → 0
 * - Duration: 1.3s per line, stagger: 0.06s
 * - Trigger: "load" (immediate) or "scroll" (ScrollTrigger at top 85%)
 */

import { useEffect, useRef } from "react";
import {
  gsap,
  SplitText,
  registerGSAP,
  ANIMATION,
  EASING,
  SCROLL_TRIGGER,
} from "@/lib/animations";

interface LineRevealProps {
  children: React.ReactNode;
  /** "load" plays on mount, "scroll" waits for ScrollTrigger */
  trigger?: "load" | "scroll";
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
}

export default function LineReveal({
  children,
  trigger = "scroll",
  delay = 0,
  className = "",
}: LineRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!containerRef.current) return;

    registerGSAP();

    const el = containerRef.current;

    // Create GSAP context for scoped cleanup
    ctxRef.current = gsap.context(() => {
      // Split text into lines
      const split = new SplitText(el, {
        type: "lines",
        linesClass: "line-reveal-line",
      });

      // Set initial state for each line
      const lines = split.lines;
      gsap.set(lines, {
        clipPath: "inset(100% 0 0 0)",
        yPercent: 110,
      });

      // Build animation
      const animationConfig: gsap.TweenVars = {
        clipPath: "inset(0% 0 0 0)",
        yPercent: 0,
        duration: ANIMATION.LINE_REVEAL_DURATION,
        stagger: ANIMATION.LINE_REVEAL_STAGGER,
        ease: EASING.LINE_REVEAL,
        delay,
      };

      if (trigger === "scroll") {
        gsap.to(lines, {
          ...animationConfig,
          scrollTrigger: {
            trigger: el,
            start: SCROLL_TRIGGER.START,
            toggleActions: SCROLL_TRIGGER.TOGGLE_ACTIONS,
          },
        });
      } else {
        // "load" - play immediately
        gsap.to(lines, animationConfig);
      }
    }, el);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [trigger, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}
