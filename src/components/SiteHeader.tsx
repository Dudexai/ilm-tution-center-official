import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { SITE } from "@/lib/site-data";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/courses", label: "Courses" },
  { to: "/faculty", label: "Faculty" },
  // { to: "/gallery", label: "Gallery" }, // Hidden for now
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="gold-divider" />
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2">
          <Logo className="h-14 w-auto sm:h-16 md:h-20" />
        </Link>
        <nav className="hidden items-center gap-0.5 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-brand-navy after:scale-x-100" }}
              inactiveProps={{ className: "text-foreground/70 hover:text-brand-navy" }}
              className="relative px-3 py-2 text-[13px] font-medium tracking-wide transition-colors after:absolute after:inset-x-3 after:bottom-1 after:h-px after:origin-left after:scale-x-0 after:bg-brand-gold after:transition-transform hover:after:scale-x-100"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={`tel:${SITE.phone1}`}
            className="flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-brand-navy"
          >
            <Phone className="h-3.5 w-3.5 text-brand-gold-deep" /> {SITE.phoneDisplay1}
          </a>
          <Link
            to="/book-trial"
            className="group inline-flex items-center gap-2 rounded-full bg-brand-navy px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:bg-brand-navy/90 hover:shadow-elegant"
          >
            Book Trial
            <span className="h-1.5 w-1.5 rounded-full bg-brand-gold transition-transform group-hover:scale-150" />
          </Link>
        </div>
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="rounded-md p-2 lg:hidden"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "text-brand-navy bg-brand-ivory" }}
                inactiveProps={{ className: "text-foreground/80" }}
                className="rounded-md px-3 py-2.5 text-sm font-medium"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/book-trial"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-brand-navy px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Book Free Trial
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
