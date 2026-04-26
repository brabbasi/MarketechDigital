import type { Metadata, Viewport } from "next";
import Script from "next/script";
import GlobalLogoCube from "./GlobalLogoCube";
import FutureLayer from "./FutureLayer";
import UXFixLayer from "./UXFixLayer";
import AIAssistant from "./AIAssistant";
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
import "./header-logo-replace.css";

const siteTitle = "Marketech Digital | AI, Web Development & Digital Growth Systems";
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
  classification: "Digital agency, AI systems, web development, automation, SEO, branding, marketing technology",
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
    description:
      "Websites, AI automation, software systems, SEO, branding, landing pages, and digital growth support for businesses in Ottawa and across Canada.",
    type: "website",
    url: siteUrl,
    siteName,
    locale: "en_CA",
    images: [
      {
        url: absoluteUrl("/logo.svg"),
        width: 1200,
        height: 630,
        alt: "Marketech Digital logo"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Website design, AI automation, SEO, branding, software systems, and practical digital systems for modern businesses.",
    images: [absoluteUrl("/logo.svg")]
  },
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" }
    ],
    shortcut: "/logo.svg",
    apple: "/logo.svg"
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
        <FutureLayer />
        <UXFixLayer />
        <AIAssistant />
      </body>
    </html>
  );
}
