import type { Metadata } from "next";
import ReviewsContent from "./ReviewsContent";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { buildBreadcrumbSchema } from "@/lib/seo-utils";
import gbpReviews from "@/data/gbp-reviews.json";

export const metadata: Metadata = {
  title: {
    absolute: "MHG Contracting Reviews | 4.9★ from 28 Verified Google Reviews",
  },
  description:
    "Read real Google reviews of MHG Contracting from kitchen, bathroom, basement, and home renovation clients across Hamilton, Princeton, West Windsor, Lawrenceville, and Central NJ. 4.9-star average.",
  alternates: { canonical: "https://mhgcon.com/reviews" },
  openGraph: {
    title: "MHG Contracting Reviews | 4.9★ on Google",
    description:
      "Real verified reviews from kitchen, bathroom, basement, and home renovation clients across Central NJ.",
    url: "https://mhgcon.com/reviews",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHG Contracting Reviews",
      },
    ],
  },
};

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
        <h1>MHG Contracting Reviews - 4.9 Stars from {gbpReviews.total_reviews} Verified Google Reviews</h1>
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
