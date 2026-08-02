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
    // Misma técnica que las cards: una sola parada de tabulación, con el área
    // de click estirada sobre la imagen desde el botón "Ver detalle".
    <article className="group relative grid gap-6 lg:grid-cols-5 lg:gap-12">
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
        <p className="mt-3 max-w-[68ch] text-[15px] leading-relaxed text-muted">
          {t("desc")}
        </p>
        <p className="mt-4 font-mono text-xs text-muted-2">
          {project.tags.join(" · ")}
        </p>

        <div className="relative z-10 mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          <button
            type="button"
            onClick={onOpen}
            aria-label={`${t("name")} — ${tProjects("detailsLabel")}`}
            className="-my-2 inline-flex cursor-pointer items-center gap-1.5 py-2 text-sm font-bold text-accent underline-offset-4 after:absolute after:inset-0 after:content-[''] hover:underline"
          >
            {tProjects("detailsLabel")}
            <ArrowRight className="size-4" aria-hidden />
          </button>
          {project.link && (
            <span className="relative z-10">
              <VisitLink href={project.link} name={t("name")} />
            </span>
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
    // El título es un h3 de verdad (antes era un span y quedaba fuera del
    // outline del documento). Como un h3 no puede vivir dentro de un button,
    // el button va adentro del h3 y estira su área de click sobre toda la card
    // con ::after: una sola parada de tabulación, semántica correcta.
    <article className="group relative flex flex-col items-start">
      <ProjectImage project={project} name={t("name")} />

      <h3 className="mt-4 flex w-full items-baseline justify-between gap-4 text-xl font-bold tracking-tight">
        <button
          type="button"
          onClick={onOpen}
          aria-label={`${t("name")} — ${tProjects("detailsLabel")}`}
          className="cursor-pointer text-left after:absolute after:inset-0 after:content-['']"
        >
          {t("name")}
        </button>
        <ArrowRight className="size-4 shrink-0 text-accent" aria-hidden />
      </h3>

      <p className="mt-2 text-[15px] leading-relaxed text-muted">{t("desc")}</p>

      <p className="mt-3 font-mono text-xs text-muted-2">
        {project.tags.join(" · ")}
      </p>

      {/* z-10 para quedar por encima del área estirada del botón */}
      <div className="relative z-10 mt-3 flex flex-wrap items-center gap-x-5 gap-y-2">
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
