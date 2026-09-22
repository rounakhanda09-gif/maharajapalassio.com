import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState, type FormEvent } from "react";
import { Phone, MessageCircle, Lock, LogOut, RefreshCw } from "lucide-react";
import { CONTACT } from "@/lib/contact";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { listEnquiries, setEnquiryNote, setEnquiryStatus } from "@/lib/owner.functions";

export const Route = createFileRoute("/owner")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Owner Dashboard · Maharaja Palassio" },
      { name: "description", content: "Private dashboard for Maharaja Palassio event enquiries." },
      { name: "robots", content: "noindex, nofollow" },
      { property: "og:title", content: "Owner Dashboard · Maharaja Palassio" },
      { property: "og:description", content: "Private dashboard for event enquiries." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: OwnerPage,
});

type Enquiry = {
  id: string;
  name: string;
  phone: string;
  event_type: string | null;
  preferred_date: string | null;
  message: string | null;
  status: string;
  staff_note: string | null;
  created_at: string;
};

type Filter = "all" | "new" | "contacted" | "closed";

function OwnerPage() {
  const qc = useQueryClient();
  const list = useServerFn(listEnquiries);
  const mark = useServerFn(setEnquiryStatus);
  const note = useServerFn(setEnquiryNote);

  const [session, setSession] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (active) setSession(!!data.session);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      setSession(!!s);
    });
    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const enquiries = useQuery({
    queryKey: ["owner-enquiries"],
    queryFn: () => list(),
    enabled: session === true,
    staleTime: 15_000,
  });

  const statusMutation = useMutation({
    mutationFn: (vars: { id: string; status: "new" | "contacted" | "closed" }) =>
      mark({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["owner-enquiries"] }),
  });

  const noteMutation = useMutation({
    mutationFn: (vars: { id: string; note: string }) => note({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["owner-enquiries"] }),
  });

  const onLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "").trim();
    const password = String(form.get("password") ?? "");
    setBusy(true);
    setError(null);
    setNotice(null);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    if (authError) setError("Those sign-in details aren't right.");
    setBusy(false);
  };

  const onReset = async (email: string) => {
    if (!email) {
      setError("Enter your email first, then tap reset.");
      return;
    }
    setError(null);
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/owner`,
    });
    setNotice("If that email belongs to a staff account, a reset link is on its way.");
  };

  if (session === null) {
    return <section className="px-6 py-40 text-center text-muted-foreground">Loading…</section>;
  }

  if (!session) {
    return (
      <section className="px-6 sm:px-12 pt-40 pb-32">
        <div className="mx-auto max-w-md border hairline p-10">
          <div className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-gold text-charcoal">
            <Lock size={20} />
          </div>
          <h1 className="mt-6 text-center font-display text-3xl">Staff Access</h1>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            Sign in with your staff account to view event enquiries.
          </p>
          <form onSubmit={onLogin} className="mt-8 space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full bg-transparent border-b hairline py-3 text-foreground focus:outline-none focus:border-gold transition font-sans"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full bg-transparent border-b hairline py-3 text-foreground focus:outline-none focus:border-gold transition font-sans"
              />
            </div>
            {error && (
              <p role="alert" className="text-sm text-[oklch(0.55_0.18_25)]">
                {error}
              </p>
            )}
            {notice && <p className="text-sm text-muted-foreground">{notice}</p>}
            <Button
              type="submit"
              disabled={busy}
              className="w-full bg-foreground text-background px-8 py-4 text-xs uppercase tracking-[0.22em] hover:bg-gold hover:text-charcoal transition disabled:opacity-50"
            >
              {busy ? "Signing in…" : "Sign In"}
            </Button>
            <button
              type="button"
              onClick={(e) => {
                const form = e.currentTarget.closest("form");
                const email = form
                  ? String(new FormData(form).get("email") ?? "").trim()
                  : "";
                void onReset(email);
              }}
              className="w-full text-center text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-gold transition"
            >
              Forgot password
            </button>
          </form>
        </div>
      </section>
    );
  }

  const allRows = (enquiries.data?.enquiries ?? []) as Enquiry[];
  const q = search.trim().toLowerCase();
  const rows = allRows.filter((r) => {
    const statusOk = filter === "all" || r.status === filter;
    const searchOk =
      !q ||
      r.name.toLowerCase().includes(q) ||
      r.phone.toLowerCase().includes(q) ||
      (r.event_type ?? "").toLowerCase().includes(q);
    return statusOk && searchOk;
  });
  const newCount = allRows.filter((r) => r.status === "new").length;

  return (
    <section className="px-6 sm:px-12 pt-36 pb-28">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Owner Dashboard</p>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl">Event Enquiries</h1>
            <p className="mt-2 text-sm text-muted-foreground">
              {allRows.length} total · {newCount} new
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => enquiries.refetch()}
              className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-xs uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition"
            >
              <RefreshCw size={14} /> Refresh
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                qc.clear();
              }}
              className="inline-flex items-center gap-2 border hairline px-5 py-3 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition"
            >
              <LogOut size={14} /> Sign out
            </Button>
          </div>
        </div>

        <div className="gold-rule mt-8 w-20" />

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {(["all", "new", "contacted", "closed"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`border px-4 py-2 text-[10px] uppercase tracking-[0.2em] transition ${
                filter === f ? "border-gold text-gold" : "hairline text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone or event"
            className="ml-auto w-full sm:w-64 bg-transparent border-b hairline py-2 text-sm focus:outline-none focus:border-gold transition"
          />
        </div>

        {enquiries.isLoading ? (
          <p className="mt-12 text-muted-foreground">Loading enquiries…</p>
        ) : rows.length === 0 ? (
          <p className="mt-12 text-muted-foreground">
            No enquiries to show. They'll appear here the moment someone submits the form.
          </p>
        ) : (
          <ul className="mt-12 space-y-5">
            {rows.map((r) => {
              const wa = `https://wa.me/${r.phone.replace(/[^0-9]/g, "").replace(/^0/, "91")}?text=${encodeURIComponent(
                `Namaste ${r.name}, thank you for your enquiry with Maharaja Palassio. How may we help plan your celebration?`,
              )}`;
              return (
                <li key={r.id} className="border hairline p-6">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <p className="font-display text-2xl">{r.name}</p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(r.created_at).toLocaleString("en-IN")}
                      </p>
                    </div>
                    <span
                      className={`text-[10px] uppercase tracking-[0.2em] px-3 py-1 border ${
                        r.status === "new" ? "border-gold text-gold" : "hairline text-muted-foreground"
                      }`}
                    >
                      {r.status}
                    </span>
                  </div>

                  <dl className="mt-5 grid gap-3 sm:grid-cols-3 text-sm">
                    <div>
                      <dt className="eyebrow">Phone</dt>
                      <dd className="mt-1">{r.phone}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Event</dt>
                      <dd className="mt-1">{r.event_type || "—"}</dd>
                    </div>
                    <div>
                      <dt className="eyebrow">Preferred date</dt>
                      <dd className="mt-1">{r.preferred_date || "—"}</dd>
                    </div>
                  </dl>

                  {r.message && (
                    <p className="mt-5 text-sm leading-relaxed text-muted-foreground">{r.message}</p>
                  )}

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const value = String(new FormData(e.currentTarget).get("note") ?? "");
                      noteMutation.mutate({ id: r.id, note: value });
                    }}
                    className="mt-6"
                  >
                    <label
                      htmlFor={`note-${r.id}`}
                      className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2"
                    >
                      Follow-up note
                    </label>
                    <textarea
                      id={`note-${r.id}`}
                      name="note"
                      defaultValue={r.staff_note ?? ""}
                      rows={2}
                      className="w-full bg-transparent border hairline p-3 text-sm focus:outline-none focus:border-gold transition"
                    />
                    <Button
                      type="submit"
                      variant="outline"
                      disabled={noteMutation.isPending}
                      className="mt-3 border hairline px-5 py-2 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition disabled:opacity-50"
                    >
                      Save note
                    </Button>
                  </form>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href={`tel:${r.phone.replace(/\s/g, "")}`}
                      className="inline-flex items-center gap-2 border border-foreground px-5 py-3 text-xs uppercase tracking-[0.22em] hover:bg-foreground hover:text-background transition"
                    >
                      <Phone size={14} /> Call
                    </a>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-[oklch(0.55_0.15_150)] text-ivory px-5 py-3 text-xs uppercase tracking-[0.22em] hover:opacity-90 transition"
                    >
                      <MessageCircle size={14} /> WhatsApp
                    </a>
                    {(["new", "contacted", "closed"] as const)
                      .filter((s) => s !== r.status)
                      .map((s) => (
                        <Button
                          type="button"
                          variant="outline"
                          key={s}
                          disabled={statusMutation.isPending}
                          onClick={() => statusMutation.mutate({ id: r.id, status: s })}
                          className="inline-flex items-center gap-2 border hairline px-5 py-3 text-xs uppercase tracking-[0.22em] text-muted-foreground hover:text-foreground transition disabled:opacity-50"
                        >
                          Mark {s}
                        </Button>
                      ))}
                  </div>
                </li>
              );
            })}
          </ul>
        )}

        <p className="mt-16 text-xs text-muted-foreground">
          Guest numbers are private. Reach the venue on{" "}
          <a href={CONTACT.phonePrimaryHref} className="text-gold hover:underline">
            {CONTACT.phonePrimary}
          </a>
          .
        </p>
      </div>
    </section>
  );
}
