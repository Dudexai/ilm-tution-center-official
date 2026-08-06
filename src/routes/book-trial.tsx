import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SUBJECTS, FACULTY, SITE } from "@/lib/site-data";
import {
  Calendar,
  MessageCircle,
  Mail,
  Video,
  CheckCircle2,
  Edit2,
  Check,
  ExternalLink,
  Send,
  Loader2,
} from "lucide-react";
import { sendBookingNotification } from "@/lib/send-notification";

const sortedSubjects = [...SUBJECTS].sort((a, b) => {
  if (a.name === "All Subjects") return -1;
  if (b.name === "All Subjects") return 1;
  return a.name.localeCompare(b.name);
});

export const Route = createFileRoute("/book-trial")({
  head: () => ({
    meta: [
      { title: "Book a Free Trial Class — ilm Smart Academy" },
      {
        name: "description",
        content:
          "Reserve a free trial class. Choose your subject, teacher, date and mode (in-platform Jitsi or Zoom).",
      },
      { property: "og:title", content: "Book a free trial" },
      {
        property: "og:description",
        content: "Pick a slot for a free trial class at ilm Smart Academy.",
      },
    ],
  }),
  component: BookTrialPage,
});

type Mode = "zoom" | "offline";

function BookTrialPage() {
  const [form, setForm] = useState({
    studentName: "",
    grade: "10",
    parentName: "",
    phone: "",
    email: "",
    subject: sortedSubjects[0].name as string,
    faculty: "Any available",
    date: "",
    time: "16:00",
    mode: "zoom" as Mode,
    notes: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "activation_needed"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const facultyOptions = useMemo(() => {
    const selectedGrade = parseInt(form.grade, 10);
    return [
      "Any available",
      ...FACULTY.filter(
        (f) =>
          (f.subjects as readonly string[]).includes(form.subject) &&
          (f.gradeLevels as readonly number[]).includes(selectedGrade),
      ).map((f) => f.name),
    ];
  }, [form.subject, form.grade]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((prev) => ({ ...prev, [k]: v }));
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const waText = `*Free Trial Booking Request*
*Student Name:* ${form.studentName}
*Grade:* ${form.grade} std
*Parent Name:* ${form.parentName}
*Phone:* ${form.phone}
*Email:* ${form.email}
*Subject:* ${form.subject}
*Preferred Teacher:* ${form.faculty}
*Preferred Date:* ${form.date}${form.notes ? `\n*Notes:* ${form.notes}` : ""}`;

    const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, "_blank");

    setStatus("success");
    setForm({
      studentName: "",
      grade: "10",
      parentName: "",
      phone: "",
      email: "",
      subject: sortedSubjects[0].name as string,
      faculty: "Any available",
      date: "",
      time: "16:00",
      mode: "zoom" as Mode,
      notes: "",
    });
  };

  return (
    <>
      <section className="bg-gradient-hero py-14 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Book a free trial class</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            No payment, no commitment. Try a class first, then decide.
          </p>
        </div>
      </section>
      <section className="section-pad">
        {status === "success" ? (
          <div className="mx-auto max-w-3xl rounded-3xl border border-border bg-card p-10 shadow-elegant text-center flex flex-col items-center justify-center space-y-4">
            <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
            <h3 className="text-2xl font-bold text-brand-navy">Trial Class Requested!</h3>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Your free trial class request has been prepared for WhatsApp. Please send the message
              to complete your booking. We will confirm your slot shortly.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="text-sm font-semibold text-primary underline"
            >
              Book another trial class
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mx-auto grid max-w-3xl gap-5 rounded-3xl border border-border bg-card p-6 shadow-elegant md:p-10"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="Student name" required>
                <input
                  required
                  name="Student Name"
                  value={form.studentName}
                  onChange={(e) => update("studentName", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Grade" required>
                <select
                  name="Grade"
                  value={form.grade}
                  onChange={(e) => update("grade", e.target.value)}
                  className="input"
                >
                  {Array.from({ length: 12 }, (_, i) => String(i + 1)).map((g) => (
                    <option key={g} value={g}>
                      {g}
                      {ordinal(Number(g))} std
                    </option>
                  ))}
                </select>
              </Field>
              <Field label="Parent name" required>
                <input
                  required
                  name="Parent Name"
                  value={form.parentName}
                  onChange={(e) => update("parentName", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Phone (WhatsApp)" required>
                <input
                  required
                  name="Phone"
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className="input"
                  placeholder="+91 …"
                />
              </Field>
              <Field label="Email" required>
                <input
                  required
                  name="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  className="input"
                />
              </Field>
              <Field label="Subject" required>
                <select
                  name="Subject"
                  value={form.subject}
                  onChange={(e) => update("subject", e.target.value)}
                  className="input"
                >
                  {sortedSubjects.map((s) => (
                    <option key={s.name}>{s.name}</option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred teacher">
                <select
                  name="Preferred Teacher"
                  value={form.faculty}
                  onChange={(e) => update("faculty", e.target.value)}
                  className="input"
                >
                  {facultyOptions.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </Field>
              <Field label="Preferred date" required>
                <input
                  required
                  name="Date"
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className="input"
                />
              </Field>

            </div>
            <Field label="Anything else we should know?">
              <textarea
                name="Notes"
                rows={3}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                className="input"
              />
            </Field>

            {status === "error" && (
              <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-sm text-red-700">
                {statusMessage}
              </div>
            )}

            {status === "activation_needed" && (
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 space-y-2">
                <p className="font-semibold">{statusMessage}</p>
                <p className="text-xs text-amber-700 leading-relaxed">
                  <strong>Important:</strong> If you are the administrator of{" "}
                  <strong>contact@ilmsmartacademy.com</strong>, please log in to your Zoho Mail
                  account, search your <strong>Inbox</strong>, <strong>Spam/Junk</strong> folder, or
                  your <strong>Admin Console Quarantine</strong> area for a mail from{" "}
                  <strong>FormSubmit.co</strong>, and click the activation link. Submissions will
                  only be delivered after this one-time activation.
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 flex justify-center items-center gap-2 rounded-lg bg-gradient-hero px-6 py-3.5 font-semibold text-primary-foreground shadow-elegant transition-transform hover:-translate-y-0.5 disabled:opacity-75 w-full"
            >
              {status === "loading" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Preparing Request...
                </>
              ) : (
                <>
                  Continue to WhatsApp <Send className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="text-center text-xs text-muted-foreground">
              On submit, WhatsApp will open with your details pre-filled. Our team will confirm your
              slot within a few hours.
            </p>
          </form>
        )}
      </section>
      <style>{`.input { width:100%; border:1px solid var(--border); background:var(--background); color:var(--foreground); border-radius:0.625rem; padding:0.7rem 0.9rem; font-size:0.95rem; outline:none; transition: border-color .2s, box-shadow .2s; }
      .input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 20%, transparent); }`}</style>
    </>
  );
}

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return s[(v - 20) % 10] || s[v] || s[0];
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-brand-navy">
        {label}
        {required && <span className="text-brand-red"> *</span>}
      </span>
      {children}
    </label>
  );
}
