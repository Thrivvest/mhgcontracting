import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";
import { portfolioProjects } from "@/lib/data";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Portfolio", href: "/portfolio" },
]);

export const metadata: Metadata = buildSeoMetadata({
  path: "/portfolio",
  title: "Renovation Portfolio | MHG Contracting Central NJ",
  description:
    "Recent kitchen, bath, basement, addition, full-home renovation, and new construction projects by MHG Contracting across Hamilton, Princeton, and Central NJ.",
  ogTitle: "Portfolio | Our Work - MHG Contracting",
  ogImageAlt: "MHG Contracting Portfolio",
});

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MHG Contracting Portfolio",
  description:
    "Completed renovation projects by MHG Contracting across Central NJ - kitchens, bathrooms, basements, full home renovations, and additions.",
  url: "https://mhgcon.com/portfolio",
  numberOfItems: portfolioProjects.length,
  itemListElement: portfolioProjects.map((project, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: project.title,
    url: `https://mhgcon.com/portfolio/${project.slug}`,
    description: project.shortDescription,
    item: {
      "@type": "CreativeWork",
      name: project.title,
      description: project.description,
      url: `https://mhgcon.com/portfolio/${project.slug}`,
      locationCreated: {
        "@type": "Place",
        name: project.location,
      },
      creator: {
        "@type": "LocalBusiness",
        "@id": "https://mhgcon.com/#localbusiness",
      },
    },
  })),
};

export default function PortfolioPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SeoPrerender>
        <h2>Renovation Portfolio - Kitchen, Bath &amp; Basement Projects | MHG Contracting</h2>

        <h2>Kitchen Renovation Projects in Central NJ</h2>
        <p>Browse completed kitchen renovation projects by MHG Contracting throughout Central New Jersey. Our kitchen remodeling portfolio showcases custom cabinetry installations, quartz and granite countertop fabrication, open-concept layout conversions, professional-grade appliance integration, custom tile backsplashes, and complete kitchen gut renovations. From modern farmhouse kitchens in Princeton to sleek contemporary designs in West Windsor, every project reflects our commitment to quality craftsmanship and attention to detail. Each kitchen renovation is personally overseen by owner Shahzeb Malik from design consultation through final walkthrough.</p>

        <h2>Bathroom Remodel Portfolio</h2>
        <p>Explore our bathroom renovation portfolio featuring master bath transformations, guest bathroom remodels, and powder room upgrades across Hamilton, Lawrenceville, Plainsboro, and Yardley. Our completed bathroom projects include walk-in shower installations with frameless glass enclosures, freestanding soaking tubs, double vanity builds, heated flooring systems, custom mosaic and porcelain tile work, and ADA-accessible bathroom modifications. MHG Contracting specializes in expert waterproofing and moisture management to ensure every bathroom renovation stands the test of time.</p>

        <h2>Basement Finishing Projects</h2>
        <p>View our portfolio of finished basement projects that transform dark, unused spaces into premium living areas. Our basement finishing portfolio includes home theater builds, wet bar and entertainment area installations, guest suite construction with egress windows, home office buildouts, and fitness room conversions. Each basement project includes proper moisture management, insulation, custom lighting design, and premium finishes. MHG Contracting serves homeowners in Hamilton, Princeton, West Windsor, Lawrenceville, and surrounding Central NJ communities with expert basement remodeling.</p>

        <h2>Home Additions &amp; Full-Home Renovations</h2>
        <p>Our portfolio features seamless home additions and complete whole-house renovations throughout Central New Jersey and Bucks County, PA. Featured projects include family room additions, second-story additions, sunroom builds, and full-home gut renovations covering structural modifications, HVAC upgrades, electrical rewiring, plumbing overhauls, and interior design finishes. MHG Contracting handles every phase from architectural planning through construction to final inspection.</p>

        <h2>Why Homeowners Trust MHG Contracting</h2>
        <p>Every project in our renovation portfolio represents a homeowner who trusted MHG Contracting to transform their home. As a family-owned residential contracting company based in Hamilton, New Jersey, we bring a personal approach to every renovation. Owner Shahzeb Malik is on-site throughout the build - you always know who is working on your home. Our portfolio spans Princeton, Hamilton, West Windsor, Lawrenceville, Plainsboro, Yardley, and surrounding Central NJ communities.</p>

        <p>Ready to start your renovation? Call MHG Contracting at <a href="tel:+16097122474">(609) 712-2474</a> for a free estimate and see how your home could be our next featured project.</p>
      </SeoPrerender>
      <PortfolioContent />
    </>
  );
}
