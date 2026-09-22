import { CONTACT } from "./contact";
import { img } from "./assets";

/**
 * Live address of the site. Set VITE_SITE_URL (no trailing slash) on the host
 * — Netlify, Lovable, anywhere — once a custom domain is connected, and every
 * canonical link, social preview and sitemap entry follows automatically.
 */
export const SITE_URL = (
  import.meta.env['VITE_SITE_URL'] ?? "https://maharajapalassioevents.netlify.app"
).replace(/\/$/, "");

export const absUrl = (path: string) =>
  path.startsWith("http") ? path : `${SITE_URL}${path}`;
const abs = absUrl;

/** Google-friendly LocalBusiness / EventVenue markup built only from verified facts. */
export const venueSchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "Restaurant", "EventVenue"],
  name: CONTACT.name,
  alternateName: CONTACT.subname,
  url: SITE_URL,
  image: [abs(img.exterior_night), abs(img.ballroom), abs(img.terrace)],
  description:
    "Rooftop sky garden restaurant and banquet hall in Batala, Punjab, hosting weddings, birthdays and private celebrations with a customized plated menu service.",
  servesCuisine: ["Indian", "Punjabi", "Multi-cuisine"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Amritsar–Jalandhar Bypass Road, Buddhe Di Khuhi",
    addressLocality: "Batala",
    addressRegion: "Punjab",
    postalCode: "143505",
    addressCountry: "IN",
  },
  telephone: "+917658035363",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      closes: "23:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.0",
    reviewCount: "139",
  },
  sameAs: [CONTACT.instagram, CONTACT.facebook],
  amenityFeature: [
    "Open-air sky garden",
    "Banquet hall",
    "Free parking",
    "Wheelchair-accessible seating and toilet",
    "Assistive hearing loop",
    "Nursing room",
    "Gender-neutral toilets",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  paymentAccepted: "Cash, Credit Card, Debit Card, Google Pay, NFC mobile payments",
  isAccessibleForFree: false,
};

export const faqs = [
  {
    q: "What kind of events can be hosted at Maharaja Palassio?",
    a: "Weddings and receptions, sangeet and mehendi evenings, engagements, anniversaries, kids' birthdays, family dinners and corporate evenings — across the banquet hall, the ballroom and the open-air sky garden terrace.",
  },
  {
    q: "Is there a fixed menu?",
    a: "No. Every event features a customized Plated Menu Service — the menu is designed in conversation with you, tailored to your guest count, and served course by course at the table.",
  },
  {
    q: "Where exactly is the venue?",
    a: `${CONTACT.address}. It sits just off the Amritsar–Jalandhar bypass, with free parking on site.`,
  },
  {
    q: "What are the opening hours?",
    a: "Open daily, closing at 11 PM.",
  },
  {
    q: "Is the venue accessible and family friendly?",
    a: "Yes — wheelchair-accessible seating and toilet, an assistive hearing loop, gender-neutral toilets, a nursing room, and kid-friendly arrangements for birthdays.",
  },
  {
    q: "How do I book or enquire?",
    a: `Call ${CONTACT.phonePrimary}, message us on WhatsApp, or send the enquiry form on the Visit page — we reply with availability and next steps.`,
  },
];

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const ldScript = (data: unknown) => ({
  type: "application/ld+json",
  children: JSON.stringify(data),
});
