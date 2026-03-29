"use client";

/**
 * SmoothScroll — Lenis smooth scrolling provider
 *
 * Wraps page content with buttery-smooth scrolling via Lenis.
 * Integrates with GSAP ScrollTrigger so scroll-driven animations
 * stay perfectly in sync with the custom scroll position.
 *
 * Config from mhg-rules.md:
 * - Easing: (t) => 1 - Math.pow(2, -10 * t)
 * - Duration: 1.1s
 * - Direction: vertical
 * - touchMultiplier: 1.5
 * - smoothTouch: false
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger, registerGSAP } from "@/lib/animations";

const LENIS_EASING = (t: number): number => 1 - Math.pow(2, -10 * t);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Scroll to top on every page navigation
  useEffect(() => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  useEffect(() => {
    // Guard SSR
    if (typeof window === "undefined") return;

    // Register GSAP plugins (idempotent)
    registerGSAP();

    // Create Lenis instance
    const lenis = new Lenis({
      duration: 1.1,
      easing: LENIS_EASING,
      orientation: "vertical",
      touchMultiplier: 1.5,
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // Connect Lenis scroll position to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use GSAP ticker for the Lenis RAF loop (more efficient than requestAnimationFrame)
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000); // GSAP ticker time is in seconds, Lenis expects ms
    };
    gsap.ticker.add(tickerCallback);

    // Disable Lenis's own internal RAF since GSAP is driving it
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
