import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

// Contenedor estándar de sección con encabezado centrado opcional.
export default function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section
      id={id}
      className={`mx-auto w-full max-w-5xl px-4 py-16 sm:px-6 sm:py-20 ${className}`}
    >
      {(eyebrow || title || subtitle) && (
        <div className="mx-auto mb-12 max-w-2xl text-center">
          {eyebrow && (
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              {eyebrow}
            </p>
          )}
          {title && (
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="mt-3 text-base leading-relaxed text-muted">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
