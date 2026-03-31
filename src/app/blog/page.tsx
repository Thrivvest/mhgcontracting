import type { Metadata } from "next";
import BlogContent from "./BlogContent";
import { BLOG_POSTS } from "@/lib/blog-data";

export const metadata: Metadata = {
  title: {
    absolute: "Home Renovation Tips & Expert Advice | MHG Contracting Blog",
  },
  description:
    "Read expert tips, renovation advice, and project insights from MHG Contracting. Learn about kitchen renovations, bathroom remodels, and home improvement in Central NJ.",
  alternates: { canonical: "https://mhgcon.com/blog" },
  openGraph: {
    title: "Blog | Home Renovation Tips & Insights",
    description:
      "Expert tips, renovation advice, and project insights from the MHG Contracting team.",
    url: "https://mhgcon.com/blog",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHG Contracting Blog",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "MHG Contracting Blog — Home Renovation Tips & Insights",
  description:
    "Expert renovation advice, project insights, and home improvement tips from the MHG Contracting team in Central NJ.",
  url: "https://mhgcon.com/blog",
  publisher: {
    "@type": "LocalBusiness",
    "@id": "https://mhgcon.com/#localbusiness",
    name: "MHG Contracting",
  },
  blogPost: BLOG_POSTS.map((post) => ({
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    url: `https://mhgcon.com/blog/${post.slug}`,
    datePublished: post.date,
    articleSection: post.category,
    author: {
      "@type": "Organization",
      name: "MHG Contracting",
    },
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
    </>
  );
}
