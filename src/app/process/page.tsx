import Breadcrumbs from "@/components/seo/Breadcrumbs";
import { pageNode } from "@/lib/schema";
import type { Metadata } from "next";
import ProcessContent from "./ProcessContent";
import { buildBreadcrumbSchema, buildSeoMetadata } from "@/lib/seo-utils";

const breadcrumbJsonLd = buildBreadcrumbSchema([
  { name: "Home", href: "/" },
  { name: "Process", href: "/process" },
]);

export const metadata: Metadata = buildSeoMetadata({
  path: "/process",
  title: "Our Renovation Process | How MHG Contracting Works",
  description:
    "How an MHG Contracting renovation runs, from the first phone call and free in-home estimate to week-by-week progress and the final walkthrough.",
  ogTitle: "Our Process | How MHG Contracting Works",
  ogImageAlt: "MHG Contracting Process",
});

const jsonLd = pageNode("WebPage", {
  name: "How MHG Contracting Works",
  path: "/process",
  description:
    "How an MHG Contracting renovation runs, from the first phone call to the final walkthrough.",
});

export default function ProcessPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProcessContent />
      <Breadcrumbs schema={breadcrumbJsonLd} />
    </>
  );
}
