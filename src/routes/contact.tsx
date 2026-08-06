import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Phone, Mail, Clock, MessageCircle, Loader2, CheckCircle2 } from "lucide-react";
import { SITE } from "@/lib/site-data";
import { useState, useRef } from "react";
import { sendBookingNotification } from "@/lib/send-notification";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — ilm Smart Academy" },
      {
        name: "description",
        content:
          "Reach ilm Smart Academy in Royapettah, Chennai. Call, WhatsApp or email — we respond fast.",
      },
      { property: "og:title", content: "Contact ilm Smart Academy" },
      { property: "og:description", content: "Phone, WhatsApp, email and address details." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [f, setF] = useState({ name: "", phone: "", email: "", message: "" });
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error" | "activation_needed"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleWhatsApp = () => {
    if (formRef.current && formRef.current.reportValidity()) {
      const waText = `Hi ilm Smart Academy, I'd like to know more.\nName: ${f.name}\nPhone: ${f.phone}\nEmail: ${f.email}\n\nMessage:\n${f.message}`;
      const waUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(waText)}`;
      window.open(waUrl, "_blank");
      setStatus("success");
      setF({ name: "", phone: "", email: "", message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current || !formRef.current.reportValidity()) return;

    setStatus("loading");
    setStatusMessage("");

    try {
      const response = await fetch("https://formsubmit.co/ajax/contact@ilmsmartacademy.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          _subject: `Contact Form Request: ${f.name}`,
          _captcha: "false",
          _template: "table",
          name: f.name,
          phone: f.phone,
          email: f.email,
          message: f.message,
        }),
      });

      const data = await response.json();
      if (response.ok && data.success === "true") {
        setStatus("success");
        setF({ name: "", phone: "", email: "", message: "" });
      } else {
        const msg = data.message || "Failed to send email. Please try again.";
        if (msg.toLowerCase().includes("activation") || msg.toLowerCase().includes("activate")) {
          setStatus("activation_needed");
          setStatusMessage(
            "This form needs activation. FormSubmit.co has sent an activation link to contact@ilmsmartacademy.com. Please check your inbox (including Spam/Junk) and click it to activate.",
          );
        } else {
          setStatus("error");
          setStatusMessage(msg);
        }
      }
    } catch (err: any) {
      setStatus("error");
      setStatusMessage("An unexpected error occurred. Please try again later.");
    }
  };

  return (
    <>
      <section className="bg-gradient-hero py-16 text-primary-foreground">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Get in touch</h1>
          <p className="mx-auto mt-4 max-w-2xl text-white/85">
            We'd love to hear from you — call, WhatsApp or drop us a quick message.
          </p>
        </div>
      </section>

      <section className="section-pad">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 lg:grid-cols-2">
          <div className="space-y-4">
            <Info icon={MapPin} title="Visit us" lines={[SITE.address]} />
            <Info
              icon={Phone}
              title="Call"
              lines={[`${SITE.phoneDisplay1}`, `${SITE.phoneDisplay2}`]}
            />
            <Info icon={Mail} title="Email" lines={[SITE.email]} />
            <Info icon={Clock} title="Working hours" lines={[SITE.hours]} />
            <div className="overflow-hidden rounded-2xl border border-border">
              <iframe
                title="Map to ilm Smart Academy"
                src="https://www.google.com/maps?q=Peters+Road+Royapettah+Chennai&output=embed"
                className="h-72 w-full"
                loading="lazy"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-border bg-card p-7 shadow-elegant md:p-9">
            {status === "success" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center space-y-4 h-full">
                <CheckCircle2 className="h-16 w-16 text-emerald-500 animate-bounce" />
                <h3 className="text-2xl font-bold text-brand-navy">Message Sent Successfully!</h3>
                <p className="text-muted-foreground max-w-sm">
                  Thank you for reaching out. We will get back to you as soon as possible.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="text-sm font-semibold text-primary underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col h-full">
                <h2 className="text-2xl font-bold text-brand-navy">Send us a message</h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in the details below to reach out to us.
                </p>
                <div className="mt-6 grid gap-4">
                  <input
                    required
                    name="name"
                    placeholder="Your name"
                    value={f.name}
                    onChange={(e) => setF({ ...f, name: e.target.value })}
                    className="input"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="Phone"
                      value={f.phone}
                      onChange={(e) => setF({ ...f, phone: e.target.value })}
                      className="input"
                    />
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="Email"
                      value={f.email}
                      onChange={(e) => setF({ ...f, email: e.target.value })}
                      className="input"
                    />
                  </div>
                  <textarea
                    required
                    name="message"
                    rows={5}
                    placeholder="How can we help?"
                    value={f.message}
                    onChange={(e) => setF({ ...f, message: e.target.value })}
                    className="input"
                  />

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
                        account, search your <strong>Inbox</strong>, <strong>Spam/Junk</strong>{" "}
                        folder, or your <strong>Admin Console Quarantine</strong> area for a mail
                        from <strong>FormSubmit.co</strong>, and click the activation link.
                        Submissions will only be delivered after this one-time activation.
                      </p>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-3">
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="inline-flex items-center gap-2 rounded-lg bg-gradient-hero px-6 py-3 font-semibold text-primary-foreground shadow-elegant hover:-translate-y-0.5 transition-transform disabled:opacity-75"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4" /> Send email
                        </>
                      )}
                    </button>
                    <button
                      type="button"
                      onClick={handleWhatsApp}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] px-6 py-3 font-semibold text-white shadow-elegant hover:-translate-y-0.5 transition-transform"
                    >
                      <MessageCircle className="h-4 w-4" /> WhatsApp us
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
      <style>{`.input { width:100%; border:1px solid var(--border); background:var(--background); color:var(--foreground); border-radius:0.625rem; padding:0.7rem 0.9rem; font-size:0.95rem; outline:none; transition: border-color .2s, box-shadow .2s; }
      .input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px color-mix(in oklab, var(--primary) 20%, transparent); }`}</style>
    </>
  );
}

function Info({
  icon: Icon,
  title,
  lines,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  lines: string[];
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-lg bg-gradient-hero text-primary-foreground">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h3 className="font-bold text-brand-navy">{title}</h3>
        {lines.map((l) => (
          <p key={l} className="text-sm text-muted-foreground">
            {l}
          </p>
        ))}
      </div>
    </div>
  );
}
