import { createFileRoute, Link } from "@tanstack/react-router";
import { Star, Award } from "lucide-react";
import { FACULTY } from "@/lib/site-data";

export const Route = createFileRoute("/faculty")({
  head: () => ({
    meta: [
      { title: "Faculty — ilm Smart Academy" },
      {
        name: "description",
        content: "Meet the experienced, caring teachers at ilm Smart Academy.",
      },
      { property: "og:title", content: "Our faculty" },
      {
        property: "og:description",
        content: "Subject specialists with decades of combined teaching experience.",
      },
    ],
  }),
  component: FacultyPage,
});

function FacultyPage() {
  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Our faculty</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            Experienced, caring teachers who make hard subjects feel simple.
          </p>
        </div>
      </section>
      <section className="section-pad">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 md:grid-cols-2 lg:grid-cols-3">
          {FACULTY.map((f) => (
            <article
              key={f.name}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant"
            >
              <div className="flex items-center justify-center bg-gradient-hero py-10">
                <div className="grid h-24 w-24 place-items-center rounded-full bg-white text-3xl font-extrabold text-primary shadow-glow">
                  {f.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-brand-navy">{f.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {f.subjects.join(" · ")} · {f.grades}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{f.bio}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="inline-flex items-center gap-1 font-semibold text-brand-navy">
                    <Star className="h-4 w-4 fill-current text-brand-yellow" /> {f.rating}
                    <span className="text-muted-foreground">({f.reviews})</span>
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-brand-navy">
                    <Award className="h-3 w-3" /> {f.experience}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/book-trial"
            className="inline-block rounded-lg bg-gradient-hero px-7 py-3.5 font-semibold text-primary-foreground shadow-elegant"
          >
            Book a class with your preferred teacher
          </Link>
        </div>
      </section>
    </>
  );
}
