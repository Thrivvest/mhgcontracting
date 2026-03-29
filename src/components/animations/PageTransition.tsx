"use client";

/**
 * PageTransition — Route change animation wrapper
 *
 * Wraps page content and animates opacity on route changes.
 * On route change: fade out 200ms, then fade in 300ms.
 * Uses Next.js usePathname to detect navigation.
 *
 * Specs from mhg-rules.md:
 * - Fade out: opacity 1→0, 200ms
 * - Fade in: opacity 0→1, 300ms
 * - Detect route changes via usePathname
 */

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  gsap,
  registerGSAP,
  ANIMATION,
  EASING,
} from "@/lib/animations";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const previousPathRef = useRef(pathname);
  const [displayChildren, setDisplayChildren] = useState(children);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!wrapperRef.current) return;

    registerGSAP();

    // Only animate if the path actually changed
    if (previousPathRef.current !== pathname) {
      previousPathRef.current = pathname;

      // Update children and fade in
      setDisplayChildren(children);

      gsap.fromTo(
        wrapperRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: ANIMATION.PAGE_TRANSITION_IN,
          ease: EASING.DEFAULT,
        }
      );
    } else {
      // First mount — just show content
      setDisplayChildren(children);
    }
  }, [pathname, children]);

  return (
    <div ref={wrapperRef} className="page-transition-wrapper">
      {displayChildren}
    </div>
  );
}
