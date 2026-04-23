import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Marketech Digital | AI Strategy, Workflow Automation & Decision Intelligence",
  description:
    "Marketech Digital helps businesses implement AI strategy, workflow automation, decision intelligence, and growth systems that reduce noise, improve execution, and support faster decisions.",
  keywords: [
    "AI strategy",
    "workflow automation",
    "decision intelligence",
    "growth systems",
    "business automation",
    "AI systems",
    "software systems",
    "digital growth"
  ],
  openGraph: {
    title: "Marketech Digital | AI Strategy, Workflow Automation & Decision Intelligence",
    description:
      "Premium AI systems, workflow automation, decision intelligence, and growth systems for businesses that want clearer execution and faster decisions.",
    type: "website",
    siteName: "Marketech Digital"
  },
  twitter: {
    card: "summary_large_image",
    title: "Marketech Digital | AI Strategy, Workflow Automation & Decision Intelligence",
    description:
      "Premium AI systems, workflow automation, decision intelligence, and growth systems for businesses that want clearer execution and faster decisions."
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
