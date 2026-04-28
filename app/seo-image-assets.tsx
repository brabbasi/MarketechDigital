type IconImageProps = {
  size: number;
};

export const brandDark = "#05070d";
export const brandCard = "#090d18";
export const brandOrange = "#ff5a00";
export const brandPink = "#ff2d8f";
export const brandText = "#f8fafc";
export const brandMuted = "#b7c1d6";

export function MarketechIcon({ size }: IconImageProps) {
  const ring = Math.round(size * 0.08);
  const inner = Math.round(size * 0.16);
  const mSize = Math.round(size * 0.5);
  const accent = Math.round(size * 0.11);

  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: `radial-gradient(circle at 65% 25%, rgba(255,90,0,0.36), transparent 30%), ${brandDark}`,
        borderRadius: Math.round(size * 0.22),
        position: "relative",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: ring,
          borderRadius: size,
          border: `${Math.max(2, Math.round(size * 0.055))}px solid ${brandOrange}`,
          borderLeftColor: "transparent",
          transform: "rotate(-22deg)",
          opacity: 0.98
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: inner,
          borderRadius: size,
          border: `${Math.max(1, Math.round(size * 0.035))}px solid #202129`,
          borderRightColor: "transparent",
          transform: "rotate(20deg)",
          opacity: 1
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          fontSize: mSize,
          fontWeight: 900,
          letterSpacing: Math.round(size * -0.03),
          color: brandText,
          lineHeight: 1,
          transform: "skew(-8deg)"
        }}
      >
        M
      </div>
      <div
        style={{
          position: "absolute",
          width: accent,
          height: Math.max(4, Math.round(size * 0.42)),
          background: `linear-gradient(180deg, ${brandPink}, ${brandOrange})`,
          borderRadius: Math.round(size * 0.02),
          transform: "rotate(28deg)",
          left: Math.round(size * 0.36),
          top: Math.round(size * 0.31)
        }}
      />
      <div
        style={{
          position: "absolute",
          width: Math.round(size * 0.26),
          height: Math.round(size * 0.045),
          background: brandOrange,
          borderRadius: Math.round(size * 0.02),
          transform: "rotate(-35deg)",
          right: Math.round(size * 0.21),
          top: Math.round(size * 0.31)
        }}
      />
    </div>
  );
}

export function FaviconCanvas({ size }: IconImageProps) {
  return (
    <div
      style={{
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: brandDark
      }}
    >
      <MarketechIcon size={size} />
    </div>
  );
}

export function OgImage() {
  return (
    <div
      style={{
        width: 1200,
        height: 630,
        display: "flex",
        position: "relative",
        overflow: "hidden",
        background: `radial-gradient(circle at 78% 24%, rgba(255,90,0,0.24), transparent 28%), radial-gradient(circle at 18% 84%, rgba(255,45,143,0.16), transparent 32%), linear-gradient(135deg, #05070d 0%, #0a1020 52%, #05070d 100%)`,
        color: brandText,
        fontFamily: "Inter, Arial, sans-serif"
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 42,
          border: "1px solid rgba(255,255,255,0.09)",
          borderRadius: 42
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 72,
          top: 78,
          display: "flex",
          alignItems: "center",
          gap: 26
        }}
      >
        <MarketechIcon size={118} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 42, fontWeight: 900, letterSpacing: -1 }}>Marketech Digital</div>
          <div style={{ fontSize: 21, color: brandMuted, marginTop: 8 }}>Ottawa digital growth systems</div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          left: 78,
          bottom: 112,
          width: 890,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.02,
            letterSpacing: -3.8,
            fontWeight: 900
          }}
        >
          Websites, SEO & AI Automation for Ottawa Businesses
        </div>
        <div
          style={{
            fontSize: 30,
            lineHeight: 1.35,
            color: brandMuted,
            marginTop: 26,
            width: 820
          }}
        >
          Built to bring more calls, bookings, and clients.
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          right: 72,
          bottom: 72,
          display: "flex",
          padding: "18px 24px",
          borderRadius: 999,
          background: "rgba(255,90,0,0.12)",
          border: "1px solid rgba(255,90,0,0.35)",
          color: "#ffd9c7",
          fontSize: 22,
          fontWeight: 800
        }}
      >
        getmarketechdigital.com
      </div>
    </div>
  );
}
