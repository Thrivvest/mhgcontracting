"use client";

/**
 * BlogPreview — Homepage blog teaser
 *
 * "From Our Blog" heading + 3 placeholder article cards.
 * Each: title, date, excerpt, "Read More →" link.
 * "View All Posts →" link at bottom. FadeIn throughout.
 */

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";

const BLOG_POSTS = [
  {
    slug: "5-things-to-consider-before-kitchen-renovation",
    title: "5 Things to Consider Before Your Kitchen Renovation",
    date: "March 15, 2026",
    excerpt:
      "Planning a kitchen renovation? Before you start picking countertops, here are the five most important decisions that will shape your entire project.",
    image: "/images/projects/kitchen-01.jpg",
  },
  {
    slug: "how-long-does-bathroom-remodel-take",
    title: "How Long Does a Bathroom Remodel Take?",
    date: "March 8, 2026",
    excerpt:
      "One of the most common questions we get. The answer depends on scope, materials, and complexity. Here's a realistic timeline breakdown.",
    image: "/images/projects/bath-01.jpg",
  },
  {
    slug: "choosing-the-right-contractor",
    title: "Choosing the Right Contractor: What to Look For",
    date: "February 28, 2026",
    excerpt:
      "Not all contractors are created equal. Learn what separates a great contractor from the rest and the red flags to watch out for.",
    image: "/images/projects/fullreno-01.jpg",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog-preview" className="py-14 md:py-32 px-6 lg:px-10 bg-background-alt">
      <div className="max-w-[1400px] mx-auto">
        {/* Section header */}
        <div className="mb-14 md:mb-20">
          <FadeIn>
            <span className="font-body text-xs font-medium text-primary uppercase tracking-[0.15em] mb-4 block">
              Insights
            </span>
          </FadeIn>
          <LineReveal className="mb-4">
            <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-[1.1]">
              From Our Blog
            </h2>
          </LineReveal>
        </div>

        {/* Blog cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.1}>
              <Link
                href={`/blog/${post.slug}`}
                className="block group h-full"
              >
                <article className="bg-white rounded-lg overflow-hidden border border-border h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                  {/* Featured image */}
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <time className="font-body text-xs text-text-light mb-3 block">
                      {post.date}
                    </time>
                    <h3 className="font-heading text-lg font-semibold text-text-primary mb-3 leading-snug group-hover:text-primary transition-colors duration-200">
                      {post.title}
                    </h3>
                    <p className="font-body text-text-secondary text-sm leading-relaxed mb-4 flex-1 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <span className="inline-flex items-center gap-1.5 font-body text-sm font-medium text-primary group-hover:gap-2.5 transition-all duration-200">
                      Read More
                      <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                        <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </article>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* View all */}
        <FadeIn delay={0.4}>
          <div className="mt-12 text-center">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-body text-sm font-medium text-primary hover:text-primary-dark transition-colors duration-200 group"
            >
              View All Posts
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="transform group-hover:translate-x-1 transition-transform duration-200"
              >
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

