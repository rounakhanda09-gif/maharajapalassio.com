import { Phone, MessageCircle, CalendarDays } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { CONTACT } from "@/lib/contact";

/** Mobile-only conversion bar: call, WhatsApp, enquire — always one tap away. */
export function StickyCallBar() {
  return (
    <div className="md:hidden fixed inset-x-0 bottom-0 z-50 border-t hairline bg-charcoal/95 backdrop-blur-md">
      <div className="grid grid-cols-3 divide-x divide-ivory/10">
        <a
          href={CONTACT.phonePrimaryHref}
          className="flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-[0.18em] text-ivory"
        >
          <Phone size={16} className="text-gold" />
          Call
        </a>
        <a
          href={CONTACT.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-[0.18em] text-ivory"
        >
          <MessageCircle size={16} className="text-gold" />
          WhatsApp
        </a>
        <Link
          to="/visit"
          className="flex flex-col items-center gap-1 py-3 text-[10px] uppercase tracking-[0.18em] text-charcoal bg-gold"
        >
          <CalendarDays size={16} />
          Enquire
        </Link>
      </div>
    </div>
  );
}
