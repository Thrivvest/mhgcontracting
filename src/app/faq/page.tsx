import type { Metadata } from "next";
import FAQContent from "./FAQContent";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { getAllFAQItems } from "@/lib/faq-data";
import { buildBreadcrumbSchema } from "@/lib/seo-utils";

export const metadata: Metadata = {
  title: {
    absolute: "Renovation FAQ | MHG Contracting NJ",
  },
  description:
    "Answers to common questions about kitchen renovations, bathroom remodels, basement finishing, additions, and home construction in Central NJ. From MHG Contracting in Hamilton.",
  alternates: { canonical: "https://mhgcon.com/faq" },
  openGraph: {
    title: "FAQ | MHG Contracting",
    description:
      "Common questions about working with a home renovation contractor in Central NJ. Cost, timeline, permits, and more.",
    url: "https://mhgcon.com/faq",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHG Contracting FAQ",
      },
    ],
  },
};

const faqPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: getAllFAQItems().map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "FAQ", href: "/faq" },
]);

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SeoPrerender>
        <h1>Frequently Asked Questions - MHG Contracting Home Renovation in Central NJ</h1>
        <p>Answers to the questions we get most often from homeowners considering a kitchen renovation, bathroom remodel, basement finishing project, home addition, or new construction build in Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, Yardley PA, and throughout Central New Jersey.</p>
      </SeoPrerender>
      <FAQContent />
    </>
  );
}
