import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us | Get a Free Estimate — MHG Contracting",
  description:
    "Request your free estimate from MHG Contracting. Call (609) 712-2474 or fill out our form. We serve Hamilton, Princeton, West Windsor, and Central NJ.",
  alternates: { canonical: "https://mhgcon.com/contact" },
  openGraph: {
    title: "Contact MHG Contracting | Get a Free Estimate",
    description: "Request your free estimate. Call (609) 712-2474 or fill out our form. Serving Hamilton, Princeton, West Windsor, and Central NJ.",
    url: "https://mhgcon.com/contact",
    images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Contact MHG Contracting" }],
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
