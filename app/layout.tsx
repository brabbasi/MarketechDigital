import type { Metadata, Viewport } from "next";
import Script from "next/script";
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

const siteTitle = "Marketech Digital | AI, Web Development & Digital Growth Systems";

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
  openGraph: {
    title: siteTitle,
    description:
      "Premium websites, AI automation systems, custom software, SEO, branding, landing pages, and digital growth infrastructure for businesses in Ottawa and across Canada.",
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
      "Web development, AI automation, SEO, branding, software systems, and digital growth infrastructure for modern businesses.",
    images: [absoluteUrl("/logo.svg")]
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg"
  }
};

const structuredData = jsonLdGraph([
  organizationJsonLd(),
  websiteJsonLd(),
  localBusinessJsonLd(),
  ...coreServices.map((service) =>
    serviceJsonLd(
      service,
      `Marketech Digital provides ${service.toLowerCase()} for businesses that need clearer digital infrastructure, stronger lead capture, and scalable growth systems.`
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
        {children}
        <FutureLayer />
        <UXFixLayer />
        <AIAssistant />
      </body>
    </html>
  );
}
