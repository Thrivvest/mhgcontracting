import type { Metadata } from "next";
import ProcessContent from "./ProcessContent";
import { processSteps } from "@/lib/data";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { buildBreadcrumbSchema } from "@/lib/seo-utils";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Process", href: "/process" },
]);

export const metadata: Metadata = {
  title: {
    absolute: "Our Renovation Process | MHG Contracting NJ",
  },
  description:
    "From free consultation to project completion, learn how MHG Contracting guides you through every step of your renovation. Clear communication, quality craftsmanship, no surprises.",
  alternates: { canonical: "https://mhgcon.com/process" },
  openGraph: {
    title: "Our Process | How MHG Contracting Works",
    description:
      "From consultation to project completion: clear communication, quality craftsmanship, no surprises.",
    url: "https://mhgcon.com/process",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHG Contracting Process",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How MHG Contracting Works: Our Renovation Process",
  description:
    "From free consultation to project completion, MHG Contracting guides you through every step of your home renovation with clear communication and quality craftsmanship.",
  url: "https://mhgcon.com/process",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    description: "Varies by project scope - free estimate available",
  },
  performer: {
    "@type": "LocalBusiness",
    "@id": "https://mhgcon.com/#localbusiness",
    name: "MHG Contracting",
  },
  step: processSteps.map((step, i) => ({
    "@type": "HowToStep",
    position: i + 1,
    name: step.title,
    text: step.description,
    url: `https://mhgcon.com/process#step-${i + 1}`,
  })),
};

export default function ProcessPage() {
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
        <h1>Our Renovation Process: From Free Estimate to Completed Project | MHG Contracting</h1>

        <h2>Step 1: Free In-Home Consultation &amp; Estimate</h2>
        <p>Every MHG Contracting project begins with a free consultation. We start with a quick phone call to learn about your project, then schedule an in-person visit to your home in Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, Yardley, or anywhere in Central NJ. During this visit, we assess the existing space, discuss your vision and budget, take measurements, and provide an honest evaluation of what is possible. Within a few days, you receive a detailed written estimate with transparent pricing - no hidden fees or vague allowances.</p>

        <h2>Step 2: Design &amp; Planning</h2>
        <p>Once you are ready to move forward, our team invests 2-3 weeks in detailed design work, including drawings, renderings, and material selections, so you can visualize the finished result before any construction begins. We coordinate material selections, finalize layouts, and create a comprehensive project timeline. For larger projects, clients receive a week-by-week schedule so there are never any surprises. MHG Contracting handles all permit applications and approvals required by your local municipality in Central New Jersey.</p>

        <h2>Step 3: Construction &amp; Build Phase</h2>
        <p>During construction, our team leads are on-site to oversee every aspect of your renovation. Our skilled team handles demolition, framing, electrical, plumbing, HVAC, drywall, tile, cabinetry, countertops, flooring, painting, and all finish work. We maintain a clean, organized job site and communicate progress updates throughout the build. If any questions or decisions arise during construction, you hear from us immediately. MHG Contracting coordinates all subcontractors, inspections, and material deliveries to keep your project on schedule.</p>

        <h2>Why Our Process Works for Central NJ Homeowners</h2>
        <p>MHG Contracting&apos;s renovation process is built on clear communication, quality craftsmanship, and personal accountability. As a family-owned contractor based in Hamilton, NJ, we treat every homeowner the way we would want to be treated during a renovation. No surprises, no disappearing acts, no corner-cutting. From kitchen renovations in Princeton to basement finishes in West Windsor to bathroom remodels in Lawrenceville, our process delivers consistent, high-quality results every time.</p>

        <p>Ready to get started? Call MHG Contracting at <a href="tel:+16097122474">(609) 712-2474</a> to schedule your free in-home consultation and estimate.</p>
      </SeoPrerender>
      <ProcessContent />
    </>
  );
}
