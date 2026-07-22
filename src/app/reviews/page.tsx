import type { Metadata } from "next";
import ReviewsContent from "./ReviewsContent";
import SeoPrerender from "@/components/seo/SeoPrerender";
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

const reviewListJsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: gbpReviews.reviews.map((r, i) => ({
    "@type": "ListItem",
    position: i + 1,
    item: {
      "@type": "Review",
      "@id": `https://mhgcon.com/reviews#${r.review_id}`,
      itemReviewed: { "@id": "https://mhgcon.com/#localbusiness" },
      reviewRating: {
        "@type": "Rating",
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      author: { "@type": "Person", name: r.author },
      datePublished: r.time_created,
      reviewBody: r.text,
      publisher: { "@type": "Organization", name: "Google" },
    },
  })),
};

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Reviews", href: "/reviews" },
]);

export default function ReviewsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewListJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SeoPrerender>
        <h2>MHG Contracting Reviews - 4.9 Stars from {gbpReviews.total_reviews} Verified Google Reviews</h2>
        <p>
          Real verified Google reviews of MHG Contracting from homeowners across Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, Robbinsville, Pennington, Hopewell, Ewing, East Windsor, and Yardley PA. Projects include kitchen renovations, bathroom remodels, basement finishing, home additions, full home renovations, and new construction.
        </p>
        {gbpReviews.reviews.map((r) => (
          <article key={r.review_id}>
            <h2>{r.rating}-star review from {r.author}</h2>
            <p>{r.text}</p>
          </article>
        ))}
      </SeoPrerender>
      <ReviewsContent reviews={gbpReviews.reviews} totalReviews={gbpReviews.total_reviews} starAvg={gbpReviews.star_rating_avg} />
    </>
  );
}
