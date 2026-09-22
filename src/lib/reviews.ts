/**
 * Fallback figures for the guest reviews section.
 *
 * The live rating, review count, business details and quotes come straight
 * from the venue's Google listing (see google-reviews.functions.ts). These
 * These values are only used if Google can't be reached. Testimonials are
 * never fabricated: the site only displays reviews returned by Google.
 */
export const RATING = { value: 4.0, count: 139 };

export {
  GOOGLE_SEARCH_REVIEWS_URL as GOOGLE_REVIEWS_URL,
  GOOGLE_WRITE_REVIEW_URL,
} from "./google-reviews.functions";
