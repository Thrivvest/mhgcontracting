import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Estimate — MHG Contracting",
  description:
    "Request your free estimate from MHG Contracting. Call (609) 712-2474 or fill out our form. We serve Hamilton, Princeton, West Windsor, and Central NJ.",
  alternates: { canonical: "https://mhgcon.com/contact" },
  openGraph: {
    title: "Contact MHG Contracting | Get a Free Estimate",
    description:
      "Request your free estimate. Call (609) 712-2474 or fill out our form. Serving Hamilton, Princeton, West Windsor, and Central NJ.",
    url: "https://mhgcon.com/contact",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Contact MHG Contracting",
      },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: "Contact MHG Contracting — Get a Free Estimate",
  url: "https://mhgcon.com/contact",
  description:
    "Contact MHG Contracting to request a free estimate for your kitchen renovation, bathroom remodel, basement finishing, addition, or new construction project in Central NJ.",
  mainEntity: {
    "@type": "LocalBusiness",
    "@id": "https://mhgcon.com/#localbusiness",
    name: "MHG Contracting",
    telephone: "(609) 712-2474",
    email: "info@mhgcon.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hamilton",
      addressRegion: "NJ",
      postalCode: "08619",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "08:00",
        closes: "18:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Saturday",
        opens: "09:00",
        closes: "15:00",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "(609) 712-2474",
      contactType: "customer service",
      areaServed: "Central New Jersey",
      availableLanguage: "English",
    },
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent />
    </>
  );
}
