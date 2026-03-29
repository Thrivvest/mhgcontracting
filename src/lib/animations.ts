/**
 * MHG Contracting — Shared GSAP Animation Utilities
 *
 * Central module for GSAP plugin registration, ScrollTrigger helpers,
 * and animation timing constants. Import this once in your root layout
 * or SmoothScroll provider to ensure plugins are registered before use.
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

// ─── Timing Constants (from mhg-rules.md) ──────────────

export const ANIMATION = {
  /** Line reveal per-line duration */
  LINE_REVEAL_DURATION: 1.3,
  /** Stagger between each line reveal */
  LINE_REVEAL_STAGGER: 0.06,
  /** Clip-path section reveal duration */
  CLIP_REVEAL_DURATION: 1.0,
  /** Fade-in duration */
  FADE_IN_DURATION: 0.6,
  /** Page transition out (opacity 1→0) */
  PAGE_TRANSITION_OUT: 0.2,
  /** Page transition in (opacity 0→1) */
  PAGE_TRANSITION_IN: 0.3,
  /** Lenis smooth scroll duration */
  SMOOTH_SCROLL_DURATION: 1.1,
  /** Splash total experience time */
  SPLASH_DURATION: 5,
  /** When splash GSAP transition begins (seconds into video) */
  SPLASH_TRANSITION_AT: 4.5,
  /** Splash overlay fade duration */
  SPLASH_FADE_DURATION: 0.8,
} as const;

export const EASING = {
  DEFAULT: "power2.out",
  LINE_REVEAL: "power2.out",
  CLIP_REVEAL: "power2.inOut",
  FADE_IN: "power2.out",
  DIRECTIONAL_HOVER: "cubic-bezier(0.16, 1, 0.3, 1)",
} as const;

export const SCROLL_TRIGGER = {
  START: "top 85%",
  END: "bottom top",
  TOGGLE_ACTIONS: "play none none none" as const,
  SCRUB: 1,
} as const;

/** Lenis easing function — exponential decay */
export const lenisEasing = (t: number): number => 1 - Math.pow(2, -10 * t);

/** Mobile breakpoint below which ScrollSlider is disabled */
export const MOBILE_BREAKPOINT = 991;

// ─── Plugin Registration ────────────────────────────────

let pluginsRegistered = false;

/**
 * Registers all GSAP plugins exactly once.
 * Safe to call multiple times — subsequent calls are no-ops.
 * Must be called client-side only (guarded internally).
 */
export function registerGSAP(): void {
  if (pluginsRegistered) return;
  if (typeof window === "undefined") return;

  gsap.registerPlugin(ScrollTrigger, SplitText);
  pluginsRegistered = true;
}

// ─── ScrollTrigger Helpers ──────────────────────────────

interface ScrollTriggerOptions {
  trigger: Element | string;
  start?: string;
  end?: string;
  toggleActions?: string;
  scrub?: boolean | number;
  pin?: boolean | Element | string;
  snap?: number | number[] | ScrollTrigger.SnapVars;
  onEnter?: () => void;
  onLeave?: () => void;
  onLeaveBack?: () => void;
  onUpdate?: (self: ScrollTrigger) => void;
  markers?: boolean;
}

/**
 * Creates a ScrollTrigger instance with MHG default settings.
 * Merges provided options with defaults from the rules file.
 */
export function createScrollTrigger(options: ScrollTriggerOptions): ScrollTrigger {
  return ScrollTrigger.create({
    start: SCROLL_TRIGGER.START,
    toggleActions: SCROLL_TRIGGER.TOGGLE_ACTIONS,
    ...options,
  });
}

// ─── Cleanup Helpers ────────────────────────────────────

/**
 * Kills all active ScrollTrigger instances.
 * Use during route transitions or cleanup.
 */
export function killAllAnimations(): void {
  if (typeof window === "undefined") return;
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

/**
 * Refreshes all ScrollTrigger calculations.
 * Call after layout changes, image loads, or dynamic content.
 */
export function refreshScrollTrigger(): void {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh();
}

/**
 * Kills a specific GSAP context and its associated ScrollTriggers.
 * Designed for component unmount cleanup.
 */
export function cleanupContext(ctx: gsap.Context | null): void {
  if (ctx) {
    ctx.revert();
  }
}

// Re-export for convenience
export { gsap, ScrollTrigger, SplitText };
