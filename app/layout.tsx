import type { Metadata } from "next";
import Script from "next/script";
import FutureLayer from "./FutureLayer";
import "./globals.css";

const siteName = "Marketech Digital";
const siteTitle = "Marketech Digital | AI Strategy, Workflow Automation & Decision Intelligence";
const siteDescription =
  "Marketech Digital helps businesses implement AI strategy, workflow automation, decision intelligence, and growth systems that reduce noise, improve execution, and support faster decisions.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  keywords: [
    "AI strategy",
    "workflow automation",
    "decision intelligence",
    "growth systems",
    "business automation",
    "AI systems",
    "automation architecture",
    "software systems",
    "digital growth",
    "operational clarity"
  ],
  applicationName: siteName,
  authors: [{ name: siteName }],
  creator: siteName,
  publisher: siteName,
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
      "Premium AI systems, workflow automation, decision intelligence, and growth systems for businesses that want clearer execution and faster decisions.",
    type: "website",
    siteName,
    locale: "en_US"
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description:
      "Premium AI systems, workflow automation, decision intelligence, and growth systems for businesses that want clearer execution and faster decisions."
  },
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg"
  }
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: siteName,
      url: "https://marketech-digital.vercel.app",
      logo: "https://marketech-digital.vercel.app/logo.svg",
      email: "abasitabbasi99@gmail.com",
      founder: {
        "@type": "Person",
        name: "Basit Abbasi"
      },
      description: siteDescription
    },
    {
      "@type": "Service",
      serviceType: "AI Strategy Sprint",
      provider: { "@type": "Organization", name: siteName },
      description:
        "A focused engagement that identifies where AI should create leverage, what should be prioritized, and what to implement next."
    },
    {
      "@type": "Service",
      serviceType: "Workflow Automation Build",
      provider: { "@type": "Organization", name: siteName },
      description:
        "A workflow automation engagement that reduces repetitive manual work, cleans up execution, and improves consistency."
    },
    {
      "@type": "Service",
      serviceType: "Decision Intelligence Layer",
      provider: { "@type": "Organization", name: siteName },
      description:
        "A visibility and intelligence layer that helps teams identify what matters, prioritize faster, and make clearer decisions."
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Script
          id="marketech-structured-data"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {children}
        <FutureLayer />
      </body>
    </html>
  );
}
