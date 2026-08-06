import { createFileRoute, Link } from "@tanstack/react-router";
import { SUBJECTS, SYLLABI } from "@/lib/site-data";
import { BookOpen, Check } from "lucide-react";

export const Route = createFileRoute("/courses")({
  head: () => ({
    meta: [
      { title: "Courses & Subjects — ilm Smart Academy" },
      {
        name: "description",
        content:
          "All subjects offered from 1st to 12th std across CBSE, Matriculation and Samacheer Kalvi.",
      },
      { property: "og:title", content: "Courses at ilm Smart Academy" },
      {
        property: "og:description",
        content: "Maths, Physics, Chemistry, Biology, Commerce, Accountancy & more.",
      },
    ],
  }),
  component: CoursesPage,
});

const tracks = [
  {
    title: "Foundation (1st – 8th)",
    points: ["All subjects", "Homework support", "Concept building", "Weekly tests"],
  },
  {
    title: "Boards (9th & 10th)",
    points: ["Subject specialists", "Exam-focused notes", "Sample paper drills", "Doubt-clearing"],
  },
  {
    title: "Higher Sec (11th & 12th)",
    points: ["Stream-wise batches", "Board + entrance prep", "Mock tests", "1-on-1 mentoring"],
  },
];

function CoursesPage() {
  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Courses & subjects</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            From foundation grades to board-exam specialisation — pick the track that fits your
            child.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-xs font-semibold uppercase tracking-wider">
            {SYLLABI.map((s) => (
              <span key={s} className="rounded-full bg-white/15 px-3 py-1 backdrop-blur">
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-6 px-5 md:grid-cols-3">
          {tracks.map((t) => (
            <div
              key={t.title}
              className="rounded-2xl border border-border bg-card p-7 shadow-sm transition-shadow hover:shadow-elegant"
            >
              <h3 className="text-xl font-bold text-brand-navy">{t.title}</h3>
              <ul className="mt-4 space-y-2 text-sm">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 text-primary" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5">
          <h2 className="text-center text-3xl font-extrabold text-brand-navy">
            All subjects we teach
          </h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SUBJECTS.map((s) => (
              <div
                key={s.name}
                className="group rounded-2xl bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-elegant"
              >
                <div className="mb-3 inline-flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground">
                  <BookOpen className="h-5 w-5" />
                </div>
                <h3 className="font-bold text-brand-navy">{s.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">Grades {s.grades}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              to="/book-trial"
              className="inline-block rounded-lg bg-gradient-hero px-7 py-3.5 font-semibold text-primary-foreground shadow-elegant"
            >
              Book a Free Trial Class
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
