import type { Metadata } from "next";
import ProcessContent from "./ProcessContent";
import { processSteps } from "@/lib/data";
import SeoPrerender from "@/components/seo/SeoPrerender";

export const metadata: Metadata = {
  title: {
    absolute:
      "Our Renovation Process | Estimate to Final Walkthrough | MHG Contracting",
  },
  description:
    "From free consultation to final walkthrough — learn how MHG Contracting guides you through every step of your renovation. Clear communication, quality craftsmanship, no surprises.",
  alternates: { canonical: "https://mhgcon.com/process" },
  openGraph: {
    title: "Our Process | How MHG Contracting Works",
    description:
      "From consultation to final walkthrough — clear communication, quality craftsmanship, no surprises.",
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
  name: "How MHG Contracting Works — Our Renovation Process",
  description:
    "From free consultation to final walkthrough, MHG Contracting guides you through every step of your home renovation with clear communication and quality craftsmanship.",
  url: "https://mhgcon.com/process",
  estimatedCost: {
    "@type": "MonetaryAmount",
    currency: "USD",
    description: "Varies by project scope — free estimate available",
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
      <SeoPrerender>
        <h1>Our Renovation Process — From Free Estimate to Final Walkthrough | MHG Contracting</h1>

        <h2>Step 1: Free In-Home Consultation &amp; Estimate</h2>
        <p>Every MHG Contracting project begins with a free in-home consultation. Owner Shahzeb Malik meets with you at your home in Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, Yardley, or anywhere in Central NJ to discuss your renovation goals. During this visit, we assess the existing space, discuss your vision and budget, take measurements, and provide an honest evaluation of what is possible. Within a few days, you receive a detailed written estimate with transparent pricing — no hidden fees or vague allowances.</p>

        <h2>Step 2: Design &amp; Planning</h2>
        <p>Once you are ready to move forward, our team develops a comprehensive design and scope of work for your kitchen renovation, bathroom remodel, basement finishing, home addition, or full-home renovation. We coordinate material selections, finalize layouts, and create a detailed project timeline. MHG Contracting handles all permit applications and approvals required by your local municipality in Central New Jersey. You approve every detail before any construction begins.</p>

        <h2>Step 3: Construction &amp; Build Phase</h2>
        <p>During construction, Shahzeb is on-site daily to oversee every aspect of your renovation. Our skilled team handles demolition, framing, electrical, plumbing, HVAC, drywall, tile, cabinetry, countertops, flooring, painting, and all finish work. We maintain a clean, organized job site and communicate progress updates throughout the build. If any questions or decisions arise during construction, you hear from us immediately — not weeks later. MHG Contracting coordinates all subcontractors, inspections, and material deliveries to keep your project on schedule.</p>

        <h2>Step 4: Quality Inspection &amp; Final Walkthrough</h2>
        <p>Before we call your renovation complete, our team conducts a thorough quality inspection of every detail — from cabinet alignment and grout lines to paint finishes and hardware placement. We then schedule a final walkthrough with you to review the completed project together. Any punch-list items are addressed promptly. MHG Contracting does not consider a project finished until you are completely satisfied with the result.</p>

        <h2>Why Our Process Works for Central NJ Homeowners</h2>
        <p>MHG Contracting&apos;s renovation process is built on clear communication, quality craftsmanship, and personal accountability. As a family-owned contractor based in Hamilton, NJ, we treat every homeowner the way we would want to be treated during a renovation. No surprises, no disappearing acts, no corner-cutting. From kitchen renovations in Princeton to basement finishes in West Windsor to bathroom remodels in Lawrenceville, our process delivers consistent, high-quality results every time.</p>

        <p>Ready to get started? Call MHG Contracting at <a href="tel:+16097122474">(609) 712-2474</a> to schedule your free in-home consultation and estimate.</p>
      </SeoPrerender>
      <ProcessContent />
    </>
  );
}
