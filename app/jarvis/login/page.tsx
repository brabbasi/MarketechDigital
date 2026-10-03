import type { Metadata } from "next";
import FounderLogin from "./FounderLogin";

export const metadata: Metadata = {
  title: "JARVIS Founder Access | Marketech Digital",
  description: "Private Founder authentication surface for the Marketech Digital JARVIS portal.",
  robots: { index: false, follow: false, nocache: true },
};

export default function JarvisFounderLoginPage() {
  return <FounderLogin />;
}
