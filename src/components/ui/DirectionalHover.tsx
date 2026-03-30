"use client";

/**
 * DirectionalHover — Mouse direction-aware hover overlay
 *
 * Detects which edge the mouse enters from and slides an overlay
 * in from that direction. On mouse leave, the overlay exits toward
 * the nearest edge. Creates a polished, dynamic hover interaction.
 *
 * Specs from mhg-rules.md:
 * - Detect mouse entry direction via getBoundingClientRect
 * - Overlay translates from nearest edge
 * - Easing: cubic-bezier(0.16, 1, 0.3, 1)
 * - Reverse on mouse leave
 */

import { useRef, useCallback, useEffect } from "react";
import { gsap } from "gsap";

type Direction = "top" | "bottom" | "left" | "right";

interface DirectionalHoverProps {
  children: React.ReactNode;
  /** Overlay content shown on hover */
  overlay: React.ReactNode;
  /** Additional CSS classes for the container */
  className?: string;
  /** Overlay background color */
  overlayClassName?: string;
}

/**
 * Determines which edge the mouse is closest to when entering/leaving.
 */
function getDirection(e: React.MouseEvent<HTMLElement>, el: HTMLElement): Direction {
  const { top, left, width, height } = el.getBoundingClientRect();
  const x = e.clientX - left - width / 2;
  const y = e.clientY - top - height / 2;

  // Calculate angle and determine direction
  // Using atan2 to get the angle, then mapping to 4 quadrants
  const angle = Math.atan2(y, x) * (180 / Math.PI);

  if (angle >= -45 && angle < 45) return "right";
  if (angle >= 45 && angle < 135) return "bottom";
  if (angle >= -135 && angle < -45) return "top";
  return "left";
}

/**
 * Returns GSAP from/to values based on direction
 */
function getTranslateValues(direction: Direction): { from: { x: string; y: string }; } {
  switch (direction) {
    case "top":
      return { from: { x: "0%", y: "-100%" } };
    case "bottom":
      return { from: { x: "0%", y: "100%" } };
    case "left":
      return { from: { x: "-100%", y: "0%" } };
    case "right":
      return { from: { x: "100%", y: "0%" } };
  }
}

const HOVER_EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const HOVER_DURATION = 0.4;

export default function DirectionalHover({
  children,
  overlay,
  className = "",
  overlayClassName = "bg-primary/90",
}: DirectionalHoverProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isInsideRef = useRef(false);
  const isTouchRef = useRef(false);

  useEffect(() => {
    isTouchRef.current = "ontouchstart" in window || navigator.maxTouchPoints > 0;

    if (overlayRef.current && !isTouchRef.current) {
      gsap.set(overlayRef.current, { xPercent: -100, yPercent: 0 });
    }
  }, []);

  // Use onMouseMove instead of onMouseEnter. mousemove only fires on real
  // pointer movement — scroll never triggers it, so no false positives.
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchRef.current) return; // Skip on touch devices
    if (!containerRef.current || !overlayRef.current) return;
    if (isInsideRef.current) return;

    isInsideRef.current = true;
    const direction = getDirection(e, containerRef.current);
    const { from } = getTranslateValues(direction);

    gsap.killTweensOf(overlayRef.current);
    gsap.set(overlayRef.current, {
      xPercent: parseFloat(from.x),
      yPercent: parseFloat(from.y),
    });
    gsap.to(overlayRef.current, {
      xPercent: 0,
      yPercent: 0,
      duration: HOVER_DURATION,
      ease: HOVER_EASE,
    });
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchRef.current) return;
    if (!containerRef.current || !overlayRef.current) return;

    isInsideRef.current = false;
    const direction = getDirection(e, containerRef.current);
    const { from } = getTranslateValues(direction);

    gsap.killTweensOf(overlayRef.current);
    gsap.to(overlayRef.current, {
      xPercent: parseFloat(from.x),
      yPercent: parseFloat(from.y),
      duration: HOVER_DURATION,
      ease: HOVER_EASE,
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Main content */}
      {children}

      {/* Directional overlay — hidden on touch devices */}
      <div
        ref={overlayRef}
        className={`absolute inset-0 flex items-center justify-center touch:hidden ${overlayClassName}`}
        style={{ display: isTouchRef.current ? "none" : undefined }}
      >
        {overlay}
      </div>
    </div>
  );
}
