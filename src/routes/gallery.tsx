import { createFileRoute, Link } from "@tanstack/react-router";
import { Camera, ArrowRight } from "lucide-react";
import { GALLERY } from "@/lib/site-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Campus Gallery — ilm Smart Academy" },
      {
        name: "description",
        content:
          "Inside ilm Smart Academy: air-conditioned classrooms, lab sessions, events, workshops and toppers' felicitations.",
      },
      { property: "og:title", content: "Campus Gallery — ilm Smart Academy" },
      {
        property: "og:description",
        content: "A look inside our classrooms, events and study halls in Royapettah, Chennai.",
      },
    ],
  }),
  component: GalleryPage,
});

function tile(hue: number, accent: number) {
  return {
    background: `linear-gradient(135deg, oklch(0.22 0.08 ${hue}) 0%, oklch(0.32 0.1 ${hue}) 55%, oklch(0.78 0.13 ${accent}) 130%)`,
  };
}

function GalleryPage() {
  return (
    <>
      <section className="bg-brand-ivory">
        <div className="mx-auto max-w-7xl px-5 py-20 md:py-24">
          <span className="font-eyebrow text-brand-gold-deep">Inside ilm</span>
          <h1 className="mt-4 max-w-3xl text-5xl text-brand-navy sm:text-6xl">
            The campus, the people, the <em className="text-brand-gold-deep">moments in between</em>
            .
          </h1>
          <p className="mt-6 max-w-xl text-muted-foreground">
            A walkthrough of our Royapettah centre — classrooms, labs, events and the everyday
            corners where our students do their best work.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto max-w-7xl">
          <div className="grid auto-rows-[14rem] grid-cols-2 gap-4 md:grid-cols-4 md:gap-5">
            {GALLERY.map((g, i) => {
              const span =
                [
                  "md:col-span-2 md:row-span-2",
                  "",
                  "md:row-span-2",
                  "",
                  "md:col-span-2",
                  "",
                  "md:row-span-2",
                  "md:col-span-2",
                  "",
                ][i] ?? "";
              return (
                <figure
                  key={g.title}
                  className={`group relative overflow-hidden rounded-2xl border border-border shadow-sm transition-shadow hover:shadow-elegant ${span}`}
                  style={tile(g.hue, g.accent)}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_60%)]" />
                  <div className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-white/15 text-white backdrop-blur transition-transform group-hover:scale-110">
                    <Camera className="h-4 w-4" />
                  </div>
                  <figcaption className="absolute inset-x-0 bottom-0 p-5 text-white">
                    <span className="font-eyebrow text-brand-gold">{g.cat}</span>
                    <h3 className="mt-2 font-display text-xl leading-tight">{g.title}</h3>
                  </figcaption>
                </figure>
              );
            })}
          </div>

          <div className="mt-16 rounded-3xl border border-brand-gold/30 bg-brand-ivory p-10 text-center md:p-14">
            <p className="font-eyebrow text-brand-gold-deep">Want a tour?</p>
            <h2 className="mx-auto mt-3 max-w-2xl text-4xl text-brand-navy">
              Visit the campus — coffee's on us.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              Walk through our classrooms before you decide. Drop in any weekday between 4 PM and 9
              PM.
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-navy px-7 py-3.5 font-semibold text-primary-foreground hover:bg-brand-navy/90"
            >
              Plan a visit <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
