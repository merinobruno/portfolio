import { useTranslations } from "next-intl";
import { Briefcase, GraduationCap, Languages } from "lucide-react";
import Section from "./Section";
import { jobs, education, skillGroups } from "@/lib/content";

function JobItem({ id }: { id: string }) {
  const t = useTranslations(`experience.jobs.${id}`);
  return (
    <li className="relative pl-6">
      <span className="absolute left-0 top-1.5 size-2.5 rounded-full border-2 border-accent bg-background" />
      <span className="absolute left-[4px] top-4 h-[calc(100%+0.5rem)] w-px bg-line last:hidden" />
      <h4 className="font-semibold">
        {t("role")} · <span className="text-accent">{t("company")}</span>
      </h4>
      <p className="mt-0.5 text-xs text-muted-2">{t("period")}</p>
      <p className="mt-2 text-sm leading-relaxed text-muted">{t("desc")}</p>
    </li>
  );
}

function EducationItem({ id }: { id: string }) {
  const t = useTranslations(`experience.education.${id}`);
  return (
    <li>
      <h4 className="text-sm font-semibold">{t("title")}</h4>
      <p className="text-sm text-muted">{t("place")}</p>
      <p className="text-xs text-muted-2">{t("period")}</p>
    </li>
  );
}

function Panel({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof Briefcase;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-6">
      <h3 className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-muted-2">
        <Icon className="size-4 text-accent" />
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function Experience() {
  const t = useTranslations("experience");

  return (
    <Section
      id="perfil"
      eyebrow={t("eyebrow")}
      title={t("heading")}
      subtitle={t("subtitle")}
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {/* Experiencia laboral (ancho) */}
        <div className="lg:col-span-2">
          <Panel icon={Briefcase} title={t("workTitle")}>
            <ol className="space-y-7">
              {jobs.map((id) => (
                <JobItem key={id} id={id} />
              ))}
            </ol>
          </Panel>
        </div>

        {/* Educación + Idiomas (columna) */}
        <div className="flex flex-col gap-5">
          <Panel icon={GraduationCap} title={t("educationTitle")}>
            <ul className="space-y-4">
              {education.map((id) => (
                <EducationItem key={id} id={id} />
              ))}
            </ul>
          </Panel>

          <Panel icon={Languages} title={t("languagesTitle")}>
            <ul className="space-y-2 text-sm text-muted">
              <li>{t("languages.es")}</li>
              <li>{t("languages.en")}</li>
            </ul>
          </Panel>
        </div>
      </div>

      {/* Skills */}
      <h3 className="mb-5 mt-12 text-center text-sm font-semibold uppercase tracking-[0.16em] text-muted-2">
        {t("skillsTitle")}
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <div
              key={group.id}
              className="rounded-2xl border border-line bg-surface p-5"
            >
              <h4 className="mb-3 flex items-center gap-2 text-sm font-medium">
                <Icon className="size-4 text-accent" />
                {t(`skills.${group.id}`)}
              </h4>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-line bg-background px-2.5 py-1 text-xs text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
