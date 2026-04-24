"use client";

/**
 * Header - Fixed navigation bar
 *
 * Fixed top-of-page nav with logo, nav links, location tag.
 * On scroll past 50px: adds backdrop blur and border.
 * Supports dropdown menus for links with children.
 * Mobile: hides nav, shows "Menu +" trigger.
 */

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, type NavLink } from "@/lib/constants";
import MobileMenu from "./MobileMenu";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  // Detect scroll for backdrop effect
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Dropdown hover handlers with delay to prevent flicker
  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const isLinkActive = (link: NavLink): boolean => {
    if (pathname === link.href) return true;
    if (pathname.startsWith(link.href + "/")) return true;
    if (link.children) {
      return link.children.some(
        (child) =>
          pathname === child.href || pathname.startsWith(child.href + "/")
      );
    }
    return false;
  };

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
                const isActive = isLinkActive(link);
                const hasChildren = link.children && link.children.length > 0;

                if (hasChildren) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => handleDropdownEnter(link.label)}
                      onMouseLeave={handleDropdownLeave}
                    >
                      <Link
                        href={link.href}
                        className={`relative font-body text-sm font-medium tracking-wide transition-colors duration-300 inline-flex items-center gap-1 ${
                          isActive
                            ? scrolled ? "text-primary" : "text-white"
                            : scrolled
                            ? "text-text-secondary hover:text-primary"
                            : "text-white/70 hover:text-white"
                        }`}
                      >
                        {link.label}
                        {/* Chevron */}
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          className={`transition-transform duration-200 ${
                            openDropdown === link.label ? "rotate-180" : ""
                          }`}
                        >
                          <path
                            d="M2 3.5L5 6.5L8 3.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {isActive && (
                          <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full" />
                        )}
                      </Link>

                      {/* Dropdown */}
                      <div
                        className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 transition-all duration-200 ${
                          openDropdown === link.label
                            ? "opacity-100 visible translate-y-0"
                            : "opacity-0 invisible -translate-y-1"
                        }`}
                      >
                        <div
                          className={`min-w-[180px] rounded-lg py-2 shadow-lg border ${
                            scrolled
                              ? "bg-white border-border"
                              : "bg-[#1A1A2E]/95 backdrop-blur-md border-white/10"
                          }`}
                        >
                          {link.children!.map((child) => {
                            const isChildActive =
                              pathname === child.href ||
                              pathname.startsWith(child.href + "/");
                            return (
                              <Link
                                key={child.href}
                                href={child.href}
                                className={`block px-4 py-2.5 text-sm font-body font-medium transition-colors duration-200 ${
                                  isChildActive
                                    ? scrolled
                                      ? "text-primary bg-primary/5"
                                      : "text-white bg-white/10"
                                    : scrolled
                                    ? "text-text-secondary hover:text-primary hover:bg-gray-50"
                                    : "text-white/70 hover:text-white hover:bg-white/5"
                                }`}
                              >
                                {child.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                }

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
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] bg-primary rounded-full" />
                    )}
                  </Link>
                );
              })}
          </nav>

          {/* Right side: location + mobile trigger */}
          <div className="flex items-center gap-6">
            {/* Call button - desktop only */}
            <a
              href="tel:+16097122474"
              className={`hidden lg:inline-flex items-center gap-2 font-body text-sm font-semibold px-4 py-2 rounded-md border transition-all duration-300 ${
                scrolled
                  ? "border-primary text-primary hover:bg-primary hover:text-white"
                  : "border-white/60 text-white hover:border-white hover:bg-white/10"
              }`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.95-.95a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              (609) 712-2474
            </a>

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
        src="/images/logo/mhg-logo-web.png"
        alt="MHG Contracting"
        width={140}
        height={56}
        className={`h-10 sm:h-14 w-auto transition-all duration-300 ${
          scrolled ? "" : "brightness-0 invert"
        }`}
      />
    </div>
  );
}
