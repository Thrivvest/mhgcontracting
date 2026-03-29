"use client";

/**
 * Header — Fixed navigation bar
 *
 * Fixed top-of-page nav with logo, nav links, location tag.
 * On scroll past 50px: adds backdrop blur and border.
 * Mobile: hides nav, shows "Menu +" trigger.
 */

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Detect scroll for backdrop effect
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // check initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        id="site-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex items-center justify-between px-6 lg:px-10 h-[72px] max-w-[1400px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="MHG Contracting Home">
            <MHGLogo scrolled={scrolled} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative font-body text-sm font-medium tracking-wide transition-colors duration-300 ${
                      isActive
                        ? scrolled ? "text-primary" : "text-white"
                        : scrolled
                        ? "text-text-secondary hover:text-primary"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {/* Active underline indicator */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
          </nav>

          {/* Right side: location + mobile trigger */}
          <div className="flex items-center gap-6">
            {/* Location tag — desktop only */}
            <span className={`hidden lg:block text-xs font-body tracking-wide transition-colors duration-300 ${
              scrolled ? "text-text-light" : "text-white/50"
            }`}>
              Hamilton, NJ
            </span>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMenuOpen(true)}
              className={`md:hidden font-body text-sm font-medium transition-colors duration-300 ${
                scrolled ? "text-text-secondary hover:text-primary" : "text-white/70 hover:text-white"
              }`}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
            >
              Menu +
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <MobileMenu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}

// ─── MHG Logo Component ─────────────────────────────────

interface MHGLogoProps {
  scrolled: boolean;
}

function MHGLogo({ scrolled }: MHGLogoProps) {
  return (
    <div className="flex items-center">
      <img
        src="/images/logo/mhg-logo.png"
        alt="MHG Contracting"
        className={`h-14 w-auto transition-all duration-300 ${
          scrolled ? "" : "brightness-0 invert"
        }`}
      />
    </div>
  );
}
