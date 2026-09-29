"use client";

/**
 * Call + Free Estimate buttons for page heroes, so the first screen on a phone
 * always has a way to convert. "Free Estimate" opens the slide-up estimate
 * sheet on phones and jumps to the page's #estimate form on larger screens
 * (and without JavaScript).
 */

import { business } from "@/data/business";
import { OPEN_ESTIMATE_SHEET } from "@/components/layout/MobileEstimateSheet";

export default function HeroActions() {
  return (
    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
      <a
        href={business.phoneHref}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-7 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-primary-light"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
        Call {business.phone}
      </a>
      <a
        href="#estimate"
        onClick={(e) => {
          if (window.matchMedia("(max-width: 767px)").matches) {
            e.preventDefault();
            window.dispatchEvent(new Event(OPEN_ESTIMATE_SHEET));
          }
        }}
        className="inline-flex items-center justify-center rounded-md border-2 border-white px-7 py-4 font-body text-base font-semibold text-white transition-colors hover:bg-white hover:text-primary"
      >
        Get a free estimate
      </a>
    </div>
  );
}
