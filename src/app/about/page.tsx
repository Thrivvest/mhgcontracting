import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About MHG Contracting | Family-Owned Renovations in Central NJ",
  description:
    "Learn about MHG Contracting — a family-owned residential contracting company in Hamilton, NJ led by Shahzeb Malik. Quality craftsmanship, personal service, and a commitment to building homes the right way.",
  alternates: { canonical: "https://mhgcon.com/about" },
  openGraph: {
    title: "About MHG Contracting | Family-Owned Renovations",
    description: "Meet Shahzeb Malik and the MHG team. Family-owned residential contracting in Hamilton, NJ — quality craftsmanship and personal service.",
    url: "https://mhgcon.com/about",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "About MHG Contracting" }],
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
