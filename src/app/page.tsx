import { pageNode } from "@/lib/schema";
import type { Metadata } from "next";
import Hero from "@/components/sections/Hero";
import PortfolioSlider from "@/components/sections/PortfolioSlider";
import FeaturedProjects from "@/components/sections/FeaturedProjects";
import AboutTeaser from "@/components/sections/AboutTeaser";
import ServicesGrid from "@/components/sections/ServicesGrid";
import CTABanner from "@/components/sections/CTABanner";
import ReviewsSlider from "@/components/sections/ReviewsSlider";
import ServiceArea from "@/components/sections/ServiceArea";
import BlogPreview from "@/components/sections/BlogPreview";
import { buildSeoMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = buildSeoMetadata({
  path: "/",
  title: "General Contractor Hamilton NJ | Kitchen, Bath, Basement",
  description:
    "Family-owned general contractor in Hamilton, NJ: kitchens, baths, basements, additions and new homes across Central NJ. 4.9 stars, 28 Google reviews.",
  ogTitle: "MHG Contracting | Kitchen, Bath & Home Renovations in Hamilton NJ",
  ogDescription:
    "Family-owned residential contracting in Central NJ. Kitchen, bath, basement, additions, and new construction. Free estimates. Call (609) 712-2474.",
  ogImageAlt: "MHG Contracting, Hamilton, NJ",
});


const webPageJsonLd = pageNode("WebPage", {
  name: "MHG Contracting | Kitchen, Bath & Home Renovations in Hamilton, NJ",
  path: "",
  description:
    "Family-owned residential contracting in Hamilton, NJ. Kitchen renovations, bathroom remodels, basement finishing, additions, and new construction.",
});

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <main>
        <Hero />
        <PortfolioSlider />
        <FeaturedProjects />
        <AboutTeaser />
        <ServicesGrid />
        <CTABanner />
        <ReviewsSlider />
        <ServiceArea />
        <BlogPreview />
      </main>
    </>
  );
}
