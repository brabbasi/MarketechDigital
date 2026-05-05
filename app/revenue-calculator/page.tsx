import type { Metadata } from "next";
import RevenueCalculatorClient from "./RevenueCalculatorClient";

export const metadata: Metadata = {
  title: "Missed Revenue Calculator | Marketech Digital",
  description:
    "Estimate how much revenue Ottawa trade and service businesses may be losing from missed calls, slow follow-up, and unconverted inbound demand.",
  alternates: {
    canonical: "/revenue-calculator",
  },
  openGraph: {
    title: "Missed Revenue Calculator | Marketech Digital",
    description:
      "Use Marketech Digital's revenue calculator to estimate missed-call leakage and the potential ROI of faster lead response.",
    url: "/revenue-calculator",
    type: "website",
  },
};

export default function RevenueCalculatorPage() {
  return <RevenueCalculatorClient />;
}
