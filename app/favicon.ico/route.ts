import { FAVICON_48_PNG, faviconPngResponse } from "../favicon-assets";

export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  return faviconPngResponse(FAVICON_48_PNG);
}
