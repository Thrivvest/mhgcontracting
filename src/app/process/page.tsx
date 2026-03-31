import type { Metadata } from "next";
import ProcessContent from "./ProcessContent";
import { processSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Our Process | How MHG Contracting Works",
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
      <ProcessContent />
    </>
  );
}
