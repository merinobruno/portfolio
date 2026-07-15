import { useTranslations } from "next-intl";
import Section from "./Section";
import { processSteps } from "@/lib/content";

// Secuencia real de trabajo: acá los números SÍ portan información.
export default function Process() {
  const t = useTranslations("process");

  return (
    <Section id="proceso" title={t("heading")}>
      <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <li key={step} className="border-t border-line-2 pt-5">
            <span className="font-mono text-sm font-bold text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="mt-3 text-lg font-bold">{t(`steps.${step}.title`)}</h4>
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
              {t(`steps.${step}.desc`)}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
