import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";
import { services } from "@/lib/data";
import SeoPrerender from "@/components/seo/SeoPrerender";

export const metadata: Metadata = {
  title: {
    absolute:
      "Kitchen Renovations, Bathroom Remodels & More | MHG Contracting",
  },
  description:
    "Explore our residential contracting services: kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction in Central NJ.",
  alternates: { canonical: "https://mhgcon.com/services" },
  openGraph: {
    title: "Services | Kitchen, Bathroom, Basement & More",
    description:
      "Kitchen renovations, bathroom remodels, basement finishing, additions, and new construction in Central NJ.",
    url: "https://mhgcon.com/services",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHG Contracting Services",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "MHG Contracting Services",
  description:
    "Residential contracting services in Central NJ: kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction.",
  url: "https://mhgcon.com/services",
  numberOfItems: services.length,
  itemListElement: services.map((service, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: service.name,
    url: `https://mhgcon.com/services/${service.slug}`,
    description: service.shortDescription,
    item: {
      "@type": "Service",
      name: service.name,
      description: service.description,
      provider: {
        "@type": "LocalBusiness",
        "@id": "https://mhgcon.com/#localbusiness",
      },
      url: `https://mhgcon.com/services/${service.slug}`,
    },
  })),
};

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoPrerender>
        <h1>Home Renovation Services in Central NJ - MHG Contracting</h1>

        <h2>Kitchen Renovations</h2>
        <p>MHG Contracting delivers premium kitchen renovations throughout Central New Jersey. Our kitchen remodeling services include custom cabinetry design and installation, natural stone and quartz countertop fabrication, open-concept layout conversions, professional-grade appliance integration, custom backsplash tile work, under-cabinet and recessed lighting design, kitchen island design with seating and storage, and complete plumbing and electrical upgrades. We work with homeowners in Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, and Yardley to create kitchens that are both beautiful and built to last.</p>

        <h2>Bathroom Remodels</h2>
        <p>From powder room updates to complete master bathroom transformations, MHG Contracting handles every aspect of bathroom renovation. Our services include custom shower and tub installations, heated flooring systems, double vanity builds, frameless glass shower enclosures, custom tile design and installation, complete plumbing rough-in and finish work, ventilation and exhaust fan upgrades, and ADA-accessible bathroom modifications. Every bathroom renovation includes expert waterproofing and moisture management to protect your investment for years to come.</p>

        <h2>Basement Finishing</h2>
        <p>Transform your unfinished basement into premium living space with MHG Contracting. Our basement finishing services include home theater design and installation, wet bar and entertainment area builds, guest suite and bedroom construction with egress windows, home office and study spaces, fitness room and gym buildouts, complete HVAC extension and climate control, moisture management and waterproofing systems, and custom lighting and electrical throughout. We handle everything from framing and insulation to final finishes.</p>

        <h2>Home Additions, Full-Home Renovations &amp; New Construction</h2>
        <p>When you need more space or a complete transformation, MHG Contracting delivers. Our home addition services include family room and sunroom additions, second-story additions, and attached garage conversions. Our full-home renovation service covers structural modifications, complete system upgrades for HVAC, electrical, and plumbing, interior and exterior finishes, and whole-house design coordination. For new construction, we build custom homes from the ground up - site preparation, foundation, framing, systems, finishes, and landscaping.</p>

        <h2>Why Central NJ Homeowners Choose MHG Contracting</h2>
        <p>MHG Contracting is a family-owned residential contracting company based in Hamilton, NJ. Owner Shahzeb Malik personally oversees every project from estimate to final walkthrough. We are not a franchise or sales-driven operation - when you call MHG, you speak directly with the team that will build your renovation. We serve Princeton, Hamilton, West Windsor, Lawrenceville, Plainsboro, Yardley, and surrounding Central New Jersey communities.</p>

        <p>Call MHG Contracting at <a href="tel:+16097122474">(609) 712-2474</a> for a free estimate on any of our residential renovation services.</p>
      </SeoPrerender>
      <ServicesContent />
    </>
  );
}
