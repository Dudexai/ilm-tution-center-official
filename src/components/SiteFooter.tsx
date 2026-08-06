import { Link } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, Handshake } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site-data";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-brand-navy text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="inline-block rounded-lg bg-white p-3">
            <Logo className="h-16 w-auto sm:h-20" />
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
            ilm Smart Academy — A trusted tuition centre in Royapettah, Chennai. Caring faculty,
            structured learning and a calm environment to help every student shine from 1st to 12th
            standard.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Explore
          </h4>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link to="/about" className="hover:text-brand-yellow">
                About
              </Link>
            </li>
            <li>
              <Link to="/courses" className="hover:text-brand-yellow">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/faculty" className="hover:text-brand-yellow">
                Faculty
              </Link>
            </li>

            <li>
              <Link to="/reviews" className="hover:text-brand-yellow">
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/book-trial" className="hover:text-brand-yellow">
                Book Trial
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-brand-yellow">
            Contact
          </h4>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-yellow" /> {SITE.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-brand-yellow" /> {SITE.phoneDisplay1} /{" "}
              {SITE.phoneDisplay2}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-yellow" /> {SITE.email}
            </li>
            <li className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-brand-yellow" /> {SITE.hours}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-5 sm:flex-row">
          <div className="text-xs text-white/60">
            © {new Date().getFullYear()} ilm Smart Academy. Join in the light of knowledge.
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span>Powered by</span>
            <div className="flex items-center gap-1.5 font-semibold text-white">
              <Handshake className="h-5 w-5 text-white" />
              <span>DudeX Innovations</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
