import type { Metadata } from "next";
import BlogContent from "./BlogContent";

export const metadata: Metadata = {
  title: "Blog | Home Renovation Tips & Insights — MHG Contracting",
  description:
    "Read expert tips, renovation advice, and project insights from MHG Contracting. Learn about kitchen renovations, bathroom remodels, and home improvement in Central NJ.",
  alternates: { canonical: "https://mhgcon.com/blog" },
  openGraph: {
    title: "Blog | Home Renovation Tips & Insights",
    description: "Expert tips, renovation advice, and project insights from the MHG Contracting team.",
    url: "https://mhgcon.com/blog",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "MHG Contracting Blog" }],
  },
};

export default function BlogPage() {
  return <BlogContent />;
}
