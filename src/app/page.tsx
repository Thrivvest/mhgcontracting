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

export const metadata: Metadata = {
  title: {
    absolute:
      "MHG Contracting | Kitchen, Bath & Home Renovations in Hamilton, NJ",
  },
  description:
    "MHG Contracting is a family-owned residential contracting company serving Hamilton, Princeton, West Windsor, and Central NJ. Specializing in kitchen renovations, bathroom remodels, basement finishing, home additions, and new construction.",
  alternates: { canonical: "https://mhgcon.com" },
  openGraph: {
    title: "MHG Contracting | Kitchen, Bath & Home Renovations in Hamilton, NJ",
    description:
      "Family-owned residential contracting in Central NJ. Kitchen renovations, bathroom remodels, basement finishing, additions, and new construction. Free estimates.",
    url: "https://mhgcon.com",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHG Contracting — Hamilton, NJ",
      },
    ],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://mhgcon.com/#website",
  name: "MHG Contracting",
  url: "https://mhgcon.com",
  description:
    "Family-owned residential contracting in Hamilton, NJ. Kitchen renovations, bathroom remodels, basement finishing, additions, and new construction.",
  publisher: {
    "@type": "LocalBusiness",
    "@id": "https://mhgcon.com/#localbusiness",
  },
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://mhgcon.com/#webpage",
  url: "https://mhgcon.com",
  name: "MHG Contracting | Kitchen, Bath & Home Renovations in Hamilton, NJ",
  description:
    "Family-owned residential contracting in Central NJ. Kitchen renovations, bathroom remodels, basement finishing, additions, and new construction.",
  isPartOf: { "@id": "https://mhgcon.com/#website" },
  about: { "@id": "https://mhgcon.com/#localbusiness" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://mhgcon.com",
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
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
