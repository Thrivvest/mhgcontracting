import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About MHG Contracting | Family-Owned Renovations in Central NJ",
  description:
    "Learn about MHG Contracting — a family-owned residential contracting company in Hamilton, NJ led by Shahzeb Malik. Quality craftsmanship, personal service, and a commitment to building homes the right way.",
  alternates: { canonical: "https://mhgcon.com/about" },
  openGraph: {
    title: "About MHG Contracting | Family-Owned Renovations",
    description:
      "Meet Shahzeb Malik and the MHG team. Family-owned residential contracting in Hamilton, NJ — quality craftsmanship and personal service.",
    url: "https://mhgcon.com/about",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "About MHG Contracting",
      },
    ],
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About MHG Contracting",
    url: "https://mhgcon.com/about",
    description:
      "MHG Contracting is a family-owned residential contracting company in Hamilton, NJ. We specialize in kitchen renovations, bathroom remodels, basement finishing, home additions, full-home renovations, and new construction throughout Central NJ.",
    mainEntity: {
      "@type": "LocalBusiness",
      "@id": "https://mhgcon.com/#localbusiness",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shahzeb Malik",
    jobTitle: "Founder & Owner",
    worksFor: {
      "@type": "LocalBusiness",
      "@id": "https://mhgcon.com/#localbusiness",
      name: "MHG Contracting",
    },
    description:
      "Shahzeb Malik is the founder and owner of MHG Contracting, a family-owned residential contracting company based in Hamilton, NJ. With a hands-on approach and a commitment to quality craftsmanship, Shahzeb personally oversees every project to ensure exceptional results.",
    url: "https://mhgcon.com/about",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hamilton",
      addressRegion: "NJ",
      addressCountry: "US",
    },
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
    </>
  );
}
