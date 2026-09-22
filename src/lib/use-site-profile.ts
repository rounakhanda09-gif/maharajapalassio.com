import { useRouterState } from "@tanstack/react-router";
import type { GoogleProfile } from "@/lib/google-reviews.functions";
import { CONTACT } from "@/lib/contact";

/**
 * The live Google listing, loaded once in the root route and shared by the
 * header, footer and every page.
 */
export function useSiteProfile(): GoogleProfile | null {
  return useRouterState({
    select: (s) => (s.matches[0]?.loaderData as GoogleProfile | null | undefined) ?? null,
  });
}

/** Business details with the hand-written values as a safety net. */
export function useBusiness() {
  const profile = useSiteProfile();
  const b = profile?.business;
  const hours = b?.hours?.length ? b.hours : null;
  return {
    name: b?.name || CONTACT.name,
    address: b?.address || CONTACT.address,
    phone: b?.phone || CONTACT.phonePrimary,
    phoneHref: b?.phoneHref || CONTACT.phonePrimaryHref,
    hours,
    hoursSummary: b?.openNow === true ? "Open now · closes 11 PM" : CONTACT.hours,
    profile,
  };
}
