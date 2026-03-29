import type { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services | Kitchen, Bathroom, Basement & More — MHG Contracting",
  description:
    "Explore our residential contracting services: kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction in Central NJ.",
  alternates: { canonical: "https://mhgcon.com/services" },
  openGraph: {
    title: "Services | Kitchen, Bathroom, Basement & More",
    description: "Kitchen renovations, bathroom remodels, basement finishing, additions, and new construction in Central NJ.",
    url: "https://mhgcon.com/services",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "MHG Contracting Services" }],
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
