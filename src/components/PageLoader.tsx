import { useEffect, useState } from "react";
import { Logo } from "./Logo";

export function PageLoader() {
  const [gone, setGone] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setGone(true), 1700);
    return () => clearTimeout(t);
  }, []);
  if (gone) return null;
  return (
    <div className="loader-screen">
      <div className="flex flex-col items-center gap-6">
        <div className="rounded-2xl bg-white px-6 py-4 shadow-glow animate-logo-pop">
          <Logo className="h-16 w-auto" />
        </div>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/20">
          <div
            className="h-full w-1/2 rounded-full bg-brand-yellow"
            style={{
              background: "linear-gradient(90deg, transparent, var(--brand-yellow), transparent)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.2s linear infinite",
            }}
          />
        </div>
        <p className="text-sm font-medium tracking-wide text-white/80">
          Join in the light of knowledge
        </p>
      </div>
    </div>
  );
}
