import Breadcrumbs from "@/components/seo/Breadcrumbs";
import type { Metadata } from "next";
import ReviewsContent from "./ReviewsContent";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";
import gbpReviews from "@/data/gbp-reviews.json";

export const metadata: Metadata = buildSeoMetadata({
  path: "/reviews",
  title: "MHG Contracting Reviews | 4.9 Stars, 28 Google Reviews",
  description:
    "Read verified Google reviews of MHG Contracting from kitchen, bath, basement, and full-home renovation clients across Hamilton, Princeton, and Central NJ.",
  ogTitle: "MHG Contracting Reviews | 4.9 Stars on Google",
  ogImageAlt: "MHG Contracting Reviews",
});


const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Reviews", href: "/reviews" },
]);

export default function ReviewsPage() {
  return (
    <>
      <ReviewsContent reviews={gbpReviews.reviews} totalReviews={gbpReviews.total_reviews} starAvg={gbpReviews.star_rating_avg} />
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
