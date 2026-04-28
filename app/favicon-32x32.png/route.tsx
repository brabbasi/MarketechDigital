import { ImageResponse } from "next/og";
import { FaviconCanvas } from "../seo-image-assets";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(<FaviconCanvas size={32} />, {
    width: 32,
    height: 32
  });
}
