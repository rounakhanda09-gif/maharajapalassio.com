import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { ArrowRight, Instagram, MapPin, Phone } from "lucide-react";
import { img } from "@/lib/assets";
import { absUrl, faqSchema, faqs, ldScript, venueSchema } from "@/lib/seo";
import { CONTACT } from "@/lib/contact";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { Reviews, Stars } from "@/components/Reviews";
import { RATING } from "@/lib/reviews";
import { getGoogleProfile } from "@/lib/google-reviews.functions";
import houseSectionPhoto from "@/assets/house-section-photo.jpg";

export const Route = createFileRoute("/")({
  loader: () => getGoogleProfile(),
  head: () => ({
    meta: [
      { title: "Banquet Hall & Rooftop Restaurant in Batala · Maharaja Palassio" },
      { name: "description", content: "Maharaja Palassio — Sky Garden Restro & Terrace in Batala, Punjab. Banquet hall, ballroom and rooftop garden for weddings, birthdays and multi-cuisine dining. Open daily till 11 PM." },
      { property: "og:title", content: "Maharaja Palassio · Banquet Hall & Sky Garden, Batala" },
      { property: "og:description", content: "Where Batala dines under the sky — and celebrates under chandeliers." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: absUrl("/") },
      { property: "og:image", content: absUrl(img.exterior_night) },

      { name: "twitter:image", content: absUrl(img.exterior_night) },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: absUrl("/") }],
    scripts: [ldScript(venueSchema), ldScript(faqSchema)],
  }),
  component: HomePage,
});

function HomePage() {
  const profile = Route.useLoaderData();
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onScroll = () => {
      if (!heroRef.current) return;
      const y = window.scrollY;
      heroRef.current.style.transform = `translate3d(0, ${y * 0.2}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-[min(760px,100svh)] w-full overflow-hidden bg-charcoal text-ivory">
        <div ref={heroRef} className="absolute inset-0 will-change-transform">
          <img
            src={img.exterior_night}
            alt="Maharaja Palassio illuminated at night"
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[50%_60%]"
          />
          {/* Dark wash — strong behind the header and headline, clear over the building */}
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/90 via-charcoal/25 to-charcoal/95" />
          <div className="absolute inset-x-0 top-0 h-32 bg-charcoal/50" />
        </div>

        <div className="relative z-10 flex min-h-[min(760px,100svh)] flex-col justify-end px-6 pb-28 pt-32 sm:px-12 sm:pb-24">
          <div className="mx-auto w-full max-w-7xl">
            <div className="grid items-end gap-10 md:grid-cols-12">
              <div className="md:col-span-8">
                <p className="eyebrow">Batala · Punjab</p>
                <h1 className="mt-5 font-display text-[44px] sm:text-7xl md:text-[88px] leading-[0.95] text-balance">
                  Where Batala dines
                  <br />
                  <span className="italic text-gold-soft">under the sky.</span>
                </h1>
                <p className="mt-6 max-w-lg text-base sm:text-lg text-ivory/75 leading-relaxed">
                  A sky garden restro, a terrace lit by lanterns, and a banquet hall for the days you'll tell stories about. Maharaja Palassio is built for celebration — quietly grand, warmly familiar.
                </p>
              </div>

              <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 md:items-end">
                <Link
                  to="/menu"
                  className="group inline-flex items-center justify-center gap-2 bg-gold px-7 py-4 text-charcoal text-xs uppercase tracking-[0.22em] hover:bg-gold-soft transition-colors w-full md:w-auto whitespace-nowrap"
                >
                  Explore the Dining
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <a
                  href={CONTACT.phonePrimaryHref}
                  className="inline-flex items-center justify-center gap-2 border border-ivory/40 px-7 py-4 text-xs uppercase tracking-[0.22em] text-ivory hover:bg-ivory hover:text-charcoal transition-colors w-full md:w-auto whitespace-nowrap"
                >
                  Plan a Celebration
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-ivory/50">
          <span className="h-px w-10 bg-ivory/40" />
          Scroll
        </div>
      </section>

      {/* TRUST BAND */}
      <section className="bg-charcoal text-ivory border-t hairline px-6 sm:px-12 py-8">
        <div className="mx-auto max-w-7xl grid gap-6 sm:grid-cols-3 items-center text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-3">
            <Stars value={profile?.rating || RATING.value} size={15} />
            <p className="text-xs tracking-wide text-ivory/75">
              <span className="text-ivory">{(profile?.rating || RATING.value).toFixed(1)}</span> ·{" "}
              {profile?.count || RATING.count} Google reviews
            </p>
          </div>
          <p className="text-xs tracking-[0.18em] uppercase text-ivory/60">
            Open daily · till 11 PM · Free parking
          </p>
          <p className="text-xs tracking-[0.18em] uppercase text-ivory/60 sm:text-right">
            Wheelchair accessible · Family friendly
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 sm:px-12 py-24 sm:py-36">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-12 md:items-stretch md:gap-20">
          <Reveal className="md:col-span-5 md:flex md:h-full md:flex-col">
            <p className="eyebrow">The House</p>
            <div className="gold-rule mt-4 w-16" />
            <img
              src={houseSectionPhoto}
              alt="Elegant lounge and dining room inside Maharaja Palassio"
              loading="lazy"
              decoding="async"
              className="mt-10 hidden min-h-0 w-full flex-1 object-cover md:block"
            />
          </Reveal>
          <Reveal delay={150} className="md:col-span-7">
            <p className="font-display text-3xl sm:text-5xl leading-[1.15] text-balance">
              A venue built for the in-between hours —
              <span className="italic text-gold"> the toasts, the long laughs, the slow walk home.</span>
            </p>
            <p className="mt-8 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
              Set just off the Amritsar–Jalandhar bypass, Maharaja Palassio brings together an open-air sky garden, a candle-lit terrace, and a grand banquet hall. It's where Batala comes for weddings, birthdays, family dinners, and the kind of evenings that don't ask to end.
            </p>
          </Reveal>
        </div>
      </section>

      {/* WHY US — feature strip */}
      <section className="bg-charcoal text-ivory px-6 sm:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">Why Maharaja Palassio</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl max-w-2xl text-balance">
              Made for evenings <span className="italic text-gold-soft">that linger.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-3 border hairline">
            {[
              { n: "01", t: "Open-Air Sky Garden", d: "Terrace dining under garlands of light — Batala's evenings made golden." },
              { n: "02", t: "Banquet & Events", d: "Weddings, birthdays, anniversaries — a hall that knows how to host." },
              { n: "03", t: "Built for Families", d: "Kid-friendly, accessible, LGBTQ+ welcoming. Free parking. Every guest, at home." },
            ].map((f, i) => (
              <Reveal key={f.n} delay={i * 120} className="bg-charcoal p-10 sm:p-12">
                <div className="font-display text-gold text-sm tracking-widest">{f.n}</div>
                <h3 className="mt-6 font-display text-2xl sm:text-3xl">{f.t}</h3>
                <p className="mt-4 text-ivory/65 text-sm leading-relaxed">{f.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EVENTS TEASER */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">Weddings & Events</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl max-w-3xl text-balance leading-[1.05]">
              Four spaces, <span className="italic text-gold">one unforgettable evening.</span>
            </h2>
            <p className="mt-6 max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              The rooftop sky garden for sangeets, the chandeliered ballroom for receptions, the banquet hall for formal dinners, and a floral stage for the ceremony itself.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { image: img.terrace, t: "Sky Garden Terrace", d: "Open-air, under the stars" },
              { image: img.ballroom, t: "Grand Ballroom", d: "Crystal chandeliers, dance floor" },
              { image: img.dining_hall, t: "Banquet Hall", d: "Plated service at the table" },
              { image: img.flower_stage, t: "Ceremony Stage", d: "Floral arch, velvet seating" },
            ].map((c, i) => (
              <Reveal key={c.t} delay={i * 100}>
                <Link to="/events" className="tilt-card group relative block aspect-[3/4] overflow-hidden bg-muted">
                  <img
                    src={c.image}
                    alt={`${c.t} at Maharaja Palassio, Batala`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-ivory">
                    <h3 className="font-display text-2xl leading-snug">{c.t}</h3>
                    <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-gold-soft">{c.d}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <Link
              to="/events"
              className="mt-12 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] border-b border-gold pb-1 hover:text-gold transition"
            >
              Explore weddings & events →
            </Link>
          </Reveal>
        </div>
      </section>

      {/* DINING TEASER */}
      <section className="px-6 sm:px-12 py-24 sm:py-36">
        <div className="mx-auto max-w-7xl grid gap-14 md:grid-cols-12 items-center">
          <Reveal className="md:col-span-6">
            <div className="tilt-card aspect-[4/5] overflow-hidden">
              <img src={img.banquet} alt="Plated banquet service at Maharaja Palassio" className="h-full w-full object-cover" />
            </div>
          </Reveal>
          <Reveal delay={150} className="md:col-span-6">
            <p className="eyebrow">Dining</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl text-balance leading-[1.05]">
              A <span className="italic text-gold">customized Plated Menu Service</span>, written for your evening.
            </h2>
            <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-lg">
              All events at Maharaja Palassio feature a customized Plated Menu Service — designed in conversation with you, tailored to your guest count, and served course by course at the table.
            </p>
            <Link
              to="/menu"
              className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] border-b border-gold pb-1 hover:text-gold transition"
            >
              How our dining works →
            </Link>
          </Reveal>
        </div>

      </section>

      {/* GALLERY STRIP */}
      <section className="bg-secondary px-6 sm:px-12 py-24">
        <div className="mx-auto max-w-7xl grid gap-6 md:grid-cols-12">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">Inside the House</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance">
              Chandeliers, columns, <span className="italic text-gold">and the open sky.</span>
            </h2>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-md">
              From the grand staircase to the rooftop garden, every corner of Maharaja Palassio was made with the next photograph in mind.
            </p>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm uppercase tracking-[0.22em] border-b border-gold pb-1 hover:text-gold transition">
              About the venue →
            </Link>
          </Reveal>
          <Reveal delay={150} className="md:col-span-7">
            <div className="grid grid-cols-3 gap-3">
              <img src={img.chandelier_stair} alt="Crystal chandelier above the curved staircase at Maharaja Palassio, Batala" className="tilt-card col-span-2 row-span-2 aspect-square object-cover w-full h-full" />
              <img src={img.flower_stage} alt="Floral wedding stage set up in the banquet hall" className="tilt-card aspect-square object-cover w-full h-full" />
              <img src={img.ballroom} alt="Chandelier-lit ballroom laid out for a reception" className="tilt-card aspect-square object-cover w-full h-full" />
              <img src={img.terrace} alt="Open-air sky garden terrace seating in the evening" className="tilt-card col-span-3 aspect-[3/1] object-cover w-full h-full" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl text-center">
          <Reveal>
            <p className="eyebrow">Lately, on Instagram</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl text-balance">
              Follow us <span className="italic text-gold">{CONTACT.instagramHandle}</span>
            </h2>
          </Reveal>

          <Reveal delay={150}>
            <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
              {[img.facade, img.staircase, img.blue_lounge, img.terrace].map((src, i) => (
                <a
                  key={i}
                  href={CONTACT.instagram}
                  target="_blank" rel="noopener noreferrer"
                  className="tilt-card relative block aspect-square overflow-hidden group"
                >
                  <img src={src} alt={`Maharaja Palassio on Instagram — venue photo ${i + 1}`} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors grid place-items-center">
                    <Instagram size={28} className="text-ivory opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </a>
              ))}
            </div>

            <a
              href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
              className="mt-12 inline-flex items-center gap-3 border border-foreground px-7 py-4 text-xs uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition"
            >
              <Instagram size={14} /> Follow on Instagram
            </a>
          </Reveal>
        </div>
      </section>

      {/* REVIEWS */}
      <Reviews profile={profile} />

      {/* FAQ */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="eyebrow">Good to know</p>
            <h2 className="mt-4 mb-12 font-display text-4xl sm:text-5xl text-balance">
              Everything guests <span className="italic text-gold">usually ask.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* VISIT BAND */}
      <section className="relative overflow-hidden bg-charcoal text-ivory">
        <img src={img.facade} alt="Lit façade of Maharaja Palassio in Batala, Punjab" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="relative px-6 sm:px-12 py-24 mx-auto max-w-7xl grid gap-12 md:grid-cols-2 items-center">
          <Reveal>
            <p className="eyebrow">Visit Us</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl text-balance">
              Come for an evening.<br />
              <span className="italic text-gold-soft">Stay for the night air.</span>
            </h2>
          </Reveal>
          <Reveal delay={150} className="space-y-6 text-ivory/80">
            <div className="flex gap-4">
              <MapPin className="text-gold mt-1 shrink-0" size={18} />
              <p className="text-sm leading-relaxed">{CONTACT.address}</p>
            </div>
            <div className="flex gap-4">
              <Phone className="text-gold mt-1 shrink-0" size={18} />
              <div className="text-sm">
                <a href={CONTACT.phonePrimaryHref} className="hover:text-gold">{CONTACT.phonePrimary}</a>
                <p className="text-ivory/50 mt-1">{CONTACT.hours}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={CONTACT.mapsDirections} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-gold px-6 py-3 text-charcoal text-xs uppercase tracking-[0.22em] hover:bg-gold-soft transition">
                Get Directions
              </a>
              <Link to="/visit" className="inline-flex items-center gap-2 border border-ivory/40 px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-ivory hover:text-charcoal transition">
                Enquire for Events
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
