const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="192" height="192" viewBox="0 0 192 192" role="img" aria-label="Marketech Digital logo">
  <rect width="192" height="192" fill="#ffffff"/>
  <path d="M154 26A74 74 0 0 0 32 103" fill="none" stroke="#ff4b0b" stroke-width="10" stroke-linecap="butt"/>
  <path d="M158 129A74 74 0 0 1 41 158" fill="none" stroke="#ff4b0b" stroke-width="10" stroke-linecap="butt"/>
  <path d="M43 136V58l55 51 29-27" fill="none" stroke="#2e2e32" stroke-width="18" stroke-linejoin="miter" stroke-linecap="butt"/>
  <path d="M104 75l54-15-15 54-12-24-29 28-31-27v49" fill="none" stroke="#2e2e32" stroke-width="18" stroke-linejoin="miter" stroke-linecap="butt"/>
  <path d="M73 104l27 24 23-21v45" fill="none" stroke="#ff4b0b" stroke-width="18" stroke-linejoin="miter" stroke-linecap="butt"/>
</svg>`;

export const dynamic = "force-static";
export const revalidate = false;

export function GET() {
  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
