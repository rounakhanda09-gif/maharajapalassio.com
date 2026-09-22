import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { StickyCallBar } from "@/components/StickyCallBar";
import { getGoogleProfile } from "@/lib/google-reviews.functions";
import { Button } from "@/components/ui/button";


function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-charcoal px-6">
      <div className="max-w-lg text-center">
        <p className="eyebrow">Maharaja Palassio</p>
        <h1 className="mt-4 font-display text-5xl sm:text-6xl text-ivory">
          This page has stepped out
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-ivory/70">
          The page you're looking for isn't here — but the terrace, the ballroom and the banquet hall are. Let's take you back.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center bg-gold px-6 py-3 text-xs uppercase tracking-[0.18em] text-charcoal font-medium hover:bg-gold-soft transition-colors"
          >
            Back home
          </Link>
          <Link
            to="/visit"
            className="inline-flex items-center border border-gold/50 px-6 py-3 text-xs uppercase tracking-[0.18em] text-ivory hover:bg-gold/10 transition-colors"
          >
            Enquire for events
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <Button
            type="button"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Maharaja Palassio · Sky Garden Restro & Terrace · Batala" },
      { name: "description", content: "Rooftop sky garden restaurant and banquet hall in Batala, Punjab — for weddings, birthdays and evenings worth remembering." },
      { name: "author", content: "Maharaja Palassio" },
      { name: "theme-color", content: "#1A1714" },
      { property: "og:title", content: "Maharaja Palassio · Sky Garden Restro & Terrace" },
      { property: "og:description", content: "Rooftop garden venue in Batala for weddings, birthdays and private celebrations." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/favicon.png" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  // Live Google Business Profile (name, address, phone, hours, reviews),
  // loaded once and shared by the header, footer and every page.
  loader: () => getGoogleProfile(),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});


function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
        <SiteHeader />
        <main className="min-h-dvh">
          <Outlet />
        </main>
        <div className="pb-14 md:pb-0">
          <SiteFooter />
        </div>
        <StickyCallBar />
    </QueryClientProvider>
  );
}

