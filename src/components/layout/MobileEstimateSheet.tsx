"use client";

/**
 * MobileEstimateSheet - a bottom sheet that slides up from the bottom of the
 * screen on mobile when the sticky "Free Estimate" bar is tapped. Keeps the
 * hero clean (no inline form on mobile) while making the estimate form one tap
 * away. Desktop uses the inline hero form instead, so this is md:hidden.
 *
 * Opened by dispatching `window.dispatchEvent(new Event(OPEN_ESTIMATE_SHEET))`,
 * which StickyMobileCTA fires. Reuses the shared LeadForm (bare) so it posts the
 * same payload to /api/contact -> GHL upsert + n8n notification.
 */

import { useEffect, useState } from "react";
import LeadForm from "@/components/sections/LeadForm";

export const OPEN_ESTIMATE_SHEET = "open-estimate-sheet";

export default function MobileEstimateSheet() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const openSheet = () => setOpen(true);
    window.addEventListener(OPEN_ESTIMATE_SHEET, openSheet);
    return () => window.removeEventListener(OPEN_ESTIMATE_SHEET, openSheet);
  }, []);

  // Close on Escape + lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <div
      className={`fixed inset-0 z-[60] md:hidden ${open ? "" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Backdrop */}
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Sheet */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Request a free estimate"
        className={`absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-2xl max-h-[92vh] overflow-y-auto transition-transform duration-300 ease-out ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        {/* Drag handle + close */}
        <div className="sticky top-0 bg-white pt-3 pb-2 px-5 flex items-center justify-between">
          <span className="mx-auto h-1.5 w-10 rounded-full bg-[#E0E0E0]" aria-hidden="true" />
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute right-4 top-2.5 w-9 h-9 flex items-center justify-center rounded-full text-text-secondary hover:bg-[#F2F2F2] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-5 pb-6">
          <LeadForm
            source="mhgcon.com mobile estimate sheet"
            heading="Get Your Free Estimate"
            subheading="Tell us about your project. We respond within 24 hours."
            theme="light"
            bare
          />
        </div>
      </div>
    </div>
  );
}
