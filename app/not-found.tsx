import Link from "next/link";

export const metadata = {
  title: "Page Not Found | Marketech Digital",
  description: "The page you are looking for could not be found. Return to Marketech Digital to explore website design, AI automation, SEO, branding, and digital systems."
};

export default function NotFound() {
  return (
    <main className="services-page">
      <section className="services-hero" aria-labelledby="not-found-title">
        <Link href="/" className="services-home" aria-label="Return to Marketech Digital homepage">← Marketech Digital</Link>
        <div className="services-label"><span /> Page not found</div>
        <h1 id="not-found-title">This page is not available.</h1>
        <p>
          The link may have moved, or the page may not exist yet. You can return home, explore the services page, or start a project inquiry with Marketech Digital.
        </p>
        <div className="starter-actions">
          <Link href="/">Return home →</Link>
          <Link href="/services">Explore services</Link>
        </div>
      </section>
    </main>
  );
}
