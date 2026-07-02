import type { Metadata } from "next";
import FAQContent from "./FAQContent";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { getAllFAQItems } from "@/lib/faq-data";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = buildSeoMetadata({
  path: "/faq",
  title: "Renovation FAQ | MHG Contracting Hamilton NJ",
  description:
    "Answers on cost, timeline, permits, and process for kitchen, bath, basement, addition, and new construction projects in Central NJ from MHG Contracting.",
  ogTitle: "FAQ | MHG Contracting",
  ogImageAlt: "MHG Contracting FAQ",
});

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
