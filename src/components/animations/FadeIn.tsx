"use client";

/**
 * FadeIn - Scroll-triggered fade animation
 *
 * On desktop: uses GSAP + ScrollTrigger for precise control.
 * On mobile: uses lightweight IntersectionObserver + CSS transitions
 * to avoid the performance cost of dozens of ScrollTrigger instances.
 */

import { useEffect, useRef, useState } from "react";
import {
  gsap,
  registerGSAP,
  ANIMATION,
  EASING,
  SCROLL_TRIGGER,
} from "@/lib/animations";

interface FadeInProps {
  children: React.ReactNode;
  y?: number;
  delay?: number;
  stagger?: number;
  duration?: number;
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
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Detect mobile once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    setIsMobile(touch);
  }, []);

  // Mobile: lightweight IntersectionObserver
  useEffect(() => {
    if (!isMobile || !ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isMobile]);

  // Desktop: GSAP ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isMobile) return;
    if (!ref.current) return;

    registerGSAP();

    const el = ref.current;

    ctxRef.current = gsap.context(() => {
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
  }, [y, delay, stagger, duration, isMobile]);

  // Mobile render: CSS transition
  if (isMobile) {
    return (
      <div
        ref={ref}
        className={className}
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? "translateY(0)" : `translateY(${y}px)`,
          transition: `opacity ${duration}s ease-out ${delay}s, transform ${duration}s ease-out ${delay}s`,
          willChange: "opacity, transform",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
