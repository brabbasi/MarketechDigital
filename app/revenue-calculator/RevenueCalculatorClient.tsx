"use client";

import { useEffect, useMemo, useState } from "react";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-CA", {
    style: "currency",
    currency: "CAD",
    maximumFractionDigits: 0,
  }).format(value);

function AnimatedNumber({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const start = display;
    const end = value;
    if (start === end) return;

    const duration = 560;
    const startTime = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + (end - start) * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {prefix}
      {display.toLocaleString("en-CA")}
      {suffix}
    </span>
  );
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  format: (value: number) => string;
}) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 12 }}>
        <span style={{ fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#8a8a7a", lineHeight: 1.4 }}>{label}</span>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#f0e6c8", whiteSpace: "nowrap", fontVariantNumeric: "tabular-nums" }}>{format(value)}</span>
      </div>

      <div style={{ position: "relative", height: 20 }}>
        <div style={{ position: "absolute", left: 0, right: 0, top: 7, height: 6, borderRadius: 999, background: "#2a2a22" }} />
        <div style={{ position: "absolute", left: 0, top: 7, height: 6, width: `${pct}%`, borderRadius: 999, background: "linear-gradient(90deg, #c8842a, #f0a832)", transition: "width .15s ease" }} />
        <input
          aria-label={label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          style={{ position: "absolute", inset: 0, width: "100%", height: 20, opacity: 0, cursor: "pointer", zIndex: 2 }}
        />
        <div style={{ position: "absolute", top: 2, left: `calc(${pct}% - 8px)`, width: 16, height: 16, borderRadius: "50%", background: "#f0a832", border: "2px solid #11110d", boxShadow: "0 0 26px rgba(240,168,50,.4)", pointerEvents: "none", transition: "left .15s ease" }} />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4, color: "#555545", fontSize: 11, fontVariantNumeric: "tabular-nums" }}>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

export default function RevenueCalculatorClient() {
  const [calls, setCalls] = useState(30);
  const [missRate, setMissRate] = useState(35);
  const [jobValue, setJobValue] = useState(650);
  const [bookingRate, setBookingRate] = useState(40);
  const [monthlyCost, setMonthlyCost] = useState(1400);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setShown(true), 80);
    return () => window.clearTimeout(timer);
  }, []);

  const numbers = useMemo(() => {
    const missedCalls = Math.round(calls * (missRate / 100));
    const lostJobs = Math.round(missedCalls * (bookingRate / 100));
    const weeklyLeak = missedCalls * jobValue * (bookingRate / 100);
    const monthlyLeak = weeklyLeak * 4.3;
    const yearlyLeak = weeklyLeak * 52;
    const annualCost = monthlyCost * 12;
    const netGain = yearlyLeak - annualCost;
    const roi = annualCost > 0 ? Math.round((netGain / annualCost) * 100) : 0;

    return { missedCalls, lostJobs, monthlyLeak, yearlyLeak, netGain, roi };
  }, [calls, missRate, jobValue, bookingRate, monthlyCost]);

  return (
    <main
      style={{
        minHeight: "100vh",
        overflow: "hidden",
        background: "#0f0f0b",
        color: "#f0e6c8",
        padding: "112px 20px 64px",
        backgroundImage: "radial-gradient(ellipse 65% 42% at 50% 0%, rgba(200,132,42,0.12) 0%, transparent 70%)",
        boxSizing: "border-box",
      }}
    >
      <section style={{ width: "100%", maxWidth: 1120, margin: "0 auto", position: "relative" }}>
        <div
          style={{
            maxWidth: 760,
            margin: "0 auto 44px",
            textAlign: "center",
            opacity: shown ? 1 : 0,
            transform: shown ? "translateY(0)" : "translateY(-12px)",
            transition: "all .65s ease",
          }}
        >
          <div style={{ display: "inline-flex", border: "1px solid rgba(200,132,42,.3)", background: "rgba(200,132,42,.1)", color: "#c8842a", borderRadius: 6, padding: "6px 14px", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", marginBottom: 18 }}>
            Marketech Digital Client Tool
          </div>
          <h1 style={{ margin: 0, color: "#f0e6c8", fontSize: "clamp(34px, 7vw, 56px)", lineHeight: 1.02, letterSpacing: "-0.045em", fontWeight: 700 }}>
            Missed Revenue Calculator
          </h1>
          <p style={{ maxWidth: 680, margin: "18px auto 0", color: "#8a8a7a", fontSize: "clamp(15px, 2.5vw, 17px)", lineHeight: 1.75 }}>
            Help visitors see the cost of missed calls, slow response, and weak lead capture before they book a consultation. This calculator turns your service into a clear business case.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 340px), 1fr))", gap: 24, alignItems: "start" }}>
          <div
            style={{
              border: "1px solid #2a2a22",
              background: "rgba(22,22,16,.72)",
              borderRadius: 22,
              padding: "clamp(22px, 5vw, 34px)",
              boxShadow: "0 24px 80px rgba(0,0,0,.28)",
              backdropFilter: "blur(14px)",
              opacity: shown ? 1 : 0,
              transform: shown ? "translateY(0)" : "translateY(16px)",
              transition: "all .65s ease .1s",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", marginBottom: 30 }}>
              <p style={{ margin: 0, color: "#c8842a", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>Your Numbers</p>
              <p style={{ margin: 0, color: "#6f6f5d", fontSize: 12 }}>Interactive estimate</p>
            </div>

            <Slider label="Inbound calls per week" value={calls} min={5} max={150} step={5} onChange={setCalls} format={(value) => `${value} calls`} />
            <Slider label="Estimated missed-call rate" value={missRate} min={10} max={80} step={5} onChange={setMissRate} format={(value) => `${value}%`} />
            <Slider label="Average job value" value={jobValue} min={200} max={5000} step={50} onChange={setJobValue} format={formatCurrency} />
            <Slider label="Booking rate from answered calls" value={bookingRate} min={10} max={80} step={5} onChange={setBookingRate} format={(value) => `${value}%`} />
            <Slider label="Estimated monthly system cost" value={monthlyCost} min={500} max={5000} step={100} onChange={setMonthlyCost} format={formatCurrency} />

            <div style={{ marginTop: 4, border: "1px solid rgba(200,132,42,.16)", background: "rgba(200,132,42,.06)", borderRadius: 14, padding: 16 }}>
              <p style={{ margin: 0, color: "#8a8a7a", fontSize: 13, lineHeight: 1.7 }}>
                Use conservative numbers here. The purpose is not to promise results; it is to help a business owner understand where revenue may be leaking.
              </p>
            </div>
          </div>

          <div style={{ display: "grid", gap: 18 }}>
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                border: "1px solid rgba(200,132,42,.42)",
                borderRadius: 22,
                background: "linear-gradient(135deg, #1e1a10 0%, #15110a 100%)",
                padding: "clamp(26px, 5vw, 38px)",
                textAlign: "center",
                boxShadow: "0 24px 90px rgba(200,132,42,.12)",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(16px)",
                transition: "all .65s ease .2s",
              }}
            >
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(200,132,42,.16) 0%, transparent 72%)", pointerEvents: "none" }} />
              <div style={{ position: "relative" }}>
                <p style={{ margin: "0 0 12px", color: "#c8842a", fontSize: 11, letterSpacing: "0.18em", textTransform: "uppercase" }}>Estimated Monthly Revenue Leak</p>
                <div style={{ color: "#f0a832", fontSize: "clamp(44px, 10vw, 72px)", lineHeight: 1, letterSpacing: "-0.06em", fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>
                  <AnimatedNumber value={Math.round(numbers.monthlyLeak)} prefix="$" />
                </div>
                <p style={{ maxWidth: 430, margin: "14px auto 0", color: "#7c7c68", fontSize: 14, lineHeight: 1.7 }}>
                  Potential revenue going to competitors, voicemail, or slow follow-up instead of booked work.
                </p>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0, marginTop: 28, border: "1px solid #2a2a22", background: "rgba(15,15,11,.45)", borderRadius: 14, overflow: "hidden" }}>
                  <div style={{ padding: "16px 8px" }}>
                    <div style={{ color: "#f0e6c8", fontWeight: 700, fontSize: 24 }}><AnimatedNumber value={numbers.missedCalls} /></div>
                    <div style={{ marginTop: 4, color: "#6a6a5a", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>missed/week</div>
                  </div>
                  <div style={{ padding: "16px 8px", borderLeft: "1px solid #2a2a22", borderRight: "1px solid #2a2a22" }}>
                    <div style={{ color: "#f0e6c8", fontWeight: 700, fontSize: 24 }}><AnimatedNumber value={numbers.lostJobs} /></div>
                    <div style={{ marginTop: 4, color: "#6a6a5a", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>jobs lost/week</div>
                  </div>
                  <div style={{ padding: "16px 8px" }}>
                    <div style={{ color: "#f0e6c8", fontWeight: 700, fontSize: 24 }}><AnimatedNumber value={Math.round(numbers.yearlyLeak / 1000)} prefix="$" suffix="K" /></div>
                    <div style={{ marginTop: 4, color: "#6a6a5a", fontSize: 10, letterSpacing: "0.1em", textTransform: "uppercase" }}>per year</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                border: "1px solid #2a2a22",
                background: "rgba(22,22,16,.72)",
                borderRadius: 22,
                padding: "clamp(22px, 5vw, 30px)",
                backdropFilter: "blur(14px)",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(16px)",
                transition: "all .65s ease .3s",
              }}
            >
              <p style={{ margin: "0 0 18px", color: "#7ab87a", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase" }}>If Marketech closes the leak</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 14 }}>
                <div style={{ border: "1px solid rgba(90,122,90,.22)", background: "rgba(90,122,90,.1)", borderRadius: 14, padding: 18 }}>
                  <div style={{ color: "#6a8a6a", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Annual Net Gain</div>
                  <div style={{ marginTop: 8, color: numbers.netGain >= 0 ? "#7ab87a" : "#c87a7a", fontSize: 30, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>
                    <AnimatedNumber value={Math.abs(Math.round(numbers.netGain / 1000))} prefix={numbers.netGain >= 0 ? "+$" : "-$"} suffix="K" />
                  </div>
                </div>
                <div style={{ border: "1px solid rgba(90,122,90,.22)", background: "rgba(90,122,90,.1)", borderRadius: 14, padding: 18 }}>
                  <div style={{ color: "#6a8a6a", fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase" }}>Estimated ROI</div>
                  <div style={{ marginTop: 8, color: "#7ab87a", fontSize: 30, fontWeight: 800, fontVariantNumeric: "tabular-nums" }}>
                    <AnimatedNumber value={Math.max(numbers.roi, 0)} suffix="%" />
                  </div>
                </div>
              </div>
              <p style={{ margin: "16px 0 0", borderRadius: 10, background: "rgba(90,122,90,.06)", padding: 14, color: "#6f8a6f", fontSize: 12, lineHeight: 1.7 }}>
                This is an estimate only. Real results depend on call volume, offer strength, speed-to-lead, sales process, and local competition.
              </p>
            </div>

            <a
              href="/#contact"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 18,
                flexWrap: "wrap",
                borderRadius: 18,
                background: "linear-gradient(135deg, #c8842a, #f0a832)",
                color: "#1a1006",
                padding: "20px 24px",
                textDecoration: "none",
                boxShadow: "0 18px 60px rgba(200,132,42,.18)",
                opacity: shown ? 1 : 0,
                transform: shown ? "translateY(0)" : "translateY(16px)",
                transition: "all .65s ease .4s",
              }}
            >
              <span>
                <strong style={{ display: "block", fontSize: 14, fontWeight: 800 }}>Want this connected to your website?</strong>
                <span style={{ display: "block", marginTop: 4, fontSize: 12, opacity: .72 }}>Book a free conversion audit with Marketech Digital.</span>
              </span>
              <span style={{ fontSize: 26, lineHeight: 1 }}>→</span>
            </a>
          </div>
        </div>

        <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
          {[
            ["Fast", "Makes your value obvious without a sales call"],
            ["Useful", "Gives visitors a reason to stay and interact"],
            ["Qualified", "Filters prospects by pain, volume, and urgency"],
          ].map(([stat, label]) => (
            <div key={stat} style={{ border: "1px solid #2a2a22", background: "rgba(22,22,16,.5)", borderRadius: 14, padding: 18 }}>
              <div style={{ color: "#c8842a", fontSize: 25, fontWeight: 800 }}>{stat}</div>
              <p style={{ margin: "8px 0 0", color: "#777764", fontSize: 12, lineHeight: 1.7 }}>{label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
