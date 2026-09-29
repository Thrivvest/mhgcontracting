/**
 * MHG Contracting: Google reviews for the homepage slider.
 *
 * Built from data/gbp-reviews.json (the GBP API pull), word for word. Long
 * reviews are cut at a sentence boundary and marked with an ellipsis; nothing
 * is reworded. 2026-09-28: replaced a hand-typed list whose quotes had been
 * edited from what reviewers actually wrote.
 */
import gbp from "@/data/gbp-reviews.json";

export interface GoogleReview {
  id: string;
  name: string;
  text: string;
  /** Shown under the name: when the review was posted. */
  projectType: string;
  rating: 5;
}

const MAX = 320;

function excerpt(text: string): string {
  const flat = text.replace(/\s*\n+\s*/g, " ").trim();
  if (flat.length <= MAX) return flat;
  const cut = flat.slice(0, MAX);
  const end = Math.max(cut.lastIndexOf(". "), cut.lastIndexOf("! "));
  return (end > 120 ? cut.slice(0, end + 1) : cut.slice(0, cut.lastIndexOf(" "))) + " …";
}

export const GOOGLE_REVIEWS: GoogleReview[] = gbp.reviews
  .filter((r) => r.rating === 5 && typeof r.text === "string" && r.text.trim().length >= 60)
  .map((r) => ({
    id: r.review_id,
    name: r.author,
    text: excerpt(r.text as string),
    projectType: `Google review, ${new Date(r.time_created).getFullYear()}`,
    rating: 5 as const,
  }));
