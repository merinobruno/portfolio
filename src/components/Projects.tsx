"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, FolderGit2, Lock } from "lucide-react";
import Section from "./Section";
import ProjectModal from "./ProjectModal";
import { projects, featuredProjectId, type Project } from "@/lib/content";

function ProjectImage({ project, name }: { project: Project; name: string }) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden border border-line bg-bg-2">
      {project.image ? (
        <Image
          src={project.image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        />
      ) : (
        <div className="flex size-full items-center justify-center">
          <FolderGit2 className="size-10 text-muted-2" />
        </div>
      )}
    </div>
  );
}

function TypeLabel({ project }: { project: Project }) {
  const t = useTranslations("projects");
  return project.link ? (
    <span className="data-label text-muted-2">{t("clientLabel")}</span>
  ) : (
    <span className="data-label inline-flex items-center gap-1.5 text-muted-2">
      <Lock className="size-3" />
      {t("internalLabel")}
    </span>
  );
}

// Proyecto destacado: fila ancha, imagen grande + texto al costado.
function FeaturedProject({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const t = useTranslations(`projects.items.${project.id}`);
  const tProjects = useTranslations("projects");

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${t("name")} — ${tProjects("detailsLabel")}`}
      className="group grid w-full cursor-pointer gap-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent lg:grid-cols-5 lg:gap-12"
    >
      <div className="lg:col-span-3">
        <ProjectImage project={project} name={t("name")} />
      </div>
      <div className="flex flex-col items-start justify-center lg:col-span-2">
        <span className="data-label text-accent">
          {tProjects("featuredLabel")}
        </span>
        <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
          {t("name")}
        </h3>
        <p className="mt-3 text-[15px] leading-relaxed text-muted">{t("desc")}</p>
        <p className="mt-4 font-mono text-xs text-muted-2">
          {project.tags.join(" · ")}
        </p>
        <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-accent">
          {tProjects("detailsLabel")}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </button>
  );
}

// Proyecto de la grilla: imagen enmarcada, texto libre (sin caja).
function ProjectCard({
  project,
  onOpen,
}: {
  project: Project;
  onOpen: () => void;
}) {
  const t = useTranslations(`projects.items.${project.id}`);
  const tProjects = useTranslations("projects");

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={`${t("name")} — ${tProjects("detailsLabel")}`}
      className="group flex cursor-pointer flex-col items-start text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <ProjectImage project={project} name={t("name")} />
      <div className="mt-4 flex w-full items-baseline justify-between gap-4">
        <h3 className="text-xl font-bold tracking-tight">{t("name")}</h3>
        <ArrowUpRight className="size-4 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <p className="mt-2 text-[15px] leading-relaxed text-muted">{t("desc")}</p>
      <p className="mt-3 font-mono text-xs text-muted-2">
        {project.tags.join(" · ")}
      </p>
      <div className="mt-3">
        <TypeLabel project={project} />
      </div>
    </button>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const [selected, setSelected] = useState<Project | null>(null);

  const featured = projects.find((p) => p.id === featuredProjectId);
  const rest = projects.filter((p) => p.id !== featuredProjectId);

  return (
    <Section id="proyectos" title={t("heading")} subtitle={t("subtitle")}>
      <div className="space-y-16">
        {featured && (
          <FeaturedProject
            project={featured}
            onOpen={() => setSelected(featured)}
          />
        )}
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {rest.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={() => setSelected(project)}
            />
          ))}
        </div>
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </Section>
  );
}
