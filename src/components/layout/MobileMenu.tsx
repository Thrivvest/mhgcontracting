"use client";

/**
 * MobileMenu — Full-screen overlay navigation
 *
 * Full-screen fixed overlay with dark background, large stacked links
 * with staggered GSAP animation, social links at bottom.
 * Closes on link click, "Close ×" button, or route change.
 *
 * Specs from tasks.md Phase 2:
 * - Background #1A1A2E at 95% opacity + backdrop-blur
 * - Large stacked nav links (text-2xl to text-3xl), GSAP stagger 0.1s
 * - "Close ×" top right
 * - Social links at bottom
 * - Lock body scroll when open
 * - Open: clipPath inset from right. Close: fade out 200ms
 */

import { useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { navLinks, company } from "@/lib/constants";
import { gsap, registerGSAP } from "@/lib/animations";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Lock body scroll
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // GSAP open/close animations
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!overlayRef.current) return;

    registerGSAP();

    const overlay = overlayRef.current;
    const linkEls = linksRef.current?.querySelectorAll("[data-menu-link]");
    const social = socialRef.current;

    if (isOpen) {
      // Kill existing timeline
      if (tlRef.current) tlRef.current.kill();

      const tl = gsap.timeline();
      tlRef.current = tl;

      // Overlay: clip-path reveal from right
      tl.fromTo(
        overlay,
        { clipPath: "inset(0 0 0 100%)", visibility: "visible" },
        {
          clipPath: "inset(0 0 0 0%)",
          duration: 0.5,
          ease: "power3.inOut",
        }
      );

      // Links: staggered fade in
      if (linkEls && linkEls.length > 0) {
        tl.fromTo(
          linkEls,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.08,
            ease: "power2.out",
          },
          "-=0.2"
        );
      }

      // Social: fade in
      if (social) {
        tl.fromTo(
          social,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" },
          "-=0.15"
        );
      }
    } else {
      // Close: fade out
      if (tlRef.current) tlRef.current.kill();

      gsap.to(overlay, {
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlay, {
            visibility: "hidden",
            opacity: 1,
            clipPath: "inset(0 0 0 100%)",
          });
        },
      });
    }
  }, [isOpen]);

  // Handle escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    },
    [isOpen, onClose]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[60]"
      style={{
        backgroundColor: "rgba(26, 26, 46, 0.97)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        visibility: "hidden",
        clipPath: "inset(0 0 0 100%)",
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white/80 hover:text-white font-body text-sm font-medium transition-colors duration-200 z-10"
        aria-label="Close navigation menu"
      >
        Close ×
      </button>

      {/* Menu content */}
      <div className="flex flex-col justify-between h-full px-8 py-24">
        {/* Navigation links */}
        <nav ref={linksRef} className="flex flex-col gap-6" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              data-menu-link
              onClick={onClose}
              className="text-white text-3xl sm:text-4xl font-heading font-semibold tracking-tight hover:text-primary-light transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Bottom: contact + social */}
        <div ref={socialRef} className="space-y-6">
          {/* Contact info */}
          <div className="space-y-2">
            <a
              href={company.phoneHref}
              className="block text-white/70 text-sm font-body hover:text-white transition-colors"
            >
              {company.phone}
            </a>
            <a
              href={company.emailHref}
              className="block text-white/70 text-sm font-body hover:text-white transition-colors"
            >
              {company.email}
            </a>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6">
            <a
              href={company.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 text-sm font-body hover:text-white transition-colors"
            >
              Instagram
            </a>
            <a
              href={company.social.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 text-sm font-body hover:text-white transition-colors"
            >
              Facebook
            </a>
            <a
              href={company.social.houzz}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/50 text-sm font-body hover:text-white transition-colors"
            >
              Houzz
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
