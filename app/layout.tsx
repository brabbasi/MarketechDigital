import type { Metadata, Viewport } from "next";
import Script from "next/script";
import GlobalLogoCube from "./GlobalLogoCube";
import FutureLayer from "./FutureLayer";
import UXFixLayer from "./UXFixLayer";
import EmailRoutingLayer from "./EmailRoutingLayer";
import FooterSocialLayer from "./FooterSocialLayer";
import HomeAboutCarouselLayer from "./HomeAboutCarouselLayer";
import FounderOrbitLayer from "./FounderOrbitLayer";
import AIAssistant from "./AIAssistant";
import AuditPopup from "./AuditPopup";
import {
  absoluteUrl,
  coreServices,
  faqJsonLd,
  homepageFaq,
  jsonLdGraph,
  localBusinessJsonLd,
  organizationJsonLd,
  serviceJsonLd,
  serviceKeywords,
  siteDescription,
  siteName,
  siteUrl,
  websiteJsonLd
} from "./seo";
import "./globals.css";
import "./premium.css";
import "./polish.css";
import "./fixes.css";
import "./footer-fix.css";
import "./final-overrides.css";
import "./scroll-fix.css";
import "./bot-position-fix.css";
import "./founder-image-replace.css";
import "./popup-close-fix.css";
import "./founder-desktop-polish.css";
import "./global-cube-nav.css";
import "./conversion-audit.css";
import "./audit-popup.css";
import "./profile-social-orbit.css";
import "./insights.css";

const siteTitle = "Marketech Digital | Ottawa Web Design, SEO & AI Automation";
const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
const bingVerification = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#05070d",
  colorScheme: "dark"
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: "%s | Marketech Digital"
  },
  description: siteDescription,
  keywords: serviceKeywords,
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
  category: "Digital Agency",
  classification: "Ottawa digital agency, web design, SEO, AI automation, Google Business optimization, lead capture, branding, marketing technology",
  alternates: {
    canonical: "/"
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  verification: {
    ...(googleVerification ? { google: googleVerification } : {}),
    ...(bingVerification ? { other: { "msvalidate.01": bingVerification } } : {})
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_CA",
    images: [
      {
        url: absoluteUrl("/og-image.png"),
        width: 1200,
        height: 630,
        alt: "Marketech Digital - Ottawa Web Design, SEO and AI Automation"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "We help Ottawa businesses turn better websites, local SEO, lead capture, and practical AI automation into more calls, bookings, and clients.",
    images: [absoluteUrl("/og-image.png")]
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    shortcut: "/favicon.ico",
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ],
    other: [
      { rel: "icon", url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/android-chrome-512x512.png", sizes: "512x512", type: "image/png" }
    ]
  },
  manifest: "/manifest.webmanifest",
  formatDetection: {
    telephone: false,
    email: false,
    address: false
  },
  appleWebApp: {
    capable: true,
    title: siteName,
    statusBarStyle: "black-translucent"
  }
};

const structuredData = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  localBusinessJsonLd(),
  ...coreServices.map((service) =>
    serviceJsonLd(
      service,
      `Marketech Digital helps businesses with ${service.toLowerCase()} so their website, tools, leads, and follow up process feel clearer and easier to manage.`
    )
  ),
  faqJsonLd("/#homepage-faq", homepageFaq)
]);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-CA">
      <body>
        <Script
          id="marketech-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <GlobalLogoCube />
        {children}
        <AuditPopup />
        <FutureLayer />
        <UXFixLayer />
        <EmailRoutingLayer />
        <HomeAboutCarouselLayer />
        <FounderOrbitLayer />
        <FooterSocialLayer />
        <AIAssistant />
      </body>
    </html>
  );
}
