import { Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/maharaja-palassio-header-logo.png";

const links = [
  { to: "/", label: "Home" },
  { to: "/events", label: "Events" },
  { to: "/menu", label: "Dining" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/visit", label: "Visit" },
] as const;


export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b hairline transition-all duration-500 ${
        scrolled
          ? "bg-charcoal/95 backdrop-blur-md py-3 shadow-lg shadow-charcoal/20"
          : "bg-charcoal/75 backdrop-blur-sm py-4"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link to="/" aria-label="Maharaja Palassio home" className="flex shrink-0 items-center">
          <img
            src={logo}
            alt="Maharaja Palassio"
            className="h-auto w-28 object-contain sm:w-32 lg:w-36"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => {
            const active = pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`relative text-sm tracking-wide transition-colors ${
                  active ? "text-gold-soft" : "text-ivory hover:text-gold-soft"
                }`}
              >
                {l.label}
                <span
                  className={`absolute -bottom-1.5 left-0 h-px bg-gold-soft transition-all duration-300 ${
                    active ? "w-full" : "w-0"
                  }`}
                />
              </Link>
            );
          })}
          <a
            href="tel:+917658035363"
            className="inline-flex items-center bg-gold px-5 py-2 text-xs uppercase tracking-[0.18em] text-charcoal font-medium hover:bg-gold-soft transition-colors"
          >
            Reserve
          </a>
        </nav>

        <div className="flex items-center gap-3 md:hidden">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            className="-mr-2 text-ivory hover:bg-ivory/10 hover:text-ivory"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t hairline bg-charcoal/97 backdrop-blur-lg">
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col px-6 py-6 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="py-3 font-display text-2xl text-ivory border-b hairline last:border-0"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="tel:+917658035363"
              className="mt-4 inline-flex items-center justify-center bg-gold px-5 py-3 text-xs uppercase tracking-[0.2em] text-charcoal font-medium"
            >
              Reserve · 076580 35363
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
