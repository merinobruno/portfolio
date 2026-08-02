import { useTranslations } from "next-intl";
import Section from "./Section";
import { processSteps } from "@/lib/content";

// Secuencia real de trabajo: acá los números SÍ portan información.
// Cada paso responde las dos preguntas que un cliente hace antes de contratar:
// qué se lleva y qué tiene que poner. Se usa la misma gramática de filas de
// definición que Experiencia y Skills, no un patrón nuevo.
export default function Process() {
  const t = useTranslations("process");

  return (
    <Section id="proceso" title={t("heading")} subtitle={t("subtitle")}>
      <ol className="divide-y divide-line border-t border-line-2">
        {processSteps.map((step, i) => (
          <li
            key={step}
            className="grid gap-x-12 gap-y-5 py-8 lg:grid-cols-2 lg:py-10"
          >
            <div>
              <span className="font-mono text-sm font-bold text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-2xl font-black tracking-tight">
                {t(`steps.${step}.title`)}
              </h3>
              <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">
                {t(`steps.${step}.desc`)}
              </p>
            </div>

            <dl className="divide-y divide-line self-center">
              <div className="grid gap-1 pb-4 sm:grid-cols-[170px_1fr] sm:gap-6">
                <dt className="data-label pt-0.5 text-muted-2">
                  {t("getLabel")}
                </dt>
                <dd className="text-[15px] leading-relaxed">
                  {t(`steps.${step}.get`)}
                </dd>
              </div>
              <div className="grid gap-1 pt-4 sm:grid-cols-[170px_1fr] sm:gap-6">
                <dt className="data-label pt-0.5 text-muted-2">
                  {t("needLabel")}
                </dt>
                <dd className="text-[15px] leading-relaxed text-muted">
                  {t(`steps.${step}.need`)}
                </dd>
              </div>
            </dl>
          </li>
        ))}
      </ol>
    </Section>
  );
}
