import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { pageNode } from "@/lib/schema";
import type { Metadata } from "next";
import AboutContent from "./AboutContent";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

export const metadata: Metadata = buildSeoMetadata({
  path: "/about",
  title: "About MHG Contracting | Family-Owned Hamilton NJ Builder",
  description:
    "Family-owned contractor in Hamilton, NJ run by Shahzeb and Shahmi Malik. 4.9 stars from 28 Google reviews. Kitchens, baths, basements and whole homes.",
  ogTitle: "About MHG Contracting | Family-Owned Renovations",
  ogImageAlt: "About MHG Contracting",
});

const jsonLd = [
  pageNode("AboutPage", {
    name: "About MHG Contracting",
    path: "/about",
    description:
      "MHG Contracting is a family-owned residential contractor in Hamilton, NJ, run by brothers Shahzeb and Shahmi Malik.",
  }),
];

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <AboutContent />
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
