import { useTranslations } from "next-intl";
import Section from "./Section";
import { jobs, education, skillGroups } from "@/lib/content";

// Fila de experiencia tipo CV: período en mono a la izquierda, detalle a la derecha.
function JobRow({ id }: { id: string }) {
  const t = useTranslations(`experience.jobs.${id}`);
  return (
    <li className="grid gap-2 py-6 first:pt-0 sm:grid-cols-[170px_1fr] sm:gap-8">
      <p className="pt-0.5 font-mono text-xs leading-relaxed text-muted-2">
        {t("period")}
      </p>
      <div>
        <h4 className="text-lg font-bold">
          {t("role")} · <span className="text-accent">{t("company")}</span>
        </h4>
        <p className="mt-2 text-[15px] leading-relaxed text-muted">{t("desc")}</p>
      </div>
    </li>
  );
}

function EducationRow({ id }: { id: string }) {
  const t = useTranslations(`experience.education.${id}`);
  return (
    <li className="py-5 first:pt-0">
      <p className="font-mono text-xs text-muted-2">{t("period")}</p>
      <h4 className="mt-1.5 font-bold leading-snug">{t("title")}</h4>
      <p className="mt-0.5 text-sm text-muted">{t("place")}</p>
    </li>
  );
}

export default function Experience() {
  const t = useTranslations("experience");

  return (
    <Section id="perfil" title={t("heading")} subtitle={t("subtitle")}>
      <div className="grid gap-14 lg:grid-cols-3 lg:gap-20">
        {/* Experiencia laboral */}
        <div className="lg:col-span-2">
          <h3 className="data-label border-b border-line-2 pb-3 text-muted-2">
            {t("workTitle")}
          </h3>
          <ol className="mt-6 divide-y divide-line">
            {jobs.map((id) => (
              <JobRow key={id} id={id} />
            ))}
          </ol>
        </div>

        {/* Educación + Idiomas */}
        <div className="flex flex-col gap-12">
          <div>
            <h3 className="data-label border-b border-line-2 pb-3 text-muted-2">
              {t("educationTitle")}
            </h3>
            <ul className="mt-5 divide-y divide-line">
              {education.map((id) => (
                <EducationRow key={id} id={id} />
              ))}
            </ul>
          </div>

          <div>
            <h3 className="data-label border-b border-line-2 pb-3 text-muted-2">
              {t("languagesTitle")}
            </h3>
            <ul className="mt-5 space-y-2 text-[15px] text-muted">
              <li>{t("languages.es")}</li>
              <li>{t("languages.en")}</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Skills: tabla de definición, sin cards */}
      <div className="mt-16 lg:mt-20">
        <h3 className="data-label border-b border-line-2 pb-3 text-muted-2">
          {t("skillsTitle")}
        </h3>
        <dl className="divide-y divide-line">
          {skillGroups.map((group) => (
            <div
              key={group.id}
              className="grid gap-1.5 py-4 sm:grid-cols-[220px_1fr] sm:gap-8"
            >
              <dt className="pt-0.5 text-sm font-bold">
                {t(`skills.${group.id}`)}
              </dt>
              <dd className="font-mono text-[13px] leading-relaxed text-muted">
                {group.items.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
