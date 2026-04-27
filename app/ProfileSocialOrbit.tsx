import type { CSSProperties, ReactNode } from "react";

export type ProfileSocialIcon = "linkedin" | "instagram" | "facebook" | "github" | "x" | "email";

export type ProfileSocialLink = {
  label: string;
  href: string;
  icon: ProfileSocialIcon;
};

type ProfileSocialOrbitProps = {
  children: ReactNode;
  links: ProfileSocialLink[];
  label: string;
  className?: string;
};

function BrandIcon({ icon }: { icon: ProfileSocialIcon }) {
  if (icon === "linkedin") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286ZM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124ZM7.119 20.452H3.554V9h3.565v11.452ZM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.225 0Z" /></svg>;
  }
  if (icon === "instagram") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7.25A4.75 4.75 0 1 1 12 16.75 4.75 4.75 0 0 1 12 7.25Zm0 2A2.75 2.75 0 1 0 12 14.75 2.75 2.75 0 0 0 12 9.25ZM17 6.5a1.15 1.15 0 1 1 0 2.3 1.15 1.15 0 0 1 0-2.3Z" /></svg>;
  }
  if (icon === "facebook") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971h-1.513c-1.49 0-1.956.931-1.956 1.887v2.266h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073Z" /></svg>;
  }
  if (icon === "github") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .5a12 12 0 0 0-3.793 23.387c.6.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.776.419-1.305.762-1.605-2.665-.304-5.466-1.334-5.466-5.931 0-1.31.469-2.382 1.236-3.221-.124-.303-.536-1.524.117-3.176 0 0 1.008-.323 3.3 1.23A11.48 11.48 0 0 1 12 6.302c1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.655 1.652.243 2.873.119 3.176.769.839 1.234 1.911 1.234 3.221 0 4.609-2.806 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.294c0 .319.192.694.801.576A12 12 0 0 0 12 .5Z" /></svg>;
  }
  if (icon === "x") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77Z" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 5.75A2.75 2.75 0 0 1 4.75 3h14.5A2.75 2.75 0 0 1 22 5.75v12.5A2.75 2.75 0 0 1 19.25 21H4.75A2.75 2.75 0 0 1 2 18.25V5.75Zm2.75-.75a.75.75 0 0 0-.75.75v.6l8 5.12 8-5.12v-.6a.75.75 0 0 0-.75-.75H4.75ZM20 8.73l-7.46 4.78a1 1 0 0 1-1.08 0L4 8.73v9.52c0 .414.336.75.75.75h14.5a.75.75 0 0 0 .75-.75V8.73Z" /></svg>;
}

export default function ProfileSocialOrbit({ children, links, label, className = "" }: ProfileSocialOrbitProps) {
  return (
    <div className={`profile-social-orbit ${className}`.trim()} aria-label={label}>
      <div className="profile-social-orbit__ring" aria-hidden="true" />
      <div className="profile-social-orbit__ring profile-social-orbit__ring--inner" aria-hidden="true" />
      <div className="profile-social-orbit__center">{children}</div>
      <div className="profile-social-orbit__track">
        {links.map((link, index) => (
          <a
            key={link.label}
            className="profile-social-orbit__icon"
            style={{ "--i": index, "--count": links.length } as CSSProperties}
            href={link.href}
            aria-label={link.label}
          >
            <BrandIcon icon={link.icon} />
          </a>
        ))}
      </div>
    </div>
  );
}
