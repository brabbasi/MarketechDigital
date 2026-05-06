import type { Metadata } from "next";
import TradePilotClient from "./TradePilotClient";

export const metadata: Metadata = {
  title: "TradePilot AI | Missed Lead Recovery for Trades Businesses",
  description:
    "TradePilot AI helps HVAC, plumbing, roofing, and electrical companies recover missed calls, after-hours inquiries, and slow website leads.",
  alternates: { canonical: "/tradepilot" },
  openGraph: {
    title: "TradePilot AI | Missed Lead Recovery for Trades Businesses",
    description:
      "A Marketech Digital missed-lead recovery system for trades businesses that need faster lead response, qualification, follow-up, and warm lead routing.",
    url: "/tradepilot",
    type: "website"
  }
};

export default function TradePilotPage() {
  return <TradePilotClient />;
}
