import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogPostContent from "./BlogPostContent";
import { BLOG_POSTS } from "@/lib/blog-data";

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = BLOG_POSTS.find((p) => p.slug === slug);
    if (!post) return { title: "Post Not Found" };

    return {
      title: `${post.title} | MHG Contracting Blog`,
      description: post.excerpt,
      alternates: { canonical: `https://mhgcon.com/blog/${slug}` },
      openGraph: {
        title: post.title,
        description: post.excerpt,
        url: `https://mhgcon.com/blog/${slug}`,
        type: "article",
        images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: post.title }],
      },
    };
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  if (!post) notFound();
  return <BlogPostContent post={post} />;
}
