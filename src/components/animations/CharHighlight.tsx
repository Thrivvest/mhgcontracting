"use client";

/**
 * CharHighlight — Character-by-character scroll reveal
 *
 * Uses GSAP SplitText to split text into individual characters.
 * As the user scrolls through the section, characters progressively
 * transition from dim (opacity 0.2) to full (opacity 1.0), creating
 * a "reading along" effect. Premium polish detail for impactful
 * quotes, taglines, or mission statements.
 *
 * Specs from mhg-rules.md:
 * - SplitText splits into individual characters
 * - Each char starts at opacity 0.2
 * - Scrub-enabled ScrollTrigger to scroll position
 * - Characters fade to opacity 1.0 progressively
 */

import { useEffect, useRef } from "react";
import {
  gsap,
  SplitText,
  registerGSAP,
} from "@/lib/animations";

interface CharHighlightProps {
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** ScrollTrigger start position */
  start?: string;
  /** ScrollTrigger end position */
  end?: string;
}

export default function CharHighlight({
  children,
  className = "",
  start = "top 80%",
  end = "bottom 30%",
}: CharHighlightProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!textRef.current) return;

    registerGSAP();

    const el = textRef.current;

    ctxRef.current = gsap.context(() => {
      // Split text into individual characters
      const split = new SplitText(el, {
        type: "chars",
        charsClass: "char-highlight-char",
      });

      // Set initial dim state
      gsap.set(split.chars, { opacity: 0.2 });

      // Animate characters progressively on scroll
      gsap.to(split.chars, {
        opacity: 1,
        stagger: 0.02,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: true,
        },
      });
    }, el);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [start, end]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
}
