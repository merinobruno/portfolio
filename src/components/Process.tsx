import { useTranslations } from "next-intl";
import Section from "./Section";
import { processSteps } from "@/lib/content";

export default function Process() {
  const t = useTranslations("process");

  return (
    <Section id="proceso" eyebrow={t("eyebrow")} title={t("heading")}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {processSteps.map((step, i) => (
          <div
            key={step}
            className="rounded-2xl border border-line bg-surface p-6"
          >
            <span className="inline-block rounded-lg border border-line px-2.5 py-1 font-mono text-sm text-accent">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h4 className="mt-4 text-base font-semibold">
              {t(`steps.${step}.title`)}
            </h4>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">
              {t(`steps.${step}.desc`)}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
