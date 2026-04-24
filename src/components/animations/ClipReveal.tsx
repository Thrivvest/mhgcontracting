"use client";

/**
 * ClipReveal - Section entrance animation
 *
 * Wraps a section and reveals it via clip-path expansion.
 * Children content shifts upward simultaneously for a parallax feel.
 *
 * Specs from mhg-rules.md:
 * - clipPath: "inset(100% 0 0 0)" → "inset(0% 0 0 0)" over 1s
 * - Children: yPercent 5 → 0 simultaneously
 * - Used for hero and major section entrances
 */

import { useEffect, useRef } from "react";
import {
  gsap,
  registerGSAP,
  ANIMATION,
  EASING,
  SCROLL_TRIGGER,
} from "@/lib/animations";

interface ClipRevealProps {
  children: React.ReactNode;
  /** "load" plays on mount, "scroll" waits for ScrollTrigger */
  trigger?: "load" | "scroll";
  /** Delay before animation starts (seconds) */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
}

export default function ClipReveal({
  children,
  trigger = "scroll",
  delay = 0,
  className = "",
}: ClipRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!sectionRef.current || !contentRef.current) return;

    registerGSAP();

    const section = sectionRef.current;
    const content = contentRef.current;

    ctxRef.current = gsap.context(() => {
      // Set initial state
      gsap.set(section, { clipPath: "inset(100% 0 0 0)" });
      gsap.set(content, { yPercent: 5 });

      // Build timeline
      const tl = gsap.timeline({
        delay,
        ...(trigger === "scroll" && {
          scrollTrigger: {
            trigger: section,
            start: SCROLL_TRIGGER.START,
            toggleActions: SCROLL_TRIGGER.TOGGLE_ACTIONS,
          },
        }),
      });

      // Section clip-path expansion
      tl.to(section, {
        clipPath: "inset(0% 0 0 0)",
        duration: ANIMATION.CLIP_REVEAL_DURATION,
        ease: EASING.CLIP_REVEAL,
      });

      // Content parallax shift (simultaneous)
      tl.to(
        content,
        {
          yPercent: 0,
          duration: ANIMATION.CLIP_REVEAL_DURATION,
          ease: EASING.CLIP_REVEAL,
        },
        0 // start at the same time
      );
    }, section);

    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
        ctxRef.current = null;
      }
    };
  }, [trigger, delay]);

  return (
    <div ref={sectionRef} className={className}>
      <div ref={contentRef} className="h-full min-h-[inherit]">{children}</div>
    </div>
  );
}
