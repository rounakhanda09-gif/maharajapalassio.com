import { createServerFn } from "@tanstack/react-start";

/**
 * Live Google Business Profile data for Maharaja Palassio — name, address,
 * phone, opening hours, rating and reviews — pulled through the Lovable
 * Google Maps connector gateway (Places API New).
 *
 * The place id is fixed, so this endpoint takes no user input. Results are
 * cached in memory for 6 hours to keep Google usage to a few calls a day.
 */
export const PLACE_ID = "ChIJW3b0gBPDGzkRXrw69B-nkW8";

/** Final client-approved Google Maps reviews destination. Do not change its format. */
export const GOOGLE_SEARCH_REVIEWS_URL =
  "https://www.google.com/maps/search/?api=1&query=Maharaja+Palassio+Batala&query_place_id=ChIJW3b0gBPDGzkRXrw69B-nkW8";
export const GOOGLE_WRITE_REVIEW_URL = GOOGLE_SEARCH_REVIEWS_URL;

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  when: string;
  photo: string | null;
  url: string;
};

export type GoogleBusiness = {
  name: string | null;
  address: string | null;
  phone: string | null;
  phoneHref: string | null;
  hours: string[];
  openNow: boolean | null;
};

export type GoogleProfile = {
  rating: number;
  count: number;
  mapsUrl: string;
  reviewsUrl: string;
  business: GoogleBusiness;
  reviews: GoogleReview[];
};

const CACHE_MS = 6 * 60 * 60 * 1000;
let cache: { at: number; data: GoogleProfile } | null = null;

const ANURAG_REVIEW: GoogleReview = {
  quote: "Brand new.. Perfect location..Nice manager!!",
  name: "Anurag Samuel Chaudhary",
  rating: 5,
  when: "3 years ago",
  photo: null,
  url: "https://www.google.com/maps/contrib/103009745270297297220/reviews?hl=en-US",
};

/**
 * The three genuine Google reviews the client approved, stored verbatim so the
 * section always renders — on Netlify, on the final domain, and any time Google
 * cannot be reached. Live Google data still takes precedence when available.
 */
const FALLBACK_REVIEWS: GoogleReview[] = [
  {
    quote:
      "We booked this venue over the phone from overseas. We met the manager after 4 months of booking. The manager is very friendly, approachable and understands the need of the function very well. We had a great wedding function. Top service and quality of food was amazing. Thanks to all for making our function successful.",
    name: "bhavnitsingh3",
    rating: 5,
    when: "2 years ago",
    photo: null,
    url: GOOGLE_SEARCH_REVIEWS_URL,
  },
  {
    quote:
      "Maharaja Palassio, with its stunning sky garden and terrace, offers a unique and memorable dining experience in Batala. The ambiance is elegant and sophisticated, perfect for special occasions. The menu features a diverse range of cuisines, and the service is impeccable, with attentive staff ensuring a seamless evening.",
    name: "Nirpal Singh",
    rating: 4,
    when: "a year ago",
    photo: null,
    url: GOOGLE_SEARCH_REVIEWS_URL,
  },
  ANURAG_REVIEW,
];

/** Rating and business details shown when live Google data is unavailable. */
const FALLBACK_PROFILE: GoogleProfile = {
  rating: 4.0,
  count: 140,
  mapsUrl: GOOGLE_SEARCH_REVIEWS_URL,
  reviewsUrl: GOOGLE_SEARCH_REVIEWS_URL,
  business: {
    name: null,
    address: null,
    phone: null,
    phoneHref: null,
    hours: [],
    openNow: null,
  },
  reviews: FALLBACK_REVIEWS,
};

/** Always hand the page three reviews: live ones first, approved ones to fill. */
function withThreeReviews(reviews: GoogleReview[]): GoogleReview[] {
  const out = [...reviews];
  for (const fb of FALLBACK_REVIEWS) {
    if (out.length >= 3) break;
    if (!out.some((r) => r.name === fb.name)) out.push(fb);
  }
  return out.slice(0, 3);
}


/** Collapse whitespace, cap length. Output is rendered as text by React. */
function clean(text: string, max = 340) {
  const s = text.replace(/\s+/g, " ").trim();
  if (s.length <= max) return s;
  const cut = s.slice(0, max);
  return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

/** Only ever hand the browser a plain https URL (no javascript:/data: payloads). */
function safeHttps(url: unknown): string | null {
  if (typeof url !== "string") return null;
  try {
    const u = new URL(url);
    return u.protocol === "https:" ? u.toString() : null;
  } catch {
    return null;
  }
}

function telHref(phone: string | null): string | null {
  if (!phone) return null;
  const digits = phone.replace(/[^\d+]/g, "");
  return digits.length >= 8 ? `tel:${digits}` : null;
}

export const getGoogleProfile = createServerFn({ method: "GET" }).handler(
  async (): Promise<GoogleProfile | null> => {
    if (cache && Date.now() - cache.at < CACHE_MS) return cache.data;

    const lovableKey = process.env["LOVABLE_API_KEY"];
    const mapsKey = process.env["GOOGLE_MAPS_API_KEY"];
    if (!lovableKey || !mapsKey) return cache?.data ?? FALLBACK_PROFILE;

    try {
      const res = await fetch(
        `https://connector-gateway.lovable.dev/google_maps/places/v1/places/${PLACE_ID}`,
        {
          headers: {
            Authorization: `Bearer ${lovableKey}`,
            "X-Connection-Api-Key": mapsKey,
            "X-Goog-FieldMask": [
              "displayName",
              "formattedAddress",
              "nationalPhoneNumber",
              "internationalPhoneNumber",
              "regularOpeningHours",
              "rating",
              "userRatingCount",
              "googleMapsUri",
              "reviews",
            ].join(","),
          },
        },
      );

      if (!res.ok) {
        console.error(`Google Places request failed [${res.status}]: ${await res.text()}`);
        return cache?.data ?? FALLBACK_PROFILE;
      }

      const json = (await res.json()) as {
        displayName?: { text?: string };
        formattedAddress?: string;
        nationalPhoneNumber?: string;
        internationalPhoneNumber?: string;
        regularOpeningHours?: { openNow?: boolean; weekdayDescriptions?: string[] };
        rating?: number;
        userRatingCount?: number;
        googleMapsUri?: string;
        reviews?: Array<{
          rating?: number;
          relativePublishTimeDescription?: string;
          text?: { text?: string };
          originalText?: { text?: string };
          authorAttribution?: { displayName?: string; photoUri?: string };
          googleMapsUri?: string;
        }>;
      };

      const mapsUrl =
        safeHttps(json.googleMapsUri) ??
        `https://www.google.com/maps/place/?q=place_id:${PLACE_ID}`;

      const all: GoogleReview[] = (json.reviews ?? [])
        .map((r) => ({
          quote: clean(r.text?.text ?? r.originalText?.text ?? ""),
          name: clean(r.authorAttribution?.displayName ?? "Google guest", 60),
          rating: typeof r.rating === "number" ? r.rating : 0,
          when: clean(r.relativePublishTimeDescription ?? "", 40),
          photo: safeHttps(r.authorAttribution?.photoUri),
          url: safeHttps(r.googleMapsUri) ?? mapsUrl,
        }))
        .filter((r) => r.quote.length > 40);

      // Anurag's genuine five-star review is client-selected. Keep it available
      // even when Places' five-review sample does not include it.
      const selected = all.filter((r) => r.name !== "Pawan SUN Infocom");
      const five = selected.filter((r) => r.rating === 5);
      const four = selected.filter((r) => r.rating === 4);
      const picked = [...five, ...four].slice(0, 2);
      if (!picked.some((r) => r.name === ANURAG_REVIEW.name)) {
        picked.push(ANURAG_REVIEW);
      }
      const reviews = withThreeReviews(picked);

      const phone = json.nationalPhoneNumber ?? json.internationalPhoneNumber ?? null;

      const data: GoogleProfile = {
        rating: json.rating ?? 0,
        count: json.userRatingCount ?? 0,
        mapsUrl,
        reviewsUrl: GOOGLE_SEARCH_REVIEWS_URL,
        business: {
          name: json.displayName?.text ? clean(json.displayName.text, 80) : null,
          address: json.formattedAddress ? clean(json.formattedAddress, 200) : null,
          phone: phone ? clean(phone, 40) : null,
          phoneHref: telHref(json.internationalPhoneNumber ?? phone),
          hours: (json.regularOpeningHours?.weekdayDescriptions ?? [])
            .slice(0, 7)
            .map((d) => clean(d, 80)),
          openNow: json.regularOpeningHours?.openNow ?? null,
        },
        reviews,
      };

      cache = { at: Date.now(), data };
      return data;
    } catch (err) {
      console.error("Google Places request errored", err);
      return cache?.data ?? FALLBACK_PROFILE;
    }
  },
);
