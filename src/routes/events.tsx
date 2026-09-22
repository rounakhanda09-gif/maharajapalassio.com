import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FaqAccordion } from "@/components/FaqAccordion";
import { img } from "@/lib/assets";
import { absUrl, faqSchema, faqs, ldScript } from "@/lib/seo";
import { CONTACT } from "@/lib/contact";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Weddings & Events · Banquet Hall in Batala · Maharaja Palassio" },
      {
        name: "description",
        content:
          "Host weddings, receptions, sangeets, birthdays and corporate evenings at Maharaja Palassio — banquet hall, ballroom and open-air sky garden terrace in Batala, Punjab.",
      },
      { property: "og:title", content: "Weddings & Events at Maharaja Palassio, Batala" },
      {
        property: "og:description",
        content:
          "Banquet hall, ballroom and rooftop sky garden for weddings, birthdays and private celebrations in Batala.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: absUrl(img.flower_stage) },
      { name: "twitter:image", content: absUrl(img.flower_stage) },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absUrl("/events") },
    ],
    links: [{ rel: "canonical", href: absUrl("/events") }],
    scripts: [ldScript(faqSchema)],
  }),
  component: EventsPage,
});

const spaces = [
  {
    name: "The Sky Garden Terrace",
    image: img.terrace,
    eyebrow: "Open air",
    copy:
      "Green turf, white pillars and open sky — made for evening receptions, sangeets and relaxed cocktail hours as the light drops.",
    best: "Sangeets · Cocktail evenings · Birthday parties",
  },
  {
    name: "The Grand Ballroom",
    image: img.ballroom,
    eyebrow: "Indoors",
    copy:
      "Crystal chandeliers under a domed ceiling, long dining tables and room to dance — the room reserved for the big night.",
    best: "Wedding receptions · Anniversaries",
  },
  {
    name: "The Banquet Hall",
    image: img.dining_hall,
    eyebrow: "Indoors",
    copy:
      "Ornate panelling, tall curtained windows and plated service at the table — formal without feeling stiff.",
    best: "Engagements · Corporate dinners · Family functions",
  },
  {
    name: "The Stage & Lobby",
    image: img.flower_stage,
    eyebrow: "Ceremonial",
    copy:
      "A floral stage, a velvet seat, and a curved staircase behind it — the backdrop your photographer will thank you for.",
    best: "Varmala · Ring ceremonies · Portraits",
  },
];

const occasions = [
  { t: "Weddings & Receptions", d: "Baraat welcome, varmala stage, plated dinner service and a ballroom for the dance floor." },
  { t: "Sangeet & Mehendi", d: "Terrace under lights, seating in the round, and a menu paced for a long, loud, happy evening." },
  { t: "Engagements & Anniversaries", d: "Intimate room settings with a ceremonial stage and course-by-course service." },
  { t: "Kids' Birthdays", d: "Kid-friendly arrangements, a nursing room on site, and space for activities and cake." },
  { t: "Corporate Evenings", d: "Quiet hall, formal plating and free parking for arriving guests." },
  { t: "Family Dinners", d: "Rooftop dining any evening of the week, open daily until 11 PM." },
];

const steps = [
  { n: "01", t: "Tell us the date", d: "Call or send the enquiry form with your date, occasion and rough guest count." },
  { n: "02", t: "Walk the spaces", d: "Visit the terrace, ballroom and hall, and pick what suits the evening you're imagining." },
  { n: "03", t: "Compose the menu", d: "We draft your customized Plated Menu Service together — vegetarian, non-vegetarian, Jain or allergen-aware." },
  { n: "04", t: "Confirm and celebrate", d: "Details locked, staffing scaled to your guest count, and the room ready before your first guest arrives." },
];

function EventsPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 sm:px-12 bg-charcoal text-ivory overflow-hidden">
        <img
          src={img.flower_stage}
          alt="Floral ceremony stage set inside Maharaja Palassio"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/85 via-charcoal/55 to-charcoal" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow">Weddings · Celebrations · Private events</p>
          <h1 className="mt-5 font-display text-[42px] sm:text-7xl md:text-[86px] leading-[0.95] text-balance max-w-5xl">
            One venue, <span className="italic text-gold-soft">four ways to celebrate.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base sm:text-lg text-ivory/75 leading-relaxed">
            {"A rooftop sky garden, a chandeliered ballroom, a banquet hall and a ceremonial stage — all under one roof on the Amritsar–Jalandhar bypass in Batala, with free parking and plated service throughout."}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              to="/visit"
              className="group inline-flex items-center gap-2 bg-gold px-7 py-4 text-charcoal text-xs uppercase tracking-[0.22em] hover:bg-gold-soft transition"
            >
              Check Your Date
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href={CONTACT.phonePrimaryHref}
              className="inline-flex items-center gap-2 border border-ivory/40 px-7 py-4 text-xs uppercase tracking-[0.22em] hover:bg-ivory hover:text-charcoal transition"
            >
              <Phone size={14} /> {CONTACT.phonePrimary}
            </a>
          </div>
        </div>
      </section>

      {/* SPACES */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">The spaces</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl max-w-3xl text-balance leading-[1.05]">
              Choose the room <span className="italic text-gold">that fits the evening.</span>
            </h2>
          </Reveal>

          <div className="mt-16 space-y-20 sm:space-y-28">
            {spaces.map((s, i) => (
              <Reveal key={s.name}>
                <div
                  className={`grid gap-8 md:grid-cols-12 md:gap-14 items-center ${
                    i % 2 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className="md:col-span-7">
                    <div className="tilt-card aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={s.image}
                        alt={`${s.name} at Maharaja Palassio, Batala`}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-5">
                    <p className="eyebrow">{s.eyebrow}</p>
                    <h3 className="mt-3 font-display text-3xl sm:text-4xl leading-tight text-balance">
                      {s.name}
                    </h3>
                    <div className="gold-rule mt-6 w-16" />
                    <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                      {s.copy}
                    </p>
                    <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold">
                      Best for
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground">{s.best}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="bg-charcoal text-ivory px-6 sm:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">Occasions we host</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl max-w-3xl text-balance">
              From the loudest night <span className="italic text-gold-soft">to the quietest one.</span>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-px bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3 border hairline">
            {occasions.map((o, i) => (
              <Reveal key={o.t} delay={i * 80} className="bg-charcoal p-9 sm:p-10">
                <h3 className="font-display text-2xl">{o.t}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ivory/65">{o.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl grid gap-14 md:grid-cols-12">
          <Reveal className="md:col-span-4">
            <p className="eyebrow">How booking works</p>
            <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance leading-[1.05]">
              Four conversations, <span className="italic text-gold">then it's handled.</span>
            </h2>
          </Reveal>
          <div className="md:col-span-8 md:col-start-6 divide-y divide-border border-t border-border">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 90} className="py-8 flex gap-8">
                <span className="font-display text-gold text-sm tracking-widest pt-1">{s.n}</span>
                <div>
                  <h3 className="font-display text-2xl">{s.t}</h3>
                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-muted-foreground max-w-xl">
                    {s.d}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-secondary px-6 sm:px-12 py-24">
        <div className="mx-auto max-w-4xl">
          <Reveal>
            <p className="eyebrow">Questions, answered</p>
            <h2 className="mt-4 mb-12 font-display text-4xl sm:text-5xl text-balance">
              Before you <span className="italic text-gold">enquire.</span>
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <FaqAccordion items={faqs} />
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-charcoal text-ivory px-6 sm:px-12 py-24 text-center">
        <Reveal>
          <p className="eyebrow">Plan your celebration</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl text-balance max-w-3xl mx-auto">
            Tell us the date. <span className="italic text-gold-soft">We'll hold the evening.</span>
          </h2>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link
              to="/visit"
              className="inline-flex items-center gap-2 bg-gold px-9 py-4 text-charcoal text-xs uppercase tracking-[0.22em] hover:bg-gold-soft transition"
            >
              Send an Enquiry
            </Link>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ivory/40 px-9 py-4 text-xs uppercase tracking-[0.22em] hover:bg-ivory hover:text-charcoal transition"
            >
              WhatsApp Us
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
