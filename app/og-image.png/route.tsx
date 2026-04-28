import { ImageResponse } from "next/og";
import { OgImage } from "../seo-image-assets";

export const runtime = "edge";

export function GET() {
  return new ImageResponse(<OgImage />, {
    width: 1200,
    height: 630
  });
}
