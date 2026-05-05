"use client";

import { useMemo, useState } from "react";
import styles from "./RevenueCalculator.module.css";

const money = (value: number) =>
  new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: 0 }).format(value);

function Header() {
  return (
    <header>
      <div className="container navbar">
        <nav className="nav-links" aria-label="Primary navigation">
          <a href="/">Home</a>
          <a href="/audit">Free Audit</a>
          <a href="/revenue-calculator" aria-current="page">Revenue Calculator</a>
          <a href="/insights">Insights</a>
          <a href="/services">Services</a>
        </nav>
        <a className="btn btn-primary btn-small" href="/#contact">Book a consultation</a>
      </div>
    </header>
  );
}

function Slider({ label, value, min, max, step, onChange, format }: { label: string; value: number; min: number; max: number; step: number; onChange: (value: number) => void; format: (value: number) => string }) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className={styles.slider}>
      <span className={styles.sliderHead}><span>{label}</span><strong>{format(value)}</strong></span>
      <span className={styles.track}><span className={styles.fill} style={{ width: `${pct}%` }} /><span className={styles.knob} style={{ left: `calc(${pct}% - 9px)` }} /><input aria-label={label} type="range" min={min} max={max} step={step} value={value} onChange={(event) => onChange(Number(event.target.value))} /></span>
      <span className={styles.range}><span>{format(min)}</span><span>{format(max)}</span></span>
    </label>
  );
}

export default function RevenueCalculatorClient() {
  const [calls, setCalls] = useState(30);
  const [missRate, setMissRate] = useState(35);
  const [jobValue, setJobValue] = useState(650);
  const [bookingRate, setBookingRate] = useState(40);
  const [monthlyCost, setMonthlyCost] = useState(1400);

  const numbers = useMemo(() => {
    const missedCalls = Math.round(calls * (missRate / 100));
    const lostJobs = Math.round(missedCalls * (bookingRate / 100));
    const weeklyLeak = missedCalls * jobValue * (bookingRate / 100);
    const monthlyLeak = Math.round(weeklyLeak * 4.3);
    const yearlyLeak = Math.round(weeklyLeak * 52);
    const netGain = yearlyLeak - monthlyCost * 12;
    const roi = Math.max(0, Math.round((netGain / (monthlyCost * 12)) * 100));
    return { missedCalls, lostJobs, monthlyLeak, yearlyLeak, netGain, roi };
  }, [calls, missRate, jobValue, bookingRate, monthlyCost]);

  return (
    <>
      <Header />
      <main className={styles.page}>
        <section className={styles.shell}>
          <div className={styles.hero}>
            <div className="label"><span className="dot" />Marketech Digital Client Tool</div>
            <h1>Missed Revenue Calculator</h1>
            <p>See how much revenue can disappear through missed calls, slow response, and weak lead capture before a consultation is ever booked.</p>
          </div>

          <div className={styles.grid}>
            <div className={styles.card}>
              <div className={styles.cardHead}><span>Your Numbers</span><small>Interactive estimate</small></div>
              <Slider label="Inbound calls per week" value={calls} min={5} max={150} step={5} onChange={setCalls} format={(v) => `${v} calls`} />
              <Slider label="Estimated missed-call rate" value={missRate} min={10} max={80} step={5} onChange={setMissRate} format={(v) => `${v}%`} />
              <Slider label="Average job value" value={jobValue} min={200} max={5000} step={50} onChange={setJobValue} format={money} />
              <Slider label="Booking rate from answered calls" value={bookingRate} min={10} max={80} step={5} onChange={setBookingRate} format={(v) => `${v}%`} />
              <Slider label="Estimated monthly system cost" value={monthlyCost} min={500} max={5000} step={100} onChange={setMonthlyCost} format={money} />
              <p className={styles.note}>Use conservative numbers. This does not promise results; it shows where revenue may already be leaking.</p>
            </div>

            <div className={styles.results}>
              <div className={`${styles.card} ${styles.total}`}>
                <span>Estimated Monthly Revenue Leak</span>
                <strong>{money(numbers.monthlyLeak)}</strong>
                <p>Potential revenue going to competitors, voicemail, or slow follow-up instead of booked work.</p>
                <div className={styles.miniGrid}>
                  <div><b>{numbers.missedCalls}</b><small>missed/week</small></div>
                  <div><b>{numbers.lostJobs}</b><small>jobs lost/week</small></div>
                  <div><b>{money(Math.round(numbers.yearlyLeak / 1000))}K</b><small>per year</small></div>
                </div>
              </div>

              <div className={styles.card}>
                <div className={`${styles.cardHead} ${styles.blue}`}><span>If Marketech closes the leak</span></div>
                <div className={styles.two}>
                  <div><small>Annual Net Gain</small><strong>{numbers.netGain >= 0 ? "+" : "-"}{money(Math.abs(Math.round(numbers.netGain / 1000)))}K</strong></div>
                  <div><small>Estimated ROI</small><strong>{numbers.roi}%</strong></div>
                </div>
                <p className={`${styles.note} ${styles.blueNote}`}>Real results depend on call volume, offer strength, speed-to-lead, sales process, and local competition.</p>
              </div>

              <a className={`btn btn-primary ${styles.cta}`} href="/#contact"><span><b>Want this connected to your website?</b><small>Book a free conversion audit with Marketech Digital.</small></span><i>→</i></a>
            </div>
          </div>

          <div className={styles.benefits}>
            <div><strong>Fast</strong><p>Makes your value obvious without a sales call.</p></div>
            <div><strong>Useful</strong><p>Gives visitors a reason to stay and interact.</p></div>
            <div><strong>Qualified</strong><p>Filters prospects by pain, volume, and urgency.</p></div>
          </div>
        </section>
      </main>
    </>
  );
}
