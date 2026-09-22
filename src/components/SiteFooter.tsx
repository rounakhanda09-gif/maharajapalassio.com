import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";
import { CONTACT } from "@/lib/contact";

export function SiteFooter() {
  return (
    <footer className="bg-charcoal text-ivory">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-20">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-5">
            <div className="font-display text-3xl">
              Maharaja <span className="italic text-gold">Palassio</span>
            </div>
            <p className="mt-3 text-sm text-ivory/60 tracking-wide">
              Sky Garden Restro & Terrace · Batala
            </p>
            <div className="gold-rule mt-8 w-24" />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/70">
              A rooftop garden and banquet venue built for evenings worth remembering — weddings, birthdays, and quiet family dinners alike.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="eyebrow">Explore</p>
            <ul className="mt-5 space-y-3 text-sm">
              <li><Link to="/" className="hover:text-gold transition">Home</Link></li>
              <li><Link to="/events" className="hover:text-gold transition">Weddings & Events</Link></li>
              <li><Link to="/menu" className="hover:text-gold transition">Dining</Link></li>
              <li><Link to="/gallery" className="hover:text-gold transition">Gallery</Link></li>
              <li><Link to="/about" className="hover:text-gold transition">About</Link></li>
              <li><Link to="/visit" className="hover:text-gold transition">Visit Us</Link></li>
            </ul>
          </div>


          <div className="md:col-span-4">
            <p className="eyebrow">Find Us</p>
            <ul className="mt-5 space-y-4 text-sm text-ivory/80">
              <li className="flex gap-3">
                <MapPin size={16} className="mt-1 text-gold shrink-0" />
                <span>{CONTACT.address}</span>
              </li>
              <li className="flex gap-3">
                <Phone size={16} className="mt-1 text-gold shrink-0" />
                <a href={CONTACT.phonePrimaryHref} className="hover:text-gold">
                  {CONTACT.phonePrimary}
                </a>
              </li>
              <li className="pl-7 text-ivory/60">{CONTACT.hours}</li>
            </ul>

            <div className="mt-6 flex gap-3">
              <a
                href={CONTACT.instagram}
                target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid place-items-center h-10 w-10 border border-ivory/20 hover:border-gold hover:text-gold transition"
              >
                <Instagram size={16} />
              </a>
              <a
                href={CONTACT.facebook}
                target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid place-items-center h-10 w-10 border border-ivory/20 hover:border-gold hover:text-gold transition"
              >
                <Facebook size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-ivory/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-ivory/40">
          <p>© {new Date().getFullYear()} Maharaja Palassio. All rights reserved.</p>
          <p className="tracking-[0.2em] uppercase">Batala · Punjab · India</p>
        </div>
      </div>
    </footer>
  );
}
