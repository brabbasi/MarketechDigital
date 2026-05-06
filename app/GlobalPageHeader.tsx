"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import MarketechDiceNav from "@/components/MarketechDiceNav";
import styles from "./founder/founder.module.css";

const pageNavItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Systems", href: "/systems" },
  { label: "TradePilot AI", href: "/tradepilot" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

export default function GlobalPageHeader() {
  const pathname = usePathname();
  if (pathname === "/" || pathname === "/about" || pathname === "/founder") return null;

  return (
    <div className="standard-page-header-shell">
      <nav className={styles.navbar} aria-label="Marketech Digital page navigation">
        <div className={styles.brand}>
          <MarketechDiceNav className={styles.headerDiceNav} navItems={pageNavItems} homeHref="/" />
          <Link href="/" className={styles.brandName} aria-label="Marketech Digital home">Marketech Digital</Link>
        </div>
      </nav>
      <style jsx global>{`
        .standard-page-header-shell{width:min(1220px,calc(100% - 28px));margin:0 auto;position:relative;z-index:50;background:transparent;}
      `}</style>
    </div>
  );
}
