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

    const duration = 520;
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

function CalculatorSlider({
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
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <label className="block space-y-3">
      <div className="flex items-center justify-between gap-4">
        <span className="text-[11px] uppercase tracking-[0.18em] text-[#8a8a7a]">{label}</span>
        <span className="tabular-nums text-lg font-semibold text-[#f0e6c8]">{format(value)}</span>
      </div>
      <div className="relative h-5">
        <div className="absolute left-0 right-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-[#27271f]" />
        <div
          className="absolute left-0 top-1/2 h-[6px] -translate-y-1/2 rounded-full bg-gradient-to-r from-[#c8842a] to-[#f0a832] transition-[width] duration-150"
          style={{ width: `${percentage}%` }}
        />
        <input
          aria-label={label}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(event) => onChange(Number(event.target.value))}
          className="absolute inset-0 z-10 h-5 w-full cursor-pointer opacity-0"
        />
        <span
          className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full border-2 border-[#11110d] bg-[#f0a832] shadow-[0_0_28px_rgba(240,168,50,0.42)] transition-[left] duration-150"
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
      <div className="flex justify-between text-[10px] tabular-nums text-[#555545]">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </label>
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

    return {
      missedCalls,
      lostJobs,
      weeklyLeak,
      monthlyLeak,
      yearlyLeak,
      annualCost,
      netGain,
      roi,
    };
  }, [calls, missRate, jobValue, bookingRate, monthlyCost]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0f0f0b] px-5 py-28 text-[#f0e6c8] sm:px-8 lg:px-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_38%_at_50%_0%,rgba(200,132,42,0.12),transparent_70%)]" />
      <div className="pointer-events-none absolute left-1/2 top-32 h-64 w-64 -translate-x-1/2 rounded-full border border-[#c8842a]/10 blur-3xl" />

      <section className="relative mx-auto max-w-6xl">
        <div
          className={`mx-auto mb-12 max-w-3xl text-center transition-all duration-700 ${
            shown ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
          }`}
        >
          <div className="mb-5 inline-flex rounded border border-[#c8842a]/30 bg-[#c8842a]/10 px-4 py-1 text-[11px] uppercase tracking-[0.18em] text-[#c8842a]">
            Marketech Digital Client Tool
          </div>
          <h1 className="m-0 text-balance text-3xl font-semibold tracking-[-0.03em] text-[#f0e6c8] sm:text-4xl lg:text-5xl">
            Missed Revenue Calculator
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-[#8a8a7a] sm:text-base">
            Help visitors see the cost of missed calls, slow response, and weak lead capture before they book a consultation. This calculator turns your service into a clear business case.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.92fr_1.08fr]">
          <div
            className={`rounded-2xl border border-[#2a2a22] bg-[#161610]/70 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur transition-all delay-100 duration-700 sm:p-8 ${
              shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
            }`}
          >
            <div className="mb-8 flex items-center justify-between gap-4">
              <p className="m-0 text-[11px] uppercase tracking-[0.18em] text-[#c8842a]">Your Numbers</p>
              <p className="m-0 text-xs text-[#6f6f5d]">Interactive estimate</p>
            </div>

            <div className="space-y-8">
              <CalculatorSlider label="Inbound calls per week" value={calls} min={5} max={150} step={5} onChange={setCalls} format={(value) => `${value} calls`} />
              <CalculatorSlider label="Estimated missed-call rate" value={missRate} min={10} max={80} step={5} onChange={setMissRate} format={(value) => `${value}%`} />
              <CalculatorSlider label="Average job value" value={jobValue} min={200} max={5000} step={50} onChange={setJobValue} format={(value) => formatCurrency(value)} />
              <CalculatorSlider label="Booking rate from answered calls" value={bookingRate} min={10} max={80} step={5} onChange={setBookingRate} format={(value) => `${value}%`} />
              <CalculatorSlider label="Estimated monthly system cost" value={monthlyCost} min={500} max={5000} step={100} onChange={setMonthlyCost} format={(value) => formatCurrency(value)} />
            </div>

            <div className="mt-8 rounded-xl border border-[#c8842a]/15 bg-[#c8842a]/[0.06] p-4">
              <p className="m-0 text-xs leading-6 text-[#8a8a7a]">
                Use conservative numbers here. The purpose is not to promise results; it is to help a business owner understand where revenue may be leaking.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div
              className={`relative overflow-hidden rounded-2xl border border-[#c8842a]/40 bg-[linear-gradient(135deg,#1e1a10_0%,#15110a_100%)] p-7 text-center shadow-[0_24px_90px_rgba(200,132,42,0.12)] transition-all delay-200 duration-700 sm:p-9 ${
                shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_0%,rgba(200,132,42,0.16),transparent_72%)]" />
              <div className="relative">
                <p className="m-0 mb-3 text-[11px] uppercase tracking-[0.2em] text-[#c8842a]">Estimated Monthly Revenue Leak</p>
                <div className="text-5xl font-semibold tracking-[-0.06em] text-[#f0a832] sm:text-6xl">
                  <AnimatedNumber value={Math.round(numbers.monthlyLeak)} prefix="$" />
                </div>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#7c7c68]">
                  Potential revenue going to competitors, voicemail, or slow follow-up instead of booked work.
                </p>

                <div className="mt-8 grid grid-cols-3 gap-3 rounded-xl border border-[#2a2a22] bg-[#0f0f0b]/45 p-3">
                  <div className="p-2">
                    <div className="text-2xl font-semibold tabular-nums text-[#f0e6c8]"><AnimatedNumber value={numbers.missedCalls} /></div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#6a6a5a]">missed/week</div>
                  </div>
                  <div className="border-x border-[#2a2a22] p-2">
                    <div className="text-2xl font-semibold tabular-nums text-[#f0e6c8]"><AnimatedNumber value={numbers.lostJobs} /></div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#6a6a5a]">jobs lost/week</div>
                  </div>
                  <div className="p-2">
                    <div className="text-2xl font-semibold tabular-nums text-[#f0e6c8]"><AnimatedNumber value={Math.round(numbers.yearlyLeak / 1000)} prefix="$" suffix="K" /></div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#6a6a5a]">per year</div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className={`rounded-2xl border border-[#2a2a22] bg-[#161610]/70 p-6 backdrop-blur transition-all delay-300 duration-700 sm:p-7 ${
                shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <p className="m-0 mb-5 text-[11px] uppercase tracking-[0.18em] text-[#7ab87a]">If Marketech closes the leak</p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-[#5a7a5a]/20 bg-[#5a7a5a]/10 p-5">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#6a8a6a]">Annual Net Gain</div>
                  <div className={`mt-2 text-3xl font-semibold tabular-nums ${numbers.netGain >= 0 ? "text-[#7ab87a]" : "text-[#c87a7a]"}`}>
                    <AnimatedNumber value={Math.abs(Math.round(numbers.netGain / 1000))} prefix={numbers.netGain >= 0 ? "+$" : "-$"} suffix="K" />
                  </div>
                </div>
                <div className="rounded-xl border border-[#5a7a5a]/20 bg-[#5a7a5a]/10 p-5">
                  <div className="text-[11px] uppercase tracking-[0.12em] text-[#6a8a6a]">Estimated ROI</div>
                  <div className="mt-2 text-3xl font-semibold tabular-nums text-[#7ab87a]">
                    <AnimatedNumber value={Math.max(numbers.roi, 0)} suffix="%" />
                  </div>
                </div>
              </div>
              <p className="m-0 mt-4 rounded-lg bg-[#5a7a5a]/[0.06] p-4 text-xs leading-6 text-[#6f8a6f]">
                This is an estimate only. Real results depend on call volume, offer strength, speed-to-lead, sales process, and local competition.
              </p>
            </div>

            <a
              href="/#contact"
              className={`group flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-gradient-to-r from-[#c8842a] to-[#f0a832] px-6 py-5 text-[#1a1006] shadow-[0_18px_60px_rgba(200,132,42,0.18)] transition-all delay-500 duration-700 hover:-translate-y-0.5 hover:shadow-[0_22px_76px_rgba(200,132,42,0.25)] ${
                shown ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <span>
                <strong className="block text-sm font-semibold">Want this connected to your website?</strong>
                <span className="mt-1 block text-xs text-[#1a1006]/70">Book a free conversion audit with Marketech Digital.</span>
              </span>
              <span className="text-2xl transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>
        </div>

        <div className="mt-7 grid gap-4 sm:grid-cols-3">
          {[
            { stat: "Fast", label: "Makes your value obvious without a sales call" },
            { stat: "Useful", label: "Gives visitors a reason to stay and interact" },
            { stat: "Qualified", label: "Filters prospects by pain, volume, and urgency" },
          ].map((item) => (
            <div key={item.stat} className="rounded-xl border border-[#2a2a22] bg-[#161610]/50 p-5">
              <div className="text-2xl font-semibold text-[#c8842a]">{item.stat}</div>
              <p className="m-0 mt-2 text-xs leading-6 text-[#777764]">{item.label}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
