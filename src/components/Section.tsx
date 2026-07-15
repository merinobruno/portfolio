import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
};

// Sección tipo "documento": regla superior de ancho completo y encabezado
// asimétrico (título grande a la izquierda, bajada corta a la derecha).
export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: SectionProps) {
  return (
    <section id={id} className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      <div className="border-t border-line pt-8 pb-20 sm:pt-10 sm:pb-28">
        {(title || subtitle) && (
          <div className="mb-10 flex flex-col gap-4 sm:mb-14 sm:flex-row sm:items-end sm:justify-between">
            {title && (
              <h2 className="text-[clamp(2.1rem,4.5vw,3.4rem)] font-black leading-[1.02] tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="max-w-xs text-base leading-relaxed text-muted">
                {subtitle}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
