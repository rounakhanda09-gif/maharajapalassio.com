import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { img } from "@/lib/assets";
import { absUrl } from "@/lib/seo";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · Maharaja Palassio · Sky Garden Restro & Terrace" },
      { name: "description", content: "Maharaja Palassio is Batala's rooftop garden venue — built for weddings, birthdays, family dinners and evenings worth remembering." },
      { property: "og:title", content: "About Maharaja Palassio" },
      { property: "og:description", content: "Batala's sky garden venue — for the days you'll tell stories about." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: absUrl(img.chandelier_stair) },
      { name: "twitter:image", content: absUrl(img.chandelier_stair) },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absUrl("/about") },
    ],
    links: [{ rel: "canonical", href: absUrl("/about") }],
  }),
  component: AboutPage,
});

const GALLERY = [
  { src: img.chandelier_stair, alt: "Grand chandelier above the central staircase" },
  { src: img.ballroom, alt: "Ballroom with crystal chandeliers" },
  { src: img.dining_hall, alt: "Main dining hall with blue upholstered chairs" },
  { src: img.blue_lounge, alt: "Lounge with sapphire blue drapery" },
  { src: img.flower_stage, alt: "Wedding stage dressed in florals" },
  { src: img.terrace, alt: "Open-air sky garden terrace" },
];

function AboutPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 sm:px-12 bg-charcoal text-ivory overflow-hidden">
        <img src={img.chandelier_stair} alt="Crystal chandelier above the curved staircase at Maharaja Palassio" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/40 to-charcoal" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow">About the House</p>
          <h1 className="mt-5 font-display text-5xl sm:text-7xl md:text-[88px] leading-[0.95] text-balance max-w-4xl">
            A rooftop garden, <span className="italic text-gold-soft">a banquet hall, an open sky.</span>
          </h1>
        </div>
      </section>

      {/* STORY */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl grid gap-16 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">Our Story</p>
            <div className="gold-rule mt-4 w-16" />
            <p className="mt-8 font-display text-3xl sm:text-4xl italic text-gold leading-tight">
              "We didn't set out to build a restaurant. We set out to build a place worth coming back to."
            </p>
          </Reveal>
          <div className="md:col-span-7 space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <Reveal delay={120}>
              <p>
                Maharaja Palassio sits just off the Amritsar–Jalandhar bypass in Batala — a venue equal parts rooftop sky garden, terrace restaurant, and grand banquet hall. The brief, from the very beginning, was simple: build a place that holds the small evenings and the big ones with the same grace.
              </p>
            </Reveal>
            <Reveal delay={200}>
              <p>
                Inside, columns of travertine meet sapphire-blue drapery and chandeliers the size of full moons. Step outside and you're on the terrace — garlands of warm light, planters of green, and the long Punjab sky overhead. It's where families dine on Sundays, where birthdays glow with candles, and where weddings turn into stories.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* AMBIANCE - SPLIT */}
      <section className="bg-secondary px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl grid gap-12 md:grid-cols-2 items-center">
          <Reveal>
            <div className="tilt-card aspect-[4/5] overflow-hidden">
              <img src={img.terrace} alt="Open-air sky garden seating" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <p className="eyebrow">The Sky Garden</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance">
              An evening outdoors, <span className="italic text-gold">without leaving town.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              The terrace is the soul of the house — lawn underfoot, planters of green at eye-level, lanterns strung overhead. Come for chai at sundown or stay through dinner. The light here is at its kindest after seven.
            </p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-7xl mt-24 grid gap-12 md:grid-cols-2 items-center">
          <Reveal className="md:order-2">
            <div className="tilt-card aspect-[4/5] overflow-hidden">
              <img src={img.ballroom} alt="Banquet hall with chandeliers" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={120} className="md:order-1">
            <p className="eyebrow">The Banquet Hall</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance">
              A hall that knows <span className="italic text-gold">how to host.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              Weddings, engagements, anniversaries, milestone birthdays — the banquet wing is built for the gatherings that deserve grand rooms and quiet, attentive service. Tell us the date; we'll handle the room.
            </p>
          </Reveal>
        </div>
      </section>

      {/* HOSPITALITY */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow text-center">Hospitality</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl text-center text-balance max-w-3xl mx-auto">
              Built for <span className="italic text-gold">every guest.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Family-First", d: "Kid-friendly menus, space to play, a nursing room when you need it." },
              { t: "Fully Accessible", d: "Wheelchair-accessible entrance, seating, and restrooms. Assistive hearing loop available." },
              { t: "Open to All", d: "LGBTQ+ welcoming. Gender-neutral restroom. Every guest, at home." },
              { t: "Free Parking", d: "Dedicated parking lot plus free street parking — leave the keys, take the evening." },
              { t: "Dine-In Service", d: "Reservations recommended on weekends. Walk-ins always welcome." },
              { t: "Easy Payments", d: "Credit, debit, Google Pay, NFC — Amex, Diners, Discover, Mastercard, Visa." },
            ].map((f, i) => (
              <Reveal key={f.t} delay={i * 80}>
                <div className="border-t hairline pt-6">
                  <h3 className="font-display text-2xl">{f.t}</h3>
                  <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{f.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="px-6 sm:px-12 pb-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">Around the House</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance max-w-2xl">
              A few corners <span className="italic text-gold">worth lingering in.</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((g, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="tilt-card aspect-square overflow-hidden">
                  <img src={g.src} alt={g.alt} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-ivory px-6 sm:px-12 py-24 text-center">
        <Reveal>
          <p className="eyebrow">Bring us your day</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl text-balance max-w-3xl mx-auto">
            Plan your celebration <span className="italic text-gold-soft">with us.</span>
          </h2>
          <Link
            to="/visit"
            className="mt-10 inline-flex items-center gap-2 bg-gold text-charcoal px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-gold-soft transition"
          >
            Start an Enquiry →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
