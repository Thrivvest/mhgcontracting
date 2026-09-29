"use client";

/**
 * StickyMobileCTA - fixed two-button bar (Call / Free Estimate) on mobile.
 * Hidden on desktop and on /contact (the form is already there). It stays
 * hidden until the visitor scrolls past the first call button in the page, so
 * it never doubles up with the hero buttons (Kubat pattern, 2026-09-26);
 * pages with no call button in <main> show it from the start.
 * tel: clicks are picked up by EventTracker as phone_call_click.
 */

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { company } from "@/lib/constants";
import { OPEN_ESTIMATE_SHEET } from "@/components/layout/MobileEstimateSheet";

export default function StickyMobileCTA() {
  const pathname = usePathname();
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Measured once per page: the homepage hero is position:fixed, so a live
    // getBoundingClientRect() on its call button would never scroll away.
    let threshold = 0;
    const measure = () => {
      const cta = document.querySelector<HTMLElement>('main a[href^="tel:"]');
      const bottom = cta ? cta.getBoundingClientRect().bottom + window.scrollY : 0;
      // Only wait when the call button is in the hero (first screen); a call
      // link far down the page should not keep the bar hidden until then.
      threshold = bottom <= window.innerHeight * 1.2 ? bottom : 0;
      check();
    };
    const check = () => setShow(threshold === 0 || window.scrollY > threshold);
    const t = window.setTimeout(measure, 60);
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", measure);
    };
  }, [pathname]);

  if (pathname === "/contact") return null;

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 transition-transform duration-300 md:hidden ${show ? "translate-y-0" : "translate-y-full"}`}
      aria-hidden={!show}
      style={{ paddingBottom: "env(safe-area-inset-bottom)", backgroundColor: "#1A1A2E" }}
    >
      <a
        href={company.phoneHref}
        className="flex items-center justify-center gap-2 py-4 font-body font-semibold text-sm text-white bg-[#1A1A2E] active:bg-black transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
        </svg>
        Call Now
      </a>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event(OPEN_ESTIMATE_SHEET))}
        className="flex items-center justify-center gap-2 py-4 font-body font-semibold text-sm text-white bg-primary active:bg-primary-dark transition-colors"
      >
        Free Estimate
      </button>
    </div>
  );
}
