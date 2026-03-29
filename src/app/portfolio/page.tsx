import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio | Our Work — MHG Contracting",
  description:
    "Browse our portfolio of kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction projects across Central NJ.",
  alternates: { canonical: "https://mhgcon.com/portfolio" },
  openGraph: {
    title: "Portfolio | Our Work — MHG Contracting",
    description: "Browse our kitchen, bathroom, basement, and full home renovation projects across Central NJ.",
    url: "https://mhgcon.com/portfolio",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "MHG Contracting Portfolio" }],
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
