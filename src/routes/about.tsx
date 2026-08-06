import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — ilm Smart Academy" },
      {
        name: "description",
        content: "Our story, mission and values at ilm Smart Academy, Royapettah, Chennai.",
      },
      { property: "og:title", content: "About ilm Smart Academy" },
      {
        property: "og:description",
        content: "A trusted tuition centre helping students from 1st to 12th std.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Heart,
    title: "Caring faculty",
    text: "Teachers who know each student by name and progress.",
  },
  {
    icon: Target,
    title: "Outcome focused",
    text: "Concept clarity, regular tests and exam strategy.",
  },
  {
    icon: Lightbulb,
    title: "Light over noise",
    text: "Calm classrooms, structured notes, no shortcuts.",
  },
  {
    icon: Users,
    title: "Small batches",
    text: "Limited seats so every doubt gets the time it deserves.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground md:py-20">
        <div className="mx-auto max-w-4xl px-5 text-center animate-float-in">
          <span className="text-xs font-bold uppercase tracking-widest text-brand-yellow">
            About us
          </span>
          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            A tuition centre that students actually look forward to
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-white/85">
            ilm Smart Academy was founded with one belief — that consistent, caring teaching beats
            every shortcut. From grade 1 to grade 12, across CBSE, Matriculation and Samacheer
            Kalvi, we help every student grow at their pace.
          </p>
        </div>
      </section>
      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-extrabold text-brand-navy">Our story</h2>
            <p className="mt-4 text-muted-foreground">
              Located on Peters Road in Royapettah, our centre is air-conditioned, CCTV-monitored
              and designed to feel like a second home for learners. Working hours Monday – Saturday,
              4 PM – 9 PM.
            </p>
            <p className="mt-3 text-muted-foreground">
              Specialised batches for 10<sup>th</sup> &amp; 12<sup>th</sup> students cover Maths,
              Physics, Chemistry, Biology, Economics, Commerce, Accountancy and Business Maths —
              taught by experienced subject specialists who genuinely care.
            </p>
            <Link
              to="/book-trial"
              className="mt-6 inline-block rounded-lg bg-gradient-hero px-6 py-3 font-semibold text-primary-foreground shadow-elegant"
            >
              Book a Free Trial
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-6">
                <v.icon className="h-8 w-8 text-primary" />
                <h3 className="mt-3 font-bold text-brand-navy">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
