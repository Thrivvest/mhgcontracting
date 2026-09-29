"use client";

import Link from "next/link";
import Image from "next/image";
import LineReveal from "@/components/animations/LineReveal";
import FadeIn from "@/components/animations/FadeIn";
import { type BlogPost, BLOG_POSTS } from "@/lib/blog-data";
import LeadForm from "@/components/sections/LeadForm";
import SourcesList from "@/components/sections/SourcesList";
import { SOURCES } from "@/data/sources";
import { citedSources } from "@/lib/citations";

interface BlogPostContentProps {
  post: BlogPost;
}

export default function BlogPostContent({ post }: BlogPostContentProps) {
  const detected = citedSources(post.content, ...(post.faqs ?? []).map((f) => f.answer));
  const sources = [
    ...(post.sources ?? []).map((id) => SOURCES[id]),
    ...detected.filter((d) => !(post.sources ?? []).includes(d.id as keyof typeof SOURCES)),
  ];
  // Related posts rotate (standard 4.3): each post links the next three in
  // the list, wrapping around, so every post gets links from three others.
  const at = BLOG_POSTS.findIndex((p) => p.slug === post.slug);
  const related = [1, 2, 3].map((n) => BLOG_POSTS[(at + n) % BLOG_POSTS.length]);

  return (
    <main>
      {/* Hero */}
      <section className="relative pt-28 pb-10 md:py-44 px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/projects/fullreno-02.jpg" alt={post.title} fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A2E] via-[#1A1A2E]/70 to-[#1A1A2E]/50" />
        </div>
        <div className="relative z-10 max-w-[800px] mx-auto">
          <FadeIn>
            <Link href="/blog" className="inline-flex items-center gap-2 font-body text-white/60 text-sm hover:text-white/80 transition-colors mb-5 md:mb-8 block">
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
            <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1]">{post.title}</h1>
          </LineReveal>
          <FadeIn delay={0.6}>
            <time className="font-body text-white/60 text-sm mt-4 md:mt-6 block">{post.date}</time>
          </FadeIn>
        </div>
      </section>

      {/* Article body */}
      <section className="pt-10 pb-16 md:py-24 px-6 lg:px-10">
        <div className="max-w-[700px] mx-auto">
          <FadeIn>
            <div
              className="blog-content font-body text-text-secondary text-lg leading-relaxed max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </FadeIn>
        </div>
      </section>

      {/* FAQs */}
      {post.faqs && post.faqs.length > 0 && (
        <section className="pb-8 md:pb-16 px-6 lg:px-10">
          <div className="max-w-[700px] mx-auto">
            <LineReveal className="mb-10">
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary">Frequently Asked Questions</h2>
            </LineReveal>
            <div className="space-y-6">
              {post.faqs.map((faq, i) => (
                <FadeIn key={i} delay={i * 0.08}>
                  <div className="border-b border-border pb-6">
                    <h3 className="font-heading text-lg font-semibold text-text-primary mb-3">{faq.question}</h3>
                    <p
                      className="blog-content font-body text-text-secondary text-base leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: faq.answer }}
                    />
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {sources.length > 0 && (
        <section className="pb-12 px-6 lg:px-10">
          <div className="max-w-[700px] mx-auto">
            <SourcesList sources={sources} className="mt-0" />
          </div>
        </section>
      )}

      {/* Lead form */}
      <section id="estimate" className="scroll-mt-20 py-20 md:py-28 px-6 lg:px-10 bg-[#F7F6F4]">
        <div className="max-w-[720px] mx-auto">
          <FadeIn>
            <LeadForm
              source={`mhgcon.com /blog/${post.slug} embed`}
              heading="Get a Real Number for Your Project"
              subheading="Reading about costs is a start. A free in-home estimate gives you a real number for your house."
            />
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
                    <div className="aspect-[16/10] overflow-hidden relative">
                      <Image src={`/images/projects/${["kitchen-02", "bath-02", "fullreno-01"][i % 3]}.jpg`} alt={rp.title} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
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
