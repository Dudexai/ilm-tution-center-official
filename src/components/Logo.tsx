import logoSrc from "@/assets/ilm-logo-transparent.png";

export function Logo({ className = "h-12 w-auto" }: { className?: string }) {
  return (
    <img
      src={logoSrc}
      alt="ilm Smart Academy — Join in the light of knowledge"
      className={`${className}`}
      width={1080}
      height={300}
    />
  );
}
