import type { Metadata } from "next";
import JarvisPortal from "./JarvisPortal";

export const metadata: Metadata = {
  title: "JARVIS Founder Portal",
  description: "Private Marketech Digital founder operating cockpit.",
  robots: { index: false, follow: false, noarchive: true, nocache: true }
};

export const dynamic = "force-dynamic";

export default function JarvisPage() {
  return <JarvisPortal />;
}
