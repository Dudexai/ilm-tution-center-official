import { createFileRoute, Link } from "@tanstack/react-router";
import { Award, Quote, Sparkles, TrendingUp } from "lucide-react";
import { TOPPERS, RESULT_STATS } from "@/lib/site-data";

export const Route = createFileRoute("/results")({
  head: () => ({
    meta: [
      { title: "Results & Achievements — ilm Smart Academy" },
      {
        name: "description",
        content:
          "Centum scores, board toppers and success stories from ilm Smart Academy students across CBSE, Matriculation and Samacheer Kalvi.",
      },
      { property: "og:title", content: "Toppers & Results — ilm Smart Academy" },
      {
        property: "og:description",
        content: "98% pass rate. 62 centums since 2020. Meet our toppers.",
      },
    ],
  }),
  component: ResultsPage,
});

function ResultsPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, var(--brand-gold), transparent 40%), radial-gradient(circle at 80% 70%, var(--brand-gold-deep), transparent 45%)",
          }}
        />
        <div className="relative mx-auto max-w-7xl px-5 py-20 md:py-28">
          <span className="font-eyebrow text-brand-gold">Honours · 2020 – 2025</span>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
            A wall of <em className="text-brand-gold">centums</em>,<br />
            written by our students.
          </h1>
          <p className="mt-6 max-w-xl text-white/80">
            Every name below sat in the same classrooms, wrote the same weekly tests, and was
            coached by the same faculty. Excellence at ilm is repeatable, not accidental.
          </p>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {RESULT_STATS.map((s) => (
              <div
                key={s.l}
                className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur"
              >
                <div className="font-display text-5xl text-brand-gold">{s.n}</div>
                <div className="mt-2 text-sm text-white/75">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <span className="font-eyebrow text-brand-gold-deep">Class of 2024 & 2025</span>
              <h2 className="mt-3 text-4xl text-brand-navy sm:text-5xl">The toppers' gallery</h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Names, scores and a few honest words from each student. Photographs available at the
              academy reception on request.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TOPPERS.map((t, i) => (
              <article
                key={t.name}
                className="group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all hover:-translate-y-1 hover:border-brand-gold hover:shadow-elegant"
              >
                <div className="absolute right-5 top-5 font-display text-7xl leading-none text-brand-gold/15 transition-colors group-hover:text-brand-gold/30">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <Award className="h-7 w-7 text-brand-gold-deep" />
                <h3 className="mt-5 text-2xl text-brand-navy">{t.name}</h3>
                <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">
                  {t.grade} · {t.year}
                </p>
                <div className="my-5 gold-divider" />
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl text-brand-gold-deep">{t.score}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t.subject}</p>
                <div className="mt-5 flex gap-3 border-t border-border pt-4">
                  <Quote className="h-4 w-4 shrink-0 text-brand-gold" />
                  <p className="text-sm italic leading-relaxed text-foreground/75">{t.quote}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad bg-brand-ivory">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2">
          <div>
            <span className="font-eyebrow text-brand-gold-deep">Behind the results</span>
            <h2 className="mt-3 text-4xl text-brand-navy sm:text-5xl">A system, not a shortcut.</h2>
            <ul className="mt-8 space-y-5">
              {[
                {
                  icon: TrendingUp,
                  t: "Weekly diagnostics",
                  d: "Every Saturday we measure progress, not effort.",
                },
                {
                  icon: Sparkles,
                  t: "1:8 doubt-clearing ratio",
                  d: "Limited seats per batch — every hand goes up.",
                },
                {
                  icon: Award,
                  t: "Centum-track mentoring",
                  d: "Students scoring 85+ join a focused board-prep pod.",
                },
              ].map((x) => (
                <li key={x.t} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-brand-gold/15 text-brand-gold-deep">
                    <x.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="font-semibold text-brand-navy">{x.t}</div>
                    <p className="mt-1 text-sm text-muted-foreground">{x.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-brand-gold/30 bg-card p-10 shadow-elegant">
            <Quote className="h-8 w-8 text-brand-gold" />
            <p className="mt-5 font-display text-2xl leading-snug text-brand-navy">
              "We don't promise miracles. We promise that if a student turns up, sits the test, and
              asks the doubt — the mark will move. It always has."
            </p>
            <div className="mt-6 text-sm uppercase tracking-widest text-muted-foreground">
              — Academic Director, ilm Smart Academy
            </div>
            <Link
              to="/book-trial"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-navy px-6 py-3 font-semibold text-primary-foreground hover:bg-brand-navy/90"
            >
              Book a free diagnostic class
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
