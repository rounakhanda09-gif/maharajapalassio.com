import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { img } from "@/lib/assets";
import { absUrl } from "@/lib/seo";
import { UtensilsCrossed, Users, ChefHat, Sparkles } from "lucide-react";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Plated Menu Service · Maharaja Palassio · Batala" },
      { name: "description", content: "Every event at Maharaja Palassio features a customized Plated Menu Service, tailored to your guest count and the evening you have in mind." },
      { property: "og:title", content: "Plated Menu Service · Maharaja Palassio" },
      { property: "og:description", content: "A customized plated menu, tailored to your guests." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: absUrl(img.banquet) },
      { name: "twitter:image", content: absUrl(img.banquet) },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absUrl("/menu") },
    ],
    links: [{ rel: "canonical", href: absUrl("/menu") }],
  }),
  component: DiningPage,
});

function DiningPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-24 px-6 sm:px-12 bg-charcoal text-ivory overflow-hidden">
        <img src={img.banquet} alt="Plated banquet service at Maharaja Palassio, Batala" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 via-charcoal/40 to-charcoal" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow">Dining at the Palassio</p>
          <h1 className="mt-5 font-display text-5xl sm:text-7xl md:text-[88px] leading-[0.95] text-balance max-w-5xl">
            A plated menu, <span className="italic text-gold-soft">written for your evening.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base sm:text-lg text-ivory/75 leading-relaxed">
            All events at Maharaja Palassio feature a customized
            <span className="text-gold"> Plated Menu Service</span> — designed in conversation with you, tailored to your guest count, and served course by course at the table.
          </p>
        </div>
      </section>

      {/* INTRO */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl grid gap-14 md:grid-cols-12 items-start">
          <Reveal className="md:col-span-5">
            <p className="eyebrow">How it works</p>
            <div className="gold-rule mt-4 w-16" />
            <p className="mt-8 font-display text-3xl sm:text-4xl leading-[1.15] text-balance">
              No fixed menus. <span className="italic text-gold">Yours, written together.</span>
            </p>
          </Reveal>
          <Reveal delay={150} className="md:col-span-7 space-y-5 text-base sm:text-lg text-muted-foreground leading-relaxed">
            <p>
              From intimate family dinners to large weddings, every gathering at Maharaja Palassio is built around a plated service — courses brought to the table, paced to the evening, portioned to the guest count.
            </p>
            <p>
              Sit with our team, share what the occasion calls for, and we'll compose a menu that suits the room, the season, and your guests' preferences — vegetarian or non-vegetarian, mild or spirited.
            </p>
          </Reveal>
        </div>
      </section>

      {/* PILLARS */}
      <section className="bg-charcoal text-ivory px-6 sm:px-12 py-24">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">What's included</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl max-w-3xl text-balance">
              A service shaped <span className="italic text-gold-soft">around the table.</span>
            </h2>
          </Reveal>

          <div className="mt-16 grid gap-px bg-ivory/10 md:grid-cols-2 lg:grid-cols-4 border hairline">
            {[
              { n: "01", icon: ChefHat, t: "Custom Menu Design", d: "A menu drafted with you — courses, cuisines and pacing chosen for the evening." },
              { n: "02", icon: Users, t: "Tailored to Guest Count", d: "Portions, plating and service staff scaled precisely to the number you're hosting." },
              { n: "03", icon: UtensilsCrossed, t: "Course-by-Course Plating", d: "Each course presented to the guest — no buffet queues, no compromise on warmth." },
              { n: "04", icon: Sparkles, t: "Dietary Care", d: "Vegetarian, Jain, allergen-aware preparations — discussed and confirmed in advance." },
            ].map((f, i) => {
              const Icon = f.icon;
              return (
                <Reveal key={f.n} delay={i * 100} className="bg-charcoal p-10 sm:p-12">
                  <div className="flex items-center justify-between">
                    <Icon size={24} className="text-gold" />
                    <span className="font-display text-gold/70 text-sm tracking-widest">{f.n}</span>
                  </div>
                  <h3 className="mt-8 font-display text-2xl">{f.t}</h3>
                  <p className="mt-4 text-ivory/65 text-sm leading-relaxed">{f.d}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* OCCASIONS */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl">
          <Reveal>
            <p className="eyebrow">Built for every occasion</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl max-w-3xl text-balance">
              The same care, <span className="italic text-gold">whatever the day.</span>
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {[
              { img: img.flower_stage, eyebrow: "Weddings", title: "Sangeets · Receptions · Mehendis" },
              { img: img.ballroom, eyebrow: "Milestone Birthdays", title: "Anniversaries · Engagements" },
              { img: img.dining_hall, eyebrow: "Private Dinners", title: "Family gatherings · Corporate evenings" },
            ].map((c, i) => (
              <Reveal key={c.title} delay={i * 120}>
                <div className="tilt-card relative aspect-[4/5] overflow-hidden bg-muted">
                  <img src={c.img} alt={c.title} className="h-full w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/85 via-charcoal/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 text-ivory">
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold-soft">{c.eyebrow}</p>
                    <h3 className="mt-2 font-display text-2xl leading-snug">{c.title}</h3>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT A MENU LOOKS LIKE */}
      <section className="bg-secondary px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="eyebrow">Cuisines on offer</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl max-w-3xl text-balance">
              Punjabi at heart, <span className="italic text-gold">open to the world.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-muted-foreground leading-relaxed">
              Choose one kitchen or mix several — most evenings here run across two or three.
            </p>
          </Reveal>

          <div className="mt-12 flex flex-wrap gap-3">
            {[
              "Punjabi",
              "Mughlai",
              "North Indian",
              "Indo-Chinese",
              "Continental",
              "Tandoor & grills",
              "Chaat & live counters",
              "Desserts & mithai",
            ].map((c, i) => (
              <Reveal key={c} delay={i * 60}>
                <span className="inline-block border hairline px-5 py-3 text-xs uppercase tracking-[0.2em]">
                  {c}
                </span>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
            <p className="eyebrow mt-20">A typical plated evening</p>
            <div className="gold-rule mt-4 w-16" />
          </Reveal>

          <div className="mt-10 grid gap-px bg-border border hairline md:grid-cols-2">
            {[
              { n: "01", t: "Welcome & soup", d: "Chilled or hot welcome drinks at arrival, followed by a soup of your choosing." },
              { n: "02", t: "Starters", d: "Vegetarian and non-vegetarian tandoor starters, passed at the table or on live counters." },
              { n: "03", t: "Main course", d: "Curries, dals, rice and breads — portioned and paced for the number of guests." },
              { n: "04", t: "Dessert", d: "Indian mithai, hot puddings or a plated dessert to close the evening." },
            ].map((s, i) => (
              <Reveal key={s.n} delay={i * 100} className="bg-background p-9 sm:p-11">
                <span className="font-display text-sm tracking-widest text-gold/70">{s.n}</span>
                <h3 className="mt-5 font-display text-2xl">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.d}</p>
              </Reveal>
            ))}
          </div>

          <p className="mt-8 text-xs text-muted-foreground">
            Indicative only — the final menu, courses and pricing are confirmed with you in person.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary px-6 sm:px-12 py-24 text-center">
        <Reveal>
          <p className="eyebrow">Let's compose your menu</p>
          <h2 className="mt-4 font-display text-4xl sm:text-6xl text-balance max-w-3xl mx-auto">
            Tell us about your evening — <span className="italic text-gold">we'll handle the rest.</span>
          </h2>
          <Link
            to="/visit"
            className="mt-10 inline-flex items-center gap-3 bg-foreground text-background px-10 py-4 text-xs uppercase tracking-[0.22em] hover:bg-gold hover:text-charcoal transition"
          >
            Start an Enquiry →
          </Link>
        </Reveal>
      </section>
    </>
  );
}
