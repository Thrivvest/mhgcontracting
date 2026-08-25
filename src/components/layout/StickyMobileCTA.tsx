"use client";

/**
 * StickyMobileCTA - fixed two-button bar (Call / Free Estimate) on mobile.
 * Hidden on desktop and on /contact (the form is already there).
 * tel: clicks are picked up by EventTracker as phone_call_click.
 */

import { usePathname } from "next/navigation";
import { company } from "@/lib/constants";
import { OPEN_ESTIMATE_SHEET } from "@/components/layout/MobileEstimateSheet";

export default function StickyMobileCTA() {
  const pathname = usePathname();
  if (pathname === "/contact") return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-2 md:hidden"
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
