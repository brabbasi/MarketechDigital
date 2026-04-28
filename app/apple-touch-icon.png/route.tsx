import { ImageResponse } from "next/og";
import { FaviconCanvas } from "../seo-image-assets";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(<FaviconCanvas size={180} />, {
    width: 180,
    height: 180
  });
}
