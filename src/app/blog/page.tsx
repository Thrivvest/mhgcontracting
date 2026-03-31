import type { Metadata } from "next";
import BlogContent from "./BlogContent";
import { BLOG_POSTS } from "@/lib/blog-data";
import SeoPrerender from "@/components/seo/SeoPrerender";

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
      <SeoPrerender>
        <h1>Home Renovation Tips &amp; Expert Advice — MHG Contracting Blog</h1>

        <h2>Kitchen Renovation Tips &amp; Design Ideas</h2>
        <p>Our blog features expert kitchen renovation advice from the MHG Contracting team. Learn about the latest kitchen design trends including open-concept layouts, custom cabinetry options, quartz vs. granite countertops, tile backsplash ideas, and professional-grade appliance selection. Whether you are planning a complete kitchen gut renovation or a cosmetic refresh in Hamilton, Princeton, or West Windsor, our kitchen remodeling articles help you make informed decisions about materials, timelines, and budgets for your Central NJ kitchen project.</p>

        <h2>Bathroom Remodel Guides &amp; Inspiration</h2>
        <p>Browse bathroom renovation guides covering walk-in shower designs, freestanding tub installations, heated flooring systems, vanity selection, tile patterns, and waterproofing best practices. MHG Contracting shares insights from real bathroom remodel projects across Central New Jersey to help homeowners in Lawrenceville, Plainsboro, Yardley, and surrounding areas plan their perfect bathroom transformation. From small powder room updates to full master bath overhauls, our blog covers every aspect of bathroom renovation.</p>

        <h2>Basement Finishing &amp; Home Addition Insights</h2>
        <p>Explore articles about basement finishing, home additions, and full-home renovation planning. Our team shares expert advice on moisture management, egress window requirements, basement layout design, home theater builds, and guest suite construction. For homeowners considering additions, we cover second-story additions, sunroom builds, and seamless architectural integration. Each article draws on MHG Contracting&apos;s hands-on experience building custom living spaces throughout Central NJ.</p>

        <h2>Home Improvement &amp; Renovation Planning</h2>
        <p>Read practical home improvement tips including renovation budgeting advice, contractor selection guidance, permit and inspection processes in New Jersey, material comparisons, and project timeline expectations. MHG Contracting&apos;s blog is a trusted resource for homeowners in Hamilton, Princeton, West Windsor, Lawrenceville, and Plainsboro who want to make smart renovation decisions. Owner Shahzeb Malik shares personal project insights and lessons learned from years of residential contracting experience.</p>

        <p>Have a renovation question? Call MHG Contracting at <a href="tel:+16097122474">(609) 712-2474</a> for a free consultation on your next home improvement project in Central NJ.</p>
      </SeoPrerender>
      <BlogContent />
    </>
  );
}
