import { createFileRoute } from "@tanstack/react-router";
import { SCHEDULE, SITE } from "@/lib/site-data";
import { Clock } from "lucide-react";

export const Route = createFileRoute("/schedule")({
  head: () => ({
    meta: [
      { title: "Class Schedule — ilm Smart Academy" },
      {
        name: "description",
        content: "Weekly class timings across all subjects. Monday – Saturday, 4 PM – 9 PM.",
      },
      { property: "og:title", content: "Class schedule" },
      { property: "og:description", content: "Subject-wise class timings at ilm Smart Academy." },
    ],
  }),
  component: SchedulePage,
});

function SchedulePage() {
  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Weekly class schedule</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85 inline-flex items-center gap-2 justify-center">
            <Clock className="h-5 w-5 text-brand-yellow" /> {SITE.hours}
          </p>
        </div>
      </section>
      <section className="section-pad">
        <div className="mx-auto max-w-6xl px-5">
          <div className="grid gap-5 md:grid-cols-2">
            {SCHEDULE.map((day) => (
              <div key={day.day} className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <h3 className="text-lg font-bold text-brand-navy">{day.day}</h3>
                  <span className="text-xs font-semibold uppercase tracking-wider text-primary">
                    {day.slots.length} slots
                  </span>
                </div>
                <ul className="mt-4 space-y-3">
                  {day.slots.map((s) => (
                    <li
                      key={s.time}
                      className="flex items-start justify-between gap-4 rounded-lg bg-secondary/60 p-3"
                    >
                      <div>
                        <div className="text-sm font-semibold text-brand-navy">{s.subject}</div>
                        <div className="text-xs text-muted-foreground">with {s.faculty}</div>
                      </div>
                      <span className="whitespace-nowrap rounded-full bg-brand-yellow px-3 py-1 text-xs font-bold text-brand-navy">
                        {s.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Schedule may vary during exam season. Please confirm by phone before your first visit.
          </p>
        </div>
      </section>
    </>
  );
}
