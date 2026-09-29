import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { businessRef } from "@/data/business";
import type { Metadata } from "next";
import BlogContent from "./BlogContent";
import { BLOG_POSTS } from "@/lib/blog-data";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Blog", href: "/blog" },
]);

export const metadata: Metadata = buildSeoMetadata({
  path: "/blog",
  title: "Home Renovation Tips & Expert Advice | MHG Contracting Blog",
  description:
    "Tips, cost breakdowns, and project insights on kitchen, bath, basement, and full-home renovation from the MHG Contracting team in Central NJ.",
  ogTitle: "Blog | Home Renovation Tips & Insights",
  ogImageAlt: "MHG Contracting Blog",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "MHG Contracting Blog - Home Renovation Tips & Insights",
  description:
    "Expert renovation advice, project insights, and home improvement tips from the MHG Contracting team in Central NJ.",
  url: "https://mhgcon.com/blog",
  publisher: businessRef,
  blogPost: BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://mhgcon.com/blog/${post.slug}`,
    datePublished: post.date,
    articleSection: post.category,
    author: businessRef,
  })),
};

export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogContent />
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
