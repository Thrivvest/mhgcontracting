import type { Metadata, Viewport } from "next";
import { Urbanist, Inter } from "next/font/google";
import SmoothScroll from "@/components/animations/SmoothScroll";
import PageTransition from "@/components/animations/PageTransition";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";

// ─── Font Configuration ─────────────────────────────────

const urbanist = Urbanist({
  subsets: ["latin"],
  variable: "--font-urbanist",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600"],
  display: "swap",
});

// ─── SEO Metadata ───────────────────────────────────────

export const metadata: Metadata = {
  title: {
    default: "MHG Contracting | Kitchen, Bath & Home Renovations in Hamilton, NJ",
    template: "%s | MHG Contracting",
  },
  description:
    "MHG Contracting is a family-owned residential contracting company in Hamilton, NJ. We specialize in kitchen renovations, bathroom remodels, basement finishing, full home renovations, additions, and new construction. Serving Princeton, West Windsor, and Central NJ.",
  keywords: [
    "MHG Contracting",
    "home renovation Hamilton NJ",
    "kitchen renovation Princeton NJ",
    "bathroom remodel West Windsor NJ",
    "basement finishing Central NJ",
    "home additions NJ",
    "new construction Hamilton NJ",
    "residential contractor NJ",
    "family-owned contractor",
  ],
  authors: [{ name: "MHG Contracting" }],
  creator: "MHG Contracting",
  metadataBase: new URL("https://mhgcon.com"),
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mhgcon.com",
    siteName: "MHG Contracting",
    title: "MHG Contracting | Kitchen, Bath & Home Renovations in Hamilton, NJ",
    description:
      "Family-owned residential contracting in Hamilton, NJ. Kitchen renovations, bathroom remodels, basement finishing, and more. Quality you can see. Service you can trust.",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "MHG Contracting — Premium Home Renovations in Hamilton, NJ",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MHG Contracting | Home Renovations in Hamilton, NJ",
    description:
      "Family-owned residential contracting. Kitchen, bath, basement, additions & new construction in Central NJ.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#2D3380",
};

// ─── JSON-LD Structured Data ────────────────────────────

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://mhgcon.com/#organization",
      name: "MHG Contracting",
      legalName: "Malik Holding Group LLC DBA MHG Contracting",
      url: "https://mhgcon.com",
      logo: "https://mhgcon.com/images/logo/mhg-logo-web.png",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-609-712-2474",
        contactType: "customer service",
        email: "shahzeb@mhgcon.com",
        areaServed: "US",
        availableLanguage: "English",
      },
      sameAs: [
        "https://instagram.com/mhgcontracting",
        "https://facebook.com/mhgcontracting",
        "https://www.houzz.com/professionals/general-contractors/mhg-contracting-pfvwus-pf~566670827",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://mhgcon.com/#localbusiness",
      name: "MHG Contracting",
      image: "https://mhgcon.com/images/og-image.jpg",
      telephone: "(609) 712-2474",
      email: "shahzeb@mhgcon.com",
      url: "https://mhgcon.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hamilton",
        addressRegion: "NJ",
        addressCountry: "US",
      },
      areaServed: [
        { "@type": "City", name: "Hamilton", containedIn: "NJ" },
        { "@type": "City", name: "Princeton", containedIn: "NJ" },
        { "@type": "City", name: "West Windsor", containedIn: "NJ" },
        { "@type": "City", name: "Lawrenceville", containedIn: "NJ" },
        { "@type": "City", name: "Plainsboro", containedIn: "NJ" },
        { "@type": "City", name: "Yardley", containedIn: "PA" },
      ],
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5.0",
        reviewCount: "15",
        bestRating: "5",
        worstRating: "1",
      },
      review: [
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "Sarah & Michael R.",
          },
          reviewBody:
            "The MHG team completely transformed our kitchen. From the initial design meeting to the completed project, they were professional, communicative, and meticulous. The quality of the craftsmanship is outstanding — our neighbors keep asking for their number.",
        },
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "David & Jennifer L.",
          },
          reviewBody:
            "We wanted to turn our unfinished basement into a space our family could actually use. MHG delivered beyond our expectations. The home theater is incredible, and the wet bar is now our favorite spot for entertaining. They treated our home like it was their own.",
        },
        {
          "@type": "Review",
          reviewRating: {
            "@type": "Rating",
            ratingValue: "5",
            bestRating: "5",
          },
          author: {
            "@type": "Person",
            name: "The Patel Family",
          },
          reviewBody:
            "Our whole-home renovation was a huge undertaking, but MHG made it manageable. The team was on-site almost every day and kept us updated throughout the entire process. The finished result is stunning — it feels like a brand new home.",
        },
      ],
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "18:00",
      },
    },
    {
      "@type": "Person",
      "@id": "https://mhgcon.com/#founder",
      name: "Shahzeb Malik",
      jobTitle: "Co-Owner",
      worksFor: { "@id": "https://mhgcon.com/#organization" },
    },
  ],
};

// ─── Root Layout ────────────────────────────────────────

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${urbanist.variable} ${inter.variable}`}
    >
      <head>
        <link rel="alternate" hrefLang="en-us" href="https://mhgcon.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <SmoothScroll>
          <Header />
          <PageTransition>
            {children}
          </PageTransition>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
