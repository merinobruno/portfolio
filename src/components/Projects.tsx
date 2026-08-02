"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ArrowUpRight, FolderGit2, Lock } from "lucide-react";
import Section from "./Section";
import ProjectModal from "./ProjectModal";
import { projects, featuredProjectId, type Project } from "@/lib/content";

// Convención de íconos en esta sección, para que la flecha signifique algo:
//   →  se queda en el sitio (abre el detalle)
//   ↗  sale del sitio (abre el sitio del cliente en otra pestaña)

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

// Link al sitio en vivo. Es hermano del botón, no hijo: un <a> dentro de un
// <button> es HTML inválido y el teclado nunca lo alcanza.
function VisitLink({ href, name }: { href: string; name: string }) {
  const t = useTranslations("projects");
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("visitLabel")}: ${name}`}
      className="-my-2 inline-flex items-center gap-1.5 py-2 text-sm font-bold text-accent underline-offset-4 hover:underline"
    >
      {t("visitLabel")}
      <ArrowUpRight className="size-4" aria-hidden />
    </a>
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
    <article className="grid gap-6 lg:grid-cols-5 lg:gap-12">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${t("name")} — ${tProjects("detailsLabel")}`}
        className="group cursor-pointer text-left lg:col-span-3"
      >
        <ProjectImage project={project} name={t("name")} />
      </button>

      <div className="flex flex-col items-start justify-center lg:col-span-2">
        <span className="data-label text-accent">
          {tProjects("featuredLabel")}
        </span>
        <h3 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">
          {t("name")}
        </h3>
        <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted">
          {t("desc")}
        </p>
        <p className="mt-4 font-mono text-xs text-muted-2">
          {project.tags.join(" · ")}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={onOpen}
            className="-my-2 inline-flex cursor-pointer items-center gap-1.5 py-2 text-sm font-bold text-accent underline-offset-4 hover:underline"
          >
            {tProjects("detailsLabel")}
            <ArrowRight className="size-4" aria-hidden />
          </button>
          {project.link && (
            <VisitLink href={project.link} name={t("name")} />
          )}
        </div>
      </div>
    </article>
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
    <article className="flex flex-col items-start">
      <button
        type="button"
        onClick={onOpen}
        aria-label={`${t("name")} — ${tProjects("detailsLabel")}`}
        className="group w-full cursor-pointer text-left"
      >
        <ProjectImage project={project} name={t("name")} />
        <span className="mt-4 flex w-full items-baseline justify-between gap-4">
          <span className="text-xl font-bold tracking-tight">{t("name")}</span>
          <ArrowRight className="size-4 shrink-0 text-accent" aria-hidden />
        </span>
        <span className="mt-2 block text-[15px] leading-relaxed text-muted">
          {t("desc")}
        </span>
      </button>

      <p className="mt-3 font-mono text-xs text-muted-2">
        {project.tags.join(" · ")}
      </p>

      <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
        <TypeLabel project={project} />
        {project.link && <VisitLink href={project.link} name={t("name")} />}
      </div>
    </article>
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
