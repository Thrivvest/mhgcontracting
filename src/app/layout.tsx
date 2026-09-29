import type { Metadata, Viewport } from "next";
import { Urbanist, Inter } from "next/font/google";
import SmoothScroll from "@/components/animations/SmoothScroll";
import PageTransition from "@/components/animations/PageTransition";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import EventTracker from "@/components/analytics/EventTracker";
import StickyMobileCTA from "@/components/layout/StickyMobileCTA";
import MobileEstimateSheet from "@/components/layout/MobileEstimateSheet";
import { siteGraph } from "@/lib/schema";
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteGraph) }}
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
        <StickyMobileCTA />
        <MobileEstimateSheet />
      </body>
    </html>
  );
}
