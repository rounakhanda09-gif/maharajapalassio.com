import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { Phone, MapPin, Clock, MessageCircle, Car, Accessibility, Instagram, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { CONTACT } from "@/lib/contact";
import { submitEnquiry } from "@/lib/enquiries.functions";
import { img } from "@/lib/assets";
import { absUrl } from "@/lib/seo";


export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Visit Us · Maharaja Palassio · Batala" },
      { name: "description", content: "Visit Maharaja Palassio on the Amritsar–Jalandhar Bypass in Batala. Open daily until 11 PM. Free parking, fully accessible." },
      { property: "og:title", content: "Visit Maharaja Palassio · Batala" },
      { property: "og:description", content: "Open daily until 11 PM. Free parking, full accessibility, warm service." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: absUrl(img.facade) },
      { name: "twitter:image", content: absUrl(img.facade) },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: absUrl("/visit") },
    ],
    links: [{ rel: "canonical", href: absUrl("/visit") }],
  }),
  component: VisitPage,
});

function VisitPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [waLink, setWaLink] = useState<string | null>(null);
  const send = useServerFn(submitEnquiry);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      eventType: String(fd.get("event") ?? ""),
      preferredDate: String(fd.get("date") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    setSending(true);
    setError(null);
    try {
      const result = await send({ data: payload });
      if (result.ok) {
        const text = [
          `New enquiry for Maharaja Palassio`,
          `Name: ${payload.name}`,
          `Phone: ${payload.phone}`,
          payload.eventType ? `Event: ${payload.eventType}` : null,
          payload.preferredDate ? `Preferred date: ${payload.preferredDate}` : null,
          payload.message ? `Details: ${payload.message}` : null,
        ]
          .filter(Boolean)
          .join("\n");
        setWaLink(`${CONTACT.whatsappHref}?text=${encodeURIComponent(text)}`);
        setSubmitted(true);
      } else setError(result.error);
    } catch {
      setError("Something went wrong. Please call us instead.");
    } finally {
      setSending(false);
    }
  };


  return (
    <>
      {/* HERO */}
      <section className="relative pt-40 pb-20 px-6 sm:px-12 bg-charcoal text-ivory overflow-hidden">
        <img src={img.facade} alt="Entrance façade of Maharaja Palassio on the Amritsar–Jalandhar bypass, Batala" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/50 to-charcoal" />
        <div className="relative mx-auto max-w-7xl">
          <p className="eyebrow">Visit Us</p>
          <h1 className="mt-5 font-display text-5xl sm:text-7xl md:text-[88px] leading-[0.95] text-balance">
            The door's open <span className="italic text-gold-soft">until eleven.</span>
          </h1>
          <p className="mt-6 max-w-xl text-ivory/70 leading-relaxed">
            We're just off the Amritsar–Jalandhar bypass in Batala. Free parking, full accessibility, and someone always at the door to greet you.
          </p>
        </div>
      </section>

      {/* INFO + MAP */}
      <section className="px-6 sm:px-12 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5 space-y-10">
            <div>
              <p className="eyebrow">Address</p>
              <div className="gold-rule mt-3 w-12" />
              <p className="mt-5 font-display text-2xl sm:text-3xl leading-snug">
                {CONTACT.address}
              </p>
              <a
                href={CONTACT.mapsDirections}
                target="_blank" rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 border border-foreground px-6 py-3 text-xs uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition"
              >
                <MapPin size={14} /> Get Directions
              </a>
            </div>

            <div>
              <p className="eyebrow">Hours</p>
              <div className="gold-rule mt-3 w-12" />
              <div className="mt-5 flex items-baseline gap-3">
                <Clock size={18} className="text-gold" />
                <p className="font-display text-2xl">Open daily</p>
              </div>
              <p className="ml-7 text-muted-foreground">Until 11:00 PM</p>
            </div>

            <div>
              <p className="eyebrow">Call · WhatsApp</p>
              <div className="gold-rule mt-3 w-12" />
              <ul className="mt-5 space-y-2">
                {CONTACT.phones.map((p, i) => (
                  <li key={p.label}>
                    <a href={p.href} className="group flex items-center gap-3 py-2">
                      <Phone size={16} className="text-gold" />
                      <span className={`font-display ${i === 0 ? "text-2xl" : "text-lg text-muted-foreground"} group-hover:text-gold transition`}>
                        {p.label}
                      </span>
                      {i === 0 && <span className="text-[10px] uppercase tracking-[0.2em] text-gold ml-2">Primary</span>}
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href={CONTACT.whatsappHref}
                target="_blank" rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 bg-[oklch(0.55_0.15_150)] text-ivory px-6 py-3 text-xs uppercase tracking-[0.22em] hover:opacity-90 transition"
              >
                <MessageCircle size={14} /> Message on WhatsApp
              </a>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-7">
            <div className="aspect-[4/3] lg:aspect-[5/6] w-full overflow-hidden border hairline bg-muted">
              <iframe
                title="Maharaja Palassio on Google Maps"
                src={CONTACT.mapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* AMENITIES */}
      <section className="bg-secondary px-6 sm:px-12 py-20">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-12">
          <Reveal>
            <div className="flex items-center gap-4">
              <Car size={28} className="text-gold" />
              <h2 className="font-display text-3xl">Parking</h2>
            </div>
            <ul className="mt-5 space-y-2 text-muted-foreground">
              <li>Free on-site parking lot</li>
              <li>Free street parking nearby</li>
            </ul>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-center gap-4">
              <Accessibility size={28} className="text-gold" />
              <h2 className="font-display text-3xl">Accessibility</h2>
            </div>
            <ul className="mt-5 space-y-2 text-muted-foreground">
              <li>Wheelchair-accessible entrance & seating</li>
              <li>Wheelchair-accessible restroom</li>
              <li>Assistive hearing loop</li>
              <li>Gender-neutral restroom · Nursing room</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ENQUIRY FORM */}
      <section className="px-6 sm:px-12 py-24 sm:py-32">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <p className="eyebrow text-center">Events & Banquet Enquiries</p>
            <h2 className="mt-4 font-display text-4xl sm:text-6xl text-center text-balance">
              Tell us about <span className="italic text-gold">your day.</span>
            </h2>
            <p className="mt-5 text-center text-muted-foreground max-w-xl mx-auto">
              Weddings, birthdays, anniversaries, corporate evenings — share the details and our team will reach out within a day.
            </p>
          </Reveal>

          <Reveal delay={150}>
            {submitted ? (
              <div className="mt-12 border hairline p-12 text-center">
                <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold text-charcoal">
                  <Check size={24} />
                </div>
                <h3 className="mt-6 font-display text-3xl">Thank you.</h3>
                <p className="mt-3 text-muted-foreground">
                  Your enquiry's with us. Someone from the Palassio team will be in touch shortly. For anything urgent, call{" "}
                  <a href={CONTACT.phonePrimaryHref} className="text-gold hover:underline">{CONTACT.phonePrimary}</a>.
                </p>
                {waLink && (
                  <a
                    href={waLink}
                    target="_blank" rel="noopener noreferrer"
                    className="mt-8 inline-flex items-center gap-2 bg-[oklch(0.55_0.15_150)] text-ivory px-7 py-4 text-xs uppercase tracking-[0.22em] hover:opacity-90 transition"
                  >
                    <MessageCircle size={14} /> Send it on WhatsApp too
                  </a>
                )}
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-12 space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Your Name" name="name" required />
                  <Field label="Phone Number" name="phone" type="tel" required />
                </div>
                <div className="grid sm:grid-cols-2 gap-6">
                  <Field label="Event Type" name="event" placeholder="Wedding, Birthday, etc." />
                  <Field label="Preferred Date" name="date" type="date" />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
                    Tell us more
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    className="w-full bg-transparent border-b hairline py-3 text-foreground focus:outline-none focus:border-gold transition resize-none font-sans"
                    placeholder="Approximate guest count, venue preference, anything else…"
                  />
                </div>
                <div className="pt-4 text-center">
                  {error && (
                    <p role="alert" className="mb-4 text-sm text-[oklch(0.55_0.18_25)]">
                      {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={sending}
                    className="inline-flex items-center gap-3 bg-foreground text-background px-10 py-4 text-xs uppercase tracking-[0.22em] hover:bg-gold hover:text-charcoal transition disabled:opacity-50"
                  >
                    {sending ? "Sending…" : "Send Enquiry →"}
                  </button>
                </div>

              </form>
            )}
          </Reveal>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="bg-charcoal text-ivory px-6 sm:px-12 py-24 text-center">
        <Reveal>
          <p className="eyebrow">Find us on Instagram</p>
          <h2 className="mt-4 font-display text-4xl sm:text-5xl text-balance">
            <span className="italic text-gold-soft">{CONTACT.instagramHandle}</span>
          </h2>
          <a
            href={CONTACT.instagram} target="_blank" rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 border border-ivory/40 px-7 py-4 text-xs uppercase tracking-[0.22em] hover:bg-ivory hover:text-charcoal transition"
          >
            <Instagram size={14} /> Follow on Instagram
          </a>
        </Reveal>
      </section>
    </>
  );
}

function Field({
  label, name, type = "text", required, placeholder,
}: {
  label: string; name: string; type?: string; required?: boolean; placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">
        {label}{required && <span className="text-gold"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-b hairline py-3 text-foreground focus:outline-none focus:border-gold transition font-sans"
      />
    </div>
  );
}
