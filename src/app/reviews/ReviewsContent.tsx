"use client";

import Link from "next/link";
import Image from "next/image";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { company } from "@/lib/constants";

interface Review {
  review_id: string;
  rating: number;
  author: string;
  text: string | null;
  time_created: string;
}

interface Props {
  reviews: Review[];
  totalReviews: number;
  starAvg: number;
}

function StarRow({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={i < rating ? "#F4B400" : "none"}
          stroke={i < rating ? "#F4B400" : "currentColor"}
          strokeWidth="1.5"
          className={i < rating ? "" : "text-text-secondary/40"}
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" strokeLinejoin="round" />
        </svg>
      ))}
    </div>
  );
}

function timeAgo(iso: string): string {
  const now = new Date();
  const then = new Date(iso);
  const months = (now.getFullYear() - then.getFullYear()) * 12 + (now.getMonth() - then.getMonth());
  if (months < 1) return "this month";
  if (months < 12) return `${months} month${months === 1 ? "" : "s"} ago`;
  const years = Math.floor(months / 12);
  return `${years} year${years === 1 ? "" : "s"} ago`;
}

export default function ReviewsContent({ reviews, totalReviews, starAvg }: Props) {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[70vh] flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/projects/gallery/kitchen-01/2.jpg"
            alt="MHG Contracting Reviews"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/55" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn>
            <span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">
              Reviews
            </span>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] max-w-4xl">
              {starAvg} stars from {totalReviews} homeowners.
            </h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/60 text-xl mt-6 max-w-xl leading-relaxed">
              Real Google reviews from clients across Hamilton, Princeton, West Windsor, Lawrenceville, and Central NJ.
            </p>
          </FadeIn>
          <FadeIn delay={0.8}>
            <div className="flex flex-wrap gap-3 mt-8">
              <a
                href={company.phoneHref}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-body text-sm font-medium rounded-full hover:bg-white/90 transition-colors"
              >
                Call {company.phone}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white font-body text-sm font-medium rounded-full hover:bg-white/10 transition-colors"
              >
                Request a free estimate
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Summary band */}
      <section className="border-y border-border bg-white/[0.02]">
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 py-10 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="font-heading text-4xl font-bold text-text-primary">{starAvg}</div>
            <div className="font-body text-sm text-text-secondary mt-1">Average rating</div>
          </div>
          <div>
            <div className="font-heading text-4xl font-bold text-text-primary">{totalReviews}</div>
            <div className="font-body text-sm text-text-secondary mt-1">Total reviews</div>
          </div>
          <div>
            <div className="font-heading text-4xl font-bold text-text-primary">100%</div>
            <div className="font-body text-sm text-text-secondary mt-1">Verified Google</div>
          </div>
          <div>
            <div className="font-heading text-4xl font-bold text-text-primary">5+</div>
            <div className="font-body text-sm text-text-secondary mt-1">Years in business</div>
          </div>
        </div>
      </section>

      {/* Reviews grid */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[1200px] mx-auto">
          <LineReveal className="mb-10">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-[1.1]">
              What clients say
            </h2>
          </LineReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((r) => (
              <FadeIn key={r.review_id}>
                <article className="border border-border rounded-2xl p-6 md:p-8 h-full flex flex-col bg-white/[0.01]">
                  <div className="flex items-center justify-between mb-4">
                    <StarRow rating={r.rating} />
                    <span className="font-body text-xs text-text-secondary">{timeAgo(r.time_created)}</span>
                  </div>
                  <p className="font-body text-text-primary text-base leading-relaxed flex-1 whitespace-pre-line">
                    {r.text}
                  </p>
                  <div className="mt-6 pt-4 border-t border-border">
                    <div className="font-body text-sm font-semibold text-text-primary">{r.author}</div>
                    <div className="font-body text-xs text-text-secondary mt-0.5">Verified Google Review</div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Leave a review CTA */}
      <section className="border-t border-border py-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[800px] mx-auto text-center">
          <LineReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary leading-[1.1]">
              Worked with us? Leave a review.
            </h2>
          </LineReveal>
          <FadeIn>
            <p className="font-body text-text-secondary text-lg mt-4 leading-relaxed">
              Honest feedback is how we keep getting better and how new homeowners find us. Takes about a minute.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <a
              href="https://www.google.com/search?q=mhg+contracting+hamilton+nj"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-body text-sm font-medium rounded-full hover:bg-primary/90 transition-colors mt-8"
            >
              Write a Google review
            </a>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
