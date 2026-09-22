import { createFileRoute } from "@tanstack/react-router";

const PAGES: Array<{ path: string; priority: string }> = [
  { path: "/", priority: "1.0" },
  { path: "/events", priority: "0.9" },
  { path: "/visit", priority: "0.9" },
  { path: "/menu", priority: "0.8" },
  { path: "/gallery", priority: "0.7" },
  { path: "/about", priority: "0.7" },
];

/** Origin of the request, so the sitemap is correct on any domain it is served from. */
function originOf(request: Request) {
  const url = new URL(request.url);
  const host = request.headers.get("x-forwarded-host") ?? url.host;
  const proto = request.headers.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = originOf(request);
        const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PAGES.map(
  (p) => `  <url><loc>${origin}${p.path}</loc><priority>${p.priority}</priority></url>`,
).join("\n")}
</urlset>
`;
        return new Response(body, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
