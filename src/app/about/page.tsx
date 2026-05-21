import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import SeoPrerender from "@/components/seo/SeoPrerender";
import { buildBreadcrumbSchema } from "@/lib/seo-utils";

export const metadata: Metadata = {
  title: {
    absolute: "About MHG Contracting | Hamilton NJ Renovations",
  },
  description:
    "Learn about MHG Contracting - a family-owned residential contracting company in Hamilton, NJ led by Shahzeb Malik. Quality craftsmanship, personal service, and a commitment to building homes the right way.",
  alternates: { canonical: "https://mhgcon.com/about" },
  openGraph: {
    title: "About MHG Contracting | Family-Owned Renovations",
    description:
      "Meet Shahzeb Malik and the MHG team. Family-owned residential contracting in Hamilton, NJ - quality craftsmanship and personal service.",
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
  buildBreadcrumbSchema([
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
  ]),
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SeoPrerender>
        <h1>About MHG Contracting - Family-Owned Residential Contractor in Hamilton, NJ</h1>

        <h2>Meet Shahzeb Malik, Founder &amp; Owner</h2>
        <p>MHG Contracting was founded by Shahzeb Malik with a simple commitment: deliver exceptional craftsmanship with honest, transparent communication on every project. As a hands-on owner, Shahzeb personally oversees every renovation from the initial free estimate through design, construction, and final walkthrough. When you work with MHG Contracting, you deal directly with the person responsible for building your renovation - not a salesperson, not a franchise manager, and not a subcontractor you have never met.</p>

        <h2>Family-Owned &amp; Locally Operated in Central New Jersey</h2>
        <p>Based in Hamilton, New Jersey, MHG Contracting is a family-owned and operated residential contracting company. We are not a national franchise or a sales-driven operation. Our reputation has been built through word-of-mouth referrals from satisfied homeowners across Central NJ and Bucks County, PA. We believe in doing every job the right way - using quality materials, employing skilled tradespeople, and maintaining open communication throughout every phase of your renovation project.</p>

        <h2>Our Approach to Home Renovation</h2>
        <p>MHG Contracting takes a personal, detail-oriented approach to every home renovation. We begin each project with a thorough in-home consultation to understand your vision, budget, and timeline. Our team then develops a comprehensive scope of work with transparent pricing - no hidden fees, no surprise change orders. During construction, Shahzeb is on-site daily to ensure quality standards are met and your project stays on schedule. We specialize in kitchen renovations, bathroom remodels, basement finishing, home additions, full-home renovations, and new construction.</p>

        <h2>Serving Central NJ &amp; Bucks County, PA</h2>
        <p>MHG Contracting proudly serves homeowners throughout Central New Jersey and Bucks County, Pennsylvania. Our primary service area includes Hamilton, Princeton, West Windsor, Lawrenceville, Plainsboro, and Yardley. From historic homes in Princeton to new developments in West Windsor, we bring the same level of care and craftsmanship to every project regardless of size or scope. Our local knowledge of Central NJ building codes, permit requirements, and architectural styles ensures a smooth renovation experience.</p>

        <h2>Quality Craftsmanship &amp; Customer Satisfaction</h2>
        <p>At MHG Contracting, quality is not negotiable. Every kitchen renovation, bathroom remodel, basement finish, and home addition is completed to the highest standards of residential construction. We stand behind our work and maintain relationships with homeowners long after the project is complete. Our growing portfolio of completed renovations across Central NJ speaks to our dedication to excellence and customer satisfaction.</p>

        <p>Learn more about how MHG Contracting can transform your home. Call <a href="tel:+16097122474">(609) 712-2474</a> to schedule your free in-home consultation today.</p>
      </SeoPrerender>
      <AboutContent />
    </>
  );
}
