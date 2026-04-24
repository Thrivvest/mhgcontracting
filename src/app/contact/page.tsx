import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import SeoPrerender from "@/components/seo/SeoPrerender";

export const metadata: Metadata = {
  title: {
    absolute:
      "Get a Free Estimate | MHG Contracting - (609) 712-2474",
  },
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
  name: "Contact MHG Contracting - Get a Free Estimate",
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
      <SeoPrerender>
        <h1>Contact MHG Contracting - Get a Free Renovation Estimate</h1>

        <h2>Request Your Free Estimate Today</h2>
        <p>Contact MHG Contracting to schedule your free in-home consultation and estimate for any residential renovation project in Central New Jersey. Whether you are planning a kitchen renovation, bathroom remodel, basement finishing, home addition, full-home renovation, or new construction, owner Shahzeb Malik will personally visit your home to discuss your project, assess the space, and provide a detailed, transparent estimate with no hidden fees or obligations.</p>

        <h2>Call Us Directly at (609) 712-2474</h2>
        <p>The fastest way to reach MHG Contracting is by calling <a href="tel:+16097122474">(609) 712-2474</a>. When you call, you speak directly with our team - not a call center, not an answering service. We are available Monday through Friday from 8:00 AM to 6:00 PM and Saturday from 9:00 AM to 3:00 PM. You can also email us at <a href="mailto:info@mhgcon.com">info@mhgcon.com</a> or fill out the contact form on this page and we will respond within one business day.</p>

        <h2>Our Office Location</h2>
        <p>MHG Contracting is based in Hamilton, New Jersey and serves homeowners throughout Central NJ and Bucks County, PA. Our service area includes Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, Yardley, and surrounding communities. We are locally owned and operated, which means we are never far from your project site and can respond quickly to consultations, questions, and service needs.</p>

        <h2>What to Expect When You Contact Us</h2>
        <p>When you reach out to MHG Contracting, here is what happens next: we schedule a convenient time for a free in-home consultation, owner Shahzeb Malik visits your property to discuss your renovation vision and assess the space, and within a few days you receive a detailed written estimate covering scope of work, materials, timeline, and pricing. There is no pressure, no sales tactics, and no obligation. We believe our quality work speaks for itself.</p>

        <h2>Services We Provide</h2>
        <p>MHG Contracting offers comprehensive residential contracting services including kitchen renovations, bathroom remodels, basement finishing, home additions, full-home renovations, and new construction. No matter the size or scope of your project, we bring the same attention to detail and commitment to quality craftsmanship. Contact us today to discuss your renovation project in Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, Yardley, or anywhere in Central New Jersey.</p>

        <p>Call <a href="tel:+16097122474">(609) 712-2474</a> now for your free estimate, or fill out the form above and we will get back to you promptly.</p>
      </SeoPrerender>
      <ContactContent />
    </>
  );
}
