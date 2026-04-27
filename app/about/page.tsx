import type { Metadata } from "next";
import { Suspense } from "react";
import AboutCarousel from "./AboutCarousel";

export const metadata: Metadata = {
  title: "About Us | Marketech Digital",
  description: "Learn about Marketech Digital, a founder-led Ottawa digital studio for website design, AI automation, SEO, software development, branding, and digital growth systems.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <Suspense fallback={null}>
      <AboutCarousel />
    </Suspense>
  );
}
