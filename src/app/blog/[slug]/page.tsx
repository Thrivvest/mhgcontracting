import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostContent from "./BlogPostContent";
import { BLOG_POSTS } from "@/lib/blog-data";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { generateBlogSeoContent } from "@/lib/seo-content-generator";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };

    const description = (post.metaDescription || post.excerpt).slice(0, 160);
    return buildSeoMetadata({
      path: `/blog/${slug}`,
      title: `${post.title} | MHG Contracting`,
      description,
      ogTitle: post.title,
      ogDescription: description,
      ogType: "article",
      ogImageAlt: post.title,
    });
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "Blog", href: "/blog" },
    { name: post.title, href: `/blog/${slug}` },
  ]);

  const wordCount = (post.content.match(/\w+/g) || []).length;
  const isoDate = (() => {
    const d = new Date(post.date);
    return isNaN(d.getTime()) ? undefined : d.toISOString();
  })();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `https://mhgcon.com/blog/${slug}#article`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://mhgcon.com/blog/${slug}`,
    },
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    articleSection: post.category,
    keywords: post.category,
    wordCount,
    datePublished: isoDate,
    dateModified: isoDate,
    image: {
      "@type": "ImageObject",
      url: "https://mhgcon.com/images/og-image.jpg",
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Person",
      "@id": "https://mhgcon.com/#founder",
      name: "Shahzeb Malik",
      url: "https://mhgcon.com/about",
    },
    publisher: { "@id": "https://mhgcon.com/#organization" },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const seoHtml = generateBlogSeoContent(post);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <SeoPrerender>
        <div dangerouslySetInnerHTML={{ __html: seoHtml }} />
      </SeoPrerender>
      <BlogPostContent post={post} />
    </>
  );
}
