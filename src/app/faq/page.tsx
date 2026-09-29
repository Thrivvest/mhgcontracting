import Breadcrumbs from "@/components/seo/Breadcrumbs";
import type { Metadata } from "next";
import FAQContent from "./FAQContent";
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
      <FAQContent />
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
