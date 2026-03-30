"use client";

import Link from "next/link";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { type BlogPost, BLOG_POSTS } from "@/lib/blog-data";
import { company } from "@/lib/constants";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  // Get related posts (different slug)
  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <main>
      {/* JSON-LD BlogPosting Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            author: {
              "@type": "Person",
              name: "Shahzeb Malik",
              url: "https://mhgcon.com/about",
            },
            publisher: {
              "@type": "Organization",
              "@id": "https://mhgcon.com/#organization",
              name: "MHG Contracting",
            },
            url: `https://mhgcon.com/blog/${post.slug}`,
          }),
        }}
      />
      {/* Hero */}
      <section className="relative py-32 md:py-44 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/projects/fullreno-02.jpg" alt={post.title} className="w-full h-full object-cover" loading="eager" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/70 to-[#1A1A2E]/50" />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto">
          <FadeIn>
            <Link href="/blog" className="inline-flex items-center gap-2 font-body text-white/40 text-sm hover:text-white/70 transition-colors mb-8 block">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><path d="M13 8H3M7 4L3 8l4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
              Back to Blog
            </Link>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-2.5 py-1 rounded-md bg-white/10 font-body text-xs font-medium text-white/70">{post.category}</span>
              <span className="font-body text-xs text-white/40">{post.readTime}</span>
            </div>
          </FadeIn>
          <LineReveal trigger="load" delay={0.3}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">{post.title}</h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <time className="font-body text-white/40 text-sm mt-6 block">{post.date}</time>
          </FadeIn>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <div className="prose prose-lg max-w-none">
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
                {post.excerpt}
              </p>

              <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
                At MHG Contracting, we&apos;ve guided hundreds of homeowners through their renovation
                journey. Every project teaches us something new, and we believe in sharing that
                knowledge with our community. Whether you&apos;re planning your first renovation or
                your fifth, understanding the process makes all the difference.
              </p>

              <h2 className="font-heading text-2xl font-bold text-text-primary mt-10 mb-4">
                Why This Matters
              </h2>
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
                The decisions you make before your renovation begins are often more important than
                the ones you make during construction. Taking time to plan, research, and choose
                the right team will save you time, money, and stress down the road.
              </p>

              <h2 className="font-heading text-2xl font-bold text-text-primary mt-10 mb-4">
                Our Approach
              </h2>
              <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
                We start every project with an honest conversation about your goals, budget, and
                timeline. No sales pressure, no inflated promises — just straightforward guidance
                from a team that cares about doing the job right. We believe in transparency at
                every stage, from the initial estimate to the final walkthrough.
              </p>

              <p className="font-body text-text-secondary text-lg leading-relaxed mb-6">
                If you have questions about your upcoming project, we&apos;re always here to help.
                Give us a call at <a href={company.phoneHref} className="text-primary hover:text-primary-dark underline">{company.phone}</a> or{" "}
                <Link href="/contact" className="text-primary hover:text-primary-dark underline">request a free estimate</Link>.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Related Posts */}
      <section className="py-24 md:py-32 px-6 lg:px-10 bg-background-alt">
        <div className="max-w-[1400px] mx-auto">
          <LineReveal className="mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">More From Our Blog</h2>
          </LineReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((rp, i) => (
              <FadeIn key={rp.slug} delay={i * 0.1}>
                <Link href={`/blog/${rp.slug}`} className="block group">
                  <article className="bg-white rounded-lg overflow-hidden border border-border hover:shadow-md transition-shadow duration-300">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={`/images/projects/${["kitchen-02", "bath-02", "fullreno-01"][i % 3]}.jpg`} alt={rp.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                    </div>
                    <div className="p-6">
                      <time className="font-body text-xs text-text-light mb-2 block">{rp.date}</time>
                      <h3 className="font-heading text-base font-semibold text-text-primary group-hover:text-primary transition-colors leading-snug">{rp.title}</h3>
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
