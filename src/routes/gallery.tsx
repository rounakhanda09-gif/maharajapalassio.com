import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { img } from "@/lib/assets";
import { absUrl } from "@/lib/seo";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery · Ballroom, Terrace & Banquet Hall · Maharaja Palassio" },
      {
        name: "description",
        content:
          "Photo gallery of Maharaja Palassio in Batala — the lit façade, crystal ballroom, curved staircase, floral stage and the open-air sky garden terrace.",
      },
      { property: "og:title", content: "Gallery · Maharaja Palassio, Batala" },
      {
        property: "og:description",
        content: "Inside the ballroom, banquet hall and rooftop sky garden terrace.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: absUrl(img.chandelier_stair) },
      { name: "twitter:image", content: absUrl(img.chandelier_stair) },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absUrl("/gallery") },
    ],
    links: [{ rel: "canonical", href: absUrl("/gallery") }],
  }),
  component: GalleryPage,
});

const shots = [
  { src: img.exterior_night, alt: "Maharaja Palassio façade illuminated at night", span: "sm:col-span-2 sm:row-span-2" },
  { src: img.chandelier_stair, alt: "Curved staircase beneath petal glass chandeliers" },
  { src: img.ballroom, alt: "Crystal chandelier under the domed ballroom ceiling" },
  { src: img.terrace, alt: "Open-air sky garden terrace with turf and white pillars", span: "sm:col-span-2" },
  { src: img.flower_stage, alt: "Floral ceremony stage with a red velvet sofa" },
  { src: img.staircase, alt: "High-angle view of the curved balcony and lobby" },
  { src: img.blue_lounge, alt: "Tall windows with blue velvet curtains and royal chairs" },
  { src: img.dining_hall, alt: "Banquet hall laid with long tables and ornate panelling", span: "sm:col-span-2" },
  { src: img.banquet, alt: "Plated banquet service at Maharaja Palassio" },
  { src: img.facade, alt: "Arched entrance and tall windows of Maharaja Palassio" },
];

function GalleryPage() {
  const [active, setActive] = useState<number | null>(null);
  const activeShot = active === null ? undefined : shots[active];

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir: number) =>
      setActive((i) => (i === null ? i : (i + dir + shots.length) % shots.length)),
    [],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [active, close, step]);

  return (
    <>
      <section className="pt-40 pb-14 px-6 sm:px-12 bg-charcoal text-ivory">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow">The gallery</p>
          <h1 className="mt-5 font-display text-[42px] sm:text-7xl leading-[0.95] text-balance max-w-4xl">
            Chandeliers, columns, <span className="italic text-gold-soft">and the open sky.</span>
          </h1>
          <p className="mt-6 max-w-xl text-base text-ivory/70 leading-relaxed">
            Every room at Maharaja Palassio was built with the next photograph in mind. Tap any image to see it full size.
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-12 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 auto-rows-[42vw] sm:auto-rows-[16vw]">
          {shots.map((s, i) => (
            <Reveal key={s.src} delay={(i % 4) * 80} className={s.span ?? ""}>
              <button
                onClick={() => setActive(i)}
                className="tilt-card group relative block h-full w-full overflow-hidden bg-muted"
                aria-label={`Open image: ${s.alt}`}
              >
                <img
                  src={s.src}
                  alt={s.alt}
                  loading={i > 3 ? "lazy" : undefined}
                  decoding="async"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors" />
              </button>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-secondary px-6 sm:px-12 py-20 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-5xl text-balance max-w-2xl mx-auto">
            Prefer to see it <span className="italic text-gold">in person?</span>
          </h2>
          <Link
            to="/visit"
            className="mt-9 inline-flex items-center gap-2 bg-foreground text-background px-9 py-4 text-xs uppercase tracking-[0.22em] hover:bg-gold hover:text-charcoal transition"
          >
            Book a Walkthrough
          </Link>
        </Reveal>
      </section>

      {activeShot && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={close}
          role="dialog"
          aria-modal="true"
          aria-label="Venue photo viewer"
        >
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 text-ivory hover:bg-ivory/10 hover:text-gold"
          >
            <X size={26} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); step(-1); }}
            aria-label="Previous image"
            className="absolute left-2 sm:left-6 text-ivory hover:bg-ivory/10 hover:text-gold"
          >
            <ChevronLeft size={30} />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={(e) => { e.stopPropagation(); step(1); }}
            aria-label="Next image"
            className="absolute right-2 sm:right-6 text-ivory hover:bg-ivory/10 hover:text-gold"
          >
            <ChevronRight size={30} />
          </Button>
          <figure className="max-h-[85vh] max-w-6xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeShot.src}
              alt={activeShot.alt}
              className="max-h-[78vh] max-w-[calc(100vw-5rem)] w-auto object-contain"
            />
            <figcaption className="mt-4 text-center text-xs uppercase tracking-[0.2em] text-ivory/60">
              {activeShot.alt}
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
}
