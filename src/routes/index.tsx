import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Video,
  Star,
  BookOpen,
  Award,
  Quote,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CAROUSEL_IMAGES } from "@/Carousel images";
import { SUBJECTS, FACILITIES, SYLLABI, REVIEWS, SITE, TOPPERS, FACULTY } from "@/lib/site-data";

function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="relative aspect-[4/5] w-full overflow-hidden rounded-sm group"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      <div 
        className="flex h-full w-full transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {CAROUSEL_IMAGES.map((src, idx) => (
          <img
            key={idx}
            src={src}
            alt={`Carousel item ${idx + 1}`}
            className={`h-full w-full shrink-0 ${
              idx === 0 ? "object-contain bg-brand-navy" : "object-cover"
            }`}
          />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-0 rounded-sm ring-1 ring-brand-gold/40" />
      
      <button 
        onClick={() => setCurrentIndex((prev) => (prev - 1 + CAROUSEL_IMAGES.length) % CAROUSEL_IMAGES.length)}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-brand-navy/60 p-2 text-brand-gold opacity-0 transition-opacity hover:bg-brand-navy group-hover:opacity-100"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button 
        onClick={() => setCurrentIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length)}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-brand-navy/60 p-2 text-brand-gold opacity-0 transition-opacity hover:bg-brand-navy group-hover:opacity-100"
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 max-w-[92%] flex-wrap justify-center gap-1.5 rounded-full bg-brand-navy/60 px-3 py-1 backdrop-blur-xs">
        {CAROUSEL_IMAGES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? "bg-brand-gold w-4" : "w-1.5 bg-white/50 hover:bg-white/80"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ilm Smart Academy — Tuition Centre in Royapettah, Chennai" },
      {
        name: "description",
        content:
          "Caring faculty for 1st–12th across CBSE, Matriculation & Samacheer Kalvi. Online + offline classes. Book a free trial.",
      },
      { property: "og:title", content: "ilm Smart Academy — Tuition Centre" },
      {
        property: "og:description",
        content: "Maths, Physics, Chemistry, Biology, Commerce & more. Free trial class available.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO — Editorial masthead */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="pointer-events-none absolute -right-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-brand-gold/25 blur-3xl" />
        <div className="pointer-events-none absolute -left-24 bottom-0 h-96 w-96 rounded-full bg-brand-gold-deep/20 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 pt-10 md:pt-14">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/15 pb-4 text-[11px] uppercase tracking-[0.25em] text-white/65">
            <span>Vol. XII · Royapettah Edition</span>
            <span className="hidden md:inline">Est. ilm Smart Academy · Since 2012</span>
            <span className="text-brand-gold">Admissions Open · 2026 – 27</span>
          </div>

          <div className="grid gap-10 py-14 md:py-20 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7 animate-float-in">
              <span className="font-eyebrow text-brand-gold">The Academy Journal</span>
              <h1 className="mt-4 text-[2.6rem] leading-[0.98] sm:text-6xl lg:text-[5.2rem]">
                Join in the <em className="text-brand-gold">light</em>
                <br />
                of knowledge.
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                A trusted tuition centre in Royapettah, Chennai — coaching students from 1
                <sup>st</sup> to 12<sup>th</sup> across CBSE, Matriculation and Samacheer Kalvi,
                since 2012.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-5">
                <Link
                  to="/book-trial"
                  className="group inline-flex items-center gap-3 rounded-full bg-brand-gold px-7 py-4 font-semibold text-brand-navy transition-all hover:-translate-y-0.5 hover:shadow-elegant"
                >
                  Book a free trial
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                </Link>
              </div>
            </div>

            <aside className="lg:col-span-5">
              <HeroCarousel />
            </aside>
          </div>

          {/* Stat masthead strip */}
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-t-2xl border border-white/10 bg-white/10 md:grid-cols-4">
            {[
              { n: "1,500+", l: "Students taught" },
              { n: "62", l: "Centum scores" },
              { n: "98%", l: "Board pass rate" },
              { n: "4.9★", l: "Parent rating" },
            ].map((s) => (
              <div key={s.l} className="bg-brand-navy-deep px-6 py-7">
                <div className="font-display text-5xl text-brand-gold">{s.n}</div>
                <div className="mt-2 text-xs uppercase tracking-widest text-white/65">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SYLLABI ticker */}
      <section className="border-b border-border bg-brand-ivory">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5 text-sm">
          <span className="font-eyebrow text-brand-gold-deep">Syllabi</span>
          {SYLLABI.map((s) => (
            <span key={s} className="font-display text-xl text-brand-navy">
              {s}
              <span className="mx-5 text-brand-gold">·</span>
            </span>
          ))}
          <span className="font-display text-xl text-brand-navy">1st – 12th Std</span>
        </div>
      </section>

      {/* EDITORIAL: A note from the academy */}
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="font-eyebrow text-brand-gold-deep">Editor's Note</span>
            <h2 className="mt-3 text-4xl text-brand-navy sm:text-5xl">
              A quiet kind of excellence.
            </h2>
            <div className="mt-6 gold-divider w-24" />
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-2xl leading-snug text-brand-navy/90 first-letter:float-left first-letter:mr-3 first-letter:text-7xl first-letter:font-normal first-letter:leading-[0.85] first-letter:text-brand-gold-deep">
              We don't believe in flash. We believe in turning up at 4 PM, in chalk-marked problems
              on the board, in the patient repetition of difficult ideas until they become obvious.
              That is the whole secret — and it is also why our students walk into board exams calm.
            </p>
            <div className="mt-8 flex items-center gap-4 text-sm text-muted-foreground">
              <span className="h-px w-12 bg-brand-gold" />
              Academic Director · ilm Smart Academy
            </div>
          </div>
        </div>
      </section>



      {/* SUBJECTS — editorial index */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="font-eyebrow text-brand-gold-deep">Index · Subjects</span>
              <h2 className="mt-3 text-4xl text-brand-navy sm:text-5xl">
                Every core subject, taught carefully.
              </h2>
            </div>
            <Link
              to="/courses"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-brand-navy hover:text-brand-gold-deep"
            >
              See full curriculum{" "}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
            </Link>
          </div>

          <div className="mt-12 grid divide-y divide-border border-y border-border md:grid-cols-2 md:divide-y-0 md:[&>*:nth-child(even)]:border-l md:[&>*]:border-border">
            {SUBJECTS.map((s, i) => (
              <article
                key={s.name}
                className="group relative flex items-center justify-between gap-6 px-2 py-6 transition-colors hover:bg-brand-ivory md:px-6"
              >
                <div className="flex items-center gap-5">
                  <span className="font-display text-xl text-brand-gold-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl text-brand-navy">{s.name}</h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                      Grades {s.grades}
                    </p>
                  </div>
                </div>
                <BookOpen className="h-5 w-5 text-brand-gold-deep opacity-0 transition-opacity group-hover:opacity-100" />
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FACULTY masthead */}
      <section className="section-pad bg-brand-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-eyebrow text-brand-gold-deep">Faculty</span>
              <h2 className="mt-3 text-4xl text-brand-navy sm:text-5xl">
                The people at the board.
              </h2>
            </div>
            <Link
              to="/faculty"
              className="text-sm font-semibold text-brand-navy hover:text-brand-gold-deep"
            >
              View all faculty →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {FACULTY.slice(0, 3).map((f) => (
              <article
                key={f.name}
                className="group rounded-sm border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-elegant"
              >
                <div className="flex items-center justify-between">
                  <div className="grid h-16 w-16 place-items-center rounded-full border-2 border-brand-gold bg-brand-navy font-display text-2xl text-brand-gold">
                    {f.name.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="text-right">
                    <div className="font-display text-xl text-brand-gold-deep">{f.rating}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                      {f.reviews} reviews
                    </div>
                  </div>
                </div>
                <h3 className="mt-6 font-display text-2xl text-brand-navy">{f.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {f.subjects.join(" · ")} · {f.experience}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/75">{f.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITIES — bento */}
      <section className="section-pad">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <span className="font-eyebrow text-brand-gold-deep">The Campus</span>
            <h2 className="mt-3 text-4xl text-brand-navy sm:text-5xl">
              Built around the student, not the textbook.
            </h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-6">
            {FACILITIES.map((f, i) => (
              <div
                key={f.title}
                className={`group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-elegant ${
                  i === 0 ? "md:col-span-3" : i === 1 ? "md:col-span-3" : "md:col-span-2"
                }`}
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-gold/15 text-brand-gold-deep">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="font-display text-2xl text-brand-navy">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                <div className="mt-6 gold-divider w-12" />
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* REVIEWS — letters to the editor */}
      <section className="section-pad bg-brand-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <span className="font-eyebrow text-brand-gold-deep">Letters to the Editor</span>
            <h2 className="mt-3 text-4xl text-brand-navy sm:text-5xl">
              What our families have written.
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {REVIEWS.slice(0, 3).map((r) => (
              <article key={r.name} className="rounded-sm border border-border bg-card p-8">
                <div className="flex gap-0.5 text-brand-gold">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <p className="mt-5 font-display text-xl leading-snug text-brand-navy">"{r.text}"</p>
                <div className="mt-8 flex items-center gap-3 border-t border-border pt-5">
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-navy font-display text-brand-gold">
                    {r.name[0]}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-brand-navy">{r.name}</div>
                    <div className="text-[11px] uppercase tracking-widest text-muted-foreground">
                      {r.role}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              to="/reviews"
              className="inline-flex items-center gap-2 font-semibold text-brand-navy hover:text-brand-gold-deep"
            >
              Read every letter <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA — closing colophon */}
      <section className="section-pad bg-brand-navy text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[1.4fr_1fr] md:items-end">
          <div>
            <h2 className="mt-3 font-display text-5xl leading-[1.05] sm:text-6xl">
              Try one class.
              <br />
              Decide after.
            </h2>
            <p className="mt-6 max-w-xl text-white/75">
              Pick a subject, pick a slot, meet the teacher. The trial is free, there is no
              commitment, and parents are welcome to sit in.
            </p>
          </div>
          <div className="space-y-3">
            <Link
              to="/book-trial"
              className="flex items-center justify-between gap-4 rounded-full bg-brand-gold px-7 py-4 font-semibold text-brand-navy hover:bg-brand-gold-soft"
            >
              Book a free trial <ArrowUpRight className="h-4 w-4" />
            </Link>
            <a
              href={`tel:${SITE.phone1}`}
              className="flex items-center justify-between gap-4 rounded-full border border-white/25 px-7 py-4 font-semibold text-white hover:bg-white/5"
            >
              Call {SITE.phoneDisplay1} <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

function SectionHead({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="font-eyebrow text-brand-gold-deep">{eyebrow}</span>
      <h2 className="mt-3 text-4xl text-brand-navy sm:text-5xl">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </div>
  );
}
