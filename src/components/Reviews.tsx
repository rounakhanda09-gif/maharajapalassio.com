import { Star, Quote, ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GOOGLE_REVIEWS_URL, RATING } from "@/lib/reviews";
import type { GoogleProfile } from "@/lib/google-reviews.functions";

/** Five stars filled to the exact rating, e.g. 4.1 fills the fourth star partly. */
export function Stars({ value, size = 16 }: { value: number; size?: number }) {
  const pct = Math.max(0, Math.min(100, (value / 5) * 100));
  return (
    <span
      className="relative inline-flex"
      role="img"
      aria-label={`${value} out of 5 stars`}
    >
      <span className="flex text-ivory/25" aria-hidden="true">
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} />
        ))}
      </span>
      <span
        className="absolute inset-0 flex overflow-hidden text-gold"
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      >
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} size={size} fill="currentColor" strokeWidth={0} className="shrink-0" />
        ))}
      </span>
    </span>
  );
}

export function Reviews({ profile }: { profile?: GoogleProfile | null }) {
  const rating = profile?.rating || RATING.value;
  const count = profile?.count || RATING.count;
  // Keep this client-approved destination fixed, regardless of live profile data.
  const reviewsUrl = GOOGLE_REVIEWS_URL;

  // The server returns Google's strongest authentic reviews, ordered with
  // five-star reviews first and four-star reviews as a fallback.
  const reviews = (profile?.reviews ?? []).slice(0, 3);

  return (
    <section className="bg-charcoal text-ivory px-6 sm:px-12 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="eyebrow">In their words</p>
          <div className="mt-4 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display text-4xl sm:text-6xl max-w-2xl text-balance">
              Evenings guests <span className="italic text-gold-soft">still talk about.</span>
            </h2>
            <div className="flex items-center gap-3">
              <Stars value={rating} />
              <p className="text-xs tracking-wide text-ivory/70">
                <span className="text-ivory">{rating.toFixed(1)}</span> · {count} Google reviews
              </p>
            </div>
          </div>
        </Reveal>

        {reviews.length > 0 && (
          <div className="mt-14 grid gap-px bg-ivory/10 border hairline md:grid-cols-3">
            {reviews.map((r, i) => (
              <Reveal key={`${r.name}-${i}`} delay={i * 120} className="bg-charcoal p-9 sm:p-11">
                <Quote size={22} className="text-gold" />
                <blockquote className="mt-7 text-base leading-relaxed text-ivory/80">
                  “{r.quote}”
                </blockquote>
                <footer className="mt-8 flex items-center gap-3 border-t hairline pt-5">
                  {r.photo && (
                    <img
                      src={r.photo}
                      alt={`${r.name}, Google reviewer`}
                      loading="lazy"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <p className="font-display text-lg">{r.name}</p>
                    <div className="mt-1 flex items-center gap-2">
                      <Stars value={r.rating} size={12} />
                      <span className="text-[11px] uppercase tracking-[0.2em] text-gold-soft">
                        {r.when}
                      </span>
                    </div>
                  </div>
                </footer>
              </Reveal>
            ))}
          </div>
        )}

        <Reveal delay={200}>
          <a
            href={reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-12 inline-flex items-center gap-3 border border-ivory/40 px-7 py-4 text-xs uppercase tracking-[0.22em] transition hover:bg-ivory hover:text-charcoal"
          >
            Read all reviews on Google <ArrowUpRight size={14} />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
