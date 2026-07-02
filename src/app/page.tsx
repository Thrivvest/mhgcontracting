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
import SeoPrerender from "@/components/seo/SeoPrerender";
import { buildSeoMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = buildSeoMetadata({
  path: "/",
  title: "General Contractor Hamilton NJ | Kitchen, Bath, Basement | MHG",
  description:
    "Family-owned general contractor in Hamilton NJ. Kitchen, bath, basement, additions, and new construction across Central NJ. 4.9 stars from 28 Google reviews.",
  ogTitle: "MHG Contracting | Kitchen, Bath & Home Renovations in Hamilton NJ",
  ogDescription:
    "Family-owned residential contracting in Central NJ. Kitchen, bath, basement, additions, and new construction. Free estimates. Call (609) 712-2474.",
  ogImageAlt: "MHG Contracting, Hamilton, NJ",
});

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
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: "https://mhgcon.com/images/og-image.jpg",
  },
  speakable: {
    "@type": "SpeakableSpecification",
    cssSelector: ["h1", "h2"],
  },
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
      <SeoPrerender>
        <h1>MHG Contracting - Kitchen, Bath &amp; Home Renovations in Hamilton, NJ</h1>

        <h2>Family-Owned Residential Contracting in Central New Jersey</h2>
        <p>MHG Contracting is a family-owned and operated residential contracting company based in Hamilton, New Jersey. MHG Contracting has built a reputation for exceptional craftsmanship, transparent communication, and a personal approach to every home renovation project. We specialize in kitchen renovations, bathroom remodels, basement finishing, home additions, full-home renovations, and new construction throughout Central New Jersey and Bucks County, Pennsylvania.</p>

        <h2>Kitchen Renovations in Central NJ</h2>
        <p>Our kitchen renovations transform outdated spaces into modern, functional kitchens that become the heart of your home. From custom cabinetry and quartz countertops to open-concept layouts and professional-grade appliances, MHG Contracting handles every detail of your kitchen remodel. We serve homeowners in Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, and Yardley with kitchen renovation projects ranging from cosmetic refreshes to complete gut renovations.</p>

        <h2>Bathroom Remodels and Renovations</h2>
        <p>Transform your bathroom into a personal retreat with MHG Contracting. Our bathroom renovation services include custom tile work, walk-in showers, freestanding tubs, double vanities, heated flooring, and complete plumbing upgrades. Whether you need a powder room refresh or a full master bathroom overhaul, our experienced team delivers spa-quality results with meticulous attention to waterproofing and ventilation.</p>

        <h2>Basement Finishing and Remodeling</h2>
        <p>Unlock the full potential of your unfinished basement. MHG Contracting transforms dark, unused basement spaces into beautiful living areas including home theaters, guest suites, home offices, fitness rooms, and entertainment lounges. Our basement finishing services include proper moisture management, insulation, egress windows, custom lighting, and premium finishes that add real value to your home.</p>

        <h2>Home Additions, Full Renovations &amp; New Construction</h2>
        <p>Need more space? MHG Contracting designs and builds seamless home additions that blend with your existing architecture. We also specialize in full-home renovations covering structural changes, HVAC, electrical, and plumbing upgrades, as well as ground-up new construction for homeowners who want a custom-built home from foundation to finishing touches.</p>

        <h2>Serving Hamilton, Princeton, West Windsor &amp; Central NJ</h2>
        <p>From our base in Hamilton, New Jersey, MHG Contracting serves homeowners across Central New Jersey and Bucks County, PA. Our service area includes Princeton, West Windsor, Lawrenceville, Plainsboro, Yardley, and surrounding communities. When you call MHG, you talk to the people who will actually build your renovation.</p>

        <p>Contact MHG Contracting at <a href="tel:+16097122474">(609) 712-2474</a> for a free estimate on your kitchen renovation, bathroom remodel, basement finishing, home addition, or new construction project in Central NJ.</p>
      </SeoPrerender>
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
