import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { pageNode } from "@/lib/schema";
import type { Metadata } from "next";
import ContactContent from "./ContactContent";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Contact", href: "/contact" },
]);

export const metadata: Metadata = buildSeoMetadata({
  path: "/contact",
  title: "Get a Free Estimate | MHG Contracting | (609) 712-2474",
  description:
    "Request a free estimate from MHG Contracting. Call (609) 712-2474 or fill out the form. Serving Hamilton, Princeton, West Windsor, and Central NJ.",
  ogTitle: "Contact MHG Contracting | Get a Free Estimate",
  ogImageAlt: "Contact MHG Contracting",
});

const jsonLd = pageNode("ContactPage", {
  name: "Contact MHG Contracting",
  path: "/contact",
  description:
    "Request a free estimate from MHG Contracting in Hamilton, NJ. Call (609) 712-2474 or send the form.",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ContactContent />
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
