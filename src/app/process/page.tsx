import type { Metadata } from "next";
import ProcessContent from "./ProcessContent";

export const metadata: Metadata = {
  title: "Our Process | How MHG Contracting Works",
  description:
    "From free consultation to final walkthrough — learn how MHG Contracting guides you through every step of your renovation. Clear communication, quality craftsmanship, no surprises.",
  alternates: { canonical: "https://mhgcon.com/process" },
  openGraph: {
    title: "Our Process | How MHG Contracting Works",
    description: "From consultation to final walkthrough — clear communication, quality craftsmanship, no surprises.",
    url: "https://mhgcon.com/process",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "MHG Contracting Process" }],
  },
};

export default function ProcessPage() {
  return <ProcessContent />;
}
