import type { Metadata, Viewport } from "next";
import { Urbanist, Inter } from "next/font/google";
import SmoothScroll from "@/components/animations/SmoothScroll";
import PageTransition from "@/components/animations/PageTransition";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EventTracker from "@/components/analytics/EventTracker";
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
    default: "MHG Contracting | Renovations in Hamilton, NJ",
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
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
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
        alt: "MHG Contracting - Premium Home Renovations in Hamilton, NJ",
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

const SERVICE_AREA_CITIES = [
  { name: "Hamilton", state: "NJ" },
  { name: "Princeton", state: "NJ" },
  { name: "West Windsor", state: "NJ" },
  { name: "Lawrenceville", state: "NJ" },
  { name: "Plainsboro", state: "NJ" },
  { name: "Robbinsville", state: "NJ" },
  { name: "Pennington", state: "NJ" },
  { name: "Hopewell", state: "NJ" },
  { name: "Ewing", state: "NJ" },
  { name: "East Windsor", state: "NJ" },
  { name: "Yardley", state: "PA" },
];

const SERVICE_OFFERINGS = [
  { name: "General Contracting", slug: "general-contracting" },
  { name: "Kitchen Renovations", slug: "kitchen-renovations" },
  { name: "Bathroom Renovations", slug: "bathroom-renovations" },
  { name: "Basement Finishing", slug: "basement-finishing" },
  { name: "Full Home Renovations", slug: "full-home-renovations" },
  { name: "Home Additions", slug: "additions" },
  { name: "New Construction", slug: "new-construction" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://mhgcon.com/#website",
      url: "https://mhgcon.com",
      name: "MHG Contracting",
      description:
        "Family-owned general contractor in Hamilton NJ. Kitchen, bathroom, basement, addition, and new construction services across Central NJ.",
      publisher: { "@id": "https://mhgcon.com/#organization" },
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": "https://mhgcon.com/#organization",
      name: "MHG Contracting",
      alternateName: ["MHG Construction", "Malik Holding Group", "MHG"],
      legalName: "Malik Holding Group LLC DBA MHG Contracting",
      url: "https://mhgcon.com",
      logo: "https://mhgcon.com/images/logo/mhg-logo-web.png",
      foundingLocation: { "@type": "Place", name: "Hamilton, NJ" },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-609-712-2474",
        contactType: "customer service",
        email: "shahzeb@mhgcon.com",
        areaServed: "US",
        availableLanguage: "English",
      },
      knowsAbout: [
        "Kitchen renovation",
        "Bathroom remodeling",
        "Basement finishing",
        "Home additions",
        "Full home renovation",
        "New residential construction",
        "Custom cabinetry",
        "Tile installation",
        "Residential general contracting",
        "Mercer County NJ building permits",
        "Central New Jersey home renovation",
      ],
      sameAs: [
        "https://instagram.com/mhgcontracting",
        "https://facebook.com/mhgcontracting",
        "https://www.houzz.com/professionals/general-contractors/mhg-contracting-pfvwus-pf~566670827",
      ],
    },
    {
      "@type": "GeneralContractor",
      "@id": "https://mhgcon.com/#localbusiness",
      name: "MHG Contracting",
      image: "https://mhgcon.com/images/og-image.jpg",
      telephone: "(609) 712-2474",
      email: "shahzeb@mhgcon.com",
      url: "https://mhgcon.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2145 Nottingham Way",
        addressLocality: "Hamilton",
        addressRegion: "NJ",
        postalCode: "08619",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 40.2354,
        longitude: -74.6914,
      },
      hasMap: "https://www.google.com/maps/search/?api=1&query=MHG+Contracting+2145+Nottingham+Way+Hamilton+NJ",
      areaServed: SERVICE_AREA_CITIES.map((c) => ({
        "@type": "City",
        name: c.name,
        containedInPlace: { "@type": "State", name: c.state === "NJ" ? "New Jersey" : "Pennsylvania" },
      })),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "MHG Contracting Services",
        itemListElement: SERVICE_OFFERINGS.map((s) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: s.name,
            url: `https://mhgcon.com/services/${s.slug}`,
            provider: { "@id": "https://mhgcon.com/#localbusiness" },
            areaServed: SERVICE_AREA_CITIES.map((c) => c.name),
          },
          areaServed: SERVICE_AREA_CITIES.map((c) => `${c.name}, ${c.state}`),
          availability: "https://schema.org/InStock",
        })),
      },
      makesOffer: SERVICE_OFFERINGS.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          url: `https://mhgcon.com/services/${s.slug}`,
        },
      })),
      priceRange: "$$",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "28",
        bestRating: "5",
        worstRating: "1",
      },
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
      jobTitle: "Owner",
      worksFor: { "@id": "https://mhgcon.com/#organization" },
      affiliation: { "@id": "https://mhgcon.com/#organization" },
      knowsAbout: [
        "Residential general contracting",
        "Kitchen renovation",
        "Bathroom remodeling",
        "Basement finishing",
        "Home additions",
        "Construction project management",
        "Mercer County NJ building codes",
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "General Contractor",
        occupationLocation: {
          "@type": "City",
          name: "Hamilton",
          containedInPlace: { "@type": "State", name: "New Jersey" },
        },
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Hamilton",
        addressRegion: "NJ",
        addressCountry: "US",
      },
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
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-Z75PBPTC4T" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-Z75PBPTC4T');`,
          }}
        />
        {/* Ahrefs Web Analytics (production only) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var h=location.hostname;if(h==='localhost'||h==='127.0.0.1'||h.endsWith('.vercel.app'))return;var s=document.createElement('script');s.async=true;s.setAttribute('data-key','RcLQVKa1mgcc1w+KoLW7aw');s.src='https://analytics.ahrefs.com/analytics.js';document.head.appendChild(s);})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <EventTracker />
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
