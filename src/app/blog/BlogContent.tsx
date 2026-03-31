"use client";

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { BLOG_POSTS } from "@/lib/blog-data";
import type { BlogPost } from "@/lib/blog-data";


const BLOG_IMAGES: Record<string, string> = {
  Kitchen: "/images/projects/kitchen-01.jpg",
  Bathroom: "/images/projects/bath-01.jpg",
  Basement: "/images/projects/basement-01.jpg",
  Tips: "/images/projects/fullreno-01.jpg",
  About: "/images/projects/fullreno-02.jpg",
};

export default function BlogContent() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/services/kitchen-hero.jpg" alt="MHG Blog" className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 max-w-[1400px] mx-auto">
          <FadeIn><span className="font-body text-xs font-medium text-white/40 uppercase tracking-[0.15em] mb-4 block">Blog</span></FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05]">Home Renovation Tips &amp; Expert Advice</h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <p className="font-body text-white/50 text-xl mt-6 max-w-xl leading-relaxed">Kitchen renovation guides, bathroom remodel timelines, basement finishing tips, and home improvement advice from the MHG Contracting team in Central NJ.</p>
          </FadeIn>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, index) => (
              <FadeIn key={post.slug} delay={Math.min(index * 0.08, 0.4)}>
                <Link href={`/blog/${post.slug}`} className="block group h-full">
                  <article className="bg-white rounded-lg overflow-hidden border border-border h-full flex flex-col hover:shadow-md transition-shadow duration-300">
                    {/* Image placeholder */}
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={BLOG_IMAGES[post.category] || "/images/projects/kitchen-01.jpg"} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-2.5 py-1 rounded-md bg-primary/5 font-body text-xs font-medium text-primary">{post.category}</span>
                        <span className="font-body text-xs text-text-light">{post.readTime}</span>
                      </div>
                      <time className="font-body text-xs text-text-light mb-3 block">{post.date}</time>
                      <h2 className="font-heading text-lg font-semibold text-text-primary mb-3 leading-snug group-hover:text-primary transition-colors duration-200">{post.title}</h2>
                      <p className="font-body text-text-secondary text-sm leading-relaxed mb-4 flex-1 line-clamp-3">{post.excerpt}</p>
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
        </div>
      </section>
    </main>
  );
}
