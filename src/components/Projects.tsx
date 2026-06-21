"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, FolderGit2, Lock } from "lucide-react";
import Section from "./Section";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "@/lib/content";

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
      className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left transition-colors hover:border-line-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* Imagen o placeholder */}
      <div className="thumb-glow relative aspect-[16/10] w-full overflow-hidden border-b border-line">
        {project.image ? (
          <Image
            src={project.image}
            alt={t("name")}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <FolderGit2 className="size-10 text-muted-2" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold">{t("name")}</h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {t("desc")}
        </p>

        {/* Tags de stack */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-line bg-background px-2.5 py-1 text-xs text-muted"
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Pie: tipo de proyecto + "Ver detalle" */}
        <div className="mt-5 flex items-center justify-between">
          {project.link ? (
            <span className="text-xs text-muted-2">{tProjects("clientLabel")}</span>
          ) : (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-2">
              <Lock className="size-3" />
              {tProjects("internalLabel")}
            </span>
          )}
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-transform group-hover:translate-x-0.5">
            {tProjects("detailsLabel")}
            <ArrowUpRight className="size-4" />
          </span>
        </div>
      </div>
    </button>
  );
}

export default function Projects() {
  const t = useTranslations("projects");
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section
      id="proyectos"
      eyebrow={t("eyebrow")}
      title={t("heading")}
      subtitle={t("subtitle")}
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onOpen={() => setSelected(project)}
          />
        ))}
      </div>

      {selected && (
        <ProjectModal project={selected} onClose={() => setSelected(null)} />
      )}
    </Section>
  );
}
