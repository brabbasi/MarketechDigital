"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "marketech-audit-popup-dismissed";

export default function AuditPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (pathname !== "/") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "true") return;

    const timer = window.setTimeout(() => setOpen(true), 900);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  const close = () => {
    window.sessionStorage.setItem(STORAGE_KEY, "true");
    setOpen(false);
  };

  if (!open || pathname !== "/") return null;

  return (
    <div className="audit-popup-backdrop" role="dialog" aria-modal="true" aria-labelledby="audit-popup-title">
      <div className="audit-popup-card">
        <button className="audit-popup-close" type="button" aria-label="Close audit offer" onClick={close}>
          <span />
          <span />
        </button>
        <div className="label audit-popup-label">
          <span className="dot" />
          Free Local Business Audit
        </div>
        <h2 id="audit-popup-title">Your website might be losing leads before customers ever contact you.</h2>
        <p>
          Get a free digital growth audit from Marketech Digital and see what could be improved across your website clarity, local SEO, trust signals, lead capture, and simple AI automation opportunities.
        </p>
        <div className="audit-popup-actions">
          <a className="btn btn-primary conversion-cta" href="/audit" onClick={close}>
            View Free Audit
          </a>
          <button className="btn btn-secondary" type="button" onClick={close}>
            Maybe Later
          </button>
        </div>
      </div>
    </div>
  );
}
