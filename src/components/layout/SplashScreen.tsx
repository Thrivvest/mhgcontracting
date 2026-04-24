"use client";

/**
 * SplashScreen - Video logo reveal overlay
 *
 * Full-screen fixed overlay that plays the MHG logo animation video.
 * After the logo is fully formed (~4.5s), GSAP transitions the overlay
 * away to reveal the homepage hero beneath. Only plays once per session.
 *
 * Specs from mhg-rules.md:
 * - Full-screen overlay with #111118 background
 * - Video: /video/splash-animation.mp4
 * - At 4.5s: overlay fades to transparent over 0.8s
 * - Content scales 1 → 1.02 (subtle zoom)
 * - sessionStorage flag: "mhg-splash-seen"
 * - Removed from DOM after transition
 */

import { useEffect, useRef, useState } from "react";
import {
  gsap,
  registerGSAP,
  ANIMATION,
} from "@/lib/animations";

const SESSION_KEY = "mhg-splash-seen";

export default function SplashScreen() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isRemoved, setIsRemoved] = useState(false);

  // Determine if splash should show (only once per session)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hasSeenSplash = sessionStorage.getItem(SESSION_KEY);
    if (!hasSeenSplash) {
      setIsVisible(true);
    } else {
      setIsRemoved(true);
    }
  }, []);

  // Run the splash + transition animation
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!isVisible) return;
    if (!overlayRef.current || !videoRef.current) return;

    registerGSAP();

    const overlay = overlayRef.current;
    const video = videoRef.current;

    // Lock scrolling during splash
    document.body.style.overflow = "hidden";

    // Play video
    video.play().catch(() => {
      // If autoplay blocked, skip splash
      finishSplash();
    });

    // Listen for timeupdate to trigger transition at 4.5s
    const handleTimeUpdate = () => {
      if (video.currentTime >= ANIMATION.SPLASH_TRANSITION_AT) {
        video.removeEventListener("timeupdate", handleTimeUpdate);
        startTransition();
      }
    };
    video.addEventListener("timeupdate", handleTimeUpdate);

    // Fallback: if video ends or fails to reach threshold, transition anyway
    const fallbackTimer = setTimeout(() => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      startTransition();
    }, (ANIMATION.SPLASH_DURATION + 1) * 1000);

    function startTransition() {
      gsap.to(overlay, {
        opacity: 0,
        scale: 1.02,
        duration: ANIMATION.SPLASH_FADE_DURATION,
        ease: "power2.inOut",
        onComplete: finishSplash,
      });
    }

    function finishSplash() {
      // Mark as seen
      sessionStorage.setItem(SESSION_KEY, "true");
      // Restore scrolling
      document.body.style.overflow = "";
      // Remove from DOM
      setIsVisible(false);
      setIsRemoved(true);
    }

    return () => {
      clearTimeout(fallbackTimer);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      document.body.style.overflow = "";
    };
  }, [isVisible]);

  // Don't render if already seen this session
  if (isRemoved) return null;

  // Don't render during SSR
  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: "#111118" }}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src="/video/splash-animation.mp4"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
        style={{ maxWidth: "600px" }}
      />
    </div>
  );
}
